# Contributing

## Getting Started

Download dependencies.

```sh
pnpm install
```

## Developing

Build TypeScript files.

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

Create a new CRD package.

```sh
pnpm run new-crd-package \
  --name 'pkg-name' \
  --organization 'organization' \
  --description 'Package description' \
  --author 'John Doe <john.doe@gmail.com>'
```

Update workspaces.

```sh
pnpm install
```

Add input paths to `crd-generate.input` in `package.json`.

### Option 1: Manually add CRD URLs

```js
{
  "crd-generate": {
    "input": [
      // Download CRD from a URL
      "https://example.com/manifest.yaml",
      // Or use a local file.
      "./path/to/file.yaml"
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

Build TypeScript files.

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
