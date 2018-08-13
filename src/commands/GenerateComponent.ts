import * as fs from "fs-extra";
import * as path from "path";
import { logger } from "../logger";
import { cwd, pathExists } from "../paths";
import { generateComponent, generateComponentTest } from "../templates/component";
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
        this.addOption("-p --path <path>", "path of the project", cwd);
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

    public action = (name: string, options: any) => {
        let appPath: string = options.path || cwd;
        if (!path.isAbsolute(appPath)) {
            appPath = path.join(cwd, appPath);
        }

        const componentsPath = path.join(appPath, "src", "components");
        const componentTestPath = path.join(appPath, "__tests__");
        const componentName = capitalize(name);

        if (!this.checkRequiredFiles(appPath)) {
            return;
        }

        const component = {
            componentCode: generateComponent({ componentName }),
            componentTestCode: generateComponentTest({ componentName }),
            componentTestFilePath: path.join(
                componentTestPath,
                "components",
                `${this.type}s`,
                `${componentName}.test.tsx`,
            ),
            exportCode: generateExport(componentName),
            exportFolderPath: path.join(
                componentsPath,
                `${this.type}s`,
                "index.ts",
            ),
            exportFilePath: path.join(
                componentsPath,
                `${this.type}s`,
                componentName,
                "index.ts",
            ),
            componentFilePath: path.join(
                componentsPath,
                `${this.type}s`,
                componentName,
                `${componentName}.tsx`,
            ),
        };

        logger.info(`Generating ${this.type} component..`);

        // check if duplicate component is being created
        if (pathExists(component.componentFilePath)) {
            logger.error(`Component "${componentName}" does already exist at path: ${component.componentFilePath}`);
            return;
        }

        // create & write file
        fs.outputFileSync(component.componentFilePath, component.componentCode);
        fs.outputFileSync(component.componentTestFilePath, component.componentTestCode);
        fs.appendFileSync(component.exportFilePath, component.exportCode);
        fs.appendFileSync(component.exportFolderPath, component.exportCode);

        logger.info(`Component ${this.type} created at: ${component.componentFilePath}`);
        logger.info(`Container test ${this.type} created at: ${component.componentTestFilePath}`);
    }

}
