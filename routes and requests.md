# Routes and Requests

## Contents

- [Routes and Requests](#routes-and-requests)
  - [Client](#client)
  - [Server](#server)

## Client routes
- `/` GET - Renders the Index page.
- `/results/:id` GET - Renders search results page, requires a search query as `id`.
- `/login` GET - Renders login page.
- `/register` GET - Renders register page.
- `/contact` GET - Renders Contact page.
- `/success` GET - Confirmation page after submitting form on contact page, re-uses `<Message />` component with props.
- `/product/:id` GET - Detailed product view page, requires a product name as `id`.
- `/checkout` GET - Renders Checkout page.
- `/confirmation` GET - Confirmation page after submitting form on checkout page, re-uses `<Message />` component with props.
- `*` GET - Handles any unspecified routes as 404, re-uses `<Message />` component with props.

## Server routes
- `/users/insert` POST - Inserts row into users table when registering.
- `/users/validate` POST - Validates stored rows in users table against inputs on login and creates session.
- `/users/validate` GET - Gets logged user information to be used in header component.
- `/users/logout` POST - Destroys current user session on logout.
- `/products/get` GET - Gets all products from products table.
- `/products/latest` GET - Gets all products from products table that contain the string 'phone'.
- `/products/featured` GET - Gets products with id's 1, 2, and 3 from products table.
- `/products/brands` GET - Gets one of each brand name from products table.
- `/checkout/add` POST - Adds product to currently logged user's cart.
- `/checkout/get` GET - Get all products from currently logged user's cart.
- `/checkout/delete/:id` DELETE - Delete selected product from currently logged user's cart.
- `/checkout/update` PUT - Updated quantity of selected product in currently logged user's cart.
- `/checkout/clear` DELETE - Clears currently logged user's cart when reaching confirmation page.
