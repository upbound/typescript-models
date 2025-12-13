import { describe, it, expect, beforeEach } from "vitest";
import { Bucket } from "../gen/s3.aws.m.upbound.io/v1beta1/Bucket";
import { BucketPolicy } from "../gen/s3.aws.m.upbound.io/v1beta1/BucketPolicy";
import { BucketPublicAccessBlock } from "../gen/s3.aws.m.upbound.io/v1beta1/BucketPublicAccessBlock";
import { Object as S3Object } from "../gen/s3.aws.m.upbound.io/v1beta1";

describe("S3 Bucket", () => {
  let bucket: Bucket;

  beforeEach(() => {
    bucket = new Bucket({
      metadata: {
        name: "my-s3-bucket"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          tags: {
            Environment: "production",
            Team: "platform"
          }
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(bucket).toHaveProperty("apiVersion", "s3.aws.m.upbound.io/v1beta1");
  });

  it("should set kind", () => {
    expect(bucket).toHaveProperty("kind", "Bucket");
  });

  it("validate", () => {
    expect(() => bucket.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(bucket.toJSON()).toEqual({
      apiVersion: "s3.aws.m.upbound.io/v1beta1",
      kind: "Bucket",
      metadata: {
        name: "my-s3-bucket"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          tags: {
            Environment: "production",
            Team: "platform"
          }
        }
      }
    });
  });
});

describe("S3 BucketPolicy", () => {
  let bucketPolicy: BucketPolicy;

  beforeEach(() => {
    bucketPolicy = new BucketPolicy({
      metadata: {
        name: "my-bucket-policy"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          bucketSelector: {
            matchLabels: {
              bucket: "my-s3-bucket"
            }
          },
          policy: JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: {
                  AWS: "arn:aws:iam::123456789012:root"
                },
                Action: "s3:GetObject",
                Resource: "arn:aws:s3:::my-bucket/*"
              }
            ]
          })
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(bucketPolicy).toHaveProperty(
      "apiVersion",
      "s3.aws.m.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(bucketPolicy).toHaveProperty("kind", "BucketPolicy");
  });

  it("validate", () => {
    expect(() => bucketPolicy.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(bucketPolicy.toJSON()).toEqual({
      apiVersion: "s3.aws.m.upbound.io/v1beta1",
      kind: "BucketPolicy",
      metadata: {
        name: "my-bucket-policy"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          bucketSelector: {
            matchLabels: {
              bucket: "my-s3-bucket"
            }
          },
          policy: JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: {
                  AWS: "arn:aws:iam::123456789012:root"
                },
                Action: "s3:GetObject",
                Resource: "arn:aws:s3:::my-bucket/*"
              }
            ]
          })
        }
      }
    });
  });
});

describe("S3 BucketPublicAccessBlock", () => {
  let publicAccessBlock: BucketPublicAccessBlock;

  beforeEach(() => {
    publicAccessBlock = new BucketPublicAccessBlock({
      metadata: {
        name: "my-bucket-public-access-block"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          bucketSelector: {
            matchLabels: {
              bucket: "my-s3-bucket"
            }
          },
          blockPublicAcls: true,
          blockPublicPolicy: true,
          ignorePublicAcls: true,
          restrictPublicBuckets: true
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(publicAccessBlock).toHaveProperty(
      "apiVersion",
      "s3.aws.m.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(publicAccessBlock).toHaveProperty("kind", "BucketPublicAccessBlock");
  });

  it("validate", () => {
    expect(() => publicAccessBlock.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(publicAccessBlock.toJSON()).toEqual({
      apiVersion: "s3.aws.m.upbound.io/v1beta1",
      kind: "BucketPublicAccessBlock",
      metadata: {
        name: "my-bucket-public-access-block"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          bucketSelector: {
            matchLabels: {
              bucket: "my-s3-bucket"
            }
          },
          blockPublicAcls: true,
          blockPublicPolicy: true,
          ignorePublicAcls: true,
          restrictPublicBuckets: true
        }
      }
    });
  });
});

describe("S3 Object", () => {
  let s3Object: S3Object;

  beforeEach(() => {
    s3Object = new S3Object({
      metadata: {
        name: "my-s3-object"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          bucketSelector: {
            matchLabels: {
              bucket: "my-s3-bucket"
            }
          },
          key: "path/to/object.json",
          contentType: "application/json",
          source: "local-file.json"
        }
      }
    });
  });

  it("should set apiVersion", () => {
    expect(s3Object).toHaveProperty(
      "apiVersion",
      "s3.aws.m.upbound.io/v1beta1"
    );
  });

  it("should set kind", () => {
    expect(s3Object).toHaveProperty("kind", "Object");
  });

  it("validate", () => {
    expect(() => s3Object.validate()).not.toThrow();
  });

  it("toJSON", () => {
    expect(s3Object.toJSON()).toEqual({
      apiVersion: "s3.aws.m.upbound.io/v1beta1",
      kind: "Object",
      metadata: {
        name: "my-s3-object"
      },
      spec: {
        forProvider: {
          region: "us-west-2",
          bucketSelector: {
            matchLabels: {
              bucket: "my-s3-bucket"
            }
          },
          key: "path/to/object.json",
          contentType: "application/json",
          source: "local-file.json"
        }
      }
    });
  });
});
