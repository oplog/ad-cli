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
