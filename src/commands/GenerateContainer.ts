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

        let appPath: string = options.path || cwd;
        if (!path.isAbsolute(appPath)) {
            appPath = path.join(cwd, appPath);
        }

        if (!this.checkRequiredFiles(appPath)) {
            return;
        }

        const containersPath = path.join(appPath, "src", "containers");
        const containerCode = generateContainer({ containerName: name });
        const containerTestCode = generateContainerTest({ containerName: name });
        const containerTestPath = path.join(appPath, "__tests__", "containers");
        const exportCode = generateExport(`${capitalize(name)}Container`);

        logger.info(`Generating ${name} container..`);

        const containerExportFolderPath = path.join(
            containersPath,
            "index.ts",
        );

        const containerExportFilePath = path.join(
            containersPath,
            `${capitalize(name)}Container`,
            "index.ts",
        );

        const containerFilePath = path.join(
            containersPath,
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
        fs.appendFileSync(containerExportFolderPath, exportCode);

        logger.info(`Container created at: ${containerFilePath}`);
        logger.info(`Container test created at: ${containerTestFilePath}`);
    }

}
