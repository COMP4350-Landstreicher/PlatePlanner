
# Test Plan for Plateplanner

Testing plan for the COMP4350 W23 Group Project "PlatePlanner"

### Changelog:

| Version         | Date Changed  | By          |           Description           |
|-----------------|---------------|-------------|---------------------------------|
| 1.0             | 2023-02-11    | David Dyck  | Initial Draft for Review        |
| 1.1             | 2023-02-16    | David Dyck  | Added Unit test details         |
| 1.2             | 2023-02-17    | Tuan D. Le  | Added Unit test details         |
| 1.3             | 2023-03-16    | David Dyck  | Added Unit and Acceptance tests |
| 1.4             | 2023-03-16    | Trang Pham  | Added Unit and Acceptance tests |

## 1. Introduction:

### 1.1. Scope
The scope of testing for PlatePlanner covers all major features. Namely: 
1. Account Management
2. Viewing and Retrieving Recipes
3. Recipe Management
4. Shopping List

And the non-functional requirement:

5. Load Requirement (100 concurrent users with 1000 requests per minute)


### 1.2. Roles and Responsibilities
| Name            | NetID           | GitHub Username | Role |
|-----------------|-------------------------|-----------------|--|
| Matthias Penner | pennerm2 | MatthiasPenner  | Developer
| Trang Pham      | phamt5   | dntrng          | Developer
| Tuan Le         | ledt    | TuanDinhLe      | Developer
| David Dyck      | dyckd349| davidndyck      | Developer

## 2. Test Methodology

### 2.1. Test Levels

1. Account Management

	**Unit Testing**

	1. Backend createUser() valid user creation - Should succeed
	2. Backend validateUser() validate existing user - Should succeed
	3. Backend validateUser() validate non-existent user - Should not succeed
	4. Backend getUser() get existing user - Should receive proper user back
	5. Backend getUser() get nonexistent user - Should not receive a user back
	6. Frontend render login page - Should succeed
	7. Frontend render signup window - Should succeed
	8. Frontend test failure validating different passwords - Should return false
	9. Frontend test failure vaildating same passwords with different case - Should return false
	10. Frontend test success validating identical passwords - Should return true

	**Integration Testing**

	1. API test failure authenticating against protected endpoint - Should fail to authorize
	2. API test creating new user - Should succeed to create user
	3. API test failure to create new user without email - Should fail to create user
	4. API test to login user - Should succeed to login
	5. API test login with incorrect credentials - Should fail to login

    **Acceptance Testing - Per User Story:**
	
	1.  As a new user, I want to be able to create an account with a username and a password so that the system can recognize me and store my information.
		1. Navigate to the home page
		2. Click "Create new account" 
		3. Enter a valid email, username, first name, last name, and password (twice) and hit "create account"

    2. As a registered user, I want to be able to log in to my account using my registered credentials so that I can access my information on the web app.
		1. Sign up as in the first acceptance test
		2. Log in with email and invalid password, it should not work
		3. Log in with email and valid password, it should work
		
		
    3. As a logged-in user, I want to be able to log out of the web app so that only those with my credentials can access my account.
		1. Log in as in the second acceptance test
		2. Press the log out button 
		3. Verify that user is no longer logged in by trying to navigate to /recipes and be redirected back to the login

