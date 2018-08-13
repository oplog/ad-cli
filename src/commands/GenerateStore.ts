import fs from "fs-extra";
import * as path from "path";
import { logger } from "../logger";
import { pathExists, targetPaths } from "../paths";
import { generateExport } from "../templates/export.t";
import { generateActions } from "../templates/store/actions.t";
import { generateConstants } from "../templates/store/constants.t";
import { generateReducer } from "../templates/store/reducer.t";
import { generateSaga } from "../templates/store/saga.t";
import { Command } from "./Command";
import { lowerize } from "../templates/string.utils";

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

        const storeName = lowerize(name);

        if (!this.checkRequiredFiles()) {
            return;
        }

        // Check if store folder previously exists
        const storeFolder = path.join(targetPaths.store, storeName);
        if (pathExists(storeFolder)) {
            logger.error(`Store folder already exists at ${storeFolder}`);
            return;
        }

        const store: {
            [key: string]: {
                src: string,
                export: string,
                srcTargetPath: string;
                exportTargetPath: string;
            };
        } = {
            constants: {
                src: generateConstants(storeName),
                export: generateExport("constants"),
                srcTargetPath: path.join(targetPaths.store, storeName, "constants.ts"),
                exportTargetPath: path.join(targetPaths.store, storeName, "index.ts"),
            },
            actions: {
                src: generateActions(storeName),
                export: generateExport("actions"),
                srcTargetPath: path.join(targetPaths.store, storeName, "actions.ts"),
                exportTargetPath: path.join(targetPaths.store, storeName, "index.ts"),
            },
            reducer: {
                src: generateReducer(storeName),
                export: generateExport("reducer"),
                srcTargetPath: path.join(targetPaths.store, storeName, "reducer.ts"),
                exportTargetPath: path.join(targetPaths.store, storeName, "index.ts"),
            },
            saga: {
                src: generateSaga(storeName),
                export: generateExport("actions"),
                srcTargetPath: path.join(targetPaths.store, storeName, "saga.ts"),
                exportTargetPath: path.join(targetPaths.store, storeName, "index.ts"),
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
    }

}
