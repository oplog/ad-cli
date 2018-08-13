import fs from "fs-extra";
import * as path from "path";
import { logger } from "../logger";
import { pathExists, targetPaths, testPath } from "../paths";
import { generateExport } from "../templates/export.t";
import { generateActions, generateActionsTest } from "../templates/store/actions.t";
import { generateConstants } from "../templates/store/constants.t";
import { generateReducer, generateReducerTest } from "../templates/store/reducer.t";
import { generateSaga, generateSagaTest } from "../templates/store/saga.t";
import { generateSelectors, generateSelectorTests } from "../templates/store/selectors.t";
import { generateTypes } from "../templates/store/types.t";
import { lowerize } from "../templates/string.utils";
import { Command } from "./Command";

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
                test?: string,
                export: string,
                srcTargetPath: string;
                testTargetPath?: string;
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
                test: generateActionsTest(storeName),
                export: generateExport("actions"),
                srcTargetPath: path.join(targetPaths.store, storeName, "actions.ts"),
                testTargetPath: path.join(testPath, "store", storeName, "actions.test.ts"),
                exportTargetPath: path.join(targetPaths.store, storeName, "index.ts"),
            },
            reducer: {
                src: generateReducer(storeName),
                test: generateReducerTest(storeName),
                export: generateExport("reducer"),
                srcTargetPath: path.join(targetPaths.store, storeName, "reducer.ts"),
                testTargetPath: path.join(testPath, "store", storeName, "reducer.test.ts"),
                exportTargetPath: path.join(targetPaths.store, storeName, "index.ts"),
            },
            saga: {
                src: generateSaga(storeName),
                test: generateSagaTest(storeName),
                export: generateExport("actions"),
                srcTargetPath: path.join(targetPaths.store, storeName, "saga.ts"),
                testTargetPath: path.join(testPath, "store", storeName, "saga.test.ts"),
                exportTargetPath: path.join(targetPaths.store, storeName, "index.ts"),
            },
            selectors: {
                src: generateSelectors(storeName),
                test: generateSelectorTests(storeName),
                export: generateExport("selectors"),
                srcTargetPath: path.join(targetPaths.store, storeName, "selectors.ts"),
                testTargetPath: path.join(testPath, "store", storeName, "selectors.test.ts"),
                exportTargetPath: path.join(targetPaths.store, storeName, "index.ts"),
            },
            types: {
                src: generateTypes(storeName),
                export: generateExport("types"),
                srcTargetPath: path.join(targetPaths.store, storeName, "types.ts"),
                exportTargetPath: path.join(targetPaths.store, storeName, "index.ts"),
            },
        };

        // create each files
        Object.keys(store).map((k) => {
            const storeItem = store[k];
            fs.outputFileSync(storeItem.srcTargetPath, storeItem.src);
            if (storeItem.test && storeItem.testTargetPath) {
                fs.outputFileSync(storeItem.testTargetPath, storeItem.test);
                logger.info(`${k} test is created at: ${storeItem.testTargetPath}`);
            }
            logger.info(`${k} is created at: ${storeItem.srcTargetPath}`);
            fs.outputFileSync(storeItem.exportTargetPath, storeItem.export);
            logger.info(`export is created at: ${storeItem.exportTargetPath}`);
        });
    }

}
