package api.buildTypes

import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.powerShell
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.VcsTrigger
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.vcs

object BranchAPIBuild : BuildType ({
    name = "Branch Build and Test"

    var fixItFridayDir = "Fix-It-Friday"

    artifactRules = "+:$fixItFridayDir/dist/*.nupkg"
    
    templates(api.templates.BuildAndTestAPITemplate)

    vcs {
        root(_self.vcsRoots.EdFiOdsImplementation)
    }

    triggers {
        vcs {
            quietPeriodMode = VcsTrigger.QuietPeriodMode.USE_CUSTOM
            quietPeriod = 120
            triggerRules = """
                +:**
                -:root=${_self.vcsRoots.EdFiOdsImplementation.id}
            """.trimIndent()
            branchFilter = "+:<default>"
        }
    }

    steps {
        // Additional packaging step to augment the template build
        powerShell {
            name = "Package"            
            id = "BranchAPIBuild_Package"
            workingDir = "$fixItFridayDir"
            formatStderrAsError = true
            scriptMode = script {
                content = """
                    .\build-package.ps1 -Version %version% -BuildCounter %build.counter%
                """.trimIndent()
            }
        }
    }
})
