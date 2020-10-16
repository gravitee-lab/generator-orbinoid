import { IGeneratorSettings } from "extended-yo-generator";
import { LicenseType } from "./LicenseType";
import { OrbCmdSetting } from "./OrbCmdSetting";

/**
 * Provides settings for the `OrbCmdGenerator`.
 */
export interface IOrbCmdSettings extends IGeneratorSettings
{
    /**
     * Gets or sets the destination.
     */
    [OrbCmdSetting.Destination]: string;

    /**
     * Gets or sets the name.
     */
    [OrbCmdSetting.Name]: string;

    /**
     * Gets or sets the description.
     */
    [OrbCmdSetting.Description]: string;

    /**
     * Gets or sets the type of the license.
     */
    [OrbCmdSetting.LicenseType]: LicenseType;
}