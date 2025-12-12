import { describe, it, expect, beforeEach } from "vitest";
import { Principal } from "../gen/serviceprincipals.azuread.upbound.io/v1beta1/Principal";
import { Password } from "../gen/serviceprincipals.azuread.upbound.io/v1beta1/Password";
import { Certificate } from "../gen/serviceprincipals.azuread.upbound.io/v1beta1/Certificate";

describe("Principal", () => {
  let sp: Principal;

  beforeEach(() => {
    sp = new Principal({
      metadata: {
        name: "my-service-principal"
      },
      spec: {
        forProvider: {
          clientIdSelector: {
            matchLabels: {
              app: "my-app"
            }
          },
          appRoleAssignmentRequired: false
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(sp).toHaveProperty(
      "apiVersion",
      "serviceprincipals.azuread.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(sp).toHaveProperty("kind", "Principal");
  });

  it("validate", () => {
    expect(() => sp.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(sp.toJSON()).toEqual({
      apiVersion: "serviceprincipals.azuread.upbound.io/v1beta1",
      kind: "Principal",
      metadata: {
        name: "my-service-principal"
      },
      spec: {
        forProvider: {
          clientIdSelector: {
            matchLabels: {
              app: "my-app"
            }
          },
          appRoleAssignmentRequired: false
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
        name: "sp-password"
      },
      spec: {
        forProvider: {
          servicePrincipalIdSelector: {
            matchLabels: {
              app: "my-app"
            }
          }
        },
        writeConnectionSecretToRef: {
          name: "sp-credentials",
          namespace: "default"
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(password).toHaveProperty(
      "apiVersion",
      "serviceprincipals.azuread.upbound.io/v1beta1"
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
      apiVersion: "serviceprincipals.azuread.upbound.io/v1beta1",
      kind: "Password",
      metadata: {
        name: "sp-password"
      },
      spec: {
        forProvider: {
          servicePrincipalIdSelector: {
            matchLabels: {
              app: "my-app"
            }
          }
        },
        writeConnectionSecretToRef: {
          name: "sp-credentials",
          namespace: "default"
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
        name: "sp-cert"
      },
      spec: {
        forProvider: {
          servicePrincipalIdSelector: {
            matchLabels: {
              app: "my-app"
            }
          },
          type: "AsymmetricX509Cert",
          valueSecretRef: {
            name: "sp-cert",
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
      "serviceprincipals.azuread.upbound.io/v1beta1"
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
      apiVersion: "serviceprincipals.azuread.upbound.io/v1beta1",
      kind: "Certificate",
      metadata: {
        name: "sp-cert"
      },
      spec: {
        forProvider: {
          servicePrincipalIdSelector: {
            matchLabels: {
              app: "my-app"
            }
          },
          type: "AsymmetricX509Cert",
          valueSecretRef: {
            name: "sp-cert",
            namespace: "default",
            key: "certificate"
          }
        }
      }
    });
  });
});
