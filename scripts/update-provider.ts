/**
 * Update a Crossplane provider package to a new upstream version.
 *
 * Usage:
 *   pnpm update-provider --name provider-upjet-azure --version v2.6.0
 *   pnpm update-provider -n provider-kubernetes -v v1.3.0
 *
 * For clone-based providers (fetchStrategy: "clone"):
 *   Updates the prebuild --ref and crd-generate.input glob path.
 *
 * For URL-based providers (fetchStrategy: "url"):
 *   Fetches the new CRD file list from GitHub and updates crd-generate.input.
 *   Requires GITHUB_TOKEN for higher API rate limits (optional but recommended).
 */

import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { Octokit } from "@octokit/rest";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import humanId from "human-id";

export const rootDir = join(__dirname, "..");

export interface ProviderMetadata {
  repository: string;
  version: string;
  crdDir: string;
  fetchStrategy: "clone" | "url";
}

export function normalizeTag(tag: string): string {
  return tag.startsWith("v") ? tag : `v${tag}`;
}

export function normalizeVersion(tag: string): string {
  return tag.startsWith("v") ? tag.slice(1) : tag;
}

export async function fetchCRDUrls(
  octokit: Octokit,
  repo: string,
  tag: string,
  crdDir: string
): Promise<string[]> {
  const [owner, repoName] = repo.split("/");
  const allFiles: any[] = [];
  let page = 1;

  while (true) {
    const { data } = await octokit.repos.getContent({
      owner,
      repo: repoName,
      path: crdDir,
      ref: tag,
      per_page: 100,
      page
    });
    if (!Array.isArray(data) || data.length === 0) break;
    allFiles.push(...data);
    if (data.length < 100) break;
    page++;
  }

  return allFiles
    .filter(
      (f) =>
        f.type === "file" &&
        (f.name.endsWith(".yaml") || f.name.endsWith(".yml"))
    )
    .map(
      (f) =>
        `https://raw.githubusercontent.com/${owner}/${repoName}/${tag}/${crdDir}/${f.name}`
    )
    .sort();
}

export async function updateProvider(
  name: string,
  organization: string,
  newVersion: string
): Promise<boolean> {
  const tag = normalizeTag(newVersion);
  const pkgPath = join(rootDir, "models", organization, name, "package.json");
  const pkgContent = JSON.parse(await readFile(pkgPath, "utf8"));

  const metadata: ProviderMetadata = pkgContent["crossplane-provider"];
  if (!metadata) {
    throw new Error(
      `Package ${name} is missing a "crossplane-provider" metadata field. ` +
        `Add it to ${pkgPath} before using this script.`
    );
  }

  const oldTag = metadata.version;
  if (oldTag === tag) {
    console.log(`${name} is already at ${tag} — nothing to do.`);
    return false;
  }

  console.log(`Updating ${name}: ${oldTag} → ${tag}`);

  pkgContent["crossplane-provider"].version = tag;
  pkgContent.version = `${normalizeVersion(tag)}-build.1`;

  if (metadata.fetchStrategy === "clone") {
    if (pkgContent.scripts?.prebuild) {
      pkgContent.scripts.prebuild = pkgContent.scripts.prebuild.replace(
        new RegExp(`--ref\\s+${oldTag}`, "g"),
        `--ref ${tag}`
      );
    }
    pkgContent["crd-generate"].input = [`./.cache/${tag}/crds/*.yaml`];
  } else {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    console.log(
      `Fetching CRD URLs for ${metadata.repository}@${tag} from GitHub...`
    );
    const urls = await fetchCRDUrls(
      octokit,
      metadata.repository,
      tag,
      metadata.crdDir
    );
    if (urls.length === 0) {
      throw new Error(
        `No CRD files found at ${metadata.repository}@${tag}/${metadata.crdDir}`
      );
    }
    console.log(`  Found ${urls.length} CRD URLs`);
    pkgContent["crd-generate"].input = urls;
  }

  await writeFile(pkgPath, JSON.stringify(pkgContent, null, "  ") + "\n");

  const changesetId = humanId({ separator: "-", capitalize: false });
  const changesetPath = join(rootDir, ".changeset", `${changesetId}.md`);
  await writeFile(
    changesetPath,
    `---
"@crossplane-models/${name}": patch
---

Update to upstream ${name} ${tag}.
`
  );

  console.log(`✓ Updated ${name} to ${tag}`);
  console.log(`  Changeset: .changeset/${changesetId}.md`);
  return true;
}

if (require.main === module) {
  (async () => {
    const args = await yargs(hideBin(process.argv))
      .version(false)
      .option("name", {
        type: "string",
        demandOption: true,
        description: "Provider package name (e.g., provider-upjet-azure)",
        alias: "n"
      })
      .option("organization", {
        type: "string",
        default: "crossplane-contrib",
        description: "Organization directory under models/",
        alias: "o"
      })
      .option("version", {
        type: "string",
        demandOption: true,
        description: "New upstream version tag (e.g., v2.6.0 or 2.6.0)",
        alias: "v"
      })
      .example(
        "$0 --name provider-upjet-azure --version v2.6.0",
        "Update Azure provider to v2.6.0"
      )
      .example(
        "$0 -n provider-kubernetes -v v1.3.0",
        "Update Kubernetes provider to v1.3.0"
      )
      .help()
      .parse();

    await updateProvider(args.name, args.organization, args.version);
  })().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
