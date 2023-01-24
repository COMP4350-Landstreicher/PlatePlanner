## Landstreicher's Project Proposal

### Vision

// TODO

### Project Summary

// TODO

### Core Features

1. Accout Management
    - Users can create an account and use it to login to the web app.
2. View and Choose Recipes
    - Users can view, search, sort, filter, and choose from all available recipes to put in a shopping cart.
3. Add and Modify Recipes
    - Users can uplod new recipes and they can modify it afterwards.
4. Shopping list
    - Based on the recipes that users put into the shopping cart, users can generate a shopping list for all the necessary ingredients and modify it.
5. Non-functional feature:
    - Can support 100 users with 1000 requests per minute concurrently.

### Technologies
1. React - a framework to implement the UI.
2. Node.js (potential) - a libray of tools to execute server code in JavaScript.
3. Express.js (potential) - a framework to implement the back-end API
4. MySQL (potential) - for storing our data

### User Stories for Core Features:

#### Accout Management

- As a user, I want to be able to create an account with a username and a password so that the system can recognize me and store my information.
- As a user, I want to be able to log in my existing account with my credentials so that I can access my information.
- As a user, I want to be able to logout of the web application so that only those with my credentials can access my account.

#### View and Choose Recipes

- As a user, I want to be able to view all available recipes on the website.
- As a user, I want to be able search for recipes using its name and author's name.
- As a user, I want to be able to use filters (i.e: by cuisine, cooking method, diet, etc.) to narrow down my search.
- As a user, I want to be able to sort recipes by popularity and alphabetically.
- As a user, I want to be able to choose recipes and add it to my personal shopping cart.

#### Add and Modify Recipes

- As a user, I want to be able to upload my own recipes.
- As a user, I want to be able to modify the recipes that I uploaded.
- As a user, I want to be able to delete recipes that I uploaded.

#### Shopping List

- As a user, I want to be able to create a shopping list of ingredients based on the recipes currently in my shopping cart.
- As a user, I want to be able to modify the generated shopping list.
- As a user, I want to be able to send the shopping list to my email address.
