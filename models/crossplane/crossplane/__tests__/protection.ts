import { describe, it, expect, beforeEach } from "vitest";
import { ClusterUsage } from "../gen/protection.crossplane.io/v1beta1/ClusterUsage";
import { Usage } from "../gen/protection.crossplane.io/v1beta1/Usage";

describe("ClusterUsage", () => {
  let clusterUsage: ClusterUsage;

  beforeEach(() => {
    clusterUsage = new ClusterUsage({
      metadata: {
        name: "cluster-database-usage"
      },
      spec: {
        of: {
          apiVersion: "example.com/v1alpha1",
          kind: "Database",
          resourceRef: {
            name: "my-cluster-database"
          }
        },
        by: {
          apiVersion: "example.com/v1alpha1",
          kind: "Application",
          resourceRef: {
            name: "my-cluster-app"
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(clusterUsage).toHaveProperty(
      "apiVersion",
      "protection.crossplane.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(clusterUsage).toHaveProperty("kind", "ClusterUsage");
  });

  it("validate", () => {
    expect(() => clusterUsage.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(clusterUsage.toJSON()).toEqual({
      apiVersion: "protection.crossplane.io/v1beta1",
      kind: "ClusterUsage",
      metadata: {
        name: "cluster-database-usage"
      },
      spec: {
        of: {
          apiVersion: "example.com/v1alpha1",
          kind: "Database",
          resourceRef: {
            name: "my-cluster-database"
          }
        },
        by: {
          apiVersion: "example.com/v1alpha1",
          kind: "Application",
          resourceRef: {
            name: "my-cluster-app"
          }
        }
      }
    });
  });
});

describe("Usage", () => {
  let usage: Usage;

  beforeEach(() => {
    usage = new Usage({
      metadata: {
        name: "database-usage",
        namespace: "default"
      },
      spec: {
        of: {
          apiVersion: "example.com/v1alpha1",
          kind: "Database",
          resourceRef: {
            name: "my-database"
          }
        },
        by: {
          apiVersion: "example.com/v1alpha1",
          kind: "Application",
          resourceRef: {
            name: "my-app"
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(usage).toHaveProperty(
      "apiVersion",
      "protection.crossplane.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(usage).toHaveProperty("kind", "Usage");
  });

  it("validate", () => {
    expect(() => usage.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(usage.toJSON()).toEqual({
      apiVersion: "protection.crossplane.io/v1beta1",
      kind: "Usage",
      metadata: {
        name: "database-usage",
        namespace: "default"
      },
      spec: {
        of: {
          apiVersion: "example.com/v1alpha1",
          kind: "Database",
          resourceRef: {
            name: "my-database"
          }
        },
        by: {
          apiVersion: "example.com/v1alpha1",
          kind: "Application",
          resourceRef: {
            name: "my-app"
          }
        }
      }
    });
  });
});
