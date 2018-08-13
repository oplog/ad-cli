import { logger } from "../logger";
import { configPath, pathExists } from "../paths";
import { Option } from "./Option";

export abstract class Command {

    public options: Option[] = [];

    public abstract action: any;

    public abstract get alias(): string;

    public abstract get name(): string;

    public abstract get description(): string;

    protected checkRequiredFiles(): boolean {
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
