import * as fs from "fs-extra";
import * as path from "path";
import { logger } from "../logger";
import { cwd, pathExists } from "../paths";
import { generateContainer, generateContainerTest } from "../templates/container";
import { generateExport } from "../templates/export.t";
import { capitalize } from "../templates/string.utils";
import { Command } from "./Command";

export class GenerateContainerCommand extends Command {

    constructor() {
        super();
        this.addOption("-p --path <path>", "path of the project", cwd);
    }

    public get alias(): string {
        return `g:container`;
    }

    public get name(): string {
        return `generate:container [name]`;
    }

    public get description(): string {
        return `generates a(n) container`;
    }

    public action = (name: string, options: any) => {

        const projectPath: string = this.resolveProjectPath(options.path);

        if (!this.checkRequiredFiles(projectPath)) {
            return;
        }

        const config = this.config(projectPath);

        const containerCode = generateContainer({ containerName: name });
        const containerTestCode = generateContainerTest({ containerName: name });
        const containerTestPath = path.join(config.paths.tests, "containers");
        const exportCode = generateExport(`${capitalize(name)}Container`);

        logger.info(`Generating ${name} container..`);

        const containerExportFilePath = path.join(
            config.paths.containers,
            `${capitalize(name)}Container`,
            "index.ts",
        );

        const containerFilePath = path.join(
            config.paths.containers,
            `${capitalize(name)}Container`,
            `${capitalize(name)}Container.tsx`,
        );

        const containerTestFilePath = path.join(
            containerTestPath,
            `${capitalize(name)}Container.test.tsx`,
        );

        if (pathExists(containerFilePath)) {
            logger.error(`Container "${name}" already exists at path: ${containerFilePath}`);
            return;
        }

        // create & write file
        fs.outputFileSync(containerFilePath, containerCode);
        fs.outputFileSync(containerTestFilePath, containerTestCode);
        fs.appendFileSync(containerExportFilePath, exportCode);

        logger.info(`Container created at: ${containerFilePath}`);
        logger.info(`Container test created at: ${containerTestFilePath}`);
    }

}
