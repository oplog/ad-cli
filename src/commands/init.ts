import { Command } from "../command";

export class InitCommand extends Command {

    constructor() {
        super();
        this.addOption("-p", "--path [value]", "path to install web app template", __dirname);
    }

    public get alias(): string {
        return "i";
    }

    public get name(): string {
        return "init";
    }

    public get description(): string {
        return "inits an existing web app of typescript atomic design redux template";
    }

    public action = (args: any[]) => {
        // console.log(args);
    }

}
