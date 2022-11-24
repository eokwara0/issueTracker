#!/bin/bash

DOCKER_VOLUME="issuetracker"
DOCKER_NETWORK="issuetracker"
DOCKER_CONTAINER="issuecontainer"
APP_ENDPOINT="http://localhost:4040"



## TODO: add configuration for different platforms
## TODO: platforms like windows and mac
## TODO: Implement better error handling

native(){

    ## setting database url for environment
    export DB_URL='mongodb://0.0.0.0:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4'

    ## building the docker mongodb image
    docker build --tag mongodb:latest ./mongo/
    if [[ "$?" -eq "0" ]];  # validates whether the previous command was successfully executed
    then
        sleep 3 && docker run -d --rm --name ${DOCKER_CONTAINER} --publish 27017:27017 mongodb:latest
        if [ $? -eq 0 ];
        then
            sleep 10 && docker exec -it ${DOCKER_CONTAINER} mongosh --quiet issuetracker init.mongo.js
            if [ $? -eq 0 ];
            then
                echo "$pwd"
            fi
        fi
    else
        echo "🚀Internal error "
    fi

    ## starting api server
    cd api
    if [ $? -eq 0 ];
    then
        sleep 6 && npm install --silent && npm run start &
        if [ $? -eq 0 ];
        then
            cd ../
        fi
    else
        echo "ERROR: Failed to install dependencies"
    fi

    # starting ui server 

    cd ui
    if [ $? -eq 0 ];
    then
        sleep 10 && echo "🚀Installing dependencies"
        sleep 13 && npm install --silent && npm run start &
        if [ $? -eq 0 ];
        then 
            cd ../
            sleep 10 && echo "navigate to http://localhost:4040"
        fi
    fi
}


# CREATES DOCKER VOLUME
createVolume(){
    
    docker volume create ${DOCKER_VOLUME}
    if [ $? -eq 0 ]
    then
        echo "🚀Volume created successfully"
        return 0
    else
        echo "🚀Volume creation failed"
        return 1
    fi
}

createNetwork(){
    docker network create ${DOCKER_NETWORK}
    if [ $? -eq 0 ]
    then
        echo "🚀🚀network created successfully"
        return 0 
    else
        echo "🚀🚀network creation failed"
        return 1
    fi
}

## cleaing docker environment data
clean_docker(){
    docker compose down
    if [ $? -eq 0 ];
    then 
        docker volume rm ${DOCKER_VOLUME}
        if  [ $? -eq 0 ];
        then
            echo "🚀Cleaning successfully"
        fi
    fi
}


## cleaing native environment variables 
clean_native(){

    docker stop ${DOCKER_CONTAINER}
    if  [ $? -eq 0 ];
    then
        docker rmi mongodb:latest
        if [ $? -eq 0 ];
        then
            echo "🫠cleaning complete"
            exit 1
        fi
    fi
}



## runs the docker environment for the application
docker_run(){

    createVolume
    if [ $? -eq 0 ]
    then
        createNetwork
        if [ $? -eq 0 ]
        then
            docker compose up -d
            echo "🚀 Containers are up and running"
            echo "intializing database "
            docker exec -it mongodatabase mongosh --quiet issuetracker /init.mongo.js
            echo "🚀Done navigate to ${APP_ENDPOINT}"
            echo "To stop containers run bash app.sh clean_docker"
        fi
    else
        echo "ERROR: internal error"
    fi
}






### Main function ######

if [[ "$1" == "docker" ]];
then
    docker_run
elif [[ "$1" == "clean_docker" ]];
then
    clean_docker
elif [[ "$1" == "native" ]];
then
    native
elif [[ "$1" == "clean_native" ]];
then
    clean_native
else
    echo "-------< To run the program using docker run bash app.sh docker >------"
    echo "-------> To run on your native system run bash app.sh native > ------"
    echo "-------< To clean the docker program run app.sh clean_docker >------- "
    echo "-------< To clean the native program run app.sh clean_native >------- "
fi