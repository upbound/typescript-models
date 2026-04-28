# @crossplane-models/provider-kubernetes

TypeScript models generated from the [provider-kubernetes](https://github.com/crossplane-contrib/provider-kubernetes) Crossplane provider CRDs.

## Installation

```sh
npm install @crossplane-models/provider-kubernetes
```

## Usage

```typescript
import { Object as KubernetesObject } from "@crossplane-models/provider-kubernetes/kubernetes.crossplane.io/v1alpha2";

const obj = new KubernetesObject({
  metadata: {
    name: "my-k8s-object",
  },
  spec: {
    forProvider: {
      manifest: {
        apiVersion: "v1",
        kind: "ConfigMap",
        metadata: { name: "my-config" },
      },
    },
  },
});

obj.validate();
```

## License

Apache-2.0
