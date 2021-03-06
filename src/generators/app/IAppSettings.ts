import { IGeneratorSettings } from "extended-yo-generator";
import { AppSetting } from "./AppSetting";
import { LicenseType } from "./LicenseType";

/**
 * Provides settings for the `AppGenerator`.
 */
export interface IAppSettings extends IGeneratorSettings
{
    /**
     * Gets or sets the destination.
     */
    [AppSetting.Destination]: string;

    /**
     * Gets or sets the name.
     */
    [AppSetting.Name]: string;

    /**
     * Gets or sets the description.
     */
    [AppSetting.Description]: string;

    /**
     * Gets or sets the type of the license.
     */
    [AppSetting.LicenseType]: LicenseType;
    /**
     * Gets or sets the Circle CI CLI executable binary file path
     */
    [AppSetting.Cci_Cli_Binary]: string;
    /**
     * Gets or sets the Circle CI Server URI
     */
    [AppSetting.Cci_Server]: string;
}
