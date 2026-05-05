# @crossplane-models/provider-upjet-gcp

TypeScript models generated from the [provider-upjet-gcp](https://github.com/crossplane-contrib/provider-upjet-gcp) Crossplane provider CRDs.

## Installation

```sh
npm install @crossplane-models/provider-upjet-gcp
```

## Usage

```typescript
import { Bucket } from "@crossplane-models/provider-upjet-gcp/storage.gcp.upbound.io/v1beta1";

const bucket = new Bucket({
  metadata: {
    name: "my-gcs-bucket",
  },
  spec: {
    forProvider: {
      location: "US",
    },
  },
});

bucket.validate();
```

## License

Apache-2.0
