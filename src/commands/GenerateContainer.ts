import * as fs from "fs-extra";
import * as path from "path";
import { logger } from "../logger";
import { pathExists, targetPaths } from "../paths";
import { generateContainer } from "../templates/container";
import { generateExport } from "../templates/export.t";
import { capitalize } from "../templates/string.utils";
import { Command } from "./Command";

export class GenerateContainerCommand extends Command {

    public get alias(): string {
        return `g:container`;
    }

    public get name(): string {
        return `generate:container [name]`;
    }

    public get description(): string {
        return `generates a(n) container`;
    }

    public action = (name: string) => {

        if (!this.checkRequiredFiles()) {
            return;
        }

        const containerCode = generateContainer({ containerName: name });
        const exportCode = generateExport(`${capitalize(name)}Container`);

        logger.info(`Generating ${name} container ..`);

        const containerExportFolderPath = path.join(
            targetPaths.containers,
            "index.ts",
        );

        const containerExportFilePath = path.join(
            targetPaths.containers,
            `${capitalize(name)}Container`,
            "index.ts",
        );

        const containerFilePath = path.join(
            targetPaths.containers,
            `${capitalize(name)}Container`,
            `${capitalize(name)}Container.tsx`,
        );

        if (pathExists(containerFilePath)) {
            logger.error(`Container "${name}" already exists at path: ${containerFilePath}`);
            return;
        }

        // create & write file
        fs.outputFileSync(containerFilePath, containerCode);
        fs.appendFileSync(containerExportFilePath, exportCode);
        fs.appendFileSync(containerExportFolderPath, exportCode);
        // write code on file

        logger.info(`Container created at: ${containerFilePath}`);
    }

}