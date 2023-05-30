# Rural Fitness
 

## Live Site 
[https://connect-four-python.herokuapp.com/](https://connect-four-python.herokuapp.com/)

![](documentation/images/live_site_1.png) | ![](documentation/images/live_site_2.png)

## Repository 
[https://github.com/AlexSmall96/Rural-Fitness](https://github.com/AlexSmall96/Rural-Fitness)

## Author 
Alex Small
## Table of Contents

# UX
## Target Audience

 
## Project Goals and Planning

## User Stories
### Gym / Club Member

### Gym / Club Admin


### Website Owner


## Features

## Future Features



## Testing
Testing is detailed fully in [TESTING.MD](https://github.com/AlexSmall96/Rural-Fitness/blob/main/TESTING.md).

## Frameworks & Programs Used


## Python Libraries Used


# Deployment
### Deploying the Site to Heroku
1. Create an account on [Elephant SQL](https://www.elephantsql.com/) and log in.
2. Create a new database instance on Elephant SQL and copy the database url
3. Create an account on [Heroku](https://id.heroku.com/login) and log in.
4. Create a new app on Heroku
5. Navigate to the 'Settings' tab, and click "Reveal Config Vars".
6. Add a config var with key DATABASE_URL and value of the databse url you copied from elephantsql
7. Create an account on [Cloudinary](https://cloudinary.com/users/login) and uploaded all files in the static folder of this repository
8. Copy Cloudinary url.
9. Add another config var with key CLOUDINARY_URL and value of the cloudinary url you copied.
10. Add a final config var with key SECRET_KEY and set it to a chosen value
11. Navigate to the 'Deployment' tab. For 'Deployment method', select Github.
12. Under 'Search for a repository to connect to', enter the appropriate GitHub username and repository name
13. To deploy the repository, either select 'Enable Automatic Deploys', which deploys the site after each push to GitHub or Manually click 'Deploy Branch'
14. In both deployment methods, the main branch or any forked branches may be chosen, see [Forking the Repository on Github](#Forking-the-Repository-on-GitHub)

### Forking the Repository on GitHub
1. On GitHub.com, navigate to the main page of the [Connect Four](https://github.com/AlexSmall96/Connect-Four) repository.
2. In the top-right corner of the page, click Fork.
3. Select an owner for the forked repository.
4. By default, forks are named the same as their upstream repositories. You can change the name of the fork to distinguish it further.
5. Optionally, add a description of your fork.
6. Choose whether to copy only the default branch or all branches to the new fork. For many forking scenarios, such as contributing to open-source projects, you only need to copy the default branch. By default, only the default branch is copied.
7. Click Create fork.
### Cloning the Repository on GitHub
1. On GitHub.com, navigate to the main page of the [Connect Four](https://github.com/AlexSmall96/Connect-Four) repository.
2. Above the list of files, click Code.
3. Copy the URL for the repository.
4. Open Terminal.
5. Change the current working directory to the location where you want the cloned directory.
6. Type git clone, and then paste the URL you copied earlier.
7. Press Enter to create your local clone.

# Credits
## Content


## Code


## Acknowledgements 
This application was created as a portfolio 4 project for the Diploma in Full Stack Software Development from [Code Institute](https://codeinstitute.net/full-stack-software-development-diploma/?utm_term=code%20institute&utm_campaign=CI+-+UK+-+Search+-+Brand&utm_source=adwords&utm_medium=ppc&hsa_acc=8983321581&hsa_cam=1578649861&hsa_grp=62188641240&hsa_ad=635720257674&hsa_src=g&hsa_tgt=kwd-319867646331&hsa_kw=code%20institute&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gclid=CjwKCAiA5Y6eBhAbEiwA_2ZWIUE0LRewvfAYnQS69Lujb5s2FrQjmX0Idzqj-Olbamn1DbS2D-R7gBoC-1AQAvD_BwE
)
I would like to thank my mentor Harry Dhillon for his encouraging support and detailed feedback throughout this project.