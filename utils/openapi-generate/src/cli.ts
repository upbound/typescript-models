import yargs from "yargs/yargs";
import { readInput } from "@kubernetes-models/read-input";
import { generate } from "./generate";
import { mergeOpenAPISpecs } from "./utils";
import { readFileSync } from "fs";
import { join } from "path";

async function readFiles(paths: string[]): Promise<string> {
  const contents: string[] = [];

  for (const path of paths) {
    console.log("Reading:", path);
    contents.push(await readInput(path));
  }

  const spec = mergeOpenAPISpecs(contents.map((x) => JSON.parse(x)));

  return JSON.stringify(spec);
}

function loadPkgConf(): Record<string, any> {
  try {
    const pkgPath = join(process.cwd(), "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    return pkg["openapi-generate"] || {};
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
      demandOption: true,
      string: true,
      default: pkgConf.input
    })
    .option("output", {
      type: "string",
      describe: "Path of output files",
      demandOption: true,
      default: pkgConf.output
    })
    .parse();

  try {
    await generate({
      input: await readFiles(args.input),
      outputPath: args.output
    });
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
}