2. Viewing and Retrieving Recipes

    **Unit Testing**

	1. Backend test to get all recipes belong to a valid user - Should succeed
	2. Backend test to get all recipes belong to an invalid user - Should get null
	3. Backend test to get a recipe by Name - Should succeed
	4. Backend test to get a recipe by Name that does not exist - Should get null
	5. Backend test to get a recipe with a valid recipeID - Should succeed
	6. Backend test to get a recipe with an invalid recipeID - Should get null
	7. Backend test to get all ingredients belong to a valid recipe id - Should succeed
	8. Backend test to get all ingredients belong to an invalid recipe id - Should get null
	9. Frontend rendering of homepage - Should render homepage
	10. Frontend search result for existent recipe - Should return correct result
	11. Frontend search result for nonexistent recipe - Should return no result
	12. Frontend case insensitive search result for existent recipe with wrong case - Should return correct result
	13. Frontend sorting by name ascending - Recipes should be sorted by name ascending
	14. Frontend sorting by name descending - Recipes should be sorted by name descending
	15. Frontend sorting by date ascending - Recipes should be sorted by date ascending
	16. Frontend sorting by date descending - Recipes should be sorted by date descending

    **Integration Testing**
	1. Backend integration test to get all recipes - should succeed to get all recipes
    2. Backend integration test to get a recipe with a valid ID - should succeed to get recipe by ID
	3. Backend integration test to get a recipe whose ID does not exist - should fail to get recipe by ID

    **Acceptance Testing - Per User Story:**
	
	1.  As a logged-in user, I want to be able to view all available recipes on my homepage.
		1. After logging in, click add button to create recipe
		2. Enter all required field "a"
		3. Click Save buttton
		4. Repeat step 1-3 for creating recipe named "b", "c"
		5. Should have 3 recipes named "a", "b", "c" on the page right now
		6. Click on recipe "a"
		7. Should have the name "a", direction "a" and ingredient "1 a"

    2. As a logged-in user, I want to be able to retrieve a recipe by name.
		1. After logging in, click add button to create recipe
		2. Enter all required field "a"
		3. Click Save buttton
		4. Repeat step 1-3 for creating recipe named "b", "c"
		5. Type in search bar "a"
		6. The page should only have recipe "a"
		7. Click on "x" button on search bar
		8. The search bar should be empty and the page should display 3 recipes "a", "b" and "c"
		
    3. As a logged-in user, I want to be able to organize recipes by name or by date added.
		1. After logging in, click add button to create recipe
		2. Enter all required field "a"
		3. Click Save buttton
		4. Repeat step 1-3 for creating recipe named "b", "c"
		5. Click sort dropdown and choose "Name: Z to A"
		6. The recipes should be display in order of "c", "b", "a"
		7. Click sort dropdown and choose "Name: A to Z"
		8. The recipes should be display in order of "a", "b", "c"
		9. Click sort dropdown and choose "Latest"
		10. The recipes should be display in order of "c", "b", "a"
		11. Click sort dropdown and choose "Oldest"
		12. The recipes should be display in order of "a", "b", "c"

3. Recipe Management

	**Unit Testing**
	1. Backend unit test to create a new recipe - Should return the newly created recipe
    2. Backend unit test to create a duplicated recipe - Should return null
	3. Backend unit test to remove a recipe with a valid recipeID - Should return true
    4. Backend unit test to remove a recipe that does not exist - Should return false
    5. Backend unit test to update a recipe - Should return an updated recipe
    6. Backend unit test to update a non-existing recipe - Should return null 
	7. Backend unit test to create new ingredients - Should return the new ingredients in a list correctly
	8. Backend unit test to delete all ingredients belong to a valid recipe id - Should return id matched ingredient list
	9. Backend unit test to delete all ingredients belong to an invalid recipe id - Should return an empty list
	10. Frontend unit test to disable save button when form is invalid (missing required field) - should return true
	11. Frontend unit test to disable save button when form is invalid (ingredient name is duplicated) - should return true
	12. Frontend unit test to disable save button when form is invalid (ingredient amount equal 0) - should return true
	13. Frontend unit test to disable save button when form is invalid (ingredient amount is negative number) - should return true
	14. Frontend unit test to disable save button when form is invalid (the form is valid) - should return false

	**Integration Testing**
	
	1. Backend integration test to create a new recipe - should succeed to create recipe
    2. Backend integration test to create a duplicated recipe - should fail to create recipe 
    3. Backend integration test to update a recipe - should succeed to update recipe
    4. Backend integration test to delete a recipe - should succeed to delete recipe by ID
    5. Backend integration test to update a recipe whose ID does not exist - should fail to update recipe
    6. Backend integration test to delete a recipe whose ID does not exist - should fail to delete recipe by ID

	**Acceptance Testing - Per User Story:**
	
	1.  As a logged-in user, I want to be able to upload new recipes.
		1. After logging in, click add button to create recipe
		2. Enter all required field "a"
		3. Click Save buttton
		4. Click Add button
		5. Enter all required field "a"
		6. Click Save button
		7. Should have a snack bar "Recipe name already exists"
		8. Delete recipe name
		9. Should have "Required" validation and the Save button is disabled
		10. Click Close button
		11. The page should only have 1 recipe "a"

    2. As a logged-in user, I want to be able to make changes to the recipes that I uploaded.
		1. After logging in, click add button to create recipe
		2. Enter all required field "a"
		3. Click Save buttton
		4. Click recipe "a"
		5. Click Edit button
		6. Change recipe name to "d"
		7. Click Save button
		8. The page should have 1 recipe named "d" only
		
		
    3. As a logged-in user, I want to be able to delete recipes that I uploaded.
		1. After logging in, click add button to create recipe
		2. Enter all required field "a"
		3. Click Save buttton
		4. Click recipe "a"
		5. Click Delete button
		6. Should have a confirmation popup
		7. Click "No, keep"
		8. Click "Close"
		9. The page should still have 1 recipe named "a"
		10. Repeat step 4-6
		11. Click "Yes, delete"
		12. The page should have no recipe

