# Crossplane Typescript Models

[![](https://img.shields.io/npm/v/kubernetes-models.svg)](https://www.npmjs.com/package/kubernetes-models) ![Test](https://github.com/tommy351/kubernetes-models-ts/workflows/Test/badge.svg)

Kubernetes models in TypeScript.

## Installation

Install with npm.

```sh
npm install crossplane-models
```

## Usage

```typescript
mport { dumpYaml } from "@kubernetes/client-node";
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

## Core Crossplane

- [@crossplane-models/crossplane](models/crossplane/crossplane/) - Types for Core Crossplane objects.

## License

Generation tools forked from Upstream are released under MIT.

The Models are released under Apache-2.0 to match the Crossplane project.
