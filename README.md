# Gousto coding test

## Getting started:

1. Run the application with `yarn` followed by `yarn start` in the current directory - the application will be available at [http://localhost:3600](http://localhost:3600)
2. Run the server by moving into the `server` directory and running `yarn` followed by `yarn start`. See [API endpoints](#api-endpoints) below.
3. Run application tests with `yarn test`

## Functional requirements

### Task 1: As a user I want to see a list of products titles and descriptions

  * Given that I am a user
  * When I land on the main page
  * Then I can see a list of products titles and description

### Task 2: As a user I want to be able to search in the product title and description

  * Given that I am a user
  * When I type ' serv' in the input search
  * Then the products matching the search input in title and/or description are shown below

### Task 3: As a user I want to see all available product categories

  * Given that I am a user
  * When I land on the main page
  * Then I can see the categories of products

### Task 4: As a user I want to see the products for the selected category

  * Given that I am a user
  * When I land on the main page view
  * And I click on 'Drinks Cabinet' category
  * Then I can see a list of products belonging to that category
  * And the selected category is bold

### Task 5: As a user I want to be able to see the product description when I click on the product name

  * Given that I am a user and I land on main page
  * When I click on 'Borsao Macabeo'
  * Then I can see the description appearing below and the title is bold
  * When I click again on the 'Borsao Macabeo'
  * Then I can see that the description is hidden
  * When I click on multiple products
  * Then all the clicked products descriptions are visible

### Task 6: As a user I want to be able to navigate with the browser's native back and forward buttons

  * Given that I am a user
  * When I am on the 'Drinks Cabinet' category
  * And I click on 'Large Alcohol' category
  * Then I can click on the back button from the browser
  * And I can see the 'Drinks Cabinet' category selected
  * Then I click forward button
  * And I can see the 'Large Alcohol' category selected

#### [API endpoints:](#api-endpoints)
Ensure that the server is running locally (Step 2 in Getting Started), and then you can access: 
* Categories at: http://localhost:3000/products/v2.0/categories
* Products at: http://localhost:3000/products/v2.0/products

## Non-Functional Requirements

* UI should be built with React, but you are allowed to use additional other libraries if needed
* Use your preferred library for state management (Redux dependencies are already set up, but you can use what you want)
* Use your preferred CSS solution/library. Use your imagination, but do not spend to much time for css
* The application should be responsive (the application can be used on mobile)
* The code should include `test`
* The code should be production ready (no refactoring need)

## Visuals

![Image1](./public/first.png)
![Image2](./public/second.png)
![Image3](./public/third.png)
