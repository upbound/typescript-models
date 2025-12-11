import { describe, it, expect, beforeEach } from "vitest";
import { ProviderConfig } from "../gen/azuread.upbound.io/v1beta1/ProviderConfig";
import { ProviderConfigUsage } from "../gen/azuread.upbound.io/v1beta1/ProviderConfigUsage";

describe("ProviderConfig", () => {
  let providerConfig: ProviderConfig;

  beforeEach(() => {
    providerConfig = new ProviderConfig({
      metadata: {
        name: "default"
      },
      spec: {
        credentials: {
          source: "Secret",
          secretRef: {
            name: "azure-creds",
            namespace: "crossplane-system",
            key: "credentials"
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(providerConfig).toHaveProperty(
      "apiVersion",
      "azuread.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(providerConfig).toHaveProperty("kind", "ProviderConfig");
  });

  it("validate", () => {
    expect(() => providerConfig.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(providerConfig.toJSON()).toEqual({
      apiVersion: "azuread.upbound.io/v1beta1",
      kind: "ProviderConfig",
      metadata: {
        name: "default"
      },
      spec: {
        credentials: {
          source: "Secret",
          secretRef: {
            name: "azure-creds",
            namespace: "crossplane-system",
            key: "credentials"
          }
        }
      }
    });
  });
});

describe("ProviderConfigUsage", () => {
  let usage: ProviderConfigUsage;

  beforeEach(() => {
    usage = new ProviderConfigUsage({
      metadata: {
        name: "app-usage"
      },
      providerConfigRef: {
        name: "default"
      },
      resourceRef: {
        apiVersion: "applications.azuread.upbound.io/v1beta1",
        kind: "Application",
        name: "my-app"
      }
    });
  });

  it("should set apiVersion", () => {
    expect(usage).toHaveProperty("apiVersion", "azuread.upbound.io/v1beta1");
  });

  it("should set kind", () => {
    expect(usage).toHaveProperty("kind", "ProviderConfigUsage");
  });

  it("validate", () => {
    expect(() => usage.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(usage.toJSON()).toEqual({
      apiVersion: "azuread.upbound.io/v1beta1",
      kind: "ProviderConfigUsage",
      metadata: {
        name: "app-usage"
      },
      providerConfigRef: {
        name: "default"
      },
      resourceRef: {
        apiVersion: "applications.azuread.upbound.io/v1beta1",
        kind: "Application",
        name: "my-app"
      }
    });
  });
});
