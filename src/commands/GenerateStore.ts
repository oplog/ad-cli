import fs from "fs-extra";
import * as path from "path";
import { logger } from "../logger";
import { cwd, pathExists } from "../paths";
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
        this.addOption("-p --path <path>", "path of the project", cwd);
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

    public action = (name: string, options: any) => {

        let appPath: string = options.path || cwd;
        if (!path.isAbsolute(appPath)) {
            appPath = path.join(cwd, appPath);
        }

        const storeName = lowerize(name);

        if (!this.checkRequiredFiles(appPath)) {
            return;
        }

        const config = this.config(appPath);

        // Check if store folder previously exists
        const storeFolder = path.join(config.paths.store, storeName);
        const storeTestFolder = path.join(config.paths.tests, "store", storeName);
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
                srcTargetPath: path.join(storeFolder, "constants.ts"),
                exportTargetPath: path.join(storeFolder, "index.ts"),
            },
            actions: {
                src: generateActions(storeName),
                test: generateActionsTest(storeName),
                export: generateExport("actions"),
                srcTargetPath: path.join(storeFolder, "actions.ts"),
                testTargetPath: path.join(storeTestFolder, "actions.test.ts"),
                exportTargetPath: path.join(storeFolder, "index.ts"),
            },
            reducer: {
                src: generateReducer(storeName),
                test: generateReducerTest(storeName),
                export: generateExport("reducer"),
                srcTargetPath: path.join(storeFolder, "reducer.ts"),
                testTargetPath: path.join(storeTestFolder, "reducer.test.ts"),
                exportTargetPath: path.join(storeFolder, "index.ts"),
            },
            saga: {
                src: generateSaga(storeName),
                test: generateSagaTest(storeName),
                export: generateExport("actions"),
                srcTargetPath: path.join(storeFolder, "saga.ts"),
                testTargetPath: path.join(storeTestFolder, "saga.test.ts"),
                exportTargetPath: path.join(storeFolder, "index.ts"),
            },
            selectors: {
                src: generateSelectors(storeName),
                test: generateSelectorTests(storeName),
                export: generateExport("selectors"),
                srcTargetPath: path.join(storeFolder, "selectors.ts"),
                testTargetPath: path.join(storeTestFolder, "selectors.test.ts"),
                exportTargetPath: path.join(storeFolder, "index.ts"),
            },
            types: {
                src: generateTypes(storeName),
                export: generateExport("types"),
                srcTargetPath: path.join(storeFolder, "types.ts"),
                exportTargetPath: path.join(storeFolder, "index.ts"),
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
