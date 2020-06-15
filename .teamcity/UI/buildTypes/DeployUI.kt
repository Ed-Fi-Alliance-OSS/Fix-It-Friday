package ui.buildTypes

import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.nuGetPublish
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.powerShell


object DeployUIBuild : BuildType ({
    name = "Deploy"

    params {
        param("octopus.release.project", "fix-it-friday-ui")
        param("octopus.project.id", "Projects-112")
    }

    dependencies {
        artifacts(BranchAUIBuild) {
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
            apiKey = "$octopus.apiKey%"
        }
    }
)}
