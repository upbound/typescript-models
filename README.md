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
| [provider-upjet-azuread](https://github.com/crossplane-contrib/provider-upjet-azuread) | [@crossplane-models/provider-upjet-azuread](https://www.npmjs.com/package/@crossplane-models/provider-upjet-azuread) | [models/crossplane-contrib/provider-upjet-azuread](models/crossplane-contrib/provider-upjet-azuread/) |
| [provider-upjet-aws](https://github.com/crossplane-contrib/provider-upjet-aws) | [@crossplane-models/provider-upjet-aws](https://www.npmjs.com/package/@crossplane-models/provider-upjet-aws) | [models/crossplane-contrib/provider-upjet-aws](models/crossplane-contrib/provider-upjet-aws/) |


## License

Generation tools forked from Upstream are released under MIT.

The Models are released under Apache-2.0 to match the Crossplane project.
