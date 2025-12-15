import { describe, it, expect, beforeEach } from "vitest";
import { Cluster } from "../gen/eks.aws.m.upbound.io/v1beta1/Cluster";
import { NodeGroup } from "../gen/eks.aws.m.upbound.io/v1beta1/NodeGroup";
import { FargateProfile } from "../gen/eks.aws.m.upbound.io/v1beta1/FargateProfile";
import { Addon } from "../gen/eks.aws.m.upbound.io/v1beta1/Addon";

describe("EKS Cluster", () => {
  let cluster: Cluster;

  beforeEach(() => {
    cluster = new Cluster({
      metadata: {
        name: "my-eks-cluster"
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
  });

  it("should set apiVersion", () => {
    expect(cluster).toHaveProperty(
      "apiVersion",
      "eks.aws.m.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(cluster).toHaveProperty("kind", "Cluster");
  });

  it("validate", () => {
    expect(() => cluster.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(cluster.toJSON()).toEqual({
      apiVersion: "eks.aws.m.upbound.io/v1beta1",
      kind: "Cluster",
      metadata: {
        name: "my-eks-cluster"
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
  });
});

describe("EKS NodeGroup", () => {
  let nodeGroup: NodeGroup;

  beforeEach(() => {
    nodeGroup = new NodeGroup({
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
  });

  it("should set apiVersion", () => {
    expect(nodeGroup).toHaveProperty(
      "apiVersion",
      "eks.aws.m.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(nodeGroup).toHaveProperty("kind", "NodeGroup");
  });

  it("validate", () => {
    expect(() => nodeGroup.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(nodeGroup.toJSON()).toEqual({
      apiVersion: "eks.aws.m.upbound.io/v1beta1",
      kind: "NodeGroup",
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
  });
});

describe("EKS FargateProfile", () => {
  let fargateProfile: FargateProfile;

  beforeEach(() => {
    fargateProfile = new FargateProfile({
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
  });

  it("should set apiVersion", () => {
    expect(fargateProfile).toHaveProperty(
      "apiVersion",
      "eks.aws.m.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(fargateProfile).toHaveProperty("kind", "FargateProfile");
  });

  it("validate", () => {
    expect(() => fargateProfile.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(fargateProfile.toJSON()).toEqual({
      apiVersion: "eks.aws.m.upbound.io/v1beta1",
      kind: "FargateProfile",
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
  });
});

describe("EKS Addon", () => {
  let addon: Addon;

  beforeEach(() => {
    addon = new Addon({
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
  });

  it("should set apiVersion", () => {
    expect(addon).toHaveProperty("apiVersion", "eks.aws.m.upbound.io/v1beta1");
  });

  it("should set kind", () => {
    expect(addon).toHaveProperty("kind", "Addon");
  });

  it("validate", () => {
    expect(() => addon.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(addon.toJSON()).toEqual({
      apiVersion: "eks.aws.m.upbound.io/v1beta1",
      kind: "Addon",
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
  });
});
