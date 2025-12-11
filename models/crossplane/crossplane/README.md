# Typescript Models for Crossplane <!-- omit from toc -->

This model contains the core Crossplane CRDs defined at <https://github.com/crossplane/crossplane/tree/main/cluster/crds>.

Resources `CompositionRevision`, `ConfigurationRevision`, `FunctionRevision`,`PackageRevision`, and `Lock` are actively managed by Crossplane and generally should not be modified by users.

- [Installation](#installation)
  - [NPM](#npm)
- [Examples](#examples)
  - [apiextensions.crossplane.io](#apiextensionscrossplaneio)
    - [Composition](#composition)
    - [CompositionRevision](#compositionrevision)
    - [CompositeResourceDefinition (XRD)](#compositeresourcedefinition-xrd)
    - [EnvironmentConfig](#environmentconfig)
    - [ManagedResourceActivationPolicy](#managedresourceactivationpolicy)
    - [ManagedResourceDefinition](#managedresourcedefinition)
  - [ops.crossplane.io](#opscrossplaneio)
    - [CronOperation](#cronoperation)
    - [Operation](#operation)
    - [WatchOperation](#watchoperation)
  - [pkg.crossplane.io](#pkgcrossplaneio)
    - [Configuration](#configuration)
    - [ConfigurationRevision](#configurationrevision)
    - [DeploymentRuntimeConfig](#deploymentruntimeconfig)
    - [Function](#function)
    - [FunctionRevision](#functionrevision)
    - [ImageConfig](#imageconfig)
    - [Lock](#lock)
    - [Provider](#provider)
    - [ProviderRevision](#providerrevision)
  - [protection.crossplane.io](#protectioncrossplaneio)
    - [ClusterUsage](#clusterusage)
    - [Usage](#usage)
- [Validation](#validation)

## Installation

### NPM

```shell
npm install @crossplane-models/crossplane
```

## Examples

### apiextensions.crossplane.io

#### Composition

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

#### CompositionRevision

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { CompositionRevision } from "@crossplane-models/crossplane/apiextensions.crossplane.io/v1";

const compositionRevision = new CompositionRevision({
    metadata: {
        name: "my-composition-abc123",
        labels: {
            "crossplane.io/composition-name": "my-composition",
        },
    },
    spec: {
        compositeTypeRef: {
            apiVersion: "example.com/v1alpha1",
            kind: "XDatabase",
        },
        revision: 1,
    },
});

compositionRevision.validate();
console.log(dumpYaml(compositionRevision));
```

#### CompositeResourceDefinition (XRD)

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { CompositeResourceDefinition } from "@crossplane-models/crossplane/apiextensions.crossplane.io/v1";

const xrd = new CompositeResourceDefinition({
    metadata: {
        name: "xdatabases.example.com",
    },
    spec: {
        group: "example.com",
        names: {
            kind: "XDatabase",
            plural: "xdatabases",
        },
        versions: [{
            name: "v1alpha1",
            served: true,
            referenceable: true,
        }],
    },
});

xrd.validate();
console.log(dumpYaml(xrd));
```

#### EnvironmentConfig

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { EnvironmentConfig } from "@crossplane-models/crossplane/apiextensions.crossplane.io/v1beta1";

const envConfig = new EnvironmentConfig({
    metadata: {
        name: "production-config",
    },
    data: {
        "region": "us-west-2",
        "environment": "production",
    },
});

envConfig.validate();
console.log(dumpYaml(envConfig));
```

#### ManagedResourceActivationPolicy

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { ManagedResourceActivationPolicy } from "@crossplane-models/crossplane/apiextensions.crossplane.io/v1alpha1";

const activationPolicy = new ManagedResourceActivationPolicy({
    metadata: {
        name: "mr-activation-policy",
    },
    spec: {
        activate: ["*.aws.crossplane.io"],
    },
});

activationPolicy.validate();
console.log(dumpYaml(activationPolicy));
```

#### ManagedResourceDefinition

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { ManagedResourceDefinition } from "@crossplane-models/crossplane/apiextensions.crossplane.io/v1alpha1";

const mrd = new ManagedResourceDefinition({
    metadata: {
        name: "buckets.s3.aws.example.com",
    },
    spec: {
        group: "s3.aws.example.com",
        scope: "Cluster",
        names: {
            kind: "Bucket",
            plural: "buckets",
        },
        versions: [{
            name: "v1alpha1",
            served: true,
            storage: true,
        }],
    },
});

mrd.validate();
console.log(dumpYaml(mrd));
```

### ops.crossplane.io

#### CronOperation

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { CronOperation } from "@crossplane-models/crossplane/ops.crossplane.io/v1alpha1";

const cronOp = new CronOperation({
    metadata: {
        name: "scheduled-upgrade",
    },
    spec: {
        schedule: "0 2 * * *",
        operationTemplate: {
            spec: {
                mode: "Pipeline",
                pipeline: [{
                    step: "upgrade",
                    functionRef: {
                        name: "function-upgrade",
                    },
                }],
            },
        },
    },
});

cronOp.validate();
console.log(dumpYaml(cronOp));
```

#### Operation

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Operation } from "@crossplane-models/crossplane/ops.crossplane.io/v1alpha1";

const operation = new Operation({
    metadata: {
        name: "upgrade-operation",
    },
    spec: {
        mode: "Pipeline",
        pipeline: [{
            step: "upgrade",
            functionRef: {
                name: "function-upgrade",
            },
        }],
    },
});

operation.validate();
console.log(dumpYaml(operation));
```

#### WatchOperation

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { WatchOperation } from "@crossplane-models/crossplane/ops.crossplane.io/v1alpha1";

const watchOp = new WatchOperation({
    metadata: {
        name: "watch-provider-changes",
    },
    spec: {
        watch: {
            apiVersion: "pkg.crossplane.io/v1",
            kind: "Provider",
        },
        operationTemplate: {
            spec: {
                mode: "Pipeline",
                pipeline: [{
                    step: "upgrade",
                    functionRef: {
                        name: "function-upgrade",
                    },
                }],
            },
        },
    },
});

watchOp.validate();
console.log(dumpYaml(watchOp));
```

### pkg.crossplane.io

#### Configuration

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Configuration } from "@crossplane-models/crossplane/pkg.crossplane.io/v1";

const config = new Configuration({
    metadata: {
        name: "platform-ref-aws",
    },
    spec: {
        package: "xpkg.upbound.io/upbound/platform-ref-aws:v2.0.0",
        packagePullPolicy: "IfNotPresent",
    },
});

config.validate();
console.log(dumpYaml(config));
```

#### ConfigurationRevision

ConfigurationRevisions are managed by Crossplane.

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { ConfigurationRevision } from "@crossplane-models/crossplane/pkg.crossplane.io/v1";

const configRevision = new ConfigurationRevision({
    metadata: {
        name: "platform-ref-aws-abc123",
    },
    spec: {
        desiredState: "Active",
        image: "xpkg.upbound.io/upbound/platform-ref-aws:v2.0.0",
        revision: 1,
    },
});

configRevision.validate();
console.log(dumpYaml(configRevision));
```

#### DeploymentRuntimeConfig

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { DeploymentRuntimeConfig } from "@crossplane-models/crossplane/pkg.crossplane.io/v1beta1";

const drc = new DeploymentRuntimeConfig({
    metadata: {
        name: "drc-example",
    },
    spec: {
        serviceAccountTemplate: {
            metadata: {
                name: "my-service-account",
                labels: {
                    "hello": "world",
                },
            },
        },
    },
});

drc.validate();
console.log(dumpYaml(drc));
```

#### Function

Note that `Function` can cause conflicts with other Typescript types. Import it under a different name, like `CrossplaneFunction`.

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Function as CrossplaneFunction } from "@crossplane-models/crossplane/pkg.crossplane.io/v1";

const fn = new CrossplaneFunction({
    metadata: {
        name: "function-patch-and-transform",
    },
    spec: {
        package: "xpkg.upbound.io/crossplane-contrib/function-patch-and-transform:v0.1.4",
    },
});

fn.validate();
console.log(dumpYaml(fn));
```

#### FunctionRevision

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { FunctionRevision } from "@crossplane-models/crossplane/pkg.crossplane.io/v1";

const fnRevision = new FunctionRevision({
    metadata: {
        name: "function-patch-and-transform-abc123",
    },
    spec: {
        desiredState: "Active",
        image: "xpkg.upbound.io/crossplane-contrib/function-patch-and-transform:v0.1.4",
        revision: 1,
    },
});

fnRevision.validate();
console.log(dumpYaml(fnRevision));
```

#### ImageConfig

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { ImageConfig } from "@crossplane-models/crossplane/pkg.crossplane.io/v1beta1";

const imageConfig = new ImageConfig({
    metadata: {
        name: "private-registry-config",
    },
    spec: {
        matchImages: [{
            prefix: "private.registry.example.com",
        }],
    },
});

imageConfig.validate();
console.log(dumpYaml(imageConfig));
```

#### Lock

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Lock } from "@crossplane-models/crossplane/pkg.crossplane.io/v1beta1";

const lock = new Lock({
    metadata: {
        name: "package-lock",
    },
    packages: [{
        name: "provider-aws",
        type: "Provider",
        source: "xpkg.upbound.io/upbound/provider-aws",
        version: "v0.34.0",
        dependencies: [],
    }],
});

lock.validate();
console.log(dumpYaml(lock));
```

#### Provider

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Provider } from "@crossplane-models/crossplane/pkg.crossplane.io/v1";

const provider = new Provider({
    metadata: {
        name: "provider-aws",
    },
    spec: {
        package: "xpkg.upbound.io/upbound/provider-aws:v2.3.0",
        packagePullPolicy: "IfNotPresent",
    },
});

provider.validate();
console.log(dumpYaml(provider));
```

#### ProviderRevision

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { ProviderRevision } from "@crossplane-models/crossplane/pkg.crossplane.io/v1";

const providerRevision = new ProviderRevision({
    metadata: {
        name: "provider-aws-abc123",
    },
    spec: {
        desiredState: "Active",
        image: "xpkg.upbound.io/upbound/provider-aws:v2.3.0",
        revision: 1,
    },
});

providerRevision.validate();
console.log(dumpYaml(providerRevision));
```

### protection.crossplane.io

#### ClusterUsage

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { ClusterUsage } from "@crossplane-models/crossplane/protection.crossplane.io/v1beta1";

const clusterUsage = new ClusterUsage({
    metadata: {
        name: "cluster-database-usage",
    },
    spec: {
        of: {
            apiVersion: "example.com/v1alpha1",
            kind: "Database",
            resourceRef: {
                name: "my-cluster-database",
            },
        },
        by: {
            apiVersion: "example.com/v1alpha1",
            kind: "Application",
            resourceRef: {
                name: "my-cluster-app",
            },
        },
    },
});

clusterUsage.validate();
console.log(dumpYaml(clusterUsage));
```

#### Usage

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Usage } from "@crossplane-models/crossplane/protection.crossplane.io/v1beta1";

const usage = new Usage({
    metadata: {
        name: "database-usage",
        namespace: "default",
    },
    spec: {
        of: {
            apiVersion: "example.com/v1alpha1",
            kind: "Database",
            resourceRef: {
                name: "my-database",
            },
        },
        by: {
            apiVersion: "example.com/v1alpha1",
            kind: "Application",
            resourceRef: {
                name: "my-app",
            },
        },
    },
});

usage.validate();
console.log(dumpYaml(usage));
```

## Validation

All models include built-in JSON Schema validation. Call `.validate()` on any instance to validate against the Crossplane CRD schema. Validation will throw an error if the object doesn't match the schema.
