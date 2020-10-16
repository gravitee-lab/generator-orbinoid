import chalk from "chalk";
import Dedent = require("dedent");
import { Generator, IComponentProvider, Question } from "extended-yo-generator";
import Path = require("path");
import YoSay = require("yosay");
import { AppSetting } from "./AppSetting";
import { IAppSettings } from "./IAppSettings";
import { LicenseType } from "./LicenseType";

/**
 * Provides the functionality to generate a generator written in TypeScript.
 */
export class AppGenerator extends Generator<IAppSettings>
{
    /**
     * Initializes a new instance of the `AppGenerator` class.
     *
     * @param args
     * A set of arguments for the generator.
     *
     * @param options
     * A set of options for the generator.
     */
    public constructor(args: string | string[], options: {})
    {
        super(args, options);
    }

    protected get TemplateRoot(): string
    {
        return "orb";
    }

    protected get Questions(): Array<Question<IAppSettings>>
    {
        return [
            {
                type: "input",
                name: AppSetting.Destination,
                message: "Where do you want to save your project to?",
                default: "./",
                filter: async input =>
                {
                    let destination = Path.isAbsolute(input) ? input : Path.resolve(process.cwd(), input);
                    this.destinationRoot(destination);
                    return destination;
                }
            },
            {
                type: "input",
                name: AppSetting.Name,
                message: "What's the name of your project?",
                default: (answers: IAppSettings) => Path.basename(answers[AppSetting.Destination])
            },
            {
                type: "input",
                name: AppSetting.Description,
                message: "Please enter a description."
            },
            {
                type: "input",
                name: AppSetting.Cci_Server,
                message: "What Circle CI Server do you want to use?",
                default: "https://circleci.com"
            },
            {
                type: "input",
                name: AppSetting.Cci_Cli_Binary,
                message: "What is the path of the Circle CI CLI binary executable on your machine ?",
                default: "/where/you/installed/on/your/machine/circleci"
            }
        ];
    }

    protected get ProvidedComponents(): IComponentProvider<IAppSettings>
    {
        return {
            Question: "What do you want to include in your workspace?",
            Categories: [
                {
                    DisplayName: "General",
                    Components: [
                        {
                            ID: "readme",
                            DisplayName: "README.md-File",
                            Default: true,
                            FileMappings: [
                                {
                                    Source: "README.md.ejs",
                                    Context: (settings) =>
                                    {
                                        return {
                                            Name: settings[AppSetting.Name],
                                            Description: settings[AppSetting.Description]
                                        };
                                    },
                                    Destination: "README.md"
                                }
                            ]
                        },
                        {
                            ID: "license",
                            DisplayName: "License-File",
                            Questions: [
                                {
                                    name: AppSetting.LicenseType,
                                    type: "list",
                                    message: "What license do you want to use?",
                                    choices: [
                                        {
                                            value: LicenseType.Apache,
                                            name: "Apache-2.0 License"
                                        },
                                        {
                                            value: LicenseType.GPL,
                                            name: "GNU GPL License"
                                        },
                                        {
                                            value: LicenseType.AGPLv3,
                                            name: "GNU Affero GPL v3 License"
                                        }
                                    ],
                                    default: LicenseType.GPL
                                }
                            ],
                            FileMappings: [
                                {
                                    Source: (settings) =>
                                    {
                                        switch (settings[AppSetting.LicenseType])
                                        {
                                            case LicenseType.Apache:
                                                return "license/Apache.txt";
                                            case LicenseType.GPL:
                                                return "license/Apache.txt";
                                            case LicenseType.AGPLv3:
                                            default:
                                                return "license/AGPLv3.txt";
                                        }
                                    },
                                    Destination: "LICENSE"
                                }
                            ]
                        },
                        {
                            ID: "dotenv",
                            DisplayName: "Env-File",
                            Default: true,
                            FileMappings: [
                                {
                                    Source: ".env.ejs",
                                    Context: (settings) =>
                                    {
                                        return {
                                            Cci_Server: settings[AppSetting.Cci_Server],
                                            Cci_Cli_Binary: settings[AppSetting.Cci_Cli_Binary]
                                        };
                                    },
                                    Destination: ".env"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }

    public async prompting()
    {
        this.log(YoSay(`Welcome to the ${chalk.whiteBright("orbinoid")} generator!`));
        return super.prompting();
    }

    public async writing()
    {
        return super.writing();
    }

    public async end()
    {
        this.log(Dedent(`
            Your project is ready!

            It lives in "${this.Settings[AppSetting.Destination]}"`));
    }
}
