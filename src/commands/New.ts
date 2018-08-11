import { exec } from "child_process";
import * as fs from "fs-extra";
import * as path from "path";
import { logger } from "../logger";
import { cwd, templatePaths } from "../paths";
import { Command } from "./Command";

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

        logger.debug(`name: ${name}`);
        logger.debug(`app path: ${appPath}`);

        logger.info("Creating app..");
        logger.debug(`src: ${templatePaths.app}`);
        logger.debug(`dest: ${appPath}`);

        if (fs.existsSync(appPath)) {
            logger.error(`Path: ${appPath} already exists. Could not create app`);
            return;
        }

        fs.copySync(templatePaths.app, appPath);

        if (fs.existsSync(appPath)) {
            logger.info("App created successfully.");
        } else {
            logger.error("App cannot be created.");
        }

        logger.info("Installing dependencies...");

        exec("npm install", { cwd: appPath }, (error, stdout, stderr) => {
            if (error) {
                logger.error(error);
            }

            logger.info(stdout);

            if (stderr) {
                logger.error(stderr);
            }

            logger.info("Done.");
        });
    }

}
