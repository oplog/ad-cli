import * as fs from "fs-extra";
import * as path from "path";
import { Command } from "../command";
import { logger } from "../logger";
import { targetPaths } from "../paths";
import { generateComponent } from "../templates/component";
import { generateExport } from "../templates/export.t";

export type ComponentType = (
    "atom" |
    "molecule" |
    "organism" |
    "template" |
    "page"
);

export class GenerateComponentCommand extends Command {

    constructor(private type: ComponentType) {
        super();
    }

    public get alias(): string {
        return `g:${this.type}`;
    }

    public get name(): string {
        return `generate:${this.type} [name]`;
    }

    public get description(): string {
        return `generates a(n) ${this.type} component`;
    }

    public action = (name: string) => {
        const componentCode = generateComponent({componentName: name});
        const exportCode = generateExport(name);

        logger.info(`Generating ${this.type} component..`);

        // TODO: Add check for duplicate component name

        const componentExportFolderPath = path.join(
            targetPaths.components,
            `${this.type}s`,
            "index.ts",
        );

        const componentExportFilePath = path.join(
            targetPaths.components,
            `${this.type}s`,
            name,
            "index.ts",
        );

        const componentFilePath = path.join(
            targetPaths.components,
            `${this.type}s`,
            name,
            `${name}.tsx`,
        );

        // create & write file
        fs.outputFileSync(componentFilePath, componentCode);
        fs.appendFileSync(componentExportFilePath, exportCode);
        fs.appendFileSync(componentExportFolderPath, exportCode);
        // write code on file

        logger.info(`Component ${this.type} created at: ${componentFilePath}`);
    }

}
