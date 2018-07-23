import { Command } from "../command";

export class GenerateCommand extends Command {

    constructor() {
        super();
    }

    public get alias(): string {
        return "g";
    }

    public get name(): string {
        return "generate [name]";
    }

    public get description(): string {
        return "generates a new web app of typescript atomic design redux template";
    }

    public action = (args: any[]) => {
        console.log(`generate -> action`);
    }

}
