---
title: "ALM Accelerator Part 1: An introduction"
description: "Welcome to a new series of posts where I look to provide an overview and in-depth guide on the ALM Accelerator. In Part 1, I want to run through what the ALM Accelerator is, how it can be used, and when to consider using it in your Power Platform development."
date: 2024-05-30
tags: ["DevOps", "Pipelines", "Power Platform", "ALM"]
---

Welcome to a new series of posts where I look to provide an overview and in-depth guide on the ALM Accelerator. In Part 1, I want to run through what the ALM Accelerator is, how it can be used, and when to consider using it in your Power Platform development.

Before we dive in, the full documentation on the ALM Accelerator can be found here: [https://learn.microsoft.com/en-us/power-platform/guidance/alm-accelerator/overview](https://learn.microsoft.com/en-us/power-platform/guidance/alm-accelerator/overview)

## Background


I recently went through an exercise of implementing the ALM Accelerator, and thought it would be a good topic to speak about. I have used various different ALM tools within Power Platform, and each provide great benefits depending on various factors, including maturity and resources required.

ALM Accelerator is a great stepping stone between not having any ALM, and going full-blown create-your-own within Github/Azure DevOps. It is relatively easy to set up and offers a comprehensive set of tools to get development teams up and running with best-practices.

## What is ALM anyway?

ALM stands for Application Lifecycle Management. To quote from the Microsoft Learn site on ALM ([https://learn.microsoft.com/en-us/power-platform/guidance/alm-accelerator/overview](https://learn.microsoft.com/en-us/power-platform/guidance/alm-accelerator/overview))

## Requirements

When exploring toolsets and methodologies, I had the following requirements in mind.

- Easy to use tool, with good documentation
- Maker friendly. A tool which could be picked up and used easily by makers who may not come from a pro-code background
- Ability to review code, and implement deployment approvals
- Cross-tenant deployment options
- Configurable deployment settings

Taking these requirements into account, it straight away eliminated the easiest option; Power Platform Pipelines due to lack of cross-tenant deployment options. Hopefully this is something which will be implemented in the future as it's the easiest tool to set up.

This left me with the two following options:

1. Configure everything from scratch using the Power Platform Build tools for Azure DevOps, with simplistic and often outdated guides.
2. Use the ALM Accelerator for Power Platform, with its well documented (and supported) patterns and practices.

In future instalments to the series, I will dive deep into how the ALM Accelerator can be adapted to support some of the more bespoke (but also quite commonly asked for!) features such as setting up for cross-tenant deployment and configuring deployment settings for these environments. Stay tuned!

## Prerequisites/Gotcha's!

Some things to be aware of when going down the ALM Accelerator route:

- You will need premium licensing.
- You will need to install the PowerCAT creator kit ([https://learn.microsoft.com/en-us/power-platform/guidance/creator-kit/setup](https://learn.microsoft.com/en-us/power-platform/guidance/creator-kit/setup))
- Code Components will need to be enabled in your host environment
- Access to Azure/Entra for App registration and Group creation will be required
- Admin access to Azure DevOps will be required for setting up and configuring the custom connector and Projects
- Although not a hard and fast requirement, a dedicated Power Platform environment will make maintaining the ALM Accelerator more straight forward.

In the next article, the focus will be on further understanding the set-up and configuration of the ALM Accelerator, and will lead in to more complex parts of the solution which aren't well documented.