import * as path from "path";

export const cwd = process.cwd();
export const templatesFolder = path.join(__dirname, "..", "src", "templates");
export const templatePaths = {
    app: path.join(templatesFolder, "app"),
    components: path.join(templatesFolder, "components"),
    store: path.join(templatesFolder, "store"),
    // components: {
    //     atom: path.join(templatesFolder, "components", "atom"),
    //     molecule: path.join(templatesFolder, "components", "molecule"),
    //     organism: path.join(templatesFolder, "components", "organism"),
    //     page: path.join(templatesFolder, "components", "page"),
    //     template: path.join(templatesFolder, "components", "template"),
    // },
};

export const targetPaths = {
    components: path.join(cwd, "src", "components"),
    store: path.join(cwd, "src", "store"),
};
