import { describe, it, expect, beforeEach } from "vitest";
import { Composition } from "../gen/apiextensions.crossplane.io/v1/Composition";
import { CompositionRevision } from "../gen/apiextensions.crossplane.io/v1/CompositionRevision";
import { CompositeResourceDefinition } from "../gen/apiextensions.crossplane.io/v1/CompositeResourceDefinition";
import { EnvironmentConfig } from "../gen/apiextensions.crossplane.io/v1beta1/EnvironmentConfig";
import { ManagedResourceActivationPolicy } from "../gen/apiextensions.crossplane.io/v1alpha1/ManagedResourceActivationPolicy";
import { ManagedResourceDefinition } from "../gen/apiextensions.crossplane.io/v1alpha1/ManagedResourceDefinition";

describe("Composition", () => {
  let composition: Composition;

  beforeEach(() => {
    composition = new Composition({
      metadata: {
        name: "my-composition",
        labels: {
          purpose: "example"
        }
      },
      spec: {
        compositeTypeRef: {
          apiVersion: "example.com/v1alpha1",
          kind: "XDatabase"
        },
        mode: "Pipeline"
      }
    });
  });

  it("should set apiVersion", () => {
    expect(composition).toHaveProperty(
      "apiVersion",
      "apiextensions.crossplane.io/v1"
    );
  });

  it("should set kind", () => {
    expect(composition).toHaveProperty("kind", "Composition");
  });

  it("validate", () => {
    expect(() => composition.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(composition.toJSON()).toEqual({
      apiVersion: "apiextensions.crossplane.io/v1",
      kind: "Composition",
      metadata: {
        name: "my-composition",
        labels: {
          purpose: "example"
        }
      },
      spec: {
        compositeTypeRef: {
          apiVersion: "example.com/v1alpha1",
          kind: "XDatabase"
        },
        mode: "Pipeline"
      }
    });
  });
});

describe("CompositionRevision", () => {
  let compositionRevision: CompositionRevision;

  beforeEach(() => {
    compositionRevision = new CompositionRevision({
      metadata: {
        name: "my-composition-abc123"
      },
      spec: {
        compositeTypeRef: {
          apiVersion: "example.com/v1alpha1",
          kind: "XDatabase"
        },
        revision: 1
      }
    });
  });

  it("should set apiVersion", () => {
    expect(compositionRevision).toHaveProperty(
      "apiVersion",
      "apiextensions.crossplane.io/v1"
    );
  });

  it("should set kind", () => {
    expect(compositionRevision).toHaveProperty("kind", "CompositionRevision");
  });

  it("validate", () => {
    expect(() => compositionRevision.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(compositionRevision.toJSON()).toEqual({
      apiVersion: "apiextensions.crossplane.io/v1",
      kind: "CompositionRevision",
      metadata: {
        name: "my-composition-abc123"
      },
      spec: {
        compositeTypeRef: {
          apiVersion: "example.com/v1alpha1",
          kind: "XDatabase"
        },
        revision: 1
      }
    });
  });
});

describe("CompositeResourceDefinition", () => {
  let xrd: CompositeResourceDefinition;

  beforeEach(() => {
    xrd = new CompositeResourceDefinition({
      metadata: {
        name: "xdatabases.example.com"
      },
      spec: {
        group: "example.com",
        names: {
          kind: "XDatabase",
          plural: "xdatabases"
        },
        versions: [
          {
            name: "v1alpha1",
            served: true,
            referenceable: true
          }
        ]
      }
    });
  });

  it("should set apiVersion", () => {
    expect(xrd).toHaveProperty("apiVersion", "apiextensions.crossplane.io/v1");
  });

  it("should set kind", () => {
    expect(xrd).toHaveProperty("kind", "CompositeResourceDefinition");
  });

  it("validate", () => {
    expect(() => xrd.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(xrd.toJSON()).toEqual({
      apiVersion: "apiextensions.crossplane.io/v1",
      kind: "CompositeResourceDefinition",
      metadata: {
        name: "xdatabases.example.com"
      },
      spec: {
        group: "example.com",
        names: {
          kind: "XDatabase",
          plural: "xdatabases"
        },
        versions: [
          {
            name: "v1alpha1",
            served: true,
            referenceable: true
          }
        ]
      }
    });
  });
});

describe("EnvironmentConfig", () => {
  let envConfig: EnvironmentConfig;

  beforeEach(() => {
    envConfig = new EnvironmentConfig({
      metadata: {
        name: "production-config"
      },
      data: {
        region: "us-west-2",
        environment: "production"
      }
    });
  });

  it("should set apiVersion", () => {
    expect(envConfig).toHaveProperty(
      "apiVersion",
      "apiextensions.crossplane.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(envConfig).toHaveProperty("kind", "EnvironmentConfig");
  });

  it("validate", () => {
    expect(() => envConfig.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(envConfig.toJSON()).toEqual({
      apiVersion: "apiextensions.crossplane.io/v1beta1",
      kind: "EnvironmentConfig",
      metadata: {
        name: "production-config"
      },
      data: {
        region: "us-west-2",
        environment: "production"
      }
    });
  });
});

describe("ManagedResourceActivationPolicy", () => {
  let policy: ManagedResourceActivationPolicy;

  beforeEach(() => {
    policy = new ManagedResourceActivationPolicy({
      metadata: {
        name: "mr-activation-policy"
      },
      spec: {
        activate: ["*.aws.crossplane.io"]
      }
    });
  });

  it("should set apiVersion", () => {
    expect(policy).toHaveProperty(
      "apiVersion",
      "apiextensions.crossplane.io/v1alpha1"
    );
  });

  it("should set kind", () => {
    expect(policy).toHaveProperty("kind", "ManagedResourceActivationPolicy");
  });

  it("validate", () => {
    expect(() => policy.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(policy.toJSON()).toEqual({
      apiVersion: "apiextensions.crossplane.io/v1alpha1",
      kind: "ManagedResourceActivationPolicy",
      metadata: {
        name: "mr-activation-policy"
      },
      spec: {
        activate: ["*.aws.crossplane.io"]
      }
    });
  });
});

describe("ManagedResourceDefinition", () => {
  let mrd: ManagedResourceDefinition;

  beforeEach(() => {
    mrd = new ManagedResourceDefinition({
      metadata: {
        name: "buckets.s3.aws.example.com"
      },
      spec: {
        group: "s3.aws.example.com",
        scope: "Cluster",
        names: {
          kind: "Bucket",
          plural: "buckets"
        },
        versions: [
          {
            name: "v1alpha1",
            served: true,
            storage: true
          }
        ]
      }
    });
  });

  it("should set apiVersion", () => {
    expect(mrd).toHaveProperty(
      "apiVersion",
      "apiextensions.crossplane.io/v1alpha1"
    );
  });

  it("should set kind", () => {
    expect(mrd).toHaveProperty("kind", "ManagedResourceDefinition");
  });

  it("validate", () => {
    expect(() => mrd.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(mrd.toJSON()).toEqual({
      apiVersion: "apiextensions.crossplane.io/v1alpha1",
      kind: "ManagedResourceDefinition",
      metadata: {
        name: "buckets.s3.aws.example.com"
      },
      spec: {
        group: "s3.aws.example.com",
        scope: "Cluster",
        names: {
          kind: "Bucket",
          plural: "buckets"
        },
        versions: [
          {
            name: "v1alpha1",
            served: true,
            storage: true
          }
        ]
      }
    });
  });
});
