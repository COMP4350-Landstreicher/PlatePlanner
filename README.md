# PlatePlanner

Repository for the COMP4350 W23 Group Project "PlatePlanner"

## Group Members:

| Name            | U of M Email            | Github Username |
|-----------------|-------------------------|-----------------|
| Matthias Penner | pennerm2@myumanitoba.ca | MatthiasPenner  |
| Trang Pham      | phamt5@myumanitoba.ca   | dntrng          |
| Tuan Le         | ledt@myumanitoba.ca     | TuanDinhLe      |
| David Dyck      | dyckd349@myumanitoba.ca | davidndyck      |

## Project Proposal

### Vision

Canadians waste millions of tons of food every single year. This results in needless CO2 emissions from both the agricultural process, as well as in transportation. We aim to help reduce food waste by allowing users to optimize their grocery list to include exactly what they need so that they use every ingredient in its entirety. 

### Summary

The high level plan for our web application is to allow users to input their own recipes and to generate a grocery list based on a selection of recipes they have chosen for the week. This will help minimize food waste by combining ingredients from the various recipes to ensure that only the necessary amount for the entire week is added to the grocery list. 

The recipes will be managed by the users and stored on their account. Users can add, modify, and delete their own recipes and once created, they will be able to search for specific recipes or use filters if they are still deciding what to make. This will make the app customizable to every user's specific taste and dietary requirements. 

The main feature of our application is the ability to plan out your meals for the week. Users will be able to create a meal plan and a grocery list will be generated based on the selected recipes. During this process, ingredients will be combined for different dishes to ensure that the exact amount required is added to the list. For example, if recipe A calls for half an onion, recipe B and C call for a quarter of an onion each, only a single onion will appear on the final grocery list. This means that by the end of the week, there will be less unused ingredients sitting in the fridge waiting to be thrown out.

Since the meal plan is fully customizable and the grocery list is automatically generated, we are confident that this will be an easy system to add to the lives of our users. As a result, our user base will be able to create personalized meal plans with an associated grocery list that minimizes food waste.

### Stakeholders

#### Grocery Shoppers

Grocery shoppers want to minimize the amount of money that they spend every week on food. By using the automatically generated grocery list, it will ensure that they won't spend money on food that they won't need.

#### Cooking Enthusiasts

Cooking enthusiasts can develop complex recipes with a long list of ingredients. By inputting their recipes into our application, they don't have to create a grocery list on their own where they risk buying duplicates or forgetting key ingredients entirely. 

#### Health Enthusiasts

Health enthusiasts want to make sticking to their diet as frictionless as possible. By using our meal planning feature, they are less likely to choose the unhealthy option when they are deciding what to eat since they already decided ahead of time. 


### Core Features

1. Account Management
    - Users can create an account and use it to log in to the web app.
2. View and Choose Recipes
    - Users can view, search, sort, filter, and choose from all available recipes to put in a shopping cart.
3. Add and Modify Recipes
    - Users can upload new recipes, and they can modify them afterwards.
4. Shopping list
    - Based on the recipes that users put into the shopping cart, users can generate a shopping list for all the necessary ingredients and modify it.
5. Non-functional feature:
    - Can support 100 users with 1000 requests per minute concurrently.

### Technologies
1. React - a framework to implement the UI.
2. Node.js (potential) - a library of tools to execute server code in JavaScript.
3. Express.js (potential) - a framework to implement the back-end API
4. MySQL (potential) - for storing our data

### User Stories for Core Features:

#### Account Management

- As a user, I want to be able to create an account with a username and a password so that the system can recognize me and store my information.
- As a user, I want to be able to log in to my existing account with my credentials so that I can access my information.
- As a user, I want to be able to log out of the web application so that only those with my credentials can access my account.

#### View and Search Recipes

- As a user, I want to be able to view all available recipes on the website.
- As a user, I want to be able to search for recipes using its name and author's name.
- As a user, I want to be able to use filters (i.e.: by cuisine, cooking method, diet, etc.) to narrow down my search.
- As a user, I want to be able to sort recipes by ratings and alphabetically.

#### Recipes Management

- As a user, I want to be able to upload my own recipes.
- As a user, I want to be able to modify the recipes that I uploaded.
- As a user, I want to be able to delete recipes that I uploaded.

#### Shopping List

- As a user, I want to be able to choose recipes and portion sizes to add to the shopping list.
- As a user, I want to be able to generate a shopping list of ingredients based on my chosen recipes.
- As a user, I want to be able to send the shopping list to my email address.