4. Shopping List

    **Unit Testing**

    1. Frontend test rendering shopping list main page - Should succeed
    2. Frontend test rendering ingredient list - Should succeed
    3. Frontend test generating an email with an empty list - body should be empty but subject etc should exist
    4. Frontend test generating an email with malformed data - should throw an error
    5. Frontend test generating an email with valid data - Body should contain list
    6. Backend test getting an empty shopping list - Should return a shopping list with no recipes in it
    7. Backend test getting a populated shopping list - Should return a shopping list with recipes in it
    8. Backend test getting selected recipes with no recipes selected - Should return selected recipes with no recipes selected
    9. Backend test getting selected recipes with 1 recipe selected - Should return selected recipes with 1 recipe selected
    10. Backend test updating the portion size - Should update portion size to 1
    11. Backend test reseting the portion size - Should update portion size to 1 and then reset it to 0

	**Integration Testing**

    1. Integration test getting an empty grocery list - Should return an empty shopping list
    2. Integration test getting recipes of empty grocery list - Should return an empty list of recipes

	**Acceptance Testing - Per User Story:**
    1. As a logged-in user, I want to be able to choose recipes and portion sizes to add to the shopping list.
		1. After logging in, create at least one recipe
		2. Click the utensil icon on the recipe to add it to the week plan
		3. Go to the week plan
		4. Select the number of portions you'd like to make of each added recipe
		
    2. As a logged-in user, I want to be able to generate a shopping list of ingredients based on my chosen recipes.
		1. Add recipes to the week plan and chosing portion counts as in acceptance test 1
		2. Go to the shopping list 
		3. click "Generate Shopping List", and ensure the right ingredients are listed
		
    3. As a logged-in user, I want to be able to send the shopping list to my email address.
		1. Generate a shopping list as in acceptance test 2
		2. Click "Send via Email" and verify your email client opens with the right data

5. Load Requirement (100 concurrent users with 1000 requests per minute)

	**Load Testing - TBD**

### 2.2. Test Completeness
Tests will be considered complete when: 
1. We have achieved 100% code coverage
2. All manual and automatic tests have executed with insignificant (<5%) failure
3. All failures are documented as bugs or otherwise, and a plan to fix has been created 
## 3. Resource and Environment Needs

### 3.1. Testing Tools
Requirements Tracking - Github/Jira

Bug Tracking - Github/Jira

Automation - Jenkins/Github

Unit Testing - Mocha, Jest, Supertest

### 3.2. Test Environment
Tests will be run automatically in the CI/CD process on the Jenkins server using Mocha and Jest (unit and integration testing), and to be determined software for the other sets of tests. 
The Jenkins server has two vCPUs and 8 GiB of RAM.

## 4. Terms/Acronyms
TBD - To be determined


