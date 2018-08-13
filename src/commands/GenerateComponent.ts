import * as fs from "fs-extra";
import * as path from "path";
import { logger } from "../logger";
import { pathExists, targetPaths } from "../paths";
import { generateComponent } from "../templates/component";
import { generateExport } from "../templates/export.t";
import { capitalize } from "../templates/string.utils";
import { Command } from "./Command";

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

        const componentName = capitalize(name);

        if (!this.checkRequiredFiles()) {
            return;
        }

        const componentCode = generateComponent({ componentName });
        const exportCode = generateExport(componentName);

        logger.info(`Generating ${this.type} component..`);

        const componentExportFolderPath = path.join(
            targetPaths.components,
            `${this.type}s`,
            "index.ts",
        );

        const componentExportFilePath = path.join(
            targetPaths.components,
            `${this.type}s`,
            componentName,
            "index.ts",
        );

        const componentFilePath = path.join(
            targetPaths.components,
            `${this.type}s`,
            componentName,
            `${componentName}.tsx`,
        );

        // check if duplicate component is being created
        if (pathExists(componentFilePath)) {
            logger.error(`Component "${componentName}" does already exist at path: ${componentFilePath}`);
            return;
        }

        // create & write file
        fs.outputFileSync(componentFilePath, componentCode);
        fs.appendFileSync(componentExportFilePath, exportCode);
        fs.appendFileSync(componentExportFolderPath, exportCode);

        logger.info(`Component ${this.type} created at: ${componentFilePath}`);
    }

}
