/* Clone CRDs from a remote repository using git sparse-checkout */

import { join, dirname } from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { mkdir, rm, readdir, writeFile } from "fs/promises";
import { execa } from "execa";

const rootDir = join(__dirname, "..");

interface CloneOptions {
  repository: string;
  name: string;
  organization: string;
  gitRef: string;
  crdDir: string;
  force: boolean;
  output?: string;
}

/**
 * Clone only the CRDs directory from a remote repository using sparse checkout
 */
async function cloneCRDs(options: CloneOptions): Promise<string[]> {
  const { repository, name, organization, gitRef, crdDir, output } = options;

  const targetDir = join(
    rootDir,
    "models",
    organization,
    name,
    ".cache",
    gitRef
  );
  const tempCloneDir = join(rootDir, ".tmp", `${organization}-${name}`);

  console.log(`Cloning CRDs from: ${repository}`);
  console.log(`Target directory: ${targetDir}`);
  console.log(`CRD directory in repo: ${crdDir}`);
  console.log(`Git ref: ${gitRef}`);

  try {
    // Clean up temp directory if it exists
    try {
      await rm(tempCloneDir, { recursive: true, force: true });
    } catch {
      // Ignore if directory doesn't exist
    }

    // Create temp directory
    await mkdir(tempCloneDir, { recursive: true });

    // Initialize a new git repository
    console.log("\nInitializing git repository...");
    await execa("git", ["init"], { cwd: tempCloneDir, stdio: "inherit" });

    // Add the remote
    console.log("Adding remote...");
    await execa("git", ["remote", "add", "origin", repository], {
      cwd: tempCloneDir,
      stdio: "inherit"
    });

    // Enable sparse checkout
    console.log("Enabling sparse checkout...");
    await execa("git", ["config", "core.sparseCheckout", "true"], {
      cwd: tempCloneDir,
      stdio: "inherit"
    });

    // Configure sparse checkout to only include the CRD directory
    const sparseCheckoutFile = join(
      tempCloneDir,
      ".git",
      "info",
      "sparse-checkout"
    );
    await mkdir(dirname(sparseCheckoutFile), { recursive: true });

    console.log(`Configuring sparse checkout for: ${crdDir}`);
    await execa(
      "bash",
      ["-c", `echo "${crdDir}/*" > .git/info/sparse-checkout`],
      {
        cwd: tempCloneDir,
        stdio: "inherit"
      }
    );

    // Fetch and checkout the specific ref
    console.log(`\nFetching ${gitRef}...`);
    await execa("git", ["fetch", "--depth=1", "origin", gitRef], {
      cwd: tempCloneDir,
      stdio: "inherit"
    });

    console.log("Checking out...");
    await execa("git", ["checkout", "FETCH_HEAD"], {
      cwd: tempCloneDir,
      stdio: "inherit"
    });

    // Create target directory
    const crdSourcePath = join(tempCloneDir, crdDir);

    console.log(`\nCopying CRDs to ${targetDir}...`);
    await mkdir(targetDir, { recursive: true });

    // Copy the CRDs to the target location
    await execa("cp", ["-r", crdSourcePath, join(targetDir, "crds")], {
      stdio: "inherit"
    });

    console.log("\n✓ Successfully cloned CRDs!");
    console.log(`  Location: ${join(targetDir, "crds")}`);

    // Collect YAML files and generate relative paths if output is specified
    let crdPaths: string[] = [];
    if (output) {
      const crdFiles = await readdir(join(targetDir, "crds"));
      const yamlFiles = crdFiles
        .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
        .sort();

      // Generate relative paths from the package directory to the cache
      // e.g., "./.cache/v2.2.0/crds/file.yaml"
      crdPaths = yamlFiles.map((file) => `./.cache/${gitRef}/crds/${file}`);

      console.log(`\nFound ${yamlFiles.length} YAML files`);
      await writeFile(output, JSON.stringify(crdPaths, null, 2));
      console.log(`✓ Wrote ${crdPaths.length} relative paths to ${output}`);
    }

    // Clean up temp directory
    console.log("\nCleaning up temporary files...");
    await rm(tempCloneDir, { recursive: true, force: true });

    return crdPaths;
  } catch (error) {
    console.error("\n✗ Error cloning CRDs:", error);

    // Clean up on error
    try {
      await rm(tempCloneDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }

    throw error;
  }
}

(async () => {
  const args = await yargs(hideBin(process.argv))
    .option("repository", {
      type: "string",
      demandOption: true,
      description:
        "Git repository URL (e.g., https://github.com/crossplane-contrib/provider-upjet-aws)",
      alias: "r"
    })
    .option("name", {
      type: "string",
      demandOption: true,
      description: "Package name (e.g., provider-aws)",
      alias: "n"
    })
    .option("organization", {
      type: "string",
      default: "crossplane-contrib",
      description: "Organization/namespace for the package",
      alias: "o"
    })
    .option("git-ref", {
      type: "string",
      default: "HEAD",
      description: "Git reference to checkout (branch, tag, or commit)",
      alias: "ref"
    })
    .option("crd-dir", {
      type: "string",
      default: "package/crds",
      description: "Path to CRDs directory in the repository",
      alias: "dir"
    })
    .option("force", {
      type: "boolean",
      default: false,
      description: "Force overwrite if target directory exists",
      alias: "f"
    })
    .option("output", {
      type: "string",
      description: "Output JSON file with CRD URLs (optional)",
      alias: "out"
    })
    .example(
      "$0 -r https://github.com/crossplane-contrib/provider-upjet-aws -n provider-upjet-aws",
      "Clone CRDs from provider-aws"
    )
    .example(
      "$0 -r https://github.com/crossplane-contrib/provider-upjet-aws -n provider-upjet-aws -o crossplane-contrib --ref v2.2.0",
      "Clone CRDs from a specific version"
    )
    .example(
      "$0 -r https://github.com/crossplane-contrib/provider-upjet-aws -n provider-upjet-aws --ref v2.2.0 --output crd-urls.json",
      "Clone CRDs and output URLs to JSON file"
    )
    .help()
    .parse();

  await cloneCRDs({
    repository: args.repository,
    name: args.name,
    organization: args.organization,
    gitRef: args["git-ref"],
    crdDir: args["crd-dir"],
    force: args.force,
    output: args.output
  });
})().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
