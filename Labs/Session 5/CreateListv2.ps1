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

$mealsJsonPath = ".\session6Meals.json"

##############################################
# Functions
##############################################

function create-list ($listName) {

    ## Check if list exists
    $list = Get-PnPList -Identity $listName -ErrorAction SilentlyContinue
    if ($list) {
        Write-Host "List $listName already exists"
        Write-Host "Deleting list $listName and recreating it"
        Remove-PnPList -Identity $listName
    }
    
    $list = New-PnPList -Title $listName -Template GenericList
    
    $fields = @("Day", "Description", "ImageUrl", "ItemName","ItemDescription", "Price", "Calories")

    foreach ($field in $fields) 
    {

        $type = "Text"

        switch ( $field )
        {
            #"Image" { $type = 'Thumbnail' }
            "Price" { $type = 'Number'}
            "Calories" { $type = 'Number'}
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

        $day = $menu.day
        $title = $menu.title
        $description = $menu.description
        $imageUrl = $menu.imageUrl


        foreach($meal in $menu.menuItems)
        {

            ## Go Through the meals
            Add-PnPListItem -List $newList.Title -Values @{  
                "Day"= $day;  
                "Title" = $title
                "Description" = $description
                "ImageUrl" = $imageUrl
                "ItemName" = $meal.item_name
                "ItemDescription" = $meal.description
                "Price" = $meal.price
                "Calories" = $meal.calories
                } | Out-Null
        }
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