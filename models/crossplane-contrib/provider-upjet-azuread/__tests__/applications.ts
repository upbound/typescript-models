import { describe, it, expect, beforeEach } from "vitest";
import { Application } from "../gen/applications.azuread.upbound.io/v1beta1/Application";
import { Certificate } from "../gen/applications.azuread.upbound.io/v1beta1/Certificate";
import { Password } from "../gen/applications.azuread.upbound.io/v1beta1/Password";
import { FederatedIdentityCredential } from "../gen/applications.azuread.upbound.io/v1beta1/FederatedIdentityCredential";

describe("Application", () => {
  let app: Application;

  beforeEach(() => {
    app = new Application({
      metadata: {
        name: "my-app"
      },
      spec: {
        forProvider: {
          displayName: "My Application",
          signInAudience: "AzureADMyOrg"
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(app).toHaveProperty(
      "apiVersion",
      "applications.azuread.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(app).toHaveProperty("kind", "Application");
  });

  it("validate", () => {
    expect(() => app.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(app.toJSON()).toEqual({
      apiVersion: "applications.azuread.upbound.io/v1beta1",
      kind: "Application",
      metadata: {
        name: "my-app"
      },
      spec: {
        forProvider: {
          displayName: "My Application",
          signInAudience: "AzureADMyOrg"
        }
      }
    });
  });
});

describe("Certificate", () => {
  let cert: Certificate;

  beforeEach(() => {
    cert = new Certificate({
      metadata: {
        name: "my-app-cert"
      },
      spec: {
        forProvider: {
          applicationIdSelector: {
            matchLabels: {
              app: "my-app"
            }
          },
          type: "AsymmetricX509Cert",
          valueSecretRef: {
            name: "app-cert",
            namespace: "default",
            key: "certificate"
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(cert).toHaveProperty(
      "apiVersion",
      "applications.azuread.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(cert).toHaveProperty("kind", "Certificate");
  });

  it("validate", () => {
    expect(() => cert.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(cert.toJSON()).toEqual({
      apiVersion: "applications.azuread.upbound.io/v1beta1",
      kind: "Certificate",
      metadata: {
        name: "my-app-cert"
      },
      spec: {
        forProvider: {
          applicationIdSelector: {
            matchLabels: {
              app: "my-app"
            }
          },
          type: "AsymmetricX509Cert",
          valueSecretRef: {
            name: "app-cert",
            namespace: "default",
            key: "certificate"
          }
        }
      }
    });
  });
});

describe("Password", () => {
  let password: Password;

  beforeEach(() => {
    password = new Password({
      metadata: {
        name: "my-app-password"
      },
      spec: {
        forProvider: {
          applicationIdSelector: {
            matchLabels: {
              app: "my-app"
            }
          },
          displayName: "My App Password"
        },
        writeConnectionSecretToRef: {
          name: "app-password",
          namespace: "default"
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(password).toHaveProperty(
      "apiVersion",
      "applications.azuread.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(password).toHaveProperty("kind", "Password");
  });

  it("validate", () => {
    expect(() => password.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(password.toJSON()).toEqual({
      apiVersion: "applications.azuread.upbound.io/v1beta1",
      kind: "Password",
      metadata: {
        name: "my-app-password"
      },
      spec: {
        forProvider: {
          applicationIdSelector: {
            matchLabels: {
              app: "my-app"
            }
          },
          displayName: "My App Password"
        },
        writeConnectionSecretToRef: {
          name: "app-password",
          namespace: "default"
        }
      }
    });
  });
});

describe("FederatedIdentityCredential", () => {
  let fedCred: FederatedIdentityCredential;

  beforeEach(() => {
    fedCred = new FederatedIdentityCredential({
      metadata: {
        name: "github-federation"
      },
      spec: {
        forProvider: {
          applicationIdSelector: {
            matchLabels: {
              app: "my-app"
            }
          },
          displayName: "GitHub Actions Federation",
          audiences: ["api://AzureADTokenExchange"],
          issuer: "https://token.actions.githubusercontent.com",
          subject: "repo:my-org/my-repo:ref:refs/heads/main"
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(fedCred).toHaveProperty(
      "apiVersion",
      "applications.azuread.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(fedCred).toHaveProperty("kind", "FederatedIdentityCredential");
  });

  it("validate", () => {
    expect(() => fedCred.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(fedCred.toJSON()).toEqual({
      apiVersion: "applications.azuread.upbound.io/v1beta1",
      kind: "FederatedIdentityCredential",
      metadata: {
        name: "github-federation"
      },
      spec: {
        forProvider: {
          applicationIdSelector: {
            matchLabels: {
              app: "my-app"
            }
          },
          displayName: "GitHub Actions Federation",
          audiences: ["api://AzureADTokenExchange"],
          issuer: "https://token.actions.githubusercontent.com",
          subject: "repo:my-org/my-repo:ref:refs/heads/main"
        }
      }
    });
  });
});
