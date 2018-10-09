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
        const projectPath: string = this.resolveProjectPath(options.path);

        if (!this.checkRequiredFiles(projectPath)) {
            return;
        }

        const config = this.config(projectPath);
        const componentName = capitalize(name);

        const component = {
            componentCode: generateComponent({ componentName }),
            componentTestCode: generateComponentTest({ componentName }),
            componentTestFilePath: path.join(
                config.paths.tests,
                "components",
                `${this.type}s`,
                `${componentName}.test.tsx`,
            ),
            exportCode: generateExport(componentName),
            exportFolderPath: path.join(
                config.paths.components[`${this.type}s`],
                "index.ts",
            ),
            exportFilePath: path.join(
                config.paths.components[`${this.type}s`],
                componentName,
                "index.ts",
            ),
            componentFilePath: path.join(
                config.paths.components[`${this.type}s`],
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

        // read & replace root export of components/index.ts
        let rootComponentExportContent = fs.readFileSync(config.paths.components.index).toString();
        rootComponentExportContent = rootComponentExportContent.replace(
            `// export * from "./${this.type}s";`,
            `export * from "./${this.type}s";`,
        );
        fs.writeFileSync(config.paths.components.index, rootComponentExportContent);

        logger.info(`Component created at: ${component.componentFilePath}`);
        logger.info(`Component test created at: ${component.componentTestFilePath}`);
    }

}
