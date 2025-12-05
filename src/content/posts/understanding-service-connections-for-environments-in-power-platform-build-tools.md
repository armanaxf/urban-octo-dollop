---
title: "Understanding Service Connections for Environments in Power Platform Build tools"
description: "Understand how Service connections can be used in Power Platform Build tools for DevOps. Learn how to set up and use service connections to target different environments."
date: 2024-01-08
tags: ["Power Platform", "DevOps", "Azure DevOps", "Build Tools", "ALM"]
---

If you are new to Power Platform Build tools and how it can facilitate Continuous Integration/Continuous Development (CI/CD), it can be very daunting to understand where to start and how to get up and running.

Microsoft's Documentation is great for gaining an understanding of how to get up and running using Azure DevOps, however the documentation doesn't seem to be the most up to date, as examples are still using classic pipelines (instead of YAML), and the documentation doesn't appear to contain any information on some of the latest functionality that has been introduced recently (which is a shame as it's great!)

In this post I would like to highlight the benefits of service connections in Azure DevOps when working with Power Platform Build Tools and hopefully simplify the process of using service connections to target different environments when working with CI/CD.

I won't cover how to setup a Service Principle, as this has been covered plenty already, and The documentation also goes over this in good detail, see [here](https://learn.microsoft.com/en-us/power-platform/alm/devops-build-tools).

## Adding a Service Connection to Azure DevOps

Adding a service connection to Azure DevOps is a straightforward procedure:

**Step 1:** Within your Azure DevOps Project, go to "Project Settings"

**Step 2:** Select "Service Connections"

**Step 3:** Search for Power Platform in the Service connections list and click "Next"

**Step 4:** Select "Application Id and Client Secret" and then fill in the rest of the options:

- **Server URL** - This is the Power Platform Environment you will have added your App registration to when setting up the App Registration for Power Platform. You can get the URL by navigating to your environment within Power Platform, clicking the settings cog at the top right, and then clicking "session details".
- **Tenant Id:** Tenant ID of your App Registration
- **Application Id:** App ID (Client ID) of your App Registration
- **Client Secret of Application ID:** Secret generated when you created the App Registration
- **Service Connection Name:** Name of your connection. Name it something easy to remember and easy to reference.
- Ensure "Grant access permission to all pipelines" is ticked

**Step 5:** Click "Save". This will create the Service connection which can now be used within your pipelines.

## The Magic of Service Connections

Now this is where the magic happens (and also where the docs aren't very clear!), you can use this connection, and target any environment within your Power Platform Tenant, as long as you have added the app registration to them first.

If you decide to automate Environment creation via the pipeline (and you should as it's a big timesaver), it will actually automatically add the app registration to the created environment and store the environment in a pipeline variable called `BuildTools.EnvironmentUrl`, which you can then use to automate further tasks as part of an environment set-up and configuration. An example of this could be to then import a solution so that it's ready for developers.

An example of this pipeline could look like this:

```yaml
trigger:
  - none

pool:
  vmImage: windows-latest

steps:
  - task: PowerPlatformToolInstaller@2
    inputs:
      DefaultVersion: true

  - task: PowerPlatformPackSolution@2
    inputs:
      SolutionSourceFolder: '$(Build.SourcesDirectory)\ExportedSolutions\$(SolutionName)'
      SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(SolutionName)_Unmanaged.zip'
      SolutionType: 'UnManaged'
      ProcessCanvasApps: true

  - task: PublishPipelineArtifact@1
    inputs:
      targetPath: '$(Build.ArtifactStagingDirectory)\$(SolutionName)_Unmanaged.zip'
      artifact: 'Solution'
      publishLocation: 'pipeline'

  - task: PowerPlatformCreateEnvironment@2
    inputs:
      authenticationType: 'PowerPlatformSPN'
      PowerPlatformSPN: 'MyServiceConnection'
      DisplayName: '$(SolutionName)-$(Build.BuildId)'
      EnvironmentSku: 'Sandbox'
      LocationName: 'unitedkingdom'
      LanguageName: 'English'
      CurrencyName: 'GBP'
      DomainName: '$(SolutionName)-$(Build.BuildId)'

  - task: PowerPlatformImportSolution@2
    inputs:
      authenticationType: 'PowerPlatformSPN'
      PowerPlatformSPN: 'MyServiceConnection'
      SolutionInputFile: '$(Build.ArtifactStagingDirectory)\$(SolutionName)_Unmanaged.zip'
      AsyncOperation: true
      MaxAsyncWaitTime: '60'
```

This pipeline is essentially doing what was mentioned above, but notice that the Environment isn't specified in these tasks, just the Service Connection. This is a nice feature of the "Create Environment" task, which sets the `BuildTools.EnvironmentUrl` as an output so that the import task can be run against the newly created Environment. Neat!

## Targeting Existing Environments

How would this work for existing environments? Up until recently I was led to believe I would need a different service connection for each Environment I want to run tasks against. This is not the case however, as provided the service connection has access, you can just target the Environment as part of the pipeline settings:

```yaml
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: 'PowerPlatformSPN'
    PowerPlatformSPN: 'MyServiceConnection'
    Environment: '$(EnvURL)'
    SolutionName: '$(SolutionName)'
    SolutionOutputFile: '$(Build.ArtifactStagingDirectory)\$(SolutionName).zip'
    AsyncOperation: true
    MaxAsyncWaitTime: '60'
```

Notice in the above export solution task how the Service Connection remains the same but an additional parameter named "Environment" is set with a pipeline variable which is defined on runtime to point to the Environment URL. This is a great way to quickly get set up and manage multiple environments, especially when managing them as part of an overall strategy where Environments are short lived for features/hotfixes as part of an overall branching strategy in Azure DevOps.

I hope this has been useful and provides some insight on how you can begin to automate tasks as part of a healthy ALM set-up within the Power Platform.
