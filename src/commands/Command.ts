import * as fs from "fs-extra";
import { merge } from "lodash";
import * as path from "path";
import { Config } from "../config";
import { logger } from "../logger";
import { pathExists, resolvePath } from "../paths";
import { Option } from "./Option";

const AD_CLI_CONFIG_FILE = "ad-cli.config.json";
const AD_CLI_DEFAULT_CONFIG_FILE = "ad-cli.config.default.json";

export abstract class Command {

    public options: Option[] = [];

    public abstract action: any;

    public abstract get alias(): string;

    public abstract get name(): string;

    public abstract get description(): string;

    protected config(appPath: string): Config {

        const configPath = path.join(appPath, AD_CLI_CONFIG_FILE);
        const defaultConfigPath = path.join(appPath, AD_CLI_DEFAULT_CONFIG_FILE);
        const appConfig = fs.readJsonSync(configPath);
        const defaultConfig = fs.readJsonSync(defaultConfigPath);

        const config = merge(defaultConfig, appConfig);

        return {
            paths: {
                components: {
                    atoms: resolvePath(appPath, config.paths.components.atoms),
                    molecules: resolvePath(appPath, config.paths.components.molecules),
                    organisms: resolvePath(appPath, config.paths.components.organisms),
                    templates: resolvePath(appPath, config.paths.components.templates),
                    pages: resolvePath(appPath, config.paths.components.pages),
                },
                store: resolvePath(appPath, config.paths.store),
                containers: resolvePath(appPath, config.paths.containers),
                tests: resolvePath(appPath, config.paths.tests),
            },
        };
    }

    protected checkRequiredFiles(appPath: string): boolean {
        const configPath = path.join(appPath, AD_CLI_CONFIG_FILE);
        if (pathExists(configPath)) {
            return true;
        }

        logger.error("Required files does not exist");
        logger.error(configPath);
        return false;
    }

    protected addOption(
        flag: string,
        description: string,
        defaultValue?: any) {

            const option: Option = {
                flag,
                description,
                defaultValue,
            };
            this.options.push(option);
    }

}
