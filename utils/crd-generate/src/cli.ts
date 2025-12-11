import yargs from "yargs/yargs";
import { readInput } from "@kubernetes-models/read-input";
import { generate, GenerateOptions } from "./generate";
import { readFileSync } from "fs";
import { join } from "path";

async function readFiles(paths: string[]): Promise<string> {
  const documents: string[] = [];

  for (const path of paths) {
    console.log("Reading:", path);
    documents.push(await readInput(path));
  }

  return documents.join("\n---\n");
}

function loadPkgConf(): Record<string, any> {
  try {
    const pkgPath = join(process.cwd(), "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    return pkg["crd-generate"] || {};
  } catch {
    return {};
  }
}

export async function run(): Promise<void> {
  const pkgConf = loadPkgConf();
  const args = await yargs(process.argv.slice(2))
    .option("input", {
      type: "array",
      describe: "Path of the input file or URL",
      string: true,
      demandOption: true,
      default: pkgConf.input
    })
    .option("output", {
      type: "string",
      describe: "Path of output files",
      demandOption: true,
      default: pkgConf.output
    })
    .option("yamlVersion", {
      type: "string",
      describe: "YAML version.",
      choices: ["1.0", "1.1", "1.2"],
      default: pkgConf.yamlVersion
    })
    .parse();

  try {
    await generate({
      input: await readFiles(args.input),
      outputPath: args.output,
      yamlVersion: args.yamlVersion as GenerateOptions["yamlVersion"]
    });
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
}
