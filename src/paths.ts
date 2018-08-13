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

export function pathExists(p: string): boolean {
    return fs.existsSync(p);
}
