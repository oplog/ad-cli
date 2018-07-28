import * as fs from "fs-extra";
import * as path from "path";
import { Command } from "../command";
import { logger } from "../logger";
import { targetPaths } from "../paths";
import { generateComponent, generateExport } from "../templates/component";

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
        return `generates an ${this.type} component`;
    }

    public action = (name: string) => {
        const componentCode = generateComponent({componentName: name});
        const exportCode = generateExport({componentName: name});

        logger.info(`Generating ${this.type} component..`);

        const componentExportFolderPath = path.join(
            targetPaths.components,
            `${this.type}s`,
            "index.tsx",
        );

        const componentExportFilePath = path.join(
            targetPaths.components,
            `${this.type}s`,
            name,
            "index.tsx",
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
