import {
  Definition,
  generateImports,
  generateInterface,
  Generator,
  getAPIVersion,
  GroupVersionKind,
  Import,
  OutputFile
} from "@kubernetes-models/generate";
import { formatComment, trimSuffix } from "@kubernetes-models/string-util";
import { getRelativePath, getSchemaPath } from "../utils";

function getFieldType(key: string[]): string | undefined {
  if (key.length === 1 && key[0] === "metadata") {
    return "IObjectMeta";
  }
}

function generateDefinition(
  gvk: GroupVersionKind,
  def: Definition
): OutputFile {
  const apiVersion = getAPIVersion(gvk);
  const originalClassName = gvk.kind;
  // TypeScript doesn't allow class named "Object" in CommonJS mode
  // Rename it to S3Object while keeping interface as IObject
  const className =
    originalClassName === "Object" ? "S3Object" : originalClassName;
  const interfaceName = `I${originalClassName}`;
  const imports: Import[] = [];
  const interfaceContent = generateInterface(def.schema, {
    includeDescription: true,
    getFieldType
  });
  // On case-insensitive filesystems, Index.ts conflicts with index.ts
  // Use IndexResource.ts as the filename but keep the class name as Index
  const fileName =
    originalClassName.toLowerCase() === "index"
      ? `${originalClassName}Resource`
      : originalClassName;
  const path = `${apiVersion}/${fileName}.ts`;
  let classContent = generateInterface(def.schema, {
    getFieldType(key) {
      if (key.length === 1) {
        return `${interfaceName}${JSON.stringify(key)}`;
      }
    }
  });
  let comment = "";

  classContent =
    trimSuffix(classContent, "}") +
    `
static apiVersion: ${interfaceName}["apiVersion"] = ${JSON.stringify(
      apiVersion
    )};
static kind: ${interfaceName}["kind"] = ${JSON.stringify(gvk.kind)};
static is = createTypeMetaGuard<${interfaceName}>(${className});

constructor(data?: ModelData<${interfaceName}>) {
  super();

  this.setDefinedProps({
    apiVersion: ${className}.apiVersion,
    kind: ${className}.kind,
    ...data
  } as ${interfaceName});
}
}
`;

  imports.push({
    name: "IObjectMeta",
    path: "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta"
  });

  // Use alias for Model base class if className conflicts with reserved names
  // Note: Object is renamed to S3Object, so only check for Model here
  const reservedClassNames = ["Model"];
  const hasConflict = reservedClassNames.includes(className);
  const baseClassName = hasConflict ? "BaseModel" : "Model";

  imports.push({
    name: hasConflict ? "Model as BaseModel" : "Model",
    path: "@kubernetes-models/base"
  });

  imports.push({
    name: "ModelData",
    path: "@kubernetes-models/base"
  });

  imports.push({
    name: "setValidateFunc",
    path: "@kubernetes-models/base"
  });

  imports.push({
    name: "createTypeMetaGuard",
    path: "@kubernetes-models/base"
  });

  imports.push({
    name: "ValidateFunc",
    path: "@kubernetes-models/validate"
  });

  imports.push({
    name: "validate",
    path: getRelativePath(path, getSchemaPath(def.schemaId))
  });

  if (def.schema.description) {
    comment = formatComment(def.schema.description, {
      deprecated: /^deprecated/i.test(def.schema.description)
    });
  }

  return {
    path,
    content: `${generateImports(imports)}

${comment}export interface ${interfaceName} ${interfaceContent}

${comment}export class ${className} extends ${baseClassName}<${interfaceName}> implements ${interfaceName} ${classContent}

setValidateFunc(${className}, validate as ValidateFunc<${interfaceName}>);
`
  };
}

const generateDefinitions: Generator = async (definitions) => {
  const output: OutputFile[] = [];

  for (const def of definitions) {
    const gvks = def.gvk;

    if (gvks && gvks.length) {
      output.push(generateDefinition(gvks[0], def));
    }
  }

  return output;
};

export default generateDefinitions;
