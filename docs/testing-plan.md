
# Test Plan for Plateplanner

Testing plan for the COMP4350 W23 Group Project "PlatePlanner"

### Changelog:

| Version         | Date Changed  | By          |           Description           |
|-----------------|---------------|-------------|---------------------------------|
| 1.0             | 2023-02-11    | David Dyck  | Initial Draft for Review        |
| 1.1             | 2023-02-16    | David Dyck  | Added Unit test details         |
| 1.2             | 2023-02-17    | Tuan D. Le  | Added Unit test details         |

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
	6. Frontend create user API with valid data - should create user successfully
	7. Frontend create user API with invalid data - should not create user successfully
	8. Frontend login API with valid user - Should log in successfully
	9. Frontend login API with invalid user - Should return error
	10. Frontend logout API - Should successfully unset cookie 

	**Integration Testing - TBD**

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
	
	**Regression Testing - TBD**

	**Load Testing - TBD**

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

    **Integration Testing - TBD**

    **Acceptance Testing - TBD**

    **Regression Testing - TBD**

    **Load Testing - TBD**

4. Recipe Management

	**Unit Testing - TBD**

	**Integration Testing - TBD**

	**Acceptance Testing - TBD**

	**Regression Testing - TBD**

	**Load Testing - TBD**

5. Shopping List

    **Unit Testing - TBD**

	**Integration Testing - TBD**

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
	**Regression Testing - TBD**

	**Load Testing - TBD**

6. Load Requirement (100 concurrent users with 1000 requests per minute)

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
Tests will be run automatically in the CI/CD process on the Jenkins server using Mocha and Jest (unit testing), and to be determined software for the other sets of tests. 
The Jenkins server has two vCPUs and 8 GiB of RAM.

## 4. Terms/Acronyms
TBD - To be determined


