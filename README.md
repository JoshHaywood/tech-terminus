# Artefact

Artefact for Comp360_A1, identified as artefact A for part A of the A/B test. Artefact A is an online e-commerce website with informed design alterations, while artefact B is a similar site made with a website builder. With the established relevance of e-commerce to the web industry, it was judged as the most appropriate website genre to get an accurate understanding of its design merits from user opinions, not only for this experiment but for users to apply results.

**Please not that this artifact is adapted from the work of a different module. Therefore, the commit logs can be found under its associated repository here:** https://github.falmouth.ac.uk/JH248828/Web310_A1

Artefact A can be found here: http://www.tech-terminus.me
Artefact B can be found here: https://beyours-theme-tech.myshopify.com

## Contents

- [Artefact](#Artefact)
  - [Contents](#contents)
  - [Main Features](#main-features)
  - [Refactoring](#refactoring)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [User Guide](#user-guide)

## Main Features

- Cloud hosted front-end and database
- Login and registering
- Product list and viewing
- Database search and filtering
- Cart and checkout system

## Refactoring

During the development of this artefact there were two main itterations of refactoring, evidenced by two seperate hueristic analysis (found here: [Hueristics](https://github.falmouth.ac.uk/JH248828/Comp320_A1-Comp360_A1/tree/documentation/hueristics)) conducted via the same set of user study questions available here: https://forms.gle/zz3Qsvzn2otUJK8Q8. The second analysis also based its refactors on some of the issues raised during the papers study.

**Hueristic analysis 1**

The issue raised during this analysis were:
-  Error prevention
-  User control
-  Freedom
-  Consistency

The error prevention issue occurred because the registration form did not have clear instructions on the requirements for a valid password. To resolve this, a placeholder password was added to the input, indicating that a capital letter and number were both required for a valid password. [Associated commit](https://github.falmouth.ac.uk/JH248828/Web310_A1/commit/c9db2e4e5dea3789b9bfc0ac64e4c337d387b4b8)

The user control issue was caused by the session used to store login information, which destroyed itself too quickly. This was due to the use of the deprecated attribute 'expires' instead of 'maxAge' for that cookie. Using 'maxAge' to give the cookie a days lifetime resolved the issue. [Associated commit](https://github.falmouth.ac.uk/JH248828/Web310_A1/commit/c9db2e4e5dea3789b9bfc0ac64e4c337d387b4b8)

One minor issue with freedom was that the logo did not contain a link back to the index page, which is typical in most websites. This was resolved by adding an 'onClick' function to the logo that navigates the user back to the index page with React's link component. [Associated commit](https://github.falmouth.ac.uk/JH248828/Web310_A1/commit/4cff9328c495c51a8cac4e0b7ada8b4aa0dfe856)

Another issue with freedom was that during the earlier stages of the project's development, products could only be searched by name and not by the brand they were associated with. Therefore, all products were given a brand name in the database to allow for this method of searching. This was not evidenced by a commit as it was a database change and not source code, however this functionality can be tested on the live site.

A consistency issue was identified with updating products on the checkout page. While it worked on Microsoft Edge and Google Chrome, it did not work on Firefox or Safari. This was because there is a bug with leaving a trailing '/' at the end of HTTP requests on these browsers. Removing this resolved the issue. [Associated commit](https://github.falmouth.ac.uk/JH248828/Web310_A1/commit/1733c8b138ce4924ae4b5543915a393c050562e7)


**Hueristic analysis 2**

The issue raised during this analysis were:
-  Error prevention
-  Efficency
-  Consistency
-  Freedom

The error prevention issue occurred because the application did not use a '.env' file to store a prefix for each of the HTTP requests. As a result, each request was manually changed between development and deployment, increasing the chance of human error and causing some of the requests to 404 as they were still set to their development address. To mitigate this risk, a prefix was added to the '.env' file and to all HTTP requests. This required only one line change between development and deployment, reducing the chance for errors. [Associated commit](https://github.falmouth.ac.uk/JH248828/Comp320_A1-Comp360_A1/commit/f9e91510fd766ed2aef5622dfd69817ddc693860)

An efficiency issue was raised by one of the study participants, indicating a preference for the headers dropdown menu to be open and closed using mouse hovering rather than clicking. Therefore, the associated 'onClick' function was changed to an 'onMouseEnter' function, with 'onMouseExit' tied to the background overlay to close the menu. [Associated commit](https://github.falmouth.ac.uk/JH248828/Comp320_A1-Comp360_A1/commit/8137ea99c5ca39b09ef52259771fef0425b9f167)

A consistency issue was identified in an edge case where the application's layout would not update correctly between screen sizes. Normally, media queries handle this, but sometimes the boundaries for media query screen sizes are not specific enough and do not work with JSX elements. Therefore, the initial method was to create booleans for toggling different layouts using the window's inner width. This worked, but it didn't listen for the page's resize like a media query, requiring a page refresh to see any changes to the layout. The npm package 'react-responsive' was used instead, as it allows JSX variables to use the same functionality as media queries. This means that it always listens for a page resize and does not require a page refresh to see changes. [Associated commit](https://github.falmouth.ac.uk/JH248828/Comp320_A1-Comp360_A1/commit/15ef2ed4201d147307640c84590398e68b03458d)

The freedom issue was caused by the need to individually remove items from the checkout cart. While the functionality worked correctly, it became tedious for users with many items. Therefore, a new database endpoint was created that completely clears the cart for the session user's account with one button click. [Associated commit](https://github.falmouth.ac.uk/JH248828/Comp320_A1-Comp360_A1/commit/4f5a2ace747cbdb2f9acb308061c3aa696e6593b)


## Installation

### Prerequisites

- Node Package Manager [Nodejs](https://nodejs.org/en/download/)
- File manager (File explorer recommended for windows users.)
- Web browser (Google Chrome is recommended.)
- Integrated Development Environment (IDE) (Visual Studio Code is recommended (https://code.visualstudio.com/download))
- Command Line Interface (CLI) (Git Bash is recommended (https://git-scm.com/downloads))
- mySQL (https://dev.mysql.com/downloads/installer/)
- mySQL workbench (Can be installed along with mySQL)

**Optional**

- Repository Browser (Recommended GitHub desktop (https://desktop.github.com/))

### User Guide

Deployed version availble on [Heroku](http://www.tech-terminus.me)

1. To run the local version downloaded the optional repository browser clone the repository and pull.
If you haven’t downloaded the repository browser download a zip folder from the repository under 'code' tab then the 'code' dropdown button then click download zip.
Then extract the folder somewhere in your files.

3. Within the IDE or any other tool your using to edit files go to `client/src/App.js` in this file comment out line 18 and un comment line 16.

4. Similarly, if you arent using an SQL browser skip this step in `config/db.js` un comment lines 6 to 10 and comment lines 12 to 15

5. In the format it appears in `db.js` enter the connection name as "web310_a1", hostname as "localhost", username as "root", password as "password" and enter the following creation queries statments to replicate the tables found on the cloud:

```
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(999) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `checkout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_UNIQUE` (`user_email`,`product_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
```

6. Now open the table export wizard and use the CSV file found in documentation to import the product table's rows

7. Right click the table and alter to the following settings
![products-table](https://media.github.falmouth.ac.uk/user/561/files/73430031-c614-4283-9df9-bc285d3240a2)

8. Right click the product table and click select all to check the rows have been imported

9. Exit my sql workbench and open the project folder open your CLI by navigating to where you have stored the project folder or using the terminal in your IDE.

10. Enter the following into your CLI. (This was done using GitBash and therefore commands might differ.)

`$ cd client`

`$ npm install`

`$ npm start`

11. In a new CLI instance or cd back to the project root:

`$ npm install`

`$ npm run dev`

This will cause react to run in development mode and node to run with nodemon.
This will have worked currently if a new browser windowed was opened at http:localhost:3000

12. Finally if it didnt open automatically enter the local URL (http:localhost:3000) into your web browser.

**If you are having issues with running the project**

1. Ensure you have correctly copied and created your own local versions of the; users, products and checkout
   To check their formatting look in the '/routes/ folder on the back-end

2. Check you have a copy of the '.env' in the following format, replacing the placeholder variables names with your own variables:

```
# Local
#FRONT_END_PORT=LOCAL_URL
# Deploy
FRONT_END_PORT=DEPLOYED_URL # Comment out this line during local development

PORT=BACK_END_PORT

# Session config
SECRET=SESSION_SECRET

# Hashing config
PEPPER=PEPPER

# Database config
DB_HOST=LOCAL_DATABASE_HOST
DB_USER=LOCAL_DATABASE_USER
DB_PASS=LOCAL_DATABASE_PASSWORD
DB_NAME=LOCAL_DATABASE_NAME
```
