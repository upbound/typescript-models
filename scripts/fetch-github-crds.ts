import { writeFile } from "fs/promises";
import { Octokit } from "@octokit/rest";
import yargs from "yargs";

interface GitHubRepoPath {
  owner: string;
  repo: string;
  path: string;
  ref: string;
}

function parseGitHubUrl(url: string): GitHubRepoPath {
  // Handle URLs like:
  // https://github.com/crossplane-contrib/provider-upjet-aws/tree/main/package/crds
  // https://github.com/crossplane/crossplane/tree/v2.1.3/cluster/crds
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)\/tree\/([^/]+)\/(.+)/);

  if (!match) {
    throw new Error(
      `Invalid GitHub URL format. Expected: https://github.com/owner/repo/tree/ref/path\nGot: ${url}`
    );
  }

  const [, owner, repo, ref, path] = match;
  return { owner, repo, ref, path };
}

async function fetchCRDFiles(
  owner: string,
  repo: string,
  path: string,
  ref: string
): Promise<string[]> {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN // Optional: for higher rate limits
  });

  console.log(`Fetching files from ${owner}/${repo}/${path} (ref: ${ref})`);

  try {
    const allFiles: any[] = [];
    let page = 1;
    const perPage = 100; // GitHub's max per page

    // Fetch all pages of directory contents
    while (true) {
      console.log(`Fetching page ${page}...`);

      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref,
        per_page: perPage,
        page
      });

      if (!Array.isArray(data)) {
        throw new Error(`Expected directory listing, got single file`);
      }

      if (data.length === 0) {
        break; // No more results
      }

      allFiles.push(...data);

      // If we got less than a full page, we've reached the end
      if (data.length < perPage) {
        break;
      }

      page++;
    }

    console.log(`Found ${allFiles.length} total items in directory`);

    // Filter for YAML files and return full raw URLs
    const yamlFiles = allFiles
      .filter(
        (file) =>
          file.type === "file" &&
          (file.name.endsWith(".yaml") || file.name.endsWith(".yml"))
      )
      .map(
        (file) =>
          `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}/${file.name}`
      )
      .sort();

    console.log(`Found ${yamlFiles.length} YAML files`);

    return yamlFiles;
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error(
        `Repository path not found: ${owner}/${repo}/${path} (ref: ${ref})`
      );
    }
    if (error.status === 403) {
      throw new Error(
        `GitHub API rate limit exceeded. Set GITHUB_TOKEN environment variable for higher limits.`
      );
    }
    throw error;
  }
}

(async () => {
  const args = await yargs(process.argv.slice(2))
    .option("url", {
      type: "string",
      description:
        "GitHub repository URL (e.g., https://github.com/owner/repo/tree/ref/path)",
      demandOption: true
    })
    .option("output", {
      type: "string",
      description: "Output file path",
      default: "crd-urls.json"
    })
    .example(
      "$0 --url https://github.com/crossplane-contrib/provider-upjet-aws/tree/main/package/crds",
      "Fetch CRD files from provider-upjet-aws"
    )
    .example(
      "$0 --url https://github.com/crossplane/crossplane/tree/v2.1.3/cluster/crds --output crossplane-crds.json",
      "Fetch Crossplane CRD files and save to custom file"
    )
    .parse();

  try {
    const { owner, repo, path, ref } = parseGitHubUrl(args.url);
    const files = await fetchCRDFiles(owner, repo, path, ref);

    if (files.length === 0) {
      console.warn("Warning: No YAML files found in the specified directory");
    }

    await writeFile(args.output, JSON.stringify(files, null, 2));

    console.log(`\nSuccess! Wrote ${files.length} URLs to ${args.output}`);
    console.log(
      `\nYou can now copy the contents to your package.json crd-generate.input field.`
    );
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
})();
