# Test Plan for Plateplanner

Testing plan for the COMP4350 W23 Group Project "PlatePlanner"

### Changelog:

| Version         | Date Changed  | By          |           Description           |
|-----------------|---------------|-------------|---------------------------------|
| 1.0             | 2023-02-11    | David Dyck  | Initial Draft for Review        |
| 1.1             | 2023-02-16    | David Dyck  | Added Unit test details         |

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
	**Acceptance Testing - TBD**
	**Regression Testing - TBD**
	**Load Testing - TBD**
2. Viewing and Retrieving Recipes
    **Unit Testing**
        1. Test rendering of homepage - Should render homepage
		2. Test search result for existent recipe - Should return correct result
		3. Test search result for nonexistent recipe - Should return no result
		4. Test case insensitive search result for existent recipe with wrong case - Should return correct result
		5. Test sorting by name ascending - Recipes should be sorted by name ascending
		6. Test sorting by name descending - Recipes should be sorted by name descending
		7. Test sorting by date ascending - Recipes should be sorted by date ascending
		8. Test sorting by date descending - Recipes should be sorted by date descending
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
	**Acceptance Testing - TBD**
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


