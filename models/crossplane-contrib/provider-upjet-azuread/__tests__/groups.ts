import { describe, it, expect, beforeEach } from "vitest";
import { Group } from "../gen/groups.azuread.upbound.io/v1beta1/Group";
import { Member } from "../gen/groups.azuread.upbound.io/v1beta1/Member";

describe("Group", () => {
  let group: Group;

  beforeEach(() => {
    group = new Group({
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
  });

  it("should set apiVersion", () => {
    expect(group).toHaveProperty(
      "apiVersion",
      "groups.azuread.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(group).toHaveProperty("kind", "Group");
  });

  it("validate", () => {
    expect(() => group.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(group.toJSON()).toEqual({
      apiVersion: "groups.azuread.upbound.io/v1beta1",
      kind: "Group",
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
  });
});

describe("Member", () => {
  let member: Member;

  beforeEach(() => {
    member = new Member({
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
  });

  it("should set apiVersion", () => {
    expect(member).toHaveProperty(
      "apiVersion",
      "groups.azuread.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(member).toHaveProperty("kind", "Member");
  });

  it("validate", () => {
    expect(() => member.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(member.toJSON()).toEqual({
      apiVersion: "groups.azuread.upbound.io/v1beta1",
      kind: "Member",
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
  });
});
