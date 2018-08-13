import * as fs from "fs";
import * as path from "path";

export const cwd = process.cwd();

export const templatesFolder = path.join(__dirname, "..", "src", "templates");

export const templatePaths = {
    app: path.join(templatesFolder, "app"),
    components: path.join(templatesFolder, "components"),
    containers: path.join(templatesFolder, "containers"),
    store: path.join(templatesFolder, "store"),
};

export const targetPaths = {
    components: path.join(cwd, "src", "components"),
    store: path.join(cwd, "src", "store"),
    containers: path.join(cwd, "src", "containers"),
};

export const testPath = path.join(cwd, "__tests__");

export const configPath = path.join(cwd, "ad-cli.config.json");

export function pathExists(p: string): boolean {
    return fs.existsSync(p);
}
