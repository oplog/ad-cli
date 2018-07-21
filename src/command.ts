import { Option } from "./option";

export abstract class Command {

    public options: Option[] = [];

    public abstract action: any;

    public abstract get alias(): string;

    public abstract get name(): string;

    public abstract get description(): string;

    protected addOption(
        short: string,
        long: string,
        description: string,
        defaultValue: any) {

            const option: Option = {
                short,
                long,
                description,
                defaultValue,
            };
            this.options.push(option);
    }

}
