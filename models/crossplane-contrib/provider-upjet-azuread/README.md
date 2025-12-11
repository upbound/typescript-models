# TypeScript Models for Crossplane Provider Upjet Azure AD <!-- omit from toc -->

This package contains TypeScript models for the [Crossplane Provider Upjet Azure AD](https://github.com/crossplane-contrib/provider-upjet-azuread), which provides Crossplane support for managing Azure Active Directory (Entra ID) resources.

The models are generated from the CRDs defined in the provider's [package/crds](https://github.com/crossplane-contrib/provider-upjet-azuread/tree/main/package/crds) directory.

- [Installation](#installation)
  - [NPM](#npm)
- [Examples](#examples)
  - [Provider Configuration](#provider-configuration)
    - [ProviderConfig](#providerconfig)
  - [Applications](#applications)
    - [Application](#application)
    - [Application Certificate](#application-certificate)
    - [Application Password](#application-password)
    - [Federated Identity Credential](#federated-identity-credential)
  - [Service Principals](#service-principals)
    - [Service Principal](#service-principal)
    - [Service Principal Password](#service-principal-password)
  - [Groups](#groups)
    - [Group](#group)
    - [Group Member](#group-member)
  - [Users](#users)
    - [User](#user)
  - [Directory Roles](#directory-roles)
    - [Directory Role Assignment](#directory-role-assignment)
  - [Conditional Access](#conditional-access)
    - [Conditional Access Policy](#conditional-access-policy)
- [Validation](#validation)

## Installation

### NPM

```shell
npm install @crossplane-models/provider-upjet-azuread
```

## Examples

### Provider Configuration

#### ProviderConfig

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { ProviderConfig } from "@crossplane-models/provider-upjet-azuread/azuread.upbound.io/v1beta1";

const providerConfig = new ProviderConfig({
  metadata: {
    name: "default",
  },
  spec: {
    credentials: {
      source: "Secret",
      secretRef: {
        name: "azure-creds",
        namespace: "crossplane-system",
        key: "credentials",
      },
    },
  },
});

providerConfig.validate();
console.log(dumpYaml(providerConfig));
```

### Applications

#### Application

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Application } from "@crossplane-models/provider-upjet-azuread/applications.azuread.upbound.io/v1beta1";

const app = new Application({
  metadata: {
    name: "my-app",
  },
  spec: {
    forProvider: {
      displayName: "My Application",
      signInAudience: "AzureADMyOrg",
    },
  },
});

app.validate();
console.log(dumpYaml(app));
```

#### Application Certificate

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Certificate } from "@crossplane-models/provider-upjet-azuread/applications.azuread.upbound.io/v1beta1";

const appCert = new Certificate({
  metadata: {
    name: "my-app-cert",
  },
  spec: {
    forProvider: {
      applicationObjectIdSelector: {
        matchLabels: {
          app: "my-app",
        },
      },
      type: "AsymmetricX509Cert",
      valueSecretRef: {
        name: "app-cert",
        namespace: "default",
        key: "certificate",
      },
    },
  },
});

appCert.validate();
console.log(dumpYaml(appCert));
```

#### Application Password

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Password } from "@crossplane-models/provider-upjet-azuread/applications.azuread.upbound.io/v1beta1";

const appPassword = new Password({
  metadata: {
    name: "my-app-password",
  },
  spec: {
    forProvider: {
      applicationObjectIdSelector: {
        matchLabels: {
          app: "my-app",
        },
      },
      displayName: "My App Password",
    },
    writeConnectionSecretToRef: {
      name: "app-password",
      namespace: "default",
    },
  },
});

appPassword.validate();
console.log(dumpYaml(appPassword));
```

#### Federated Identity Credential

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { FederatedIdentityCredential } from "@crossplane-models/provider-upjet-azuread/applications.azuread.upbound.io/v1beta1";

const fedCred = new FederatedIdentityCredential({
  metadata: {
    name: "github-federation",
  },
  spec: {
    forProvider: {
      applicationObjectIdSelector: {
        matchLabels: {
          app: "my-app",
        },
      },
      displayName: "GitHub Actions Federation",
      audiences: ["api://AzureADTokenExchange"],
      issuer: "https://token.actions.githubusercontent.com",
      subject: "repo:my-org/my-repo:ref:refs/heads/main",
    },
  },
});

fedCred.validate();
console.log(dumpYaml(fedCred));
```

### Service Principals

#### Service Principal

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Principal } from "@crossplane-models/provider-upjet-azuread/serviceprincipals.azuread.upbound.io/v1beta1";

const sp = new Principal({
  metadata: {
    name: "my-service-principal",
  },
  spec: {
    forProvider: {
      applicationIdSelector: {
        matchLabels: {
          app: "my-app",
        },
      },
      appRoleAssignmentRequired: false,
    },
  },
});

sp.validate();
console.log(dumpYaml(sp));
```

#### Service Principal Password

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Password } from "@crossplane-models/provider-upjet-azuread/serviceprincipals.azuread.upbound.io/v1beta1";

const spPassword = new Password({
  metadata: {
    name: "sp-password",
  },
  spec: {
    forProvider: {
      servicePrincipalIdSelector: {
        matchLabels: {
          app: "my-app",
        },
      },
    },
    writeConnectionSecretToRef: {
      name: "sp-credentials",
      namespace: "default",
    },
  },
});

spPassword.validate();
console.log(dumpYaml(spPassword));
```

### Groups

#### Group

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Group } from "@crossplane-models/provider-upjet-azuread/groups.azuread.upbound.io/v1beta1";

const group = new Group({
  metadata: {
    name: "developers",
  },
  spec: {
    forProvider: {
      displayName: "Developers",
      securityEnabled: true,
      mailEnabled: false,
      description: "Development team group",
    },
  },
});

group.validate();
console.log(dumpYaml(group));
```

#### Group Member

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { Member } from "@crossplane-models/provider-upjet-azuread/groups.azuread.upbound.io/v1beta1";

const groupMember = new Member({
  metadata: {
    name: "add-user-to-developers",
  },
  spec: {
    forProvider: {
      groupObjectIdSelector: {
        matchLabels: {
          group: "developers",
        },
      },
      memberObjectIdSelector: {
        matchLabels: {
          user: "john-doe",
        },
      },
    },
  },
});

groupMember.validate();
console.log(dumpYaml(groupMember));
```

### Users

#### User

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { User } from "@crossplane-models/provider-upjet-azuread/users.azuread.upbound.io/v1beta1";

const user = new User({
  metadata: {
    name: "john-doe",
  },
  spec: {
    forProvider: {
      displayName: "John Doe",
      userPrincipalName: "john.doe@example.com",
      mailNickname: "john.doe",
      passwordSecretRef: {
        name: "user-password",
        namespace: "default",
        key: "password",
      },
    },
  },
});

user.validate();
console.log(dumpYaml(user));
```

### Directory Roles

#### Directory Role Assignment

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { RoleAssignment } from "@crossplane-models/provider-upjet-azuread/directoryroles.azuread.upbound.io/v1beta1";

const roleAssignment = new RoleAssignment({
  metadata: {
    name: "sp-reader-role",
  },
  spec: {
    forProvider: {
      roleIdSelector: {
        matchLabels: {
          role: "directory-readers",
        },
      },
      principalObjectIdSelector: {
        matchLabels: {
          app: "my-service-principal",
        },
      },
    },
  },
});

roleAssignment.validate();
console.log(dumpYaml(roleAssignment));
```

### Conditional Access

#### Conditional Access Policy

```typescript
import { dumpYaml } from "@kubernetes/client-node";
import { AccessPolicy } from "@crossplane-models/provider-upjet-azuread/conditionalaccess.azuread.upbound.io/v1beta1";

const caPolicy = new AccessPolicy({
  metadata: {
    name: "require-mfa",
  },
  spec: {
    forProvider: {
      displayName: "Require MFA for all users",
      state: "enabled",
      conditions: [
        {
          users: [
            {
              includeUsers: ["All"],
            },
          ],
          applications: [
            {
              includeApplications: ["All"],
            },
          ],
        },
      ],
      grantControls: [
        {
          operator: "OR",
          builtInControls: ["mfa"],
        },
      ],
    },
  },
});

caPolicy.validate();
console.log(dumpYaml(caPolicy));
```

## Validation

All models include built-in JSON Schema validation. Call `.validate()` on any instance to validate against the provider's CRD schema. Validation will throw an error if the object doesn't match the schema.

For more information about the Azure AD provider and available resources, see the [official provider documentation](https://marketplace.upbound.io/providers/upbound/provider-azuread/latest).
