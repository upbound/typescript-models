# Contributing

Typescript models are generated from Kubernetes CRDs. This document is a guide to adding a provider to the repo.

Models are stored in the [models](models) directory, separated by organization.

## Prerequisites

- [pnpm](https://pnpm.io/installation) for package management and running builds.
- [turbo](https://turborepo.com/docs/getting-started/installation) for parallel builds.

## Getting Started

Download dependencies in the [`package.json`](package.json) file:

```sh
pnpm install
```

## Developing

Clean build files and install packages:

```sh
pnpm run clean
pnpm run install
```

Build TypeScript files and the Provider Models:

```sh
pnpm run build
```

Delete built files.

```sh
pnpm run clean
```

## Testing

Run unit tests. Testing files are located at `__tests__` folder in each package.

```sh
pnpm test
```

## Linting

Lint TypeScript and JavaScript files.

```sh
pnpm run lint
```

## Adding a New CRD Package

Create a new CRD package. This will create a Typescript project under `models/organization/name`:

```sh
pnpm run new-crd-package \
  --name 'pkg-name' \
  --organization 'organization' \
  --description 'Package description' \
  --author 'John Doe <john.doe@gmail.com>'
```

### Updating the Project File

Every provider has a `package.json` file that contains information about the model and a list of the CRDs that will be used to generate Typescript types.

Verify fields like `name`, `version`, `repository`, `homepage`, and `author`.

The `input` field of `crd-generate` contains a list of URLs or local CRD files.

```json
{
  "name": "@crossplane-models/provider-upjet-azuread",
  "version": "2.2.0-build.2",
  "description": "Azure AD Provider",
  "repository": {
    "type": "git",
    "url": "https://github.com/upbound/typescript-models.git"
  },
  "homepage": "https://github.com/upbound/typescript-models/tree/master/models/crossplane-contrib/provider-upjet-azuread",
  "author": "Crossplane Maintainers <info@crossplane.io>",
  "license": "Apache-2.0",
  "main": "index.js",
  "module": "index.mjs",
  "types": "index.d.ts",
  "sideEffects": false,
  "scripts": {
    "build": "crd-generate && publish-scripts build",
    "prepack": "publish-scripts prepack"
  },
  "publishConfig": {
    "access": "public",
    "directory": "dist",
    "linkDirectory": true
  },
  "keywords": [
    "kubernetes",
    "kubernetes-models",
    "provider-upjet-azuread"
  ],
  "engines": {
    "node": ">=14"
  },
  "dependencies": {
    "@kubernetes-models/apimachinery": "2.2.0",
    "@kubernetes-models/base": "5.0.1",
    "@kubernetes-models/validate": "4.0.0",
    "@swc/helpers": "^0.5.8"
  },
  "devDependencies": {
    "@kubernetes-models/crd-generate": "workspace:^",
    "@kubernetes-models/publish-scripts": "workspace:^",
    "vitest": "^4.0.15"
  },
  "crd-generate": {
    "input": [
      "list of urls or files..."
    ],
    "output": "./gen"
  }
}
```

There are several ways to populate `crd-generate`:

- Manually adding the values.
- Using the [`fetch-github-crds.ts`](./scripts/fetch-github-crds.ts) to create a list from a git repo on the web.
- Cloning the repo locally using the [`clone-crds.ts`](./scripts/clone-crds.ts), which is useful when the repository has over 1,000 CRDs.

### Option 1: Manually add CRD URLs

The easiest option is adds the URLs or files manually.

Github URLs should point either to the raw content of the file and use a tag reference.

Local CRDs files should be in stored in the repository under the same directory as the provider project.

The generated models will be created in the `gen` directory.

```js
{
  "crd-generate": {
    "input": [
      // Download CRD from a URL pointing to a tag
      "https://raw.githubusercontent.com/crossplane/crossplane/refs/tags/v2.1.3/cluster/crds/apiextensions.crossplane.io_compositeresourcedefinitions.yaml",
      // Or use a local file.
      "./cache/v.2.2.0/crds/xray.aws.upbound.io_samplingrules.yaml"
    ],
    "output": "./gen"
  }
}
```

### Option 2: Fetch CRD URLs from GitHub

Use the `fetch-github-crds` script to automatically fetch all CRD file URLs from a GitHub repository:

```sh
# Fetch CRD files from a GitHub repository
pnpm fetch-github-crds --url "https://github.com/owner/repo/tree/ref/path/to/crds"

# Example: Fetch from crossplane-contrib/provider-upjet-aws
pnpm fetch-github-crds --url "https://github.com/crossplane-contrib/provider-upjet-aws/tree/main/package/crds"

# Specify a custom output file
pnpm fetch-github-crds --url "https://github.com/owner/repo/tree/ref/path" --output my-crds.json
```

This will generate a JSON file containing an array of URLs that you can copy directly into your `package.json`'s `crd-generate.input` field.

**Optional:** For higher GitHub API rate limits (60 requests/hour → 5000 requests/hour), set a GitHub token:

```sh
export GITHUB_TOKEN="your-token-here"
```

### Option 3: Clone CRDs from GitHub (Recommended for >1000 CRDs)

For repositories with more than 1,000 CRD files, use the `clone-crds` script which clones only the CRD directory using git sparse checkout:

```sh
# Clone CRDs from a GitHub repository
npx ts-node scripts/clone-crds.ts \
  -r https://github.com/crossplane-contrib/provider-upjet-aws \
  -n provider-upjet-aws \
  --ref v2.2.0

# Clone and generate JSON file with CRD URLs
npx ts-node scripts/clone-crds.ts \
  -r https://github.com/crossplane-contrib/provider-upjet-aws \
  -n provider-upjet-aws \
  --ref v2.2.0 \
  --output crd-urls.json
```

This will:

1. Clone only the CRD directory from the repository (efficient for large repos)
2. Copy CRDs to `models/{organization}/{name}/.cache/{ref}/crds`
3. Optionally generate a JSON file with relative paths (if `--output` is specified)

The generated JSON file will contain relative paths like `./.cache/v2.2.0/crds/file.yaml` that can be directly copied to your `package.json`'s `crd-generate.input` field.

**Options:**

- `-r, --repository`: Git repository URL (required)
- `-n, --name`: Package name (required)
- `-o, --organization`: Organization/namespace (default: "crossplane-contrib")
- `--ref`: Git reference - branch, tag, or commit (default: "HEAD")
- `--dir`: Path to CRDs directory in repo (default: "package/crds")
- `--output`: Output JSON file with CRD URLs (optional)

### Build TypeScript Files

```sh
pnpm run build
```

Finally, add a `README.md` and tests. Please follow other CRD packages mentioned in [readme](README.md#3rd-party-models).

## Changeset

Run the command below and follow the instructions to create a changeset. A changeset should describes packages that have been modified and change information. These information will be added to the changelog once packages are released.

If you're creating a new CRD package using `new-crd-package` script, a changeset will be created automatically, so you can skip this step.

```sh
pnpm changeset
```

For more information, see [using changesets](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md).

## Style Guides

### Git Commit Messages

Please follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).

### Code Formatting

We use [Prettier](https://prettier.io/) to format all the code.
