import { Generator, OutputFile } from "@kubernetes-models/generate";
import { set } from "es-toolkit/compat";
import { camelCase } from "@kubernetes-models/string-util";

interface KeyMap {
  [key: string]: string | KeyMap;
}

function generate(map: KeyMap, parent = ""): OutputFile[] {
  const path = parent + "index.ts";
  let children: OutputFile[] = [];
  let content = "";

  for (const key of Object.keys(map)) {
    const val = map[key];

    if (typeof val === "string") {
      // On case-insensitive filesystems, importing "./Index" from "index.ts" creates a conflict
      // Import from IndexResource.ts but export as Index
      const fileName = val.toLowerCase() === "index" ? `${val}Resource` : val;

      if (val.toLowerCase() === "index") {
        content += `export { Index } from "./${fileName}";\n`;
      } else if (val === "Object") {
        // TypeScript doesn't allow class named "Object" in CommonJS mode
        // The class is renamed to S3Object, but we export it as Object for compatibility
        content += `export { S3Object as Object } from "./${val}";\n`;
      } else {
        content += `export * from "./${val}";\n`;
      }
    } else {
      const exportedName = camelCase(key, ".-");
      content += `export * as ${exportedName} from "./${key}/index";\n`;
      children = children.concat(generate(val, parent + key + "/"));
    }
  }

  return [{ path, content }, ...children];
}

const generateAliases: Generator = async (definitions) => {
  const map: KeyMap = {};

  for (const def of definitions) {
    for (const gvk of def.gvk || []) {
      set(map, [gvk.group, gvk.version, gvk.kind], gvk.kind);
    }
  }

  return generate(map);
};

export default generateAliases;
