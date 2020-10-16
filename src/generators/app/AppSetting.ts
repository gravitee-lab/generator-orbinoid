/**
 * Specifies a setting.
 */
export enum AppSetting
{
    /**
     * Indicates the `Destination`-setting.
     */
    Destination = "destination",

    /**
     * Indicates the `Name`-setting.
     */
    Name = "name",

    /**
     * Indicates the `Description`-setting.
     */
    Description = "description",

    /**
     * Indicates the `LicenseType`-setting.
     */
    LicenseType = "licenseType",
    /**
     * Indicates the Circle CI CLI executable binary file path
     */
    Cci_Cli_Binary = "/where/you/installed/on/your/machine/circleci",
    /**
     *  https://circleci.com
     */
    Cci_Server = "https://circleci.com"
}
