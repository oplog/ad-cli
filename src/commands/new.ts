import * as fs from "fs-extra";
import * as path from "path";
import { Command } from "../command";
import { cwd, templatePaths } from "../paths";
import { exec } from "child_process";

export class NewCommand extends Command {

    constructor() {
        super();
        this.addOption("-p --path <path>", "path to install web app template", cwd);
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

    public action = (name: string, options: any) => {
        let appPath: string = options.path || cwd;
        if (!path.isAbsolute(appPath)) {
            appPath = path.join(cwd, appPath);
        }

        appPath = path.join(appPath, name);

        console.log(`name: ${name}`);
        console.log(`app path: ${appPath}`);

        console.log("Creating app...");
        console.log(`src: ${templatePaths.app}`);
        console.log(`dest: ${appPath}`);

        fs.copySync(templatePaths.app, appPath);

        const pathExists = fs.existsSync(appPath);
        if (pathExists) {
            exec("npm ")
        } else {
            console.error("Could not create app");
        }
    }

}
