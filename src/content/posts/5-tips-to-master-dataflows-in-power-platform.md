---
title: "5 tips to master dataflows in Power Platform"
description: "Dataflows are a great tool to learn in Power Platform. They feel often forgotten, but are a fantastic way to bring data in to Dataverse solutions and transform and shape the data before it reaches your table."
date: 2024-02-10
tags: ["Power Platform", "Dataflows", "Dataverse", "Power Query"]
---

Dataflows are a great tool to learn in Power Platform. They feel often forgotten, but are a fantastic way to bring data in to Dataverse solutions and transform and shape the data before it reaches your table.

If you are aren't using Dataflows to bring data into Dataverse, then seriously consider looking in to it for your next project. It provides a much easier and cleaner (not to mention faster!) method to bulk import data when compared to Power Automate, and the transformation capabilities make data shaping something that can actually be enjoyable (looking at you Power Automate expressions!).

I've compiled 5 tips which will help answer any questions you may have when starting to build dataflows, and hopefully leave you thinking about using them more and relying less on other solutions to do something Dataflows excel at!

## Tip 1: Choices and Lookups

You can map data to Choices and Lookups using Dataflows. Oftentimes Dataflows won't be considered as people don't realise that you can map choices and lookups. For choices, you will need to make sure your values from your datasource match the Choice values (not labels!) in Dataverse so that they can migrate across seamlessly. Using the Power of the Conditional Column action in Power Query, you can transform your option choices to match the values in Dataverse. Yay!

To import Lookup values, configure an alternate key on your lookup table (see here for how to do that if unsure: [https://learn.microsoft.com/en-us/power-apps/maker/data-platform/define-alternate-keys-reference-records](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/define-alternate-keys-reference-records)). Side note: If you're not using alternate keys in your solutions, why not? They offer performance advantages and make working with relationships/data imports easier!

Once your key is set up, that's it. When you go to map your columns, you will be able to map to the lookup column, and provided the value exists in the Dataverse table, it will import without a hitch. "But I don't have my lookup values in the table yet!" Just use a separate Dataflow to extract all the values you need into the table, simple!

## Tip 2: Keys, Keys, Keys!

In case the above wasn't clear, Keys play an important part in making sure Dataflows import data smoothly and effectively they can help import lookup values, and also prevent duplicates. If you are importing data into Dataverse, Set up an alternate key to prevent duplicates and increase refresh speeds. If a Key is set on your destination table, and a record exists already, when the dataflow is run, it will pick up that a record already exists and update it instead. if it doesn't exist it will create it. Nice!

## Tip 3: Bulk Data updates/External system sync

A common scenario a developer in Power Platform will encounter at some point in the journey is the requirement to keep a Dataverse table in sync with either an external system or perform a regular data dump into a table.

Instinctively, Power Automate usually comes to mind, however Power Automate (in my opinion) isn't the best tool to be handling lots of records, especially where an Apply To Each is involved. An operation that could take minutes in Power Automate, can take seconds using a Dataflow. Where there's 1000's of records to sync/import, the differences become very marked.

Where an import/update/sync needs to happen in the background, a Dataflow is a clear winner, any data cleansing, filtering, transformation can be handled directly within Power Query and will be fast and efficient, and save you the pain of needing to write Power Automate expressions (unless you like that, then power to you).

Outside of a background operation, if a user needs to manually start a process, a Power Automate flow might still make sense, as it's possible to keep the user informed of what is happening. Dataflows can be triggered using Power Automate too so a balance could be had if it was required. A plugin or PowerFx might present a better option however when it comes down to user experience, so be sure to weight up all the options when developing these types of solutions.

## Tip 4: Use Solutions

This may be an obvious one to those of us that have been working in Power Platform for a while. Every component that can be put inside a solution should be, and Dataflows are no exception. If you've spent a long time building the perfect army of Dataflows in your Development environment, it would be extremely demoralising to then have to rebuild them in UAT and Production manually.

Using Solutions allows you to build your Dataflows in Development, Export them, then Import them into your target environment. You will also be able to change the data source if for example if you were using different data sources between Dev, UAT and production. (and if you don't use different segmented data sources for each stage of development, you may have bigger issues at hand).

## Tip 5: Data Transformation can be fun

Dataflows are extremely powerful in transforming data using Power Query. Learning how to merge queries together, combine queries, change column types, group columns, split columns, etc, all provide a really flexible approach to ensuring the data you import into Dataverse is consistent, structured and simple.

A common phrase that is mentioned when talking about data is "Junk in, Junk out", and using Power Query can really help in ensuring only the right data is imported into Dataverse. Consider doing heavier logic operations at this stage rather than once the data is in Dataverse for performance improvements, but also consider the User experience and how Dataflows can play a part in it. Arguably, a Dataflow could be the difference between an app that is loaded full of un-necessary data and difficult to understand and navigate due to lack of structure, vs. a well thought out app with a clean, simple data structure that is simple to understand and use.

Hope this helps elevate your Power Platform Solutions! 🚀
