import * as fs from "fs-extra";
import * as path from "path";
import { Command } from "../command";
import { logger } from "../logger";
import { targetPaths } from "../paths";
import { generateComponent, generateExport } from "../templates/component";

export class GenerateAtomCommand extends Command {

    constructor() {
        super();
    }

    public get alias(): string {
        return "g:atom";
    }

    public get name(): string {
        return "generate:atom [name]";
    }

    public get description(): string {
        return "generates an atom component";
    }

    public action = (name: string) => {
        const componentCode = generateComponent({componentName: name});
        const exportCode = generateExport({componentName: name});

        logger.info("Generating atom..");

        const atomExportFolderPath = path.join(
            targetPaths.components.atom,
            "index.tsx",
        );

        const atomExportFilePath = path.join(
            targetPaths.components.atom,
            name,
            "index.tsx",
        );

        const atomFilePath = path.join(
            targetPaths.components.atom,
            name,
            `${name}.tsx`,
        );

        // create & write file
        fs.outputFileSync(atomFilePath, componentCode);
        fs.appendFileSync(atomExportFilePath, exportCode);
        fs.appendFileSync(atomExportFolderPath, exportCode);
        // write code on file

        logger.info(`Atom created at: ${atomFilePath}`);
    }

}
