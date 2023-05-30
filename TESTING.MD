# Testing
Back to [README.MD](https://github.com/AlexSmall96/Rural-Fitness/blob/main/README.md).
## Table of Contents

## Automated Tests
See test_models.py and test_views.py for automated python tests, covering basic template loading and model interactivity. This document covers more complex and detailed features that are better suited to manual testing.
## Manual Testing
Manual testing was divided into sections based on the page location of the site. For each page, the tests are detailed below, with a reference number, a category, pass criteria and pass/fail result. For each page, screenshots of the test where applicable are linked as a pdf.
 
### Home Page
 
| Test | Category         | Pass Criteria                       | Pass/Fail |
|------|------------------|------------------------------------ | -----------|
|1.1|Loading Data|Home page loads as default when site is opened, with logo and nav bar appearing at top.|Pass|
|1.2|Loading Data|Only login and home links appear in navbar as no user is logged in.|Pass|
|1.3|Component Interactivitiy|When screen size is under 576px and nav bar collapses, clicking on hamburger menu opens navbar underneath image.| Pass|
|1.4| Navigation Links|Clicking on  home and login/register links direct user to correct page, clicking on the logo reloads the home page .|Pass|
|1.5| Loading Data| Hero image and 3 about images all load correctly when site is first opened.|Pass|
|1.6| Component Interactivitiy|Login and Membership buttons direct user to the correct pages.|Pass|
|1.7| Component Interactivitiy|Read more links in Facilities and Spa section reveal a hidden paragraph when clicked on, with pictures being moved down when viewed on <576px screens.|Pass|
|1.8| Component Interactivitiy|Membership Options button in footer takes the user to the correct page.|Pass|
|1.8| Navigation Links|Social media links in footer open correctly in a new tab to the site home page. Github and LinkedIn links open correctly in a new tab to Alex Small's profiles.|Pass|
|1.9| Navigation Links|Social media icons enlarge when hovered over.|Pass|
|1.10| Loading Data|Email and phone details load in footer with icons.|Pass|

[Home Page Tests Screenshots](https://github.com/AlexSmall96/Rural-Fitness/blob/main/documentation/testing/home-page-screenshots.pdf).

### Signup Details Page

| Test | Category         | Pass Criteria                       | Pass/Fail |
|------|------------------|-------------------------------------|-----------|
|2.1   |Loading Data      |When page loads, the same header from the home page appears at top with tabs to navigate form below |Pass|
|2.2   |Loading Data      |Cards containing three membership options appear below tabs, with a pargraph describing each one. | Pass|
|2.3| Navigation Links | Clicking 'Already a member? Sign in here' button directs user to login page |Pass|
|2.4| Component Interactivity| Membership options can be selected and circle becomes checked| Pass
|2.5| Component Interactivity| Clicking 'Next' button takes the user to 'Personal Details' tab, with 'Membership Options' tab becoming disabled.|Pass|
|2.6| Input Validation | If 'Next' button on 'Personal Details' tab is clicked with a form input empty, a help message appears below empty input and button can't be clicked|Pass|
|2.7| Component Interactivity | If form is filled in, clicking 'Next' takes user to 'Payment' tab, with 'Personal Details' tab becoming disabled.|Pass|
|2.8| Input Validation | If 'Next' button on 'Payment' tab is clicked with a form input empty, a help message appears below empty input and button can't be clicked|Pass|
|2.9| Component Interactivity | If form is filled in, clicking 'Next' takes user to the 'Login Details' tab, with a seperate html page openeing. |Pass|

[Signup Details Page Tests Screenshots](https://github.com/AlexSmall96/Rural-Fitness/blob/main/documentation/testing/signup-details-page-screenshots.pdf).

### Register Page

| Test | Category         | Pass Criteria                       | Pass/Fail |
|------|------------------|-------------------------------------|-----------|
|3.1|Input Validation| Attempting to submit the form with a field message gives a help message next to the input, with 'Sign Up' button being disabled|Pass
|3.2|Input Validation| Submitting the form with password and confirm password that don't match gives a help message of 'The two password fields didn't match' |Pass
|3.3|Input Validation| Submitting the form with a password that is too similar to the username, too short or too common gives the corresponding help message to the user|Pass
|3.4|Input Validation| Submitting the form with valid input revals a success message, with a Login button and a register another account button appearing.|Pass
|3.5|Component Interactivity| Clicking the login button directs the user to the login page, clicking the register another account button takes the user back to the membership options tab.|Pass
|3.6|Loading Data| The button in the footer of the signup details page contains a link to the home page|Pass

[Register Page Tests Screenshots](https://github.com/AlexSmall96/Rural-Fitness/blob/main/documentation/testing/register-page-screenshots.pdf).

### Login Page

| Test | Category         | Pass Criteria                       | Pass/Fail |
|------|------------------|-------------------------------------|-----------|
|4.1|Loading Data|Header from home page loads, with a login box directly underneath |Pass
|4.2|Input Validation|Submitting form with no detials or with incorrect details results in 'Invalid Username/Password' message|Pass
|4.3|Input Validation|Correctly submitting a registered users details directs the user to the home page|Pass
|4.4|Navigation Links|'Sign up today' button takes user to membership options tab of signup details page|Pass

[Login Page Tests Screenshots](https://github.com/AlexSmall96/Rural-Fitness/blob/main/documentation/testing/login-page-screenshots.pdf).

### Members Only Content 
In this section, a 'member' refers to a normal user who has registered an account, that is not a superuser.
| Test | Category         | Pass Criteria                       | Pass/Fail |
|------|------------------|-------------------------------------|-----------|
|5.1|Loading Data| When logged in as a member, the timetable and members area links become visible in the nav bar| Pass
|5.2|Loading Data| When logged in as a member, the buttons underneath the hero image and 'Classes' section become links to 'Members Area' and 'Timetable' and direct to the correct pages when clicked| Pass
|5.3|Loading Data| When logged in as a member, the buttons underneath in the class hero image become links to 'Members Area' and 'Timetable' and direct to the correct pages when clicked| Pass
|5.4|Loading Data| When logged in as a member, the button in the footer becomes a link to 'Members Area' and directs the user to the correct page when clicked| Pass

[Login Page Tests Screenshots](https://github.com/AlexSmall96/Rural-Fitness/blob/main/documentation/testing/members-only-screenshots.pdf).

### Timetable
| Test | Category         | Pass Criteria                       | Pass/Fail |
|------|------------------|-------------------------------------|-----------|

### Screenshots where applicable for Timetable


### Members Area
| Test | Category         | Pass Criteria                       | Pass/Fail |
|------|------------------|-------------------------------------|-----------|
### Screenshots where applicable for Members Area

### Admin Page 
| Test | Category         | Pass Criteria                       | Pass/Fail |
|------|------------------|-------------------------------------|-----------|
### Screenshots where applicable for Admin page

## Responsiveness

## User Stories Testing

## Issues Found
 
## Validation Testing

