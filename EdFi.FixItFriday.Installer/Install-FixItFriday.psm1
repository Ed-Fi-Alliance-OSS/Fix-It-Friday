# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

#requires -version 5
$ErrorActionPreference = "Stop"

<#
To run manually from source code, instead of from an expanded NuGet package,
run the build-package.ps1 script first.
#>

$env:PathResolverRepositoryOverride = "Ed-Fi-Common;Ed-Fi-Ods;Ed-Fi-ODS-Implementation;"
Import-Module -Force -Scope Global "$PSScriptRoot/Ed-Fi-Common/logistics/scripts/modules/path-resolver.psm1"
Import-Module -Force $folders.modules.invoke("packaging/nuget-helper.psm1")
Import-Module -Force $folders.modules.invoke("tasks/TaskHelper.psm1")

Import-Module -Force $folders.modules.invoke("Application/Install.psm1") -Scope Global
Import-Module -Force $folders.modules.invoke("Application/Uninstall.psm1") -Scope Global
Import-Module -Force $folders.modules.invoke("Application/Configuration.psm1") -Scope Global

function Install-FixItFridayAPI {
    <#
    .SYNOPSIS
        Installs the Ed-Fi Fix-it-Friday API into IIS.

    .DESCRIPTION
        Installs and configures the Ed-Fi Fix-it-Friday API application in IIS running
        in Windows 10 or Windows Server 2016+. As needed, will create a new "Ed-Fi"
        website in IIS, configure it for HTTPS, and load the API binaries as an
        application. Transforms the web.config by injecting the runtime configuration.

    .EXAMPLE
        PS c:\> $parameters = @{
            ToolsPath = "C:/temp/tools"
        }
        PS c:\> Install-FixItFridayAPI @parameters
    #>
    [CmdletBinding()]
    param (
        # NuGet package name. Default: EdFi.FixItFriday.API.
        [string]
        $PackageName = "EdFi.FixItFriday.API",

        # NuGet package version. If not set, will retrieve the latest full release package.
        [string]
        $PackageVersion,

        # NuGet package feed/source. Defaults to https://www.myget.org/F/ed-fi/api/v3/index.json
        [string]
        $PackageSource = "https://www.myget.org/F/ed-fi/api/v3/index.json",

        # Path for storing installation tools, e.g. nuget.exe. Default: "./tools".
        [string]
        $ToolsPath = "$PSScriptRoot/tools",

        # Path for storing downloaded packages. Default: "./downloads".
        [string]
        $DownloadPath = "$PSScriptRoot/downloads",

        # Path for the IIS WebSite. Default: c:\inetpub\Ed-Fi.
        [string]
        $WebSitePath = "c:\inetpub\Ed-Fi", # NB: _must_ use backslash with IIS settings

        # Web site name. Default: "Ed-Fi".
        [string]
        $WebsiteName = "Ed-Fi",

        # Web site port number. Default: 443.
        [int]
        $WebSitePort = 443,

        # Path for the web application. Default: "c:\inetpub\Ed-Fi\FixItFridayApi".
        [string]
        $WebApplicationPath = "c:\inetpub\Ed-Fi\FixItFridayApi", # NB: _must_ use backslash with IIS settings

        # Web application name. Default: "FixItFridayApi".
        [string]
        $WebApplicationName = "FixItFridayApi",

        # Database connection information dictionary.
        #
        # The hashtable must include: Server, DatabaseName, and either
        # UseIntegratedSecurity or Username and Password. Optionally can include
        # Port.
        [hashtable]
        [Parameter(Mandatory=$true)]
        $DbConnectionInfo,

        # Turns off display of script run-time duration.
        [switch]
        $NoDuration
    )

    Write-InvocationInfo $MyInvocation

    Clear-Error
    
    Invoke-AssertDbConnectionInfo $DbConnectionInfo

    $result = @()

    $Config = @{
        WebApplicationPath = $WebApplicationPath
        PackageName = $PackageName
        PackageVersion = $PackageVersion
        PackageSource = $PackageSource
        ToolsPath = $ToolsPath
        DownloadPath = $DownloadPath
        WebSitePath = $WebSitePath
        WebSiteName = $WebsiteName
        WebSitePort = $WebsitePort
        WebApplicationName = $WebApplicationName
        DbConnectionInfo = $DbConnectionInfo
        NoDuration = $NoDuration
    }

    $elapsed = Use-StopWatch {

        $result += Get-FixItFridayPackage -Config $Config
        $result += Install-Application -Config $Config
        $result += New-ProductionAppSettingsFile -Config $Config

        $result
    }

    Test-Error

    if (-not $NoDuration) {
        $result += New-TaskResult -name "-" -duration "-"
        $result += New-TaskResult -name $MyInvocation.MyCommand.Name -duration $elapsed.format
        $result | Format-Table
    }
}

