# PlatePlanner

Repository for the COMP4350 W23 Group Project "PlatePlanner"

## Group Members:

| Name            | U of M Email            | GitHub Username |
|-----------------|-------------------------|-----------------|
| Matthias Penner | pennerm2@myumanitoba.ca | MatthiasPenner  |
| Trang Pham      | phamt5@myumanitoba.ca   | dntrng          |
| Tuan Le         | ledt@myumanitoba.ca     | TuanDinhLe      |
| David Dyck      | dyckd349@myumanitoba.ca | davidndyck      |

## Project Proposal

### Vision

Canadians waste millions of tons of food every single year, and this results in needless CO2 emissions from both the agricultural process, as well as in transportation. We aim to help reduce food waste by allowing users to optimize their grocery lists to include exactly what they need so that they use every ingredient in its entirety. 

### Summary

The high-level plan for our web application is to allow users to input their own recipes and generate a grocery list based on a selection of recipes they have chosen for the week. This will help minimize food waste by combining ingredients from the various recipes to ensure that only the necessary amount for the entire week is added to the grocery list. 

The recipes will be managed by the users and stored on their accounts. Users can add, modify, and delete their own recipes and once created, they will be able to search for specific recipes or use filters if they are still deciding what to make. This will make the app customizable to every user's specific taste and dietary requirements. 

The main feature of our application is the ability to plan out your meals for the week. Users will be able to create a meal plan, and a grocery list will be generated based on the selected recipes. During this process, ingredients will be combined for different dishes to ensure that the exact amount required is added to the list. For example, if recipe A calls for half an onion, and recipes B and C call for a quarter of an onion each, only a single onion will appear on the final grocery list. This means that by the end of the week, fewer unused ingredients will be sitting in the fridge waiting to be thrown out.

Since the meal plan is fully customizable and the grocery list is automatically generated, we are confident that this will be an easy system to add to the lives of our users. As a result, our user base will be able to create personalized meal plans with an associated grocery list that minimizes food waste.

### Stakeholders

#### Grocery Shoppers

Grocery shoppers want to minimize the amount of money they spend weekly on food. Using the automatically generated grocery list, it will ensure that they will only spend money on food that they will need.

#### Cooking Enthusiasts

Cooking enthusiasts can develop complex recipes with a long list of ingredients. By inputting their recipes into our application, they don't have to create a grocery list on their own, where they risk buying duplicates or forgetting key ingredients entirely. 

#### Health Enthusiasts

Health enthusiasts want to make sticking to their diet as frictionless as possible. Using our meal planning feature, they are less likely to choose the unhealthy option when deciding what to eat since they have already decided ahead of time. 

### Core Features

1. Account Management
    - Users can create an account and use it to log in to the web app.
2. View and Retrieve Recipes
    - Users can view all available recipes and retrieve a specific recipe with its name.
3. Add and Modify Recipes
    - Users can upload new recipes and modify them afterwards.
4. Shopping list
    - Users can choose recipes and generate an ingredient shopping list from the chosen recipes.
5. Non-functional feature:
    - The web app can concurrently support 100 users with 1000 requests per minute.

### Technologies
1. React - a framework to implement the UI.
2. Node.js (potential) - a library of tools to execute server code in JavaScript.
3. Express.js (potential) - a framework to implement the back-end API
4. MySQL (potential) - for storing our data

### User Stories for Core Features:

#### Account Management

- As a new user, I want to be able to create an account with a username and a password so that the system can recognize me and store my information.
- As a registered user, I want to be able to log in to my account using my registered credentials so that I can access my information on the web app.
- As a logged-in user, I want to be able to log out of the web app so that only those with my credentials can access my account.

#### View and Retrieve Recipes

- As a logged-in user, I want to be able to view all available recipes on my homepage.
- As a logged-in user, I want to be able to retrieve a recipe by name.
- As a logged-in user, I want to be able to organize recipes by name or by date added.

#### Recipes Management

- As a logged-in user, I want to be able to upload new recipes.
- As a logged-in user, I want to be able to make changes to the recipes that I uploaded.
- As a logged-in user, I want to be able to delete recipes that I uploaded.

#### Shopping List

- As a logged-in user, I want to be able to choose recipes and portion sizes to add to the shopping list.
- As a logged-in user, I want to be able to generate a shopping list of ingredients based on my chosen recipes.
- As a logged-in user, I want to be able to send the shopping list to my email address.


