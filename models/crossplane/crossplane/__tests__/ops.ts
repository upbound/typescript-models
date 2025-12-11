import { describe, it, expect, beforeEach } from "vitest";
import { CronOperation } from "../gen/ops.crossplane.io/v1alpha1/CronOperation";
import { Operation } from "../gen/ops.crossplane.io/v1alpha1/Operation";
import { WatchOperation } from "../gen/ops.crossplane.io/v1alpha1/WatchOperation";

describe("CronOperation", () => {
  let cronOp: CronOperation;

  beforeEach(() => {
    cronOp = new CronOperation({
      metadata: {
        name: "scheduled-upgrade"
      },
      spec: {
        schedule: "0 2 * * *",
        operationTemplate: {
          spec: {
            mode: "Pipeline",
            pipeline: [
              {
                step: "upgrade",
                functionRef: {
                  name: "function-upgrade"
                }
              }
            ]
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(cronOp).toHaveProperty("apiVersion", "ops.crossplane.io/v1alpha1");
  });

  it("should set kind", () => {
    expect(cronOp).toHaveProperty("kind", "CronOperation");
  });

  it("validate", () => {
    expect(() => cronOp.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(cronOp.toJSON()).toEqual({
      apiVersion: "ops.crossplane.io/v1alpha1",
      kind: "CronOperation",
      metadata: {
        name: "scheduled-upgrade"
      },
      spec: {
        schedule: "0 2 * * *",
        operationTemplate: {
          spec: {
            mode: "Pipeline",
            pipeline: [
              {
                step: "upgrade",
                functionRef: {
                  name: "function-upgrade"
                }
              }
            ]
          }
        }
      }
    });
  });
});

describe("Operation", () => {
  let operation: Operation;

  beforeEach(() => {
    operation = new Operation({
      metadata: {
        name: "upgrade-operation"
      },
      spec: {
        mode: "Pipeline",
        pipeline: [
          {
            step: "upgrade",
            functionRef: {
              name: "function-upgrade"
            }
          }
        ]
      }
    });
  });

  it("should set apiVersion", () => {
    expect(operation).toHaveProperty(
      "apiVersion",
      "ops.crossplane.io/v1alpha1"
    );
  });

  it("should set kind", () => {
    expect(operation).toHaveProperty("kind", "Operation");
  });

  it("validate", () => {
    expect(() => operation.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(operation.toJSON()).toEqual({
      apiVersion: "ops.crossplane.io/v1alpha1",
      kind: "Operation",
      metadata: {
        name: "upgrade-operation"
      },
      spec: {
        mode: "Pipeline",
        pipeline: [
          {
            step: "upgrade",
            functionRef: {
              name: "function-upgrade"
            }
          }
        ]
      }
    });
  });
});

describe("WatchOperation", () => {
  let watchOp: WatchOperation;

  beforeEach(() => {
    watchOp = new WatchOperation({
      metadata: {
        name: "watch-provider-changes"
      },
      spec: {
        watch: {
          apiVersion: "pkg.crossplane.io/v1",
          kind: "Provider"
        },
        operationTemplate: {
          spec: {
            mode: "Pipeline",
            pipeline: [
              {
                step: "upgrade",
                functionRef: {
                  name: "function-upgrade"
                }
              }
            ]
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(watchOp).toHaveProperty("apiVersion", "ops.crossplane.io/v1alpha1");
  });

  it("should set kind", () => {
    expect(watchOp).toHaveProperty("kind", "WatchOperation");
  });

  it("validate", () => {
    expect(() => watchOp.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(watchOp.toJSON()).toEqual({
      apiVersion: "ops.crossplane.io/v1alpha1",
      kind: "WatchOperation",
      metadata: {
        name: "watch-provider-changes"
      },
      spec: {
        watch: {
          apiVersion: "pkg.crossplane.io/v1",
          kind: "Provider"
        },
        operationTemplate: {
          spec: {
            mode: "Pipeline",
            pipeline: [
              {
                step: "upgrade",
                functionRef: {
                  name: "function-upgrade"
                }
              }
            ]
          }
        }
      }
    });
  });
});
