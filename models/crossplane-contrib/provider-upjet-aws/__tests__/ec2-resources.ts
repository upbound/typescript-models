import { describe, it, expect, beforeEach } from "vitest";
import { VPC } from "../gen/ec2.aws.m.upbound.io/v1beta1/VPC";
import { Subnet } from "../gen/ec2.aws.m.upbound.io/v1beta1/Subnet";
import { SecurityGroup } from "../gen/ec2.aws.m.upbound.io/v1beta1/SecurityGroup";
import { Instance } from "../gen/ec2.aws.m.upbound.io/v1beta1/Instance";
import { InternetGateway } from "../gen/ec2.aws.m.upbound.io/v1beta1/InternetGateway";
import { RouteTable } from "../gen/ec2.aws.m.upbound.io/v1beta1/RouteTable";

describe("EC2 VPC", () => {
  let vpc: VPC;

  beforeEach(() => {
    vpc = new VPC({
      metadata: {
        name: "my-vpc"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          cidrBlock: "10.0.0.0/16",
          enableDnsHostnames: true,
          enableDnsSupport: true,
          tags: {
            Name: "my-vpc",
            Environment: "production"
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(vpc).toHaveProperty("apiVersion", "ec2.aws.m.upbound.io/v1beta1");
  });

  it("should set kind", () => {
    expect(vpc).toHaveProperty("kind", "VPC");
  });

  it("validate", () => {
    expect(() => vpc.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(vpc.toJSON()).toEqual({
      apiVersion: "ec2.aws.m.upbound.io/v1beta1",
      kind: "VPC",
      metadata: {
        name: "my-vpc"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          cidrBlock: "10.0.0.0/16",
          enableDnsHostnames: true,
          enableDnsSupport: true,
          tags: {
            Name: "my-vpc",
            Environment: "production"
          }
        }
      }
    });
  });
});

describe("EC2 Subnet", () => {
  let subnet: Subnet;

  beforeEach(() => {
    subnet = new Subnet({
      metadata: {
        name: "my-subnet"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          availabilityZone: "us-west-2a",
          cidrBlock: "10.0.1.0/24",
          vpcIdSelector: {
            matchLabels: {
              vpc: "my-vpc"
            }
          },
          mapPublicIpOnLaunch: true,
          tags: {
            Name: "my-public-subnet",
            Type: "public"
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(subnet).toHaveProperty("apiVersion", "ec2.aws.m.upbound.io/v1beta1");
  });

  it("should set kind", () => {
    expect(subnet).toHaveProperty("kind", "Subnet");
  });

  it("validate", () => {
    expect(() => subnet.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(subnet.toJSON()).toEqual({
      apiVersion: "ec2.aws.m.upbound.io/v1beta1",
      kind: "Subnet",
      metadata: {
        name: "my-subnet"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          availabilityZone: "us-west-2a",
          cidrBlock: "10.0.1.0/24",
          vpcIdSelector: {
            matchLabels: {
              vpc: "my-vpc"
            }
          },
          mapPublicIpOnLaunch: true,
          tags: {
            Name: "my-public-subnet",
            Type: "public"
          }
        }
      }
    });
  });
});

describe("EC2 SecurityGroup", () => {
  let securityGroup: SecurityGroup;

  beforeEach(() => {
    securityGroup = new SecurityGroup({
      metadata: {
        name: "my-security-group"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          description: "Security group for web servers",
          vpcIdSelector: {
            matchLabels: {
              vpc: "my-vpc"
            }
          },
          tags: {
            Name: "web-sg",
            Environment: "production"
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(securityGroup).toHaveProperty(
      "apiVersion",
      "ec2.aws.m.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(securityGroup).toHaveProperty("kind", "SecurityGroup");
  });

  it("validate", () => {
    expect(() => securityGroup.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(securityGroup.toJSON()).toEqual({
      apiVersion: "ec2.aws.m.upbound.io/v1beta1",
      kind: "SecurityGroup",
      metadata: {
        name: "my-security-group"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          description: "Security group for web servers",
          vpcIdSelector: {
            matchLabels: {
              vpc: "my-vpc"
            }
          },
          tags: {
            Name: "web-sg",
            Environment: "production"
          }
        }
      }
    });
  });
});

describe("EC2 Instance", () => {
  let instance: Instance;

  beforeEach(() => {
    instance = new Instance({
      metadata: {
        name: "my-ec2-instance"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          ami: "ami-0c55b159cbfafe1f0",
          instanceType: "t3.micro",
          subnetIdSelector: {
            matchLabels: {
              subnet: "my-subnet"
            }
          },
          vpcSecurityGroupIdSelector: {
            matchLabels: {
              sg: "my-security-group"
            }
          },
          tags: {
            Name: "my-web-server",
            Environment: "production"
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(instance).toHaveProperty(
      "apiVersion",
      "ec2.aws.m.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(instance).toHaveProperty("kind", "Instance");
  });

  it("validate", () => {
    expect(() => instance.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(instance.toJSON()).toEqual({
      apiVersion: "ec2.aws.m.upbound.io/v1beta1",
      kind: "Instance",
      metadata: {
        name: "my-ec2-instance"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          ami: "ami-0c55b159cbfafe1f0",
          instanceType: "t3.micro",
          subnetIdSelector: {
            matchLabels: {
              subnet: "my-subnet"
            }
          },
          vpcSecurityGroupIdSelector: {
            matchLabels: {
              sg: "my-security-group"
            }
          },
          tags: {
            Name: "my-web-server",
            Environment: "production"
          }
        }
      }
    });
  });
});

describe("EC2 InternetGateway", () => {
  let igw: InternetGateway;

  beforeEach(() => {
    igw = new InternetGateway({
      metadata: {
        name: "my-internet-gateway"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          vpcIdSelector: {
            matchLabels: {
              vpc: "my-vpc"
            }
          },
          tags: {
            Name: "my-igw"
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(igw).toHaveProperty("apiVersion", "ec2.aws.m.upbound.io/v1beta1");
  });

  it("should set kind", () => {
    expect(igw).toHaveProperty("kind", "InternetGateway");
  });

  it("validate", () => {
    expect(() => igw.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(igw.toJSON()).toEqual({
      apiVersion: "ec2.aws.m.upbound.io/v1beta1",
      kind: "InternetGateway",
      metadata: {
        name: "my-internet-gateway"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          vpcIdSelector: {
            matchLabels: {
              vpc: "my-vpc"
            }
          },
          tags: {
            Name: "my-igw"
          }
        }
      }
    });
  });
});

describe("EC2 RouteTable", () => {
  let routeTable: RouteTable;

  beforeEach(() => {
    routeTable = new RouteTable({
      metadata: {
        name: "my-route-table"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          vpcIdSelector: {
            matchLabels: {
              vpc: "my-vpc"
            }
          },
          tags: {
            Name: "public-route-table"
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(routeTable).toHaveProperty(
      "apiVersion",
      "ec2.aws.m.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(routeTable).toHaveProperty("kind", "RouteTable");
  });

  it("validate", () => {
    expect(() => routeTable.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(routeTable.toJSON()).toEqual({
      apiVersion: "ec2.aws.m.upbound.io/v1beta1",
      kind: "RouteTable",
      metadata: {
        name: "my-route-table"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          vpcIdSelector: {
            matchLabels: {
              vpc: "my-vpc"
            }
          },
          tags: {
            Name: "public-route-table"
          }
        }
      }
    });
  });
});
