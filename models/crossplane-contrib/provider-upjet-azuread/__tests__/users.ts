import { describe, it, expect, beforeEach } from "vitest";
import { User } from "../gen/users.azuread.upbound.io/v1beta1/User";

describe("User", () => {
  let user: User;

  beforeEach(() => {
    user = new User({
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
  });

  it("should set apiVersion", () => {
    expect(user).toHaveProperty(
      "apiVersion",
      "users.azuread.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(user).toHaveProperty("kind", "User");
  });

  it("validate", () => {
    expect(() => user.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(user.toJSON()).toEqual({
      apiVersion: "users.azuread.upbound.io/v1beta1",
      kind: "User",
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
  });
});
