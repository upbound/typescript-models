# Crossplane Typescript Models

[![](https://img.shields.io/npm/v/kubernetes-models.svg)](https://www.npmjs.com/package/crossplane-models) ![Test](https://github.com/upbound/typescript-models/workflows/Test/badge.svg)

This repository generates Typescript models generated from the Kubernetes Custom Resource Definitions used by Crossplane and the Provider ecosystem.

## Installation

Install with npm. The core Crossplane models are located at:

```sh
npm install @crossplane-models/crossplane
```

Provider models are also generated from this repository. See [Models](# Models) for supported providers.

```sh
npm install @crossplane-models/provider-upjet-aws
```

## Usage

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Composition } from "@crossplane-models/crossplane/apiextensions.crossplane.io/v1";

const composition = new Composition({
    metadata: {
        name: "my-composition",
        labels: {
            "purpose": "example",
        },
    },
    spec: {
        compositeTypeRef: {
            apiVersion: "example.com/v1alpha1",
            kind: "XDatabase",
        },
        mode: "Pipeline",
    },
});

composition.validate();
console.log(dumpYaml(composition));

```

## Models

| CRD Source | NPM link | Local Source |
| --- | --- | --- |
| [crossplane](https://github.com/crossplane/crossplane) | [@crossplane-models/crossplane](https://www.npmjs.com/package/@crossplane-models/crossplane) | [models/crossplane/crossplane](models/crossplane/crossplane/) |
| [provider-upjet-aws](https://github.com/crossplane-contrib/provider-upjet-aws) | [@crossplane-models/provider-upjet-aws](https://www.npmjs.com/package/@crossplane-models/provider-upjet-aws) | [models/crossplane-contrib/provider-upjet-aws](models/crossplane-contrib/provider-upjet-aws/) |
| [provider-upjet-azure](https://github.com/crossplane-contrib/provider-upjet-azure) | [@crossplane-models/provider-upjet-azure](https://www.npmjs.com/package/@crossplane-models/provider-upjet-azure) | [models/crossplane-contrib/provider-upjet-azure](models/crossplane-contrib/provider-upjet-azure/) |
| [provider-upjet-azuread](https://github.com/crossplane-contrib/provider-upjet-azuread) | [@crossplane-models/provider-upjet-azuread](https://www.npmjs.com/package/@crossplane-models/provider-upjet-azuread) | [models/crossplane-contrib/provider-upjet-azuread](models/crossplane-contrib/provider-upjet-azuread/) |
| [provider-upjet-gcp](https://github.com/crossplane-contrib/provider-upjet-gcp) | [@crossplane-models/provider-upjet-gcp](https://www.npmjs.com/package/@crossplane-models/provider-upjet-gcp) | [models/crossplane-contrib/provider-upjet-gcp](models/crossplane-contrib/provider-upjet-gcp/) |
| [provider-kubernetes](https://github.com/crossplane-contrib/provider-kubernetes) | [@crossplane-models/provider-kubernetes](https://www.npmjs.com/package/@crossplane-models/provider-kubernetes) | [models/crossplane-contrib/provider-kubernetes](models/crossplane-contrib/provider-kubernetes/) |
| [provider-helm](https://github.com/crossplane-contrib/provider-helm) | [@crossplane-models/provider-helm](https://www.npmjs.com/package/@crossplane-models/provider-helm) | [models/crossplane-contrib/provider-helm](models/crossplane-contrib/provider-helm/) |


## License

Generation tools forked from Upstream are released under MIT.

The Models are released under Apache-2.0 to match the Crossplane project.
