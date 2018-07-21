import path from "path";

export const templatesFolder = path.join(".", "templates");
export const templatePaths = {
    app: path.join(templatesFolder, "app"),
    components: {
        atom: path.join(templatesFolder, "components", "atom"),
        molecule: path.join(templatesFolder, "components", "molecule"),
        organism: path.join(templatesFolder, "components", "organism"),
        page: path.join(templatesFolder, "components", "page"),
        template: path.join(templatesFolder, "components", "template"),
    },
};
