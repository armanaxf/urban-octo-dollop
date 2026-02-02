
-- Insert post: 5 tips to master dataflows in Power Platform
INSERT INTO posts (slug, title, description, content, image_url, published, created_at, updated_at, published_at)
VALUES (
    '5-tips-to-master-dataflows-in-power-platform',
    '5 tips to master dataflows in Power Platform',
    'Dataflows are a great tool to learn in Power Platform. They feel often forgotten, but are a fantastic way to bring data in to Dataverse solutions and transform and shape the data before it reaches your table.',
    'Dataflows are a great tool to learn in Power Platform. They feel often forgotten, but are a fantastic way to bring data in to Dataverse solutions and transform and shape the data before it reaches your table.

If you are aren''t using Dataflows to bring data into Dataverse, then seriously consider looking in to it for your next project. It provides a much easier and cleaner (not to mention faster!) method to bulk import data when compared to Power Automate, and the transformation capabilities make data shaping something that can actually be enjoyable (looking at you Power Automate expressions!).

I''ve compiled 5 tips which will help answer any questions you may have when starting to build dataflows, and hopefully leave you thinking about using them more and relying less on other solutions to do something Dataflows excel at!

![](/blog-images/teach-you-yoda.gif)

## Tip 1: Choices and Lookups

You can map data to Choices and Lookups using Dataflows. Oftentimes Dataflows won''t be considered as people don''t realise that you can map choices and lookups. For choices, you will need to make sure your values from your datasource match the Choice values (not labels!) in Dataverse so that they can migrate across seamlessly. Using the Power of the Conditional Column action in Power Query, you can transform your option choices to match the values in Dataverse. Yay!

Conditional columns are awesome in Power Query, check them out.

To import Lookup values, configure an alternate key on your lookup table (see here for how to do that if unsure: [https://learn.microsoft.com/en-us/power-apps/maker/data-platform/define-alternate-keys-reference-records](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/define-alternate-keys-reference-records)). **Side note: If you''re not using alternate keys in your solutions, why not? They offer performance advantages and make working with relationships/data imports easier!**

Once your key is set up, that''s it. When you go to map your columns, you will be able to map to the lookup column, and provided the value exists in the Dataverse table, it will import without a hitch. "**But I don''t have my lookup values in the table yet!"** Just use a separate Dataflow to extract all the values you need into the table, simple!

## Tip 2: Keys, Keys, Keys!

In case the above wasn''t clear, Keys play an important part in making sure Dataflows import data smoothly and effectively they can help import lookup values, and also prevent duplicates. If you are importing data into Dataverse, Set up an alternate key to prevent duplicates and increase refresh speeds. If a Key is set on your destination table, and a record exists already, when the dataflow is run, it will pick up that a record already exists and update it instead. if it doesn''t exist it will create it. Nice!

![three assorted-color keys](/blog-images/photo-1561023367-50a6e054d890)

## Tip 3: Bulk Data updates/External system sync

A common scenario a developer in Power Platform will encounter at some point in the journey is the requirement to keep a Dataverse table in sync with either an external system or perform a regular data dump into a table.

Instinctively, Power Automate usually comes to mind, however Power Automate (in my opinion) isn''t the best tool to be handling lots of records, especially where an Apply To Each is involved. An operation that could take minutes in Power Automate, can take seconds using a Dataflow. Where there''s 1000''s of records to sync/import, the differences become very marked.

Where an import/update/sync needs to happen in the background, a Dataflow is a clear winner, any data cleansing, filtering, transformation can be handled directly within Power Query and will be fast and efficient, and save you the pain of needing to write Power Automate expressions (unless you like that, then power to you).

Outside of a background operation, if a user needs to manually start a process, a Power Automate flow might still make sense, as it''s possible to keep the user informed of what is happening. Dataflows can be triggered using Power Automate too so a balance could be had if it was required. A plugin or PowerFx might present a better option however when it comes down to user experience, so be sure to weight up all the options when developing these types of solutions.

## Tip 4: Use Solutions

This may be an obvious one to those of us that have been working in Power Platform for a while. Every component that can be put inside a solution should be, and Dataflows are no exception. If you''ve spent a long time building the perfect army of Dataflows in your Development environment, it would be extremely demoralising to then have to rebuild them in UAT and Production manually.

Using Solutions allows you to build your Dataflows in Development, Export them, then Import them into your target environment. You will also be able to change the data source if for example if you were using different data sources between Dev, UAT and production. (and if you don''t use different segmented data sources for each stage of development, you may have bigger issues at hand).

## Tip 5: Data Transformation can be fun

![](/blog-images/this-is.gif)

Dealing with customer data can really feel like this sometimes. Power Query can help.

Dataflows are extremely powerful in transforming data using Power Query. Learning how to merge queries together, combine queries, change column types, group columns, split columns, etc, all provide a really flexible approach to ensuring the data you import into Dataverse is consistent, structured and simple.

A common phrase that is mentioned when talking about data is "Junk in, Junk out", and using Power Query can really help in ensuring only the right data is imported into Dataverse. Consider doing heavier logic operations at this stage rather than once the data is in Dataverse for performance improvements, but also consider the User experience and how Dataflows can play a part in it. Arguably, a Dataflow could be the difference between an app that is loaded full of un-necessary data and difficult to understand and navigate due to lack of structure, vs. a well thought out app with a clean, simple data structure that is simple to understand and use.

Hope this helps elevate your Power Platform Solutions! 🚀',
    NULL,
    TRUE,
    '2024-04-09T00:00:00.000Z',
    '2024-04-09T00:00:00.000Z',
    '2024-04-09T00:00:00.000Z'
);


-- Insert post: About me
INSERT INTO posts (slug, title, description, content, image_url, published, created_at, updated_at, published_at)
VALUES (
    'about',
    'About me',
    'Hello! I''m Josh, a Power Platform Solution Architect from Scotland. I created my blog as a place where I can write about cool and interesting things I find whilst working on Power Platform Projects.',
    'Hello!

I''m Josh, a Power Platform Solution Architect from Scotland.

I created my blog as a place where I can write about cool and interesting things I find whilst working on Power Platform Projects. I like to share these findings and ideas in hope that it may help people find solutions to problems.

I hope to create high quality content and improve my blogging skills along the way. Thanks for checking my blog out and I hope you enjoy it!',
    NULL,
    TRUE,
    '2024-01-24T00:00:00.000Z',
    '2024-01-24T00:00:00.000Z',
    '2024-01-24T00:00:00.000Z'
);


-- Insert post: ALM Accelerator Part 1: An introduction
INSERT INTO posts (slug, title, description, content, image_url, published, created_at, updated_at, published_at)
VALUES (
    'alm-accelerator-part-1-an-introduction',
    'ALM Accelerator Part 1: An introduction',
    'Welcome to a new series of posts where I look to provide an overview and in-depth guide on the ALM Accelerator. In Part 1, I want to run through what the ALM Accelerator is, how it can be used, and when to consider using it in your Power Platform development.',
    'Welcome to a new series of posts where I look to provide an overview and in-depth guide on the ALM Accelerator. In Part 1, I want to run through what the ALM Accelerator is, how it can be used, and when to consider using it in your Power Platform development.

Before we dive in, the full documentation on the ALM Accelerator can be found here: [https://learn.microsoft.com/en-us/power-platform/guidance/alm-accelerator/overview](https://learn.microsoft.com/en-us/power-platform/guidance/alm-accelerator/overview)

## Background

I recently went through an exercise of implementing the ALM Accelerator, and thought it would be a good topic to speak about. I have used various different ALM tools within Power Platform, and each provide great benefits depending on various factors, including maturity and resources required.

ALM Accelerator is a great stepping stone between not having any ALM, and going full-blown create-your-own within Github/Azure DevOps. It is relatively easy to set up and offers a comprehensive set of tools to get development teams up and running with best-practices.

## What is ALM anyway?

ALM stands for Application Lifecycle Management. To quote from the Microsoft Learn site on ALM ([https://learn.microsoft.com/en-us/power-platform/guidance/alm-accelerator/overview](https://learn.microsoft.com/en-us/power-platform/guidance/alm-accelerator/overview))

> "ALM is the lifecycle management of applications, which includes governance, development, and maintenance. Moreover, it includes these disciplines: requirements management, software architecture, development, testing, maintenance, change management, support, continuous integration, project management, deployment, release management and governance. ALM tools provide a standardized system for communication and collaboration between software development teams and related departments, such as test and operations. These tools can also automate the process of software development and delivery. To that end, ALM combines the disciplines concerned with all aspects of the process to achieve the goal of driving efficiency through predictable and repeatable software delivery."

## Requirements

When exploring toolsets and methodologies, I had the following requirements in mind.

*   Easy to use tool, with good documentation
*   Maker friendly. A tool which could be picked up and used easily by makers who may not come from a pro-code background
*   Ability to review code, and implement deployment approvals
*   Cross-tenant deployment options
*   Configurable deployment settings

Taking these requirements into account, it straight away eliminated the easiest option; Power Platform Pipelines due to lack of cross-tenant deployment options. Hopefully this is something which will be implemented in the future as it''s the easiest tool to set up.

This left me with the two following options:

1.  Configure everything from scratch using the Power Platform Build tools for Azure DevOps, with simplistic and often outdated guides.
2.  Use the ALM Accelerator for Power Platform, with its well documented (and supported) patterns and practices.

In future instalments to the series, I will dive deep into how the ALM Accelerator can be adapted to support some of the more bespoke (but also quite commonly asked for!) features such as setting up for cross-tenant deployment and configuring deployment settings for these environments. Stay tuned!

## Prerequisites/Gotcha''s!

Some things to be aware of when going down the ALM Accelerator route:

*   You will need premium licensing.
*   You will need to install the PowerCAT creator kit ([https://learn.microsoft.com/en-us/power-platform/guidance/creator-kit/setup](https://learn.microsoft.com/en-us/power-platform/guidance/creator-kit/setup))
*   Code Components will need to be enabled in your host environment
*   Access to Azure/Entra for App registration and Group creation will be required
*   Admin access to Azure DevOps will be required for setting up and configuring the custom connector and Projects
*   Although not a hard and fast requirement, a dedicated Power Platform environment will make maintaining the ALM Accelerator more straight forward.

In the next article, the focus will be on further understanding the set-up and configuration of the ALM Accelerator, and will lead in to more complex parts of the solution which aren''t well documented.',
    '/blog-images/photo-1517026575980-3e1e2dedeab4',
    TRUE,
    '2024-02-05T00:00:00.000Z',
    '2024-02-05T00:00:00.000Z',
    '2024-02-05T00:00:00.000Z'
);


-- Tag: DevOps
INSERT OR IGNORE INTO tags (name, slug) VALUES ('DevOps', 'devops');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'alm-accelerator-part-1-an-introduction' AND t.slug = 'devops';


-- Tag: Pipelines
INSERT OR IGNORE INTO tags (name, slug) VALUES ('Pipelines', 'pipelines');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'alm-accelerator-part-1-an-introduction' AND t.slug = 'pipelines';


-- Tag: Power Platform
INSERT OR IGNORE INTO tags (name, slug) VALUES ('Power Platform', 'power-platform');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'alm-accelerator-part-1-an-introduction' AND t.slug = 'power-platform';


-- Insert post: Create editable grids in Power Pages without using code
INSERT INTO posts (slug, title, description, content, image_url, published, created_at, updated_at, published_at)
VALUES (
    'create-editable-grids-in-power-pages',
    'Create editable grids in Power Pages without using code',
    'Learn how to create editable grids in Power Pages using the out-of-the-box Editable Grid control and add it to your List.',
    '## Introduction

Power Pages is a helpful tool that makes it easy to create websites using low-code development. It also allows for rich integration with other Power Platform solutions.

Recently, I had a requirement to use editable grids within Power Pages for list data. I managed to find some documentation on using code components for Power Pages here: [https://learn.microsoft.com/en-us/power-pages/configure/tutorial-pcf-code](https://learn.microsoft.com/en-us/power-pages/configure/tutorial-pcf-code)

Reading this, I found it confusing to understand as I felt it lacked clarity on whether you could in fact use editable grids.

To help streamline the process and save you time, I have put together a quick guide on how to use an editable grid in your Power Pages lists.

## Add the Editable Grid component to your desired table

I am using the Accounts table with a solution called “Test solution” for this demonstration.

1.  Navigate to classic settings by selecting your environment, going to settings and clicking "All legacy settings" within the Admin centre ([https://admin.powerplatform.microsoft.com/](https://admin.powerplatform.microsoft.com/))

How to access legacy settings from admin app

2.  Navigate to customizations from the settings dropdown, select "Solutions", select your solution and then double click the Account Table (also called Entity).

Accessing solutions from legacy admin centre

Selecting account solution from solution entities (tables)

3.  Click the Controls tab and then Add Control…

Adding a new control

4.  In the Add control menu, search for and select the PowerApps grid control, then click Add.

5\. Ensure that the Power Apps grid control is enabled for Web and Phone/Tablet if required.

Enable the control for web

6.  Select the control to bring up the properties.
7.  Set the value of Enable editing to “Yes”. You can enable other properties too if required, and I recommend you check out the documentation to find out which each property does.

Enabling the grid control

8.  Click Save, and then click Publish

Publishing changes

## Add the component to Portal Management

Now we have our editable grid added to our table, we need to configure Power Pages to use it. The first step is to add a new List so it can then be selected when adding it to our page.

1.  Navigate to [make.powerpages.microsoft.com](https://make.powerpages.microsoft.com/)
2.  Select the ellipses against your site and select Portal management

3.  Under Content, go to Lists, click New

Adding a new list

4.  Give your List a Name, select the Table, and the website

5.  Add your views

6.  Scroll down and make sure that "Use a configured code component" is set to yes. You can change other properties here as needed, and then click Save and Close.

## Add the editable grid to your page

The final step is to add the list to our page and test it out.

1.  Navigate back to your Power Page site and edit it
2.  Go to the page where you wish to add the editable grid. In my example I have added this to the Home page in a new section.

Crating a new section on the homepage

3.  Add a List to the page under the Choose a component to add to this section

4.  Select the list from the "Or choose an existing list" which should match up to the list name we created earlier. Note, this does not work if you use the new list component, so keep it disabled.

5.  Sync and preview your page, you should now see the editable grid displayed in the preview page.

Sync changes and preview

Note: Remember to ensure that your users have permissions to update the list otherwise a permissions error will be displayed.

## Conclusion

We should now be able to see our editable grid component in action:

0:00

/0:31

 1×',
    '/blog-images/photo-1581273154768-0a9a16887d2a',
    TRUE,
    '2023-05-03T00:00:00.000Z',
    '2023-05-03T00:00:00.000Z',
    '2023-05-03T00:00:00.000Z'
);


-- Insert post: Creating visual hierarchies in model-driven apps
INSERT INTO posts (slug, title, description, content, image_url, published, created_at, updated_at, published_at)
VALUES (
    'creating-visual-hierarchies-in-model-driven-apps',
    'Creating visual hierarchies in model-driven apps',
    'Sometimes model-driven apps can be considered quite boring due to their predictability in how the interface is presented. Adding visual elements to your model-driven apps can greatly enhance the user experience and improve adoption.',
    'Sometimes model-driven apps can be considered quite “boring” due to their predictability in how the interface is presented. Personally I love the interface and the simplicity it can offer(if configured correctly!).

Adding visual elements to your model-driven apps can greatly enhance the user experience and improve adoption.

Setting up hierarchy is a great example of adding a visual element to your apps whilst providing a great way to present self referencing relationships (a relationship which references itself).

## Create the Hierarchy

Setting up hierarchy on tables requires a few steps, some of which aren’t clear when reading the documentation. ([Here for reference](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/define-query-hierarchical-data)).

In this example we''ll create a table called Users, and add the following column types:

Column Name

Column Type

Name

Text

Email

Text(Email)

Manager

Lookup

The Manager Lookup is configured to lookup to the same(Users) table. This is a self referencing relationship which we can configure hierarchy for.

After the columns have been set up, navigate to table relationships, and select the manager relationship. You should see an option labelled "Hierarchical". Tick this to turn it on, and then click Save.

Update the the main form and view and populate the table with some fictional records.

Now the hierarchy has been enabled, we need to enabled visualisation so that we can display it in our app.

## Visualise the hierarchy

To visualise the hierarchy, we''ll need to enable it in the classic settings. Navigate to the Settings cog at the top of the page, and select advanced settings.

Navigate to Solutions, if your table isn''t in a solution, you can navigate to the table by going to Customizations instead.

Select your solution, expand entities, and then the table you enabled hierarchy on and select Hierarchy Settings.

Click New, and add a name and specify the default quick view form, and then click Save and Close. This will have set up the visualisation for the hierarchy.

Now, on returning to the table within the App/view, the Hierarchy button next to the name can be selected, and it will open the hierarchy visualisation for that record.

This shows a great way to display common scenarios such as org charts and can really help user visualise data in tables.',
    '/blog-images/photo-1544965412-3992c4853546',
    TRUE,
    '2024-02-19T00:00:00.000Z',
    '2024-02-19T00:00:00.000Z',
    '2024-02-19T00:00:00.000Z'
);


-- Tag: Power Platform
INSERT OR IGNORE INTO tags (name, slug) VALUES ('Power Platform', 'power-platform');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'creating-visual-hierarchies-in-model-driven-apps' AND t.slug = 'power-platform';


-- Tag: Model-Drive Apps
INSERT OR IGNORE INTO tags (name, slug) VALUES ('Model-Drive Apps', 'model-drive-apps');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'creating-visual-hierarchies-in-model-driven-apps' AND t.slug = 'model-drive-apps';


-- Tag: Dataverse
INSERT OR IGNORE INTO tags (name, slug) VALUES ('Dataverse', 'dataverse');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'creating-visual-hierarchies-in-model-driven-apps' AND t.slug = 'dataverse';


-- Insert post: Field validation in canvas apps/custom pages
INSERT INTO posts (slug, title, description, content, image_url, published, created_at, updated_at, published_at)
VALUES (
    'field-validation-in-canvas-apps',
    'Field validation in canvas apps/custom pages',
    'In this post, I want to run through how to do field validation in Power Apps canvas apps/custom pages, and the different options that are available. The ultimate goal is to provide the best user experience when validating fields, and what to watch out for.',
    'In this post, I want to run through how to do field validation in Power Apps canvas apps/custom pages, and the different options that are available. The ultimate goal is to provide the best user experience when validating fields, and what to watch out for.

## The Scenario

A contact us form has been developed in Canvas Apps for a large organisation. This form has mandatory fields that need to be filled in, as well as some fields that require a specific input type. The form needs to be updated to include these validation checks.

The form was developed using the frontend mentoring challenge contact us form as inspiration. Curious how I built this? Let me know!

## validation

Lets look at some basic forms of validation against different field types.

### Text inputs

Validating an input field that is required in it''s most basic form is relatively straightforward. You will want to check if the field is empty and if it isn''t show the error message.

There are various valid ways to do this, however I tend to use the Len() function in the visible property of the error label to check if the field length is equal to 0. If it is, then show the error.

To achieve this we can use the following formulas on the relevant fields.

Error label visible set to:

```PowerFx
Len(txtfirstName.Value) = 0
```

### Email

The email field is slightly different. We need to validate it if it''s empty, but also validate it if it isn''t empty and it isn''t a valid email address.

The following formula can be used on the label''s visible property here:

```PowerFx
Len(txtEmail.Value) = 0 Or Not IsMatch(TxtEmail.Value, Match.Email)
```

![](/blog-images/oxi-clean-but-wait-theres-more.gif)

The text displayed in the error message should change dynamically based on whether it''s empty or if it''s not empty, that it''s a valid email address. To do this, on the error label''s text property, set it to the following:

```
If(IsBlank(txtEmail.Value), "This field is required", Not IsMatch(txtEmail.Value, Match.Email), "Please enter a valid email address")
```

### Checkboxes

For the above checkboxes, the error message will show when none of the boxes are ticked. This means the error label will need to check against both checkboxes:

```
Not chkGeneralEnquiry.Checked And  Not chkSupportRequest.Checked
```

Note with the above, the "Not" clause is used as we can only check if the checkboxes are ticked(checked) rather than unchecked. There is also no need for an If() statement as the formula will evaluate to either _true_ or _false_ anyway.

Repeat the above steps for the other fields, and you will have a form that will fully validate depending on field inputs.

0:00

/0:26

 1× 

Awesome!

If you want to do alternative field validation for text, you can use the Match() function to validate different types of things. Check out the documentation on it here: [https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-ismatch](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-ismatch)

## Enhancing the user experience

Now we have the field validation working, the next steps are to consider how to make the user experience better. Ideally the error messages wouldn''t show by default (for example if the user navigates to the form) rather, they should show on submit if there''s an error, lets update the form to match this better experience.

The logic will remain the same, however it will need to be moved to the Submit button''s OnSelect property. The logic would then update a variable, and the variable will control the error message visibility. Lets give it a go!

### First and Last name validation

In the Submit button OnSelect, add the following code:

```PowerFx
If(
    Len(txtFirstName.Value) = 0, 
    UpdateContext({locShowFirstNameError: true}),
    UpdateContext({locShowFirstNameError: false})

);
If(
    Len(txtLastName.Value) = 0, 
    UpdateContext({locShowLastNameError: true}),
    UpdateContext({locShowLastNameError: false})

);
```

In the visible property of the first and last name error labels, change it to locShowFirstNameError and locShowLastNameError respectively.

### Email Validation

If we add the following to the button''s OnSelect, we get the email address validation checking if the field is blank and if it''s not blank, validating whether it''s a valid email address.

```PowerFx
If(
    Len(txtEmail.Value) = 0 Or 
    Not IsMatch(txtEmail.Value, Match.Email),
    UpdateContext({locShowEmailAddressError: true}),
    UpdateContext({locShowEmailAddressError: false})
);
```

Set the error label''s visible property to be locShowEmailAddressError.

### Checkbox validation

To validate the query type checkboxes, add the following to the buttons OnSelect:

```PowerFx
If(
    Not chkGeneralEnquiry.Checked And  
    Not chkSupportRequest.Checked,
    UpdateContext({locShowQueryTypeError: true}),
    UpdateContext({locShowQueryTypeError: false})
);
```

Then update the Query type error label visible property to locShowQueryTypeError

## Bringing it together

The full code on the Submit button''s OnSelect will now look like this (including validation for the "Message" field and the "I consent to being contacted by the team" fields).

```PowerFx
//First name validation
If(
    Len(txtFirstName.Value) = 0, 
    UpdateContext({locShowFirstNameError: true}),
    UpdateContext({locShowFirstNameError: false})

);
//Last name validation
If(
    Len(txtLastName.Value) = 0, 
    UpdateContext({locShowLastNameError: true}),
    UpdateContext({locShowLastNameError: false})

);
//Email vlidation
If(
    Len(txtEmail.Value) = 0 Or 
    Not IsMatch(txtEmail.Value, Match.Email),
    UpdateContext({locShowEmailAddressError: true}),
    UpdateContext({locShowEmailAddressError: false})
);
//Query type validation
If(
    Not chkGeneralEnquiry.Checked And  
    Not chkSupportRequest.Checked,
    UpdateContext({locShowQueryTypeError: true}),
    UpdateContext({locShowQueryTypeError: false})
);
//Message validation
If(
    Len(txtMessage.Value) = 0,
    UpdateContext({locShowMessageError: true}),
    UpdateContext({locShowMessageError: false})
);
//Consent validation
If(
    Not chkConsent.Checked,
    UpdateContext({locShowConsentError: true}),
    UpdateContext({locShowConsentError: false})
);
```

Each error label will need to have the correct variable added to the visible property for this to work.

Now, lets see this in action!

0:00

/0:34

 1× 

Hopefully this has been a helpful introduction into how to validate fields in PowerApps Canvas apps and Custom pages.',
    NULL,
    TRUE,
    '2024-06-05T00:00:00.000Z',
    '2024-06-05T00:00:00.000Z',
    '2024-06-05T00:00:00.000Z'
);


-- Insert post: Pass multiple record Id's to a custom page from the command bar
INSERT INTO posts (slug, title, description, content, image_url, published, created_at, updated_at, published_at)
VALUES (
    'pass-multiple-record-ids-to-a-custom-page-from-the-command-bar',
    'Pass multiple record Id''s to a custom page from the command bar',
    'Opening a custom page from the command bar opens up model-driven apps to some amazing possibilities. This convergence of apps is something I am particularly fond of and excited to see what else can be done to combine the best of the Canvas App and Model-Driven sides of the coin.',
    'Opening a custom page from the command bar opens up model-driven apps to some amazing possibilities. This "convergence" of apps is something I am particularly fond of and excited to see what else can be done to combine the best of the Canvas App and Model-Driven sides of the coin.

If, like me, you have used the modern command bar designer and custom pages, you will have quickly realised that you need to use Javascript to achieve certain tasks, such as opening different page types (a side pane for example), and this is an area I hope we''ll see addressed in the future so that we can use PowerFx to navigate to custom pages with parameters.

A recent requirement I encountered was to open a custom page from a grid view in model-driven apps with the option to select multiple items and pass these as parameters to the page.

Microsoft''s official documentation provided a great starting point, but it doesn''t mention how to open a page with context from multiple records.

This got me starting to investigate whether this was in fact possible and after some failed google attempts and nothing useful from copilot, I decided to poke around within the settings to see what parameters can be used in command bar buttons using Javascript.

![](/blog-images/math-calculate.gif)

You can make use of the the SelectedControlSelectedItemIds parameter and pass this to the record Id within JavaScript, and this will pass a comma delimited string of record GUIDs to your custom page. This opens up some great possibilities, and allows for the GUID''s to be then formatted using PowerFX in the custom page to give us our records we need and present them in data tables or galleries.

## The code

JavaScript can be daunting for some, especially if you don''t come from a pro-code background. Thankfully this code required is very basic and you can find some great examples to get you up and running (quickly) on Microsoft''s learn page here: [https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/navigate-to-custom-page-examples](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/navigate-to-custom-page-examples).

We will need to expand on the examples provided so that we can pass multiple record Id''s to our page. You can use the below code to achieve this:

```javascript
function openCustomPageMultiple(selectedEntityTypeName, SelectedControlSelectedItemIds)
    {
            var pageInput = {
                pageType: "custom",
                name: "<Your custom page name here>",
                entityName: selectedEntityTypeName,
                recordId: SelectedControlSelectedItemIds,
            };
            var navigationOptions = {
                target: 1,
            };
            Xrm.Navigation.navigateTo(pageInput, navigationOptions)
                .then(
                    function () {
                        // Handle success
                    }
                ).catch(
                    function (error) {
                        // Handle error
                    }
                );
    }
```

You will notice that the code itself is extremely basic and the only deviation from the documented examples is wrapping the code in a function() and including the selectedEntityTypeName to get the table context and SelectedControlSelectedItemIds to get our record ids.

You will need to save the snippet above (keeping in mind to update the name to match the name of your custom page) as a .JS file and upload it as a webresource so that it can be added to your command bar button.

To add a new web resource, within Power Apps, create or navigate to a solution, and then click add new, then select web resource

Click upload and then select the .JS file you have saved.

Next, create a command bar button, to do this, create or edit a model-driven app and add a table on which you would like the button to appear. Next, select the table from the navigation menu and select edit command bar.

Select Main Grid and then next to open the command bar designer.

Next, add a new button, and then under action click add new library. Search for the web resource you added earlier and select it. Click Ok to save the change.

Under function name copy/paste the name of the function exactly as it appears in the .JS file. In this example it''s: openCustomPageMulID. Under Parameters add the selectedEntityTypeName and the SelectedControlSelectedItemIds Parameters.

Before saving, under visible, change the formula to:

```Javascript
CountRows(Self.Selected.AllItems) > 0
```

otherwise the button will disappear when selecting a record. I think this is a bug but the above PowerFx is a good starting point to control visibility of the button.

Save the Command bar and return back to the model-driven app editor. You will need to add or create a custom page and add it to the navigation. It **MUST** be added to the app(hidden or otherwse) or it will not open when you click the button.

If you test the button after publishing, it should now navigate to the custom page once the button is clicked.

Next, we need to add a formula to the the named formula bar so that the record id''s passed to the page can be "interpreted" by the app and picked up as full records. to do this, use the following formula:

```Javascript
gblRecordIds = Split(
    Param("recordId"),
    ","
);
```

this splits the record id''s passed to the app, and stored them in a formula variable called gblRecordIds.

We can now add our table to our page, and add a data table or gallery control and grab the full record context by using the following formula:

```javascipt
Filter(Users, User in gblRecordIds)
```

In my example, I have used the users table, and once saved. we can test the page by publishing the app, playing it and seeing our records passed to our gallery.',
    '/blog-images/photo-1551215536-a01ce2fb0d3d',
    TRUE,
    '2024-03-21T00:00:00.000Z',
    '2024-03-21T00:00:00.000Z',
    '2024-03-21T00:00:00.000Z'
);


-- Insert post: Understanding Service Connections for Environments in Power Platform Build tools
INSERT INTO posts (slug, title, description, content, image_url, published, created_at, updated_at, published_at)
VALUES (
    'understanding-service-connections-for-environments-in-power-platform-build-tools',
    'Understanding Service Connections for Environments in Power Platform Build tools',
    'Understand how Service connections can be used in Power Platform Build tools for DevOps',
    'If you are new to Power Platform Build tools and how it can facilitate Continuous Integration/Continuous Development (CI/CD), it can be very daunting to understand where to start and how to get up and running.

Microsoft’s Documentation is great for gaining an understanding of how to get up and runnign using Azure DevOps, hower the documentation doesn’t seem to be the most up to date, as examples are still using classic pipelines (instead of YAML), and the documentation doesn’t appear to contain any information on some of the latest functionality that has been introduced recently (which is a shame as it’s great!)

In this post I would like to highlight the benefits of service connections in Azure Devops when working with PowerPlatform Build Tools and hopefully simplify the process of using service connections to target different environments when working with CI/CD.

I won’t cover how to setup a Service Principle, as this has been covered plenty already, and The documentation also goes over this in good detail, see [here](https://learn.microsoft.com/en-us/power-platform/alm/devops-build-tools)

Adding a service connection to Azure DevOps is a straightforward procedure:

Step 1: Within your Azure DevOps Project, go to “Project Settings”  
Step 2: Select “Service Connections”  
Step 3: Search for Power Platform in the Service connections list and click “Next”  
Step 4: Select “Application Id and Client Secret” and then fill in the rest of the options:

*   Server URL - This is the Power Platform Environment you will have added your App registration to when setting up the App Registration for Power Platform. You can get the URL by navigating to your environment within Power Platform, clicking the settings cog at the top right, and then clicking “session details”.
*   Tenant Id: Tenant ID of your App Registration
*   Application Id: App ID (Client ID) of your App Registration
*   Client Secret of Application ID: Secret generated when you created the App Registration
*   Service Connection Name: Name of your connection. Name it something easy to remember and easy to reference.
*   Ensure “Grant access permission to all pipelines” is ticked Step 5: Click “Save”. This will create the Service connection which can now be used within your pipelines.

Now this is where the magic happens (and also where the docs aren’t very clear!), you can use this connection, and target any environment within your Power Platform Tenant, as long as you have added the app registration to them first. If you decide to automate Environmenet creation via the pipeline (and you should as it’s a big timesaver), it will actually automatically add the app registration to the created environment store the environment in a pipeline variable called BuildTools.EnvironmentUrl, which you can then use to automatr further tasks as part of an environment set-up and configuration. An exmaple of this could be to then import a solution so that it’s ready for developers.

An example of this pipeline could look like this:

```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
```

```YAML
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
    SolutionSourceFolder: ''$(Build.SourcesDirectory)\ExportedSolutions\$(SolutionName)''
    SolutionOutputFile: ''$(Build.ArtifactStagingDirectory)\$(SolutionName)_Unmanaged.zip''
    SolutionType: ''UnManaged''
    ProcessCanvasApps: true

- task: PublishPipelineArtifact@1
  inputs:
    targetPath: ''$(Build.ArtifactStagingDirectory)\$(SolutionName)_Unmanaged.zip''
    artifact: ''Solution''
    publishLocation: ''pipeline''

- task: PowerPlatformCreateEnvironment@2
  inputs:
    authenticationType: ''PowerPlatformSPN''
    PowerPlatformSPN: ''MyServiceConnection''
    DisplayName: ''$(SolutionName)-$(Build.BuildId)''
    EnvironmentSku: ''Sandbox''
    LocationName: ''unitedkingdom''
    LanguageName: ''English''
    CurrencyName: ''GBP''
    DomainName: ''$(SolutionName)-$(Build.BuildId)''

- task: PowerPlatformImportSolution@2
  inputs:
    authenticationType: ''PowerPlatformSPN''
    PowerPlatformSPN: ''MyServiceConenction''
    SolutionInputFile: ''$(Build.ArtifactStagingDirectory)\$(SolutionName)_Unmanaged.zip''
    AsyncOperation: true
    MaxAsyncWaitTime: ''60''
```

Copy

This pipeline is essentially doing what was mentioned above, but notice that the Environment isn’t specified in these tasks, just the Service Connection. This is a nice feature of the “Create Environment” task, which sets the “BuildTools.EnvironmentUrl” as an output so that the import task can be run against the newly created Environment. Neat!

How would this work for existing environments? Up until recently I was led to believe I would need a different service connection for each Envrionment I want to run tasks against. This is not the case however, as provided the service connection has access, you can just target the Environment as part of the pipeline settings, see this example here:

```
1
2
3
4
5
6
7
8
9
```

```YAML
- task: PowerPlatformExportSolution@2
  inputs:
    authenticationType: ''PowerPlatformSPN''
    PowerPlatformSPN: ''MyServiceConnection''
    Environment: ''$(EnvURL)''
    SolutionName: ''$(SolutionName)''
    SolutionOutputFile: ''$(Build.ArtifactStagingDirectory)\$(SolutionName).zip''
    AsyncOperation: true
    MaxAsyncWaitTime: ''60''
```

Copy

Notice in the above export solution task how the Service Connection remains the same but an additional parameter names “Environment” is set with a pipeline variable which is defined on runtime to point to the Environemnt URL. This is a great way to quickly get set up and manage multiple environments, especially when managing them as part of an overall strategy where Environments are short lived for features/hotfixes as part of an overall branching strategy in Azure DevOps.

I hope this has been useful and provides some insight on how you can begin to automate tasks as part of a healthy ALM set-up within the PowerPlatform.',
    '/blog-images/photo-1421789665209-c9b2a435e3dc',
    TRUE,
    '2023-02-28T00:00:00.000Z',
    '2023-02-28T00:00:00.000Z',
    '2023-02-28T00:00:00.000Z'
);


-- Tag: DevOps
INSERT OR IGNORE INTO tags (name, slug) VALUES ('DevOps', 'devops');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'understanding-service-connections-for-environments-in-power-platform-build-tools' AND t.slug = 'devops';


-- Tag: Power Platform
INSERT OR IGNORE INTO tags (name, slug) VALUES ('Power Platform', 'power-platform');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'understanding-service-connections-for-environments-in-power-platform-build-tools' AND t.slug = 'power-platform';


-- Insert post: Update Org settings in Power Platform build tools
INSERT INTO posts (slug, title, description, content, image_url, published, created_at, updated_at, published_at)
VALUES (
    'update-org-settings-in-power-platform-build-tools',
    'Update Org settings in Power Platform build tools',
    'Recently whilst looking through the Power Platform build tools, I stumbled upon a task which I didn''t recognise called ''Update Org settings''. This appears to be an undocumented task, but on closer inspection, it looks to be a wrapper around the update-settings command found in the PAC CLI tools.',
    'Recently whilst looking through the [Power Platform build tools](https://learn.microsoft.com/en-us/power-platform/alm/devops-build-tools), I stumbled upon a task which I didn’t recognise called “**Update Org settings**”: 

![Build tools task for update org settings](https://joshlgiles.com/p/update-org-settings-in-power-platform-build-tools/Update-Org-settings.png)

.

This appears to be an undocumented task, but on closer inspection, it looks to be a wrapper around the update-settings command found in the [PAC CLI tools](https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/org#pac-org-update-settings). Unfortunately this also seems quite “light” on information, so I decided to investigate further.

Selecting my development environment and running pac org list-settings, I get a list of environment settings, neat! 

![list of environment settings](https://joshlgiles.com/p/update-org-settings-in-power-platform-build-tools/list-settings.png)

I can now pick out any of these settings and use them in the update-settings command. Something to note is that the parameter expects **true** or **false** values rather than Yes or No which the list-settings results suggest.

In my test, I wanted to enable code components for Canvas Apps in my environment, we can see the setting under Environment features: 

![code components for canvas apps setting](https://joshlgiles.com/p/update-org-settings-in-power-platform-build-tools/Code-components-for-canvas-apps.png)

The setting I found in the list-settngs parameter which matched most closely was: **iscustomcontrolsincanvasappsenabled**

Lets give this a go and see if it works:

![pac cli results](https://joshlgiles.com/p/update-org-settings-in-power-platform-build-tools/paccliupdateorgsettings.png)

pac cli results

This looks promising, lets check the setting in Environment Admin… 

![Canvas App code component setting turned on](https://joshlgiles.com/p/update-org-settings-in-power-platform-build-tools/Canvas-components-on.png)

Nice!

So now that we have this working with the PAC CLI commands, lets see how this works within Power Platform Build tools tasks for Azure Devops pipelines. Using the same example as we used with PAC CLI to enable code components in Canvas Apps, we can add the **Update Org Settings** build tools task in our pipeline to achieve the same results.

When selecting the update org settings build tools task, it will ask for 3 settings: **Service Connection**, **Setting Name**, and **Setting value**.

![Update org settings configuration](https://joshlgiles.com/p/update-org-settings-in-power-platform-build-tools/update-org-settings-config.png)

Update org settings configuration

For Service connection, use whichever method you have configured to authenticate to your Power Platform Environment. If not using them already, I would reccomend using a service principle for your pipelines, however. I have a blog post for setitngs these up which you can read [here](https://joshlgiles.com/p/understanding-service-connections-for-environments-in-power-platform-build-tools/).

The Setting name will be the same settings which we discovered in the PAC CLI List-Settings task, so in our example, we will set it to **iscustomcontrolsincanvasappsenabled** and the Setting value will need to be set to either true or false. In my example I set it to true. Click add to add the YAML code to the pipeline, and you should see something similar to this:

```
1
2
3
4
5
6
```

```YAML
- task: PowerPlatformUpdateOrgSettings@2
  inputs:
    authenticationType: ''PowerPlatformSPN''
    PowerPlatformSPN: ''MyServiceConnection''
    Name: ''iscustomcontrolsincanvasappsenabled''
    Value: ''true''
```

Copy

Now, if we add this task to part of an environment creation process, we can start to automate our preconfiguration of Environments to further enhance our Environment lifecycle processes. Using the above YAML in our pipeline, we can add this to a Create Environment task to make this possible:

```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
```

```YAML
trigger:
- main

pool:
  vmImage: ubuntu-latest

steps:
- task: PowerPlatformToolInstaller@2
  inputs:
    DefaultVersion: true

- task: PowerPlatformCreateEnvironment@2
  inputs:
    authenticationType: ''PowerPlatformSPN''
    PowerPlatformSPN: ''MyServiceConnection''
    DisplayName: ''TestEnvironment''
    EnvironmentSku: ''Sandbox''
    LocationName: ''unitedkingdom''
    LanguageName: ''English''
    CurrencyName: ''GBP''
    DomainName: ''TestEnvironment''

- task: PowerPlatformUpdateOrgSettings@2
  inputs:
    authenticationType: ''PowerPlatformSPN''
    PowerPlatformSPN: ''MyServiceConnection''
    Name: ''iscustomcontrolsincanvasappsenabled''
    Value: ''true''
```

Copy

When we run this pipeline, a new Environment called TestEnvironment will be created, and it will have the Custom code components for Canvas Apps enabled. Runinng the pipeline, we can see it has run sucessfully:

![Pipeline successful run](https://joshlgiles.com/p/update-org-settings-in-power-platform-build-tools/pipeline-run-sucess.png)

Pipeline successful run

Now when we check the created environment, the setting should be enabled:

![Sucess](https://joshlgiles.com/p/update-org-settings-in-power-platform-build-tools/settingenabled.png)

Sucess

Hopefully this has been helpful, and this should come in handy when spinning up new developer environments and allowing for these environments to be more disposable as part of a healthy ALM process and environment strategy.',
    '/blog-images/photo-1604662941425-9642752c5c14',
    TRUE,
    '2023-08-30T00:00:00.000Z',
    '2023-08-30T00:00:00.000Z',
    '2023-08-30T00:00:00.000Z'
);


-- Insert post: Use the Set Solution version task Power Platform Build tools task in Azure DevOps
INSERT INTO posts (slug, title, description, content, image_url, published, created_at, updated_at, published_at)
VALUES (
    'use-the-set-solution-version-task-power-platform-build-tools-task-in-azure-devops',
    'Use the Set Solution version task Power Platform Build tools task in Azure DevOps',
    'Learn how to use the Set Solution version task in the Power Platform build Tools and leverage it across different environments',
    'Power Platform Build tools offer a great way to manage Continuous Integration and Continuous Deployment(CI/CD) within Azure DevOps. Storing Solutions as code and working collaboratively using these tools is just some of the many benefits offered by making use of these tools and forms a key part of the overall Application Lifecycle Management(ALM). See [https://learn.microsoft.com/en-us/power-platform/alm/(https://learn.microsoft.com/en-us/power-platform/alm/](https://learn.microsoft.com/en-us/power-platform/alm/%28https://learn.microsoft.com/en-us/power-platform/alm/) for a more in-depth overview of ALM for Power platform.

When exporting a solution from an Environment, it is good practice to set solution version to enable solutions to be tracked more easily and track what functionality is included in a release.

Up until recently, I had run into a bit of a roadblock where I was unable to set a solution version when using a service connection which had a different default environment set compared to the environment I was wanting to target. After much head scratching, I actually found that although the build tools do not specify that you can set an Environment to target, you can in fact target an Environment if you specify the parameter and ignore the warning!

Here’s an example of the task:

```
1
2
3
4
5
6
7
```

```Yaml
- task: PowerPlatformSetSolutionVersion@2
  inputs:
    authenticationType: ''PowerPlatformSPN''
    PowerPlatformSPN: ''My Service Connection (Default)''
    Environment: ${{ parameters.Environment }}
    SolutionName: ${{ variables.SolutionName}}
    SolutionVersionNumber: ${{ variables.VersionNumber}}
```

Copy

What we see above is the addition of the “Environment” Parameter which is not specified in documentation and when you add it to your task it will give the squiggly line of doom. To provide further context, I am specifying my Environment as a runtime parameter and my Solution Name as a variable. My version number is set by using a variable and specifying the Azure DevOps build number in the pipeline: $(Build.BuildNumber). My Environments have the Service connection (App registration) already added to them with relevant permissions, so that I can target them with no issues.

I’ve raised an issue on the Power Platform Build tools so hopefully this will be fixed soon to make it more obvious that you can in fact target different environments with this task. You can view the issue [here](https://github.com/microsoft/powerplatform-build-tools/issues/287)

You can read more about Parameters [here](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/runtime-parameters?view=azure-devops&tabs=script) and Variables [here](https://learn.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml)

To summarise, being able to set a the solution version of your exported solutions and targeting your environments is great as it’s yet another aspect of CI/CD that you can configure.',
    '/blog-images/photo-1474631245212-32dc3c8310c6',
    TRUE,
    '2023-03-10T00:00:00.000Z',
    '2023-03-10T00:00:00.000Z',
    '2023-03-10T00:00:00.000Z'
);


-- Tag: Power Platform
INSERT OR IGNORE INTO tags (name, slug) VALUES ('Power Platform', 'power-platform');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'use-the-set-solution-version-task-power-platform-build-tools-task-in-azure-devops' AND t.slug = 'power-platform';


-- Tag: DevOps
INSERT OR IGNORE INTO tags (name, slug) VALUES ('DevOps', 'devops');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'use-the-set-solution-version-task-power-platform-build-tools-task-in-azure-devops' AND t.slug = 'devops';


-- Tag: Solutions
INSERT OR IGNORE INTO tags (name, slug) VALUES ('Solutions', 'solutions');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'use-the-set-solution-version-task-power-platform-build-tools-task-in-azure-devops' AND t.slug = 'solutions';


-- Tag: Pipelines
INSERT OR IGNORE INTO tags (name, slug) VALUES ('Pipelines', 'pipelines');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'use-the-set-solution-version-task-power-platform-build-tools-task-in-azure-devops' AND t.slug = 'pipelines';


-- Tag: YAML
INSERT OR IGNORE INTO tags (name, slug) VALUES ('YAML', 'yaml');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'use-the-set-solution-version-task-power-platform-build-tools-task-in-azure-devops' AND t.slug = 'yaml';


-- Tag: Versioning
INSERT OR IGNORE INTO tags (name, slug) VALUES ('Versioning', 'versioning');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = 'use-the-set-solution-version-task-power-platform-build-tools-task-in-azure-devops' AND t.slug = 'versioning';
