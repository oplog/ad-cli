import fs from "fs-extra";
import * as path from "path";
import { Command } from "../command";
import { logger } from "../logger";
import { targetPaths } from "../paths";
import { generateExport } from "../templates/export.t";
import { generateActions } from "../templates/store/actions.t";
import { generateConstants } from "../templates/store/constants.t";
import { generateReducer } from "../templates/store/reducer.t";
import { generateSaga } from "../templates/store/saga.t";

export class GenerateStoreCommand extends Command {

    constructor() {
        super();
    }

    public get alias(): string {
        return `g:store`;
    }

    public get name(): string {
        return `generate:store [name]`;
    }

    public get description(): string {
        return `generates a(n) store with constants, actions, reducer & saga`;
    }

    public action = (name: string) => {

        const store: {
            [key: string]: {
                src: string,
                export: string,
                srcTargetPath: string;
                exportTargetPath: string;
            };
        } = {
            constants: {
                src: generateConstants(name),
                export: generateExport("constants"),
                srcTargetPath: path.join(targetPaths.store, name, "constants.ts"),
                exportTargetPath: path.join(targetPaths.store, name, "index.ts"),
            },
            actions: {
                src: generateActions(name),
                export: generateExport("actions"),
                srcTargetPath: path.join(targetPaths.store, name, "actions.ts"),
                exportTargetPath: path.join(targetPaths.store, name, "index.ts"),
            },
            reducer: {
                src: generateReducer(name),
                export: generateExport("reducer"),
                srcTargetPath: path.join(targetPaths.store, name, "reducer.ts"),
                exportTargetPath: path.join(targetPaths.store, name, "index.ts"),
            },
            saga: {
                src: generateSaga(name),
                export: generateExport("actions"),
                srcTargetPath: path.join(targetPaths.store, name, "saga.ts"),
                exportTargetPath: path.join(targetPaths.store, name, "index.ts"),
            },
        };

        // create each files
        Object.keys(store).map((k) => {
            const storeItem = store[k];
            fs.outputFileSync(storeItem.srcTargetPath, storeItem.src);
            logger.info(`${k} is created at: ${storeItem.srcTargetPath}`);
            fs.outputFileSync(storeItem.exportTargetPath, storeItem.export);
            logger.info(`export is created at: ${storeItem.exportTargetPath}`);
        });

        // create & write file
        // fs.outputFileSync(componentFilePath, componentCode);
        // fs.appendFileSync(componentExportFilePath, exportCode);
        // fs.appendFileSync(componentExportFolderPath, exportCode);
        // write code on file

        // logger.info(`Component ${this.type} created at: ${componentFilePath}`);
    }

}
