import { Command } from "../command";

export class GenerateCommand extends Command {

    constructor() {
        super();
        this.addOption("-p", "--path [value]", "path to install web app template", __dirname);
    }

    public get alias(): string {
        return "g";
    }

    public get name(): string {
        return "generate";
    }

    public get description(): string {
        return "generates a new web app of typescript atomic design redux template";
    }

    public action = (args: any[]) => {
        // console.log(args);
        // console.log("[generated started]");
    }

}