function Uninstall-FixItFridayAPI {
    <#
    .SYNOPSIS
        Removes the Ed-Fi Fix-it-Friday API application from IIS.
    .DESCRIPTION
        Removes the Ed-Fi Fix-it-Friday API application from IIS, including its
        application pool (if not used for any other application). Removes the
        web site as well if there are no remaining applications, and the site's
        app pool.

        Does not remove IIS or the URL Rewrite module.

    .EXAMPLE
        PS c:\> Uninstall-FixItFridayAPI

        Uninstall using all default values.
    .EXAMPLE
        PS c:\> $p = @{
            WebSiteName="Ed-Fi-3"
            WebApplicationPath="d:/octopus/applications/staging/FixItFridayAPI-3"
            WebApplicationName = "FixItFriday_API"
        }
        PS c:\> Uninstall-FixItFridayAPI @p

        Uninstall when the web application and web site were setup with non-default values.
    #>
    [CmdletBinding()]
    param (
        # Path for storing installation tools, e.g. nuget.exe. Default: "./tools".
        [string]
        $ToolsPath = "$PSScriptRoot/tools",

        # Path for the web application. Default: "c:\inetpub\Ed-Fi\FixItFridayAPI".
        [string]
        $WebApplicationPath = "c:\inetpub\Ed-Fi\FixItFridayAPI",

        # Web application name. Default: "FixItFridayAPI".
        [string]
        $WebApplicationName = "FixItFridayAPI",

        # Web site name. Default: "Ed-Fi".
        [string]
        $WebSiteName = "Ed-Fi",

        # Turns off display of script run-time duration.
        [switch]
        $NoDuration
    )

    $config = @{
        ToolsPath = $ToolsPath
        WebApplicationPath = $WebApplicationPath
        WebApplicationName = $WebApplicationName
        WebSiteName = $WebSiteName
    }
    
    $result = @()

    $elapsed = Use-StopWatch {

        $parameters = @{
            WebApplicationPath = $Config.WebApplicationPath
            WebApplicationName = $Config.WebApplicationName
            WebSiteName = $Config.WebSiteName
        }
        Uninstall-EdFiApplicationFromIIS @parameters

        $result
    }    

    Test-Error

    if (-not $NoDuration) {
        $result += New-TaskResult -name "-" -duration "-"
        $result += New-TaskResult -name $MyInvocation.MyCommand.Name -duration $elapsed.format
        $result | Format-Table
    }
}

function Invoke-AssertDbConnectionInfo {
    param (
        [parameter(Mandatory=$true)]
        [hashtable]
        $DbConnectionInfo
    )

    $DbConnectionInfo.Engine = "SqlServer"

    Assert-DatabaseConnectionInfo -DbConnectionInfo $DbConnectionInfo
}

function Get-FixItFridayPackage {
    [CmdletBinding()]
    param (
        [hashtable]
        [Parameter(Mandatory=$true)]
        $Config
    )

    Invoke-Task -Name ($MyInvocation.MyCommand.Name) -Task {
        $parameters = @{
            PackageName = $Config.PackageName
            PackageVersion = $Config.PackageVersion
            ToolsPath = $Config.ToolsPath
            OutputDirectory = $Config.DownloadPath
            PackageSource = $Config.PackageSource
        }
        $packageDir = Get-NugetPackage @parameters

        $Config.PackageDirectory = $packageDir

    }
}

function New-ProductionAppSettingsFile {
    [CmdletBinding()]
    param (
        [hashtable]
        [Parameter(Mandatory=$true)]
        $Config
    )

    $connectionString = New-ConnectionString -ConnectionInfo $Config.DbConnectionInfo
    
    $prodSettings = @{
        ConnectionStrings = @{
                FixItFriday = $connectionString
        }
    }
    
    $prodSettingsFile = Join-Path -Path $Config.PackageDirectory -ChildPath "appsettings.Production.json"

    $prodSettings | ConvertTo-Json | Out-File -FilePath $prodSettingsFile -NoNewline -Encoding UTF8
}

function Install-Application {
    [CmdletBinding()]
    param (
        [hashtable]
        [Parameter(Mandatory=$true)]
        $Config
    )

    Invoke-Task -Name ($MyInvocation.MyCommand.Name) -Task {

        $iisParams = @{
            SourceLocation = $Config.PackageDirectory
            WebApplicationPath = $Config.WebApplicationPath
            WebApplicationName = $Config.WebApplicationName
            WebSitePath = $Config.WebSitePath
            WebSitePort = $WebSitePort
            WebSiteName = $Config.WebSiteName
        }
       Install-EdFiApplicationIntoIIS @iisParams
    }
}

Export-ModuleMember -Function Install-FixItFridayAPI, Uninstall-FixItFridayAPI