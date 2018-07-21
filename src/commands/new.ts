import path from "path";
import { Command } from "../command";
import { templatePaths } from "../paths";

export class NewCommand extends Command {

    constructor() {
        super();
        this.addOption("-p", "--path [value]", "path to install web app template", __dirname);
    }

    public get alias(): string {
        return "n";
    }

    public get name(): string {
        return "new [name]";
    }

    public get description(): string {
        return "new creates a new web app of typescript atomic design redux template";
    }

    public action = (cmd: string, name: string) => {
        const appTemplatePath = path.join(templatePaths.app, "*");
        const cwd = __dirname;
        console.log(`cwd: ${cwd}`);
        console.log(`appTemplatePath: ${appTemplatePath}`);
        console.log(`name: ${name}`);
        // console.log(args);
        // fs.copySync(appTemplatePath, cwd)
    }

}
