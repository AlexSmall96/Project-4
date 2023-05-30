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
|5.4|Loading Data| When logged in as a member, the button in the footer becomes a link to 'Members Area' and directs the user to the correct page when clicked| Pass|

[Members Only Content Tests Screenshots](https://github.com/AlexSmall96/Rural-Fitness/blob/main/documentation/testing/members-only-screenshots.pdf).

### Timetable
| Test | Category         | Pass Criteria                       | Pass/Fail |
|------|------------------|-------------------------------------|-----------|
|6.1 | Loading Data | Header from home page loads at top, with 'Help' and 'Confirm Bookings' appearing underneath, before date navigation tabs with dates spanning a week|
6.2| Loading Data | Each date tab loads the timetable data correctly for that day, (see timetable.json and track any changes made via the admin page for verification) Pass
6.3| Loading Data | When all classes for the day have finished, the tab for that date dissapears | Pass
6.4| Component Interactivity | Help Button is clickable at any time and reveals a pop down instructions message|Pass
6.5| Component Interactivity | Clicking the Help button again hides instructions message |Pass
6.6| Component Interactivity | While no classes are selected, the Confirm Bookings button is not clickable|Pass
6.7| Component Interactivity | Once a class has been selected, its own button changes to 'Remove from Cart' and the Confirm Bookings button becomes blue and is now clickable|Pass
6.8| Component Interactivity | Multiple classes can be selected, from whichever day the user wishes |Pass
6.9| Component Interactivity | Clicking the confirm booking button when classes are selected reveals a confirmation modal, with a list of users chosen classes, an option to remove each one, which removes it from the list in the modal, an 'Add more classes' button and a 'Book me in' button |Pass
6.10| Component Interactivity | Clicking the Add more classes button dismisses the modal and takes the user back to the timetable, clicking Book me in reveals another modal confirming to the user the classes have been booked. Modal has buttons for 'Book more classes' which dismisses the modal and takes the user back to the timetable, and a 'View My Bookings' button which takes the user to the Members Area |Pass
6.11| Database Logic | The text on the button corresponding to users booked in classes appears as 'Booked in. Cancel?' |Pass
6.12| Component Interactivity | Clicking a cancellation button reveals a confirmation modal, with message 'Are you sure?' and Yes and No buttons |Pass
6.13| Database Logic| Clicking yes on the confirmation modal reveals message confirming to the user that the booking has been cancelled, with a Book more Classes and View my Bookings button appearing. Book more Classes dismissis modal and View my Bookings takes user to Members area |Pass
6.14| Database Logic| Clicking yes on the confirmation modal reveals message confirming to the user that the booking has been cancelled, with a Book more Classes and View my Bookings button appearing. Book more Classes dismisses modal and View my Bookings takes user to Members area |Pass
6.15| Database Logic| Button corresponding to the class the user cancelled now appears as default text 'Add to Cart' |Pass
6.16| Database Logic| When a user books in for a class, the number of spaces shown decreases by 1 |Pass
6.17| Database Logic|If a class is cancelled by the admin, the location, spaces and buttons dissapear and are replaced by a message with text 'Apologies, class cancelled' |Pass
6.18| If a class has 0 spaces left, its action button dissapears and is replaced with a 'Class Currently Full' message |Pass

[Timetable Tests Screenshots](https://github.com/AlexSmall96/Rural-Fitness/blob/main/documentation/testing/timetable-screenshots.pdf).

### Members Area
| Test | Category         | Pass Criteria                       | Pass/Fail |
|------|------------------|-------------------------------------|-----------|
|7.1| Loading Data | Header from home page loads as expected, welcome message loads stating users username and joined date. Button on footer has a link to home page|Pass|
|7.2| Database Logic | Users booked in classes appear, with cancellation button for each one | Pass
|7.3| Component Interactivity | Clicking cancellation button resuts in confirmation modal appearing, with yes and no buttons| Pass
|7.4| Database Logic  | Clicking yes button on confirmation modal results in message confirming to user that booking has been cancelled, with Book more classes and View remainign Bookings buttons appearing | Pass
|7.5| Component Interactivity  | Clicking book more classes directs user to timetable, clicking view remaining bookings dismisses modal and takes user back to members area | Pass
|7.6| Component Interactivity  | Cancelled classse that user has booked into appear in members area with message stating they have been cancelled | Pass
|7.7| Navigation Links  | Facebook link in picture opens in new tab to facebook home page, link to home page in footer links correctly to home page | Pass

[Members Area Tests Screenshots](https://github.com/AlexSmall96/Rural-Fitness/blob/main/documentation/testing/members-area-screenshots.pdf).

### Admin Page 
| Test | Category         | Pass Criteria                       | Pass/Fail |
|------|------------------|-------------------------------------|-----------|
|8.1| Loading Data| When user logs in as super user, the admin page becomes visible in the nav bar |
|8.2|Database Logic| Applying each of the filters alters the sessions shown, and a clickable filter button appears when each field is filtered. | Pass
|8.3|Database Logic| Clicking each filter button removes the filter and updates the list of sessions | Pass
|8.4|Database Logic| All fields can be edited when updating a session| Pass
|8.5|Database Logic| When save changes button is clicked on a session, a confirmation modal appears. Session details are updated when user confirms via modal| Pass
|8.6|Database Logic| User recives feedback via another modal that session details have been updated| Pass
|8.7|Database Logic| When save delete button is clicked on a session, a confirmation modal appears. Session is deleted when user confirms via modal| Pass
|8.8|Database Logic| User recives feedback via another modal that session has been deleted| Pass
|8.9|Component Interactivity| Clicking Add session button results in a new session appearing in yellow| Pass
|8.10|Database Logic| Modals appear in the same way as update sessions as for creating a session| Pass
|8.11|Database Logic| Modals appear in the same way as update sessions as for creating a session| Pass
|8.12|Database Logic|When creating or updating a session, details cannot be altered to create a clash with the current timetable| Pass
|8.12|Database Logic|When creating or updating a session, session times must be on the hour, if not a feedback modal appears stating this| Pass
|8.13|Database Logic|Details that have been altered on the admin page are reflected on the members area and timetable page. (See Members Area and Timetable Test Sections)| Pass

### Screenshots where applicable for Admin page
[Admin Tests Screenshots](https://github.com/AlexSmall96/Rural-Fitness/blob/main/documentation/testing/admin-screenshots.pdf).

### Defensiveness 
Several of the pages on this site have restricted content that is role specific. To deal with this, defensiveness has been added. If the timetable, members area or admin urls are copied into another browser, the user is redirected to the home page as they are no longer logged in. Further developments would include a specific feedback message directed to the user or being redirected to the login page.
## Responsiveness

## User Stories Testing

## Issues Found
 
## Validation Testing

