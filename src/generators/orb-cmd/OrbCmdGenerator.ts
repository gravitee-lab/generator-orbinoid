import chalk from "chalk";
import Dedent = require("dedent");
import { Generator, IComponentProvider, Question } from "extended-yo-generator";
import Path = require("path");
import YoSay = require("yosay");
import { IOrbCmdSettings } from "./IOrbCmdSettings";
import { LicenseType } from "./LicenseType";
import { OrbCmdSetting } from "./OrbCmdSetting";

/**
 * Provides the functionality to generate a generator written in TypeScript.
 */
export class OrbCmdGenerator extends Generator<IOrbCmdSettings>
{
    /**
     * Initializes a new instance of the `OrbCmdGenerator` class.
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
        return "orb-cmd";
    }

    protected get Questions(): Array<Question<IOrbCmdSettings>>
    {
        return [
            {
                type: "input",
                name: OrbCmdSetting.Destination,
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
                name: OrbCmdSetting.Name,
                message: "What's the name of your project?",
                default: (answers: IOrbCmdSettings) => Path.basename(answers[OrbCmdSetting.Destination])
            },
            {
                type: "input",
                name: OrbCmdSetting.Description,
                message: "Please enter a description."
            }
        ];
    }

    protected get ProvidedComponents(): IComponentProvider<IOrbCmdSettings>
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
                                            Name: settings[OrbCmdSetting.Name],
                                            Description: settings[OrbCmdSetting.Description]
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
                                    name: OrbCmdSetting.LicenseType,
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
                                        }
                                    ],
                                    default: LicenseType.GPL
                                }
                            ],
                            FileMappings: [
                                {
                                    Source: (settings) =>
                                    {
                                        switch (settings[OrbCmdSetting.LicenseType])
                                        {
                                            case LicenseType.Apache:
                                                return "Apache.txt";
                                            case LicenseType.GPL:
                                            default:
                                                return "GPL.txt";
                                        }
                                    },
                                    Destination: "LICENSE"
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
        this.log(YoSay(`Welcome to the ${chalk.whiteBright("orb-cmd")} generator!`));
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

            It lives in "${this.Settings[OrbCmdSetting.Destination]}"`));
    }
}