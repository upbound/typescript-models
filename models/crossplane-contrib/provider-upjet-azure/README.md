# @crossplane-models/provider-upjet-azure

TypeScript models generated from the [provider-upjet-azure](https://github.com/crossplane-contrib/provider-upjet-azure) Crossplane provider CRDs.

## Installation

```sh
npm install @crossplane-models/provider-upjet-azure
```

## Usage

```typescript
import { ResourceGroup } from "@crossplane-models/provider-upjet-azure/azure.upbound.io/v1beta1";

const rg = new ResourceGroup({
  metadata: {
    name: "my-resource-group",
  },
  spec: {
    forProvider: {
      location: "East US",
    },
  },
});

rg.validate();
```

## License

Apache-2.0
