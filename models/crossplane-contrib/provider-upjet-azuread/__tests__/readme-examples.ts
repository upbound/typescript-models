import { describe, it, expect } from "vitest";
import { ProviderConfig } from "../gen/azuread.upbound.io/v1beta1/ProviderConfig";
import { Application } from "../gen/applications.azuread.upbound.io/v1beta1/Application";
import { Certificate } from "../gen/applications.azuread.upbound.io/v1beta1/Certificate";
import { Password } from "../gen/applications.azuread.upbound.io/v1beta1/Password";
import { FederatedIdentityCredential } from "../gen/applications.azuread.upbound.io/v1beta1/FederatedIdentityCredential";
import { Principal } from "../gen/serviceprincipals.azuread.upbound.io/v1beta1/Principal";
import { Password as SPPassword } from "../gen/serviceprincipals.azuread.upbound.io/v1beta1/Password";
import { Group } from "../gen/groups.azuread.upbound.io/v1beta1/Group";
import { Member } from "../gen/groups.azuread.upbound.io/v1beta1/Member";
import { User } from "../gen/users.azuread.upbound.io/v1beta1/User";
import { RoleAssignment } from "../gen/directoryroles.azuread.upbound.io/v1beta1/RoleAssignment";
import { AccessPolicy } from "../gen/conditionalaccess.azuread.upbound.io/v1beta1/AccessPolicy";

describe("README Examples", () => {
  describe("Provider Configuration", () => {
    it("ProviderConfig example should validate", () => {
      const providerConfig = new ProviderConfig({
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

      expect(() => providerConfig.validate()).not.toThrow();
      expect(providerConfig.toJSON()).toHaveProperty("kind", "ProviderConfig");
    });
  });

  describe("Applications", () => {
    it("Application example should validate", () => {
      const app = new Application({
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

      expect(() => app.validate()).not.toThrow();
      expect(app.toJSON()).toHaveProperty("kind", "Application");
    });

    it("Application Certificate example should validate", () => {
      const appCert = new Certificate({
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

      expect(() => appCert.validate()).not.toThrow();
      expect(appCert.toJSON()).toHaveProperty("kind", "Certificate");
    });

    it("Application Password example should validate", () => {
      const appPassword = new Password({
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

      expect(() => appPassword.validate()).not.toThrow();
      expect(appPassword.toJSON()).toHaveProperty("kind", "Password");
    });

    it("Federated Identity Credential example should validate", () => {
      const fedCred = new FederatedIdentityCredential({
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

      expect(() => fedCred.validate()).not.toThrow();
      expect(fedCred.toJSON()).toHaveProperty(
        "kind",
        "FederatedIdentityCredential"
      );
    });
  });

  describe("Service Principals", () => {
    it("Service Principal example should validate", () => {
      const sp = new Principal({
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

      expect(() => sp.validate()).not.toThrow();
      expect(sp.toJSON()).toHaveProperty("kind", "Principal");
    });

    it("Service Principal Password example should validate", () => {
      const spPassword = new SPPassword({
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

      expect(() => spPassword.validate()).not.toThrow();
      expect(spPassword.toJSON()).toHaveProperty("kind", "Password");
    });
  });

  describe("Groups", () => {
    it("Group example should validate", () => {
      const group = new Group({
        metadata: {
          name: "developers"
        },
        spec: {
          forProvider: {
            displayName: "Developers",
            securityEnabled: true,
            mailEnabled: false,
            description: "Development team group"
          }
        }
      });

      expect(() => group.validate()).not.toThrow();
      expect(group.toJSON()).toHaveProperty("kind", "Group");
    });

    it("Group Member example should validate", () => {
      const groupMember = new Member({
        metadata: {
          name: "add-user-to-developers"
        },
        spec: {
          forProvider: {
            groupObjectIdSelector: {
              matchLabels: {
                group: "developers"
              }
            },
            memberObjectIdSelector: {
              matchLabels: {
                user: "john-doe"
              }
            }
          }
        }
      });

      expect(() => groupMember.validate()).not.toThrow();
      expect(groupMember.toJSON()).toHaveProperty("kind", "Member");
    });
  });

  describe("Users", () => {
    it("User example should validate", () => {
      const user = new User({
        metadata: {
          name: "john-doe"
        },
        spec: {
          forProvider: {
            displayName: "John Doe",
            userPrincipalName: "john.doe@example.com",
            mailNickname: "john.doe",
            passwordSecretRef: {
              name: "user-password",
              namespace: "default",
              key: "password"
            }
          }
        }
      });

      expect(() => user.validate()).not.toThrow();
      expect(user.toJSON()).toHaveProperty("kind", "User");
    });
  });

  describe("Directory Roles", () => {
    it("Directory Role Assignment example should validate", () => {
      const roleAssignment = new RoleAssignment({
        metadata: {
          name: "sp-reader-role"
        },
        spec: {
          forProvider: {
            roleIdSelector: {
              matchLabels: {
                role: "directory-readers"
              }
            },
            principalObjectIdSelector: {
              matchLabels: {
                app: "my-service-principal"
              }
            }
          }
        }
      });

      expect(() => roleAssignment.validate()).not.toThrow();
      expect(roleAssignment.toJSON()).toHaveProperty("kind", "RoleAssignment");
    });
  });

  describe("Conditional Access", () => {
    it("Conditional Access Policy example should validate", () => {
      const caPolicy = new AccessPolicy({
        metadata: {
          name: "require-mfa"
        },
        spec: {
          forProvider: {
            displayName: "Require MFA for all users",
            state: "enabled",
            conditions: [
              {
                users: [
                  {
                    includedUsers: ["All"]
                  }
                ],
                applications: [
                  {
                    includedApplications: ["All"]
                  }
                ]
              }
            ],
            grantControls: [
              {
                operator: "OR",
                builtInControls: ["mfa"]
              }
            ]
          }
        }
      });

      expect(() => caPolicy.validate()).not.toThrow();
      expect(caPolicy.toJSON()).toHaveProperty("kind", "AccessPolicy");
    });
  });
});
