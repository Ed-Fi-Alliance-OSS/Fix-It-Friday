package UI

import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.Project

object UIProject : Project({
    id("FixItFriday_UI")
    name = "UI"
    description = "Fix-it-Friday User Interface"
    
    params {        
        param("version.major", "0")
        param("version.minor", "1")
        param("version.patch", "0")
    }

    template(BuildAndTestUITemplate)
})