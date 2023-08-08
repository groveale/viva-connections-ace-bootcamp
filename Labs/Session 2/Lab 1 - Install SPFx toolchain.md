# Install the SharePoint Framework Yeoman generator and its prerequisites
To build solutions using the SharePoint Framework, you need to install the SharePoint Framework Yeoman generator. The generator scaffolds projects for you, giving you a starting point to build your solution.

> **Important**
>
> If you've developed SharePoint Framework solutions on your machine before, you need to verify that you have version 1.13 or later of the SharePoint Framework Yeoman generator installed on your computer. Version 1.13 or later is required to develop Adaptive Card Extensions.

## Task 1: Verify installed version of SharePoint Framework generator
To verify the installed version, run the command below in a terminal window and check the version of the @microsoft/generator-sharepoint package.

    npm list --global --depth=0 

If it's lower than 1.13, uninstall it by running:

    npm uninstall --global @microsoft/generator-sharepoint

> **Note**
>
> Don't worry if you are seeing errors, this means that you don't have node installed. Please proceed!

## Task 2: Install Node and required packages for SharePoint Framework
If you don't have the SharePoint Framework Yeoman generator installed, or if you uninstalled it, follow these steps to install it on your computer:

1.	Open a terminal window.
2.	Run the command below to verify that you have Node.js v16 installed. If you have a different version installed, uninstall it, and then [install v16](https://nodejs.org/en/download/releases).
    
        node -v

3.	In the terminal, run the command below. This command installs the SharePoint Framework Yeoman generator along with Yeoman and Gulp, which are all required to work with SharePoint Framework solutions.
        
        npm install --global yo gulp-cli @microsoft/generator-sharepoint

4.	Wait for the installation to finish.