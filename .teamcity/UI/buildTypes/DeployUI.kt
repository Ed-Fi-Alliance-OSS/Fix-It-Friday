package ui.buildTypes

import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.nuGetPublish
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.powerShell


object DeployUIBuild : BuildType ({
    name = "Deploy"

    params {
        param("octopus.release.version","<placeholder value>")
        param("octopus.release.project", "fix-it-friday-ui")
        param("octopus.project.id", "Projects-112")
    }

    dependencies {
        artifacts(BranchUIBuild) {
            buildRule = lastSuccessful()
            artifactRules = "+:*-pre*.nupkg"
        }
    }

    steps {
        nuGetPublish {
            name = "Publish NuGet Packages to Octopus Feed"
            toolPath = "%teamcity.tool.NuGet.CommandLine.DEFAULT%"
            packages = "**/*.nupkg"
            serverUrl = "%octopus.server.nugetFeed%"
            apiKey = "%octopus.apiKey%"
        }
        powerShell {
            name = "Extract release version from NuGet package"
            formatStderrAsError = true
            scriptMode = script {
                content = """
                    ${"$"}packages = Get-ChildItem -Path . -Filter *pre*.nupkg -Recurse
                    ${"$"}packageName = ${"$"}packages[0].Name
                    ${"$"}packageName -Match "fixitfriday\.ui\.(.+)\.nupkg"
                    Write-Host "##teamcity[setParameter name='octopus.release.version' value='${"$"}Matches[0]']"
                """.trimIndent()
            }
        }
        powerShell {
            name = "Create Release and Deploy to Integration"
            formatStderrAsError = true
            scriptMode = script {
                content = """
                    ${"$"}parameters = @{
                        "create-release",
                        "--project=%octopus.release.project%",
                        "--version=%octopus.release.version%"
                        "--package=%octopus.release.version%",
                        "--deployTo=%octopus.release.environment%"
                        "--deploymenttimeout=%octopus.deploy.timeout%""
                    }
                    octo.exe @parameters
                """.trimIndent()
            }
        }
    }

})
