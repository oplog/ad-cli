import * as path from "path";
import { logger } from "../logger";
import { pathExists } from "../paths";
import { Option } from "./Option";

export abstract class Command {

    public options: Option[] = [];

    public abstract action: any;

    public abstract get alias(): string;

    public abstract get name(): string;

    public abstract get description(): string;

    protected checkRequiredFiles(appPath: string): boolean {
        const configPath = path.join(appPath, "ad-cli.config.json");
        if (pathExists(configPath)) {
            return true;
        }

        logger.error("Required files does not exist");
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
