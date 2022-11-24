<!--Heading -->

<h1>IssueTracker APP🚀 </h1>
<p padding=20>The <b>IssueTracker</b> app is a simple SPA<code> ( Single page application )</code>Where user's are able to log complains or issues on the board and have them reviewed by a system Administrator, The user interface contains just a simple form where a user inputs there name and the issue that the want to report.</p>

<br>

# Table of Contents

- [#Built with ](#built-with-🚀)
- [#Get Started](#getting-started) 
- [#Running the application](#running-the-application)
- [#Contributing](#how-to-contribute)
- [#Conclusion](#conclusion)

<br>


## ##Built with 🚀
The issue tracker app was built with the Mern STack and GraphQL
* GraphQL
* MongoDB
* Express
* React
* NodeJs
<br>
<br>

# Getting Started
To Run the application you need a set of Requirements
<br>
To install the requirements follow the links below
<br>


- [ x ] [Docker](https://docs.docker.com/get-docker)
- [ x ] [NodeJs](https://nodejs.org/en/download)
- [ x ] npm <code> ( node package manager ) </code>

<br>

## Running the Application

After installing the requirements next you want to run the application,
To run the application you need to first clone the applications or download the zip file.
```bash
    git clone https://github.com/eokwara0/issuetracker.git ./issuetracker
    cd ./issuetracker
``` 
OR 
<br>
Navigate to [https://github.com/eokwara0/issuetracker](https://github.com/eokwara0/issuetracker)
* #### click on the green button
* #### click on ```download as zip``` or ```download zip```
* #### After the file has been downloaded open up the folder location and extract the files to a target location

Navigate to the target location of the extracted files using the terminal
```
    cd /path/to/target/location
```
Within the directory you will find three folders each containing the different services that make up the full application 
```sh
#list all the files in the current working directory
    ls 
    # result : api ui mongo app.sh docker-compose.yml .gitignore License
```

Make sure that requirements have been met by running 
```bash
    node --version
    #expected output
    # v18.11.0

    docker --version
    #expected output
    # Docker version 20.10.14, build a224086

    npm --version 
    #expected output
    # 8.19.2
```
If you don't see this checkout the instructions on how to install these [#requirements](#getting-started)
<br>
If you see the desired output All you simply need to do is run the script found in  ```app.sh```
```bash
    # Run the docker environment
    # Initializes the docker containers
    ./app.sh docker
```
After the command has finished Navigate to [http://localhost:4040](http://localhost:4040)

To stop the application from running simply navigate to the terminal and run
```bash
    # stops docker compose and removes the created container
    ./app.sh clean_docker
```
<br>

# HOW TO CONTRIBUTE

To contribute to the application simply clone the repository and follow the instructions on how to install and run the application , if you have any changes to make to the code base , do so and create a pull request so that your changes can be reviewed


# Conclusion
This project was a way for me to intergrate and showcase my abilities by building a functional and maintainable full-stack application , that incompasses the full scope of software development from ````Database management```` to ```REST-APIs``` as well as new technologies such as ```GraphQL``` , ```React ``` and ```ExpressJs```. Some aspects of the project are still to be implement eg ```tests``` and some security feature as well as login and authentication for users.


[Repos](@eokwara0)

[linkedin](https://linkedin.com/in/emmanuel-c-okwara/)

Thank you for you time