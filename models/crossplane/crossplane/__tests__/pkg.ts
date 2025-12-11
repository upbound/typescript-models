import { describe, it, expect, beforeEach } from "vitest";
import { Configuration } from "../gen/pkg.crossplane.io/v1/Configuration";
import { ConfigurationRevision } from "../gen/pkg.crossplane.io/v1/ConfigurationRevision";
import { DeploymentRuntimeConfig } from "../gen/pkg.crossplane.io/v1beta1/DeploymentRuntimeConfig";
import { Function as CrossplaneFunction } from "../gen/pkg.crossplane.io/v1/Function";
import { FunctionRevision } from "../gen/pkg.crossplane.io/v1/FunctionRevision";
import { ImageConfig } from "../gen/pkg.crossplane.io/v1beta1/ImageConfig";
import { Lock } from "../gen/pkg.crossplane.io/v1beta1/Lock";
import { Provider } from "../gen/pkg.crossplane.io/v1/Provider";
import { ProviderRevision } from "../gen/pkg.crossplane.io/v1/ProviderRevision";

describe("Configuration", () => {
  let config: Configuration;

  beforeEach(() => {
    config = new Configuration({
      metadata: {
        name: "platform-ref-aws"
      },
      spec: {
        package: "xpkg.upbound.io/upbound/platform-ref-aws:v2.0.0",
        packagePullPolicy: "IfNotPresent"
      }
    });
  });

  it("should set apiVersion", () => {
    expect(config).toHaveProperty("apiVersion", "pkg.crossplane.io/v1");
  });

  it("should set kind", () => {
    expect(config).toHaveProperty("kind", "Configuration");
  });

  it("validate", () => {
    expect(() => config.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(config.toJSON()).toEqual({
      apiVersion: "pkg.crossplane.io/v1",
      kind: "Configuration",
      metadata: {
        name: "platform-ref-aws"
      },
      spec: {
        package: "xpkg.upbound.io/upbound/platform-ref-aws:v2.0.0",
        packagePullPolicy: "IfNotPresent"
      }
    });
  });
});

describe("ConfigurationRevision", () => {
  let configRevision: ConfigurationRevision;

  beforeEach(() => {
    configRevision = new ConfigurationRevision({
      metadata: {
        name: "platform-ref-aws-abc123"
      },
      spec: {
        desiredState: "Active",
        image: "xpkg.upbound.io/upbound/platform-ref-aws:v2.0.0",
        revision: 1
      }
    });
  });

  it("should set apiVersion", () => {
    expect(configRevision).toHaveProperty("apiVersion", "pkg.crossplane.io/v1");
  });

  it("should set kind", () => {
    expect(configRevision).toHaveProperty("kind", "ConfigurationRevision");
  });

  it("validate", () => {
    expect(() => configRevision.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(configRevision.toJSON()).toEqual({
      apiVersion: "pkg.crossplane.io/v1",
      kind: "ConfigurationRevision",
      metadata: {
        name: "platform-ref-aws-abc123"
      },
      spec: {
        desiredState: "Active",
        image: "xpkg.upbound.io/upbound/platform-ref-aws:v2.0.0",
        revision: 1
      }
    });
  });
});

describe("DeploymentRuntimeConfig", () => {
  let drc: DeploymentRuntimeConfig;

  beforeEach(() => {
    drc = new DeploymentRuntimeConfig({
      metadata: {
        name: "drc-example"
      },
      spec: {
        serviceAccountTemplate: {
          metadata: {
            name: "my-service-account",
            labels: {
              hello: "world"
            }
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(drc).toHaveProperty("apiVersion", "pkg.crossplane.io/v1beta1");
  });

  it("should set kind", () => {
    expect(drc).toHaveProperty("kind", "DeploymentRuntimeConfig");
  });

  it("validate", () => {
    expect(() => drc.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(drc.toJSON()).toEqual({
      apiVersion: "pkg.crossplane.io/v1beta1",
      kind: "DeploymentRuntimeConfig",
      metadata: {
        name: "drc-example"
      },
      spec: {
        serviceAccountTemplate: {
          metadata: {
            name: "my-service-account",
            labels: {
              hello: "world"
            }
          }
        }
      }
    });
  });
});

describe("Function", () => {
  let func: CrossplaneFunction;

  beforeEach(() => {
    func = new CrossplaneFunction({
      metadata: {
        name: "function-patch-and-transform"
      },
      spec: {
        package:
          "xpkg.upbound.io/crossplane-contrib/function-patch-and-transform:v0.1.4"
      }
    });
  });

  it("should set apiVersion", () => {
    expect(func).toHaveProperty("apiVersion", "pkg.crossplane.io/v1");
  });

  it("should set kind", () => {
    expect(func).toHaveProperty("kind", "Function");
  });

  it("validate", () => {
    expect(() => func.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(func.toJSON()).toEqual({
      apiVersion: "pkg.crossplane.io/v1",
      kind: "Function",
      metadata: {
        name: "function-patch-and-transform"
      },
      spec: {
        package:
          "xpkg.upbound.io/crossplane-contrib/function-patch-and-transform:v0.1.4"
      }
    });
  });
});

describe("FunctionRevision", () => {
  let fnRevision: FunctionRevision;

  beforeEach(() => {
    fnRevision = new FunctionRevision({
      metadata: {
        name: "function-patch-and-transform-abc123"
      },
      spec: {
        desiredState: "Active",
        image:
          "xpkg.upbound.io/crossplane-contrib/function-patch-and-transform:v0.1.4",
        revision: 1
      }
    });
  });

  it("should set apiVersion", () => {
    expect(fnRevision).toHaveProperty("apiVersion", "pkg.crossplane.io/v1");
  });

  it("should set kind", () => {
    expect(fnRevision).toHaveProperty("kind", "FunctionRevision");
  });

  it("validate", () => {
    expect(() => fnRevision.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(fnRevision.toJSON()).toEqual({
      apiVersion: "pkg.crossplane.io/v1",
      kind: "FunctionRevision",
      metadata: {
        name: "function-patch-and-transform-abc123"
      },
      spec: {
        desiredState: "Active",
        image:
          "xpkg.upbound.io/crossplane-contrib/function-patch-and-transform:v0.1.4",
        revision: 1
      }
    });
  });
});

describe("ImageConfig", () => {
  let imageConfig: ImageConfig;

  beforeEach(() => {
    imageConfig = new ImageConfig({
      metadata: {
        name: "private-registry-config"
      },
      spec: {
        matchImages: [
          {
            prefix: "private.registry.example.com"
          }
        ]
      }
    });
  });

  it("should set apiVersion", () => {
    expect(imageConfig).toHaveProperty(
      "apiVersion",
      "pkg.crossplane.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(imageConfig).toHaveProperty("kind", "ImageConfig");
  });

  it("validate", () => {
    expect(() => imageConfig.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(imageConfig.toJSON()).toEqual({
      apiVersion: "pkg.crossplane.io/v1beta1",
      kind: "ImageConfig",
      metadata: {
        name: "private-registry-config"
      },
      spec: {
        matchImages: [
          {
            prefix: "private.registry.example.com"
          }
        ]
      }
    });
  });
});

describe("Lock", () => {
  let lock: Lock;

  beforeEach(() => {
    lock = new Lock({
      metadata: {
        name: "package-lock"
      },
      packages: [
        {
          name: "provider-aws",
          type: "Provider",
          source: "xpkg.upbound.io/upbound/provider-aws",
          version: "v0.34.0",
          dependencies: []
        }
      ]
    });
  });

  it("should set apiVersion", () => {
    expect(lock).toHaveProperty("apiVersion", "pkg.crossplane.io/v1beta1");
  });

  it("should set kind", () => {
    expect(lock).toHaveProperty("kind", "Lock");
  });

  it("validate", () => {
    expect(() => lock.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(lock.toJSON()).toEqual({
      apiVersion: "pkg.crossplane.io/v1beta1",
      kind: "Lock",
      metadata: {
        name: "package-lock"
      },
      packages: [
        {
          name: "provider-aws",
          type: "Provider",
          source: "xpkg.upbound.io/upbound/provider-aws",
          version: "v0.34.0",
          dependencies: []
        }
      ]
    });
  });
});

describe("Provider", () => {
  let provider: Provider;

  beforeEach(() => {
    provider = new Provider({
      metadata: {
        name: "provider-aws"
      },
      spec: {
        package: "xpkg.upbound.io/upbound/provider-aws:v2.3.0",
        packagePullPolicy: "IfNotPresent"
      }
    });
  });

  it("should set apiVersion", () => {
    expect(provider).toHaveProperty("apiVersion", "pkg.crossplane.io/v1");
  });

  it("should set kind", () => {
    expect(provider).toHaveProperty("kind", "Provider");
  });

  it("validate", () => {
    expect(() => provider.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(provider.toJSON()).toEqual({
      apiVersion: "pkg.crossplane.io/v1",
      kind: "Provider",
      metadata: {
        name: "provider-aws"
      },
      spec: {
        package: "xpkg.upbound.io/upbound/provider-aws:v2.3.0",
        packagePullPolicy: "IfNotPresent"
      }
    });
  });
});

describe("ProviderRevision", () => {
  let providerRevision: ProviderRevision;

  beforeEach(() => {
    providerRevision = new ProviderRevision({
      metadata: {
        name: "provider-aws-abc123"
      },
      spec: {
        desiredState: "Active",
        image: "xpkg.upbound.io/upbound/provider-aws:v2.3.0",
        revision: 1
      }
    });
  });

  it("should set apiVersion", () => {
    expect(providerRevision).toHaveProperty(
      "apiVersion",
      "pkg.crossplane.io/v1"
    );
  });

  it("should set kind", () => {
    expect(providerRevision).toHaveProperty("kind", "ProviderRevision");
  });

  it("validate", () => {
    expect(() => providerRevision.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(providerRevision.toJSON()).toEqual({
      apiVersion: "pkg.crossplane.io/v1",
      kind: "ProviderRevision",
      metadata: {
        name: "provider-aws-abc123"
      },
      spec: {
        desiredState: "Active",
        image: "xpkg.upbound.io/upbound/provider-aws:v2.3.0",
        revision: 1
      }
    });
  });
});
