# Gousto coding test
Hi there! We prepared a technical task so we can get to know you better. Below you will find scenarios and further details on what this task is about.

Please fork this repository in your account.

If anything is unclear or you have any questions, feel free to get back to us. We want to make our technical task a pleasant experience so feel free to give us any feedback on this exercise.

## Approach

The purpose of this test to try and give you the best chance to show us what you can do.

We're most interested in seeing **quality** rather than quantity, so please do take note of our [Non Functional Requirements](#non-functional-requirements) below.

---

## Getting started:

1. Please install the dependencies for both `app` and `server` by running `npm i` within both of folders;
2. After installation, start the `app` e.g. `cd app && npm start`;
3. On a separate terminal, please start the `server` e.g. `cd server && npm start`. See [API endpoints](#api-endpoints) below.

## Functional requirements

### Task 1: As a user I want to see a list of products' titles and descriptions

  * Given that I am a user
  * When I land on the main page
  * Then I can see a list of product titles and descriptions

  _💡 Hint: we'd like to see good type-safety and error-handling_

### Task 2: As a user I want to see all available product categories

  * Given that I am a user
  * When I land on the main page
  * Then I can see a list of product categories

  _💡 Hint: this is a good opportunity to demonstrate HTML semantics and some simple styling_

### Task 3: As a user I want to be able to filter the products by category

  * Given that I am a user
  * When I land on the main page
  * And I click on a category
  * Then I see a list of only products belonging to that category
  * And the selected category is bold

  _💡 Hint: we'd like to see consideration for performance here_

### Task 4: As a user I want to only see the product description when the product title is clicked

  * Given that I am a user
  * When I land on the main page
  * Then I see only a list of product titles
  * When I click on a product title
  * Then I see the product desription underneath
  * And no other product descriptions are visible

  _💡 Hint: try to use proper HTML semantics and a11y here_

#### [API endpoints:](#api-endpoints)
Ensure that the server is running locally (Step 2 in Getting Started), and then you can access:
* Categories at: http://localhost:3001/products/v2.0/categories
* Products at: http://localhost:3001/products/v2.0/products

## Non-Functional Requirements

* The UI should be built with React, but you are allowed to use additional libraries if needed
* If you see fit, use your preferred library for state management (Redux dependencies are already set up, but you can use what you want, you can also use React Context)
* Use your preferred CSS solution/library. Use your imagination, but do not spend too much time for css
* The application should be responsive (the application can be used on mobile)
* The code should include some tests
* Please use SCM as you would when developing production features - we're keen to see meaningful commits.
* Try to use best-practice where possible (although we appreciate you'll probably be in a rush) - we'd like to see consideration for:
  * Performance
  * Accessibility/semantic HTML
  * Type-safety
  * Error handling

## Visuals

![Image1](./public/first.png)
![Image2](./public/second.png)
![Image3](./public/third.png)
