import * as fs from "fs-extra";
import * as path from "path";
import { logger } from "../logger";
import { cwd, templatePaths } from "../paths";
import { AD_CLI_CONFIG_FILE, AD_CLI_DEFAULT_CONFIG_FILE, Command } from "./Command";

export class InitCommand extends Command {

    constructor() {
        super();
        this.addOption("-p --path <path>", "path to install web app template", cwd);
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

    public action = (options: any) => {
        let appPath: string = options.path || cwd;
        if (!path.isAbsolute(appPath)) {
            appPath = path.join(cwd, appPath, "./.");
        }

        logger.info("Initializing app..");

        const paths = {
            cliConfigSrc: path.join(
                templatePaths.app,
                AD_CLI_CONFIG_FILE,
            ),
            cliConfigDest: path.join(
                appPath,
                AD_CLI_CONFIG_FILE,
            ),
            cliDefaultConfigSrc: path.join(
                templatePaths.app,
                AD_CLI_DEFAULT_CONFIG_FILE,
            ),
            cliDefaultConfigDest: path.join(
                appPath,
                AD_CLI_DEFAULT_CONFIG_FILE,
            ),
        };

        fs.copyFileSync(paths.cliConfigSrc, paths.cliConfigDest);
        fs.copyFileSync(paths.cliDefaultConfigSrc, paths.cliDefaultConfigDest);

        logger.info(`cli config generated at: ${appPath}`);
        logger.info(`cli default config generated at: ${appPath}`);

    }

}
