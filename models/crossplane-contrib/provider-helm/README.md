# @crossplane-models/provider-helm

TypeScript models generated from the [provider-helm](https://github.com/crossplane-contrib/provider-helm) Crossplane provider CRDs.

## Installation

```sh
npm install @crossplane-models/provider-helm
```

## Usage

```typescript
import { Release } from "@crossplane-models/provider-helm/helm.crossplane.io/v1beta1";

const release = new Release({
  metadata: {
    name: "my-helm-release",
  },
  spec: {
    forProvider: {
      chart: {
        name: "nginx",
        repository: "https://charts.bitnami.com/bitnami",
        version: "15.0.0",
      },
    },
  },
});

release.validate();
```

## License

Apache-2.0
