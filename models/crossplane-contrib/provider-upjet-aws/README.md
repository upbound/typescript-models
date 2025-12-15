# TypeScript Models for Crossplane Provider Upjet AWS <!-- omit from toc -->

This package contains TypeScript models for the [Crossplane Provider Upjet AWS](https://github.com/crossplane-contrib/provider-upjet-aws), which provides Crossplane support for managing AWS resources.

The models are generated from the CRDs defined in the provider's [package/crds](https://github.com/crossplane-contrib/provider-upjet-aws/tree/main/package/crds) directory.

- [Installation](#installation)
  - [NPM](#npm)
- [Crossplane v2 Namespaced Resources](#crossplane-v2-namespaced-resources)
- [Examples](#examples)
  - [Provider Configuration](#provider-configuration)
    - [ProviderConfig](#providerconfig)
- [Example Manifests](#example-manifests)
  - [EKS (Elastic Kubernetes Service)](#eks-elastic-kubernetes-service)
    - [EKS Cluster](#eks-cluster)
    - [EKS Node Group](#eks-node-group)
    - [EKS Fargate Profile](#eks-fargate-profile)
    - [EKS Addon](#eks-addon)
  - [S3 (Simple Storage Service)](#s3-simple-storage-service)
    - [S3 Bucket](#s3-bucket)
    - [S3 Bucket Policy](#s3-bucket-policy)
    - [S3 Bucket Public Access Block](#s3-bucket-public-access-block)
    - [S3 Object](#s3-object)
  - [EC2 (Elastic Compute Cloud)](#ec2-elastic-compute-cloud)
    - [VPC](#vpc)
    - [Subnet](#subnet)
    - [Security Group](#security-group)
    - [EC2 Instance](#ec2-instance)
    - [Internet Gateway](#internet-gateway)
    - [Route Table](#route-table)
- [Validation](#validation)
- [Regenerating the list of CRDs](#regenerating-the-list-of-crds)

## Installation

### NPM

```shell
npm install @crossplane-models/provider-upjet-aws
```

## Crossplane v2 Namespaced Resources

Crossplane versions 2.0.0 and newer support Namespaced Managed Resources. These Resources have an `.m` in the apiGroup as in the following examples:

Namespaced-scoped: `eks.aws.m.upbound.io`
Cluster-scoped: `eks.aws.upbound.io`

## Examples

The following section contains Typescript examples.

The Upbound Marketplace contains more example manifests at [provider-upjet-aws](https://marketplace.upbound.io/providers/upbound/provider-family-aws/v2.3.0#providers)

### Provider Configuration

#### ProviderConfig

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { ProviderConfig } from "@crossplane-models/provider-upjet-aws/aws.upbound.io/v1beta1";

const providerConfig = new ProviderConfig({
  metadata: {
    name: "default"
  },
  spec: {
    credentials: {
      source: "Secret",
      secretRef: {
        name: "aws-creds",
        namespace: "crossplane-system",
        key: "credentials"
      }
    }
  }
});

providerConfig.validate();
console.log(dumpYaml(providerConfig));
```

## Example Manifests

### EKS (Elastic Kubernetes Service)

#### EKS Cluster

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Cluster } from "@crossplane-models/provider-upjet-aws/eks.aws.m.upbound.io/v1beta1";

const cluster = new Cluster({
  metadata: {
    name: "my-eks-cluster",
    namespace: "team-a"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      roleArnSelector: {
        matchLabels: {
          role: "eks-cluster"
        }
      },
      vpcConfig: {
        subnetIdSelector: {
          matchLabels: {
            type: "private"
          }
        }
      }
    }
  }
});

cluster.validate();
console.log(dumpYaml(cluster));
```

#### EKS Node Group

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { NodeGroup } from "@crossplane-models/provider-upjet-aws/eks.aws.m.upbound.io/v1beta1";

const nodeGroup = new NodeGroup({
  metadata: {
    name: "my-node-group"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      clusterNameSelector: {
        matchLabels: {
          cluster: "my-eks"
        }
      },
      nodeRoleArnSelector: {
        matchLabels: {
          role: "eks-node"
        }
      },
      subnetIdSelector: {
        matchLabels: {
          type: "private"
        }
      },
      scalingConfig: {
        desiredSize: 3,
        maxSize: 5,
        minSize: 1
      }
    }
  }
});

nodeGroup.validate();
console.log(dumpYaml(nodeGroup));
```

#### EKS Fargate Profile

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { FargateProfile } from "@crossplane-models/provider-upjet-aws/eks.aws.m.upbound.io/v1beta1";

const fargateProfile = new FargateProfile({
  metadata: {
    name: "my-fargate-profile"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      clusterNameSelector: {
        matchLabels: {
          cluster: "my-eks"
        }
      },
      podExecutionRoleArnSelector: {
        matchLabels: {
          role: "fargate-pod-execution"
        }
      },
      selector: [
        {
          namespace: "fargate-namespace",
          labels: {
            app: "my-app"
          }
        }
      ],
      subnetIdSelector: {
        matchLabels: {
          type: "private"
        }
      }
    }
  }
});

fargateProfile.validate();
console.log(dumpYaml(fargateProfile));
```

#### EKS Addon

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Addon } from "@crossplane-models/provider-upjet-aws/eks.aws.m.upbound.io/v1beta1";

const addon = new Addon({
  metadata: {
    name: "vpc-cni-addon"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      addonName: "vpc-cni",
      clusterNameSelector: {
        matchLabels: {
          cluster: "my-eks"
        }
      },
      addonVersion: "v1.12.0-eksbuild.1",
      resolveConflicts: "OVERWRITE"
    }
  }
});

addon.validate();
console.log(dumpYaml(addon));
```

### S3 (Simple Storage Service)

#### S3 Bucket

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Bucket } from "@crossplane-models/provider-upjet-aws/s3.aws.m.upbound.io/v1beta1";

const bucket = new Bucket({
  metadata: {
    name: "my-s3-bucket"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      tags: {
        Environment: "production",
        Team: "platform"
      }
    }
  }
});

bucket.validate();
console.log(dumpYaml(bucket));
```

#### S3 Bucket Policy

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { BucketPolicy } from "@crossplane-models/provider-upjet-aws/s3.aws.m.upbound.io/v1beta1";

const bucketPolicy = new BucketPolicy({
  metadata: {
    name: "my-bucket-policy"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      bucketSelector: {
        matchLabels: {
          bucket: "my-s3-bucket"
        }
      },
      policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: {
              AWS: "arn:aws:iam::123456789012:root"
            },
            Action: "s3:GetObject",
            Resource: "arn:aws:s3:::my-bucket/*"
          }
        ]
      })
    }
  }
});

bucketPolicy.validate();
console.log(dumpYaml(bucketPolicy));
```

#### S3 Bucket Public Access Block

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { BucketPublicAccessBlock } from "@crossplane-models/provider-upjet-aws/s3.aws.m.upbound.io/v1beta1";

const publicAccessBlock = new BucketPublicAccessBlock({
  metadata: {
    name: "my-bucket-public-access-block"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      bucketSelector: {
        matchLabels: {
          bucket: "my-s3-bucket"
        }
      },
      blockPublicAcls: true,
      blockPublicPolicy: true,
      ignorePublicAcls: true,
      restrictPublicBuckets: true
    }
  }
});

publicAccessBlock.validate();
console.log(dumpYaml(publicAccessBlock));
```

#### S3 Object

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Object as S3Object } from "@crossplane-models/provider-upjet-aws/s3.aws.m.upbound.io/v1beta1";

const s3Object = new S3Object({
  metadata: {
    name: "my-s3-object"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      bucketSelector: {
        matchLabels: {
          bucket: "my-s3-bucket"
        }
      },
      key: "path/to/object.json",
      contentType: "application/json",
      source: "local-file.json"
    }
  }
});

s3Object.validate();
console.log(dumpYaml(s3Object));
```

### EC2 (Elastic Compute Cloud)

#### VPC

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { VPC } from "@crossplane-models/provider-upjet-aws/ec2.aws.m.upbound.io/v1beta1";

const vpc = new VPC({
  metadata: {
    name: "my-vpc"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      cidrBlock: "10.0.0.0/16",
      enableDnsHostnames: true,
      enableDnsSupport: true,
      tags: {
        Name: "my-vpc",
        Environment: "production"
      }
    }
  }
});

vpc.validate();
console.log(dumpYaml(vpc));
```

#### Subnet

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Subnet } from "@crossplane-models/provider-upjet-aws/ec2.aws.m.upbound.io/v1beta1";

const subnet = new Subnet({
  metadata: {
    name: "my-subnet"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      availabilityZone: "us-west-2a",
      cidrBlock: "10.0.1.0/24",
      vpcIdSelector: {
        matchLabels: {
          vpc: "my-vpc"
        }
      },
      mapPublicIpOnLaunch: true,
      tags: {
        Name: "my-public-subnet",
        Type: "public"
      }
    }
  }
});

subnet.validate();
console.log(dumpYaml(subnet));
```

#### Security Group

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { SecurityGroup } from "@crossplane-models/provider-upjet-aws/ec2.aws.m.upbound.io/v1beta1";

const securityGroup = new SecurityGroup({
  metadata: {
    name: "my-security-group"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      description: "Security group for web servers",
      vpcIdSelector: {
        matchLabels: {
          vpc: "my-vpc"
        }
      },
      tags: {
        Name: "web-sg",
        Environment: "production"
      }
    }
  }
});

securityGroup.validate();
console.log(dumpYaml(securityGroup));
```

#### EC2 Instance

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Instance } from "@crossplane-models/provider-upjet-aws/ec2.aws.m.upbound.io/v1beta1";

const instance = new Instance({
  metadata: {
    name: "my-ec2-instance"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      ami: "ami-0c55b159cbfafe1f0",
      instanceType: "t3.micro",
      subnetIdSelector: {
        matchLabels: {
          subnet: "my-subnet"
        }
      },
      vpcSecurityGroupIdSelector: {
        matchLabels: {
          sg: "my-security-group"
        }
      },
      tags: {
        Name: "my-web-server",
        Environment: "production"
      }
    }
  }
});

instance.validate();
console.log(dumpYaml(instance));
```

#### Internet Gateway

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { InternetGateway } from "@crossplane-models/provider-upjet-aws/ec2.aws.m.upbound.io/v1beta1";

const igw = new InternetGateway({
  metadata: {
    name: "my-internet-gateway"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      vpcIdSelector: {
        matchLabels: {
          vpc: "my-vpc"
        }
      },
      tags: {
        Name: "my-igw"
      }
    }
  }
});

igw.validate();
console.log(dumpYaml(igw));
```

#### Route Table

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { RouteTable } from "@crossplane-models/provider-upjet-aws/ec2.aws.m.upbound.io/v1beta1";

const routeTable = new RouteTable({
  metadata: {
    name: "my-route-table"
  },
  spec: {
    forProvider: {
      region: "us-west-2",
      vpcIdSelector: {
        matchLabels: {
          vpc: "my-vpc"
        }
      },
      tags: {
        Name: "public-route-table"
      }
    }
  }
});

routeTable.validate();
console.log(dumpYaml(routeTable));
```

## Validation

All models include built-in JSON Schema validation. Call `.validate()` on any instance to validate against the provider's CRD schema. Validation will throw an error if the object doesn't match the schema.

For more information about the AWS provider and available resources, see the [official provider documentation](https://marketplace.upbound.io/providers/upbound/provider-aws/latest).

## Regenerating the list of CRDs

Because provider-upjet-aws contains over 1,000 CRDs, it's more efficient to clone the repository to extract the files.

```shell
npx ts-node scripts/clone-crds.ts \
  -r https://github.com/crossplane-contrib/provider-upjet-aws \
  --organization crossplane-contrib \
  -n provider-upjet-aws \
  --ref v2.2.0 \
  --output provider-upjet-aws-crds.json
```

The generated JSON file will contain relative paths like `./.cache/v2.2.0/crds/file.yaml` that can be directly copied to your `package.json`'s `crd-generate.input` field.
