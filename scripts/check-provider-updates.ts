/**
 * Check all Crossplane provider packages for upstream version updates.
 *
 * Scans models/** for packages with a "crossplane-provider" metadata field,
 * queries the GitHub Releases API for each, and automatically updates any
 * that are behind the latest stable release.
 *
 * A changeset is created for every updated package so the release workflow
 * picks up the changes automatically.
 *
 * Usage:
 *   GITHUB_TOKEN=<token> ts-node scripts/check-provider-updates.ts
 *
 * Exit codes:
 *   0  — all providers are up to date (or no providers found)
 *   1  — one or more providers were updated (CI should create a PR)
 */

import { readFile } from "fs/promises";
import { join } from "path";
import fg from "fast-glob";
import { Octokit } from "@octokit/rest";
import {
  rootDir,
  ProviderMetadata,
  normalizeTag,
  updateProvider
} from "./update-provider";

async function getLatestRelease(
  octokit: Octokit,
  repo: string
): Promise<string | null> {
  const [owner, repoName] = repo.split("/");
  try {
    const { data } = await octokit.repos.getLatestRelease({
      owner,
      repo: repoName
    });
    return data.tag_name;
  } catch (err: any) {
    if (err.status === 404) {
      console.warn(`  No releases found for ${repo} — skipping`);
      return null;
    }
    throw err;
  }
}

(async () => {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const pkgFiles = await fg("models/**/package.json", {
    cwd: rootDir,
    ignore: ["**/dist/**", "**/node_modules/**"]
  });

  const updatedPackages: string[] = [];

  for (const pkgFile of pkgFiles.sort()) {
    const content = JSON.parse(await readFile(join(rootDir, pkgFile), "utf8"));

    const metadata: ProviderMetadata | undefined =
      content["crossplane-provider"];
    if (!metadata) continue;

    const parts = pkgFile.split("/");
    const organization = parts[1];
    const name = parts[2];

    console.log(`Checking ${content.name}...`);
    const latestTag = await getLatestRelease(octokit, metadata.repository);
    if (!latestTag) continue;

    const normalizedLatest = normalizeTag(latestTag);
    const normalizedCurrent = normalizeTag(metadata.version);

    if (normalizedLatest === normalizedCurrent) {
      console.log(`  up to date (${metadata.version})`);
      continue;
    }

    console.log(`  update available: ${metadata.version} → ${latestTag}`);
    await updateProvider(name, organization, latestTag);
    updatedPackages.push(`${content.name}: ${metadata.version} → ${latestTag}`);
  }

  if (updatedPackages.length === 0) {
    console.log("\nAll providers are up to date.");
    process.exit(0);
  }

  console.log(`\nUpdated ${updatedPackages.length} provider(s):`);
  for (const entry of updatedPackages) {
    console.log(`  ${entry}`);
  }

  // Exit 1 so the CI workflow knows to create a PR
  process.exit(1);
})().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
