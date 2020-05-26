param(
    [string]
    [validateset("debug", "release")]
    $Configuration = "debug",

    [string]
    [Parameter(Mandatory=$true)]
    $Version,

    [string]
    $VersionSuffix = ""
)

$parameters = @(
    "pack", "../FixItFriday.Api/FixItFriday.Api.csproj",
    "-p:PackageVersion=$Version"
    "-p:NuspecFile=$(Resolve-Path "$PSScriptRoot/FixItFriday.Api.nuspec")",
    "-p:NuspecProperties=\""Configuration=$Configuration;Version=$Version\""",
    "--no-build",
    "--no-restore",
    "--output", "$PSScriptRoot/dist"
)

write-host @parameters

if ($VersionSuffix) {
    $parameters.add("--version-suffix")
    $parameters.add($VersionSuffix)
}

dotnet @parameters