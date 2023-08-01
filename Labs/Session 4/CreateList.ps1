#######################################
# Description: This script will create an SPO List and populate it with data
#              from a JSON file containg meals for a canteen menu ACE
# Author:      Alex G
# 
# Usage:       .\GenerateData.ps1
#
# Notes:       This script requires the PnP PowerShell module.
#              https://docs.microsoft.com/en-us/powershell/sharepoint/sharepoint-pnp/sharepoint-pnp-cmdlets?view=sharepoint-ps
#
#          

##############################################
# Varibales
##############################################

$siteUrl = "https://groverale.sharepoint.com/sites/home"
$listName = "CafeteriaMenu"

$mealsJsonPath = ".\session5Meals.json"

##############################################
# Functions
##############################################

function create-list ($listName) {

    ## Check if list exists
    $list = Get-PnPList -Identity $listName -ErrorAction SilentlyContinue
    if ($list) {
        Write-Host "List $listName already exists"
        return $list
    }

    $list = New-PnPList -Title $listName -Template GenericList

    $fields = @("Day", "Description", "ImageUrl")

    foreach ($field in $fields) 
    {

        $type = "Text"

        switch ( $field )
        {
            #"Image" { $type = 'Thumbnail' }
            "Vegetarian" { $type = 'Boolean'}
            "Vegan" { $type = 'Boolean'}
            "DairyFree" { $type = 'Boolean'}
        }
        
        Add-PnPField -List $listName -InternalName $field -DisplayName $field -Type $type -AddToDefaultView | Out-Null
    }

    return $list
}

function add-content($listData, $newList) {

    ## Load List to get Guid
    $ctx = Get-PnPContext
    $web = $ctx.Web
    $ctx.Load($newList)
    $ctx.Load($web)
    Invoke-PnPQuery
    

    foreach($menu in $listData.menus) {

        ## Go Through the meals
        Add-PnPListItem -List $newList.Title -Values @{  
            "Day"= $menu.day;  
            "Title"= $menu.title;  
            "Description"= $menu.description;
            "ImageUrl"= $menu.imageUrl;
            } | Out-Null
        
    }
}

##############################################
# Main
##############################################

## Connect to Viva Connections SPO site
Connect-PnPOnline -Url $siteUrl -Interactive

## Create the list
$list = create-list $listName

## Load the data
$mealsJson = Get-Content -Path $mealsJsonPath -Raw | ConvertFrom-Json

## Add the data to the list
add-content -listData $mealsJson -newList $list