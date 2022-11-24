#!/bin/bash

DOCKER_VOLUME="issuetracker"
DOCKER_NETWORK="issuetracker"
APP_ENDPOINT="http://localhost:4040"


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


clean(){
    docker compose down
    docker volume rm ${DOCKER_VOLUME}
}



run(){

    createVolume
    if [ $? -eq 0 ]
    then
        createNetwork
        if [ $? -eq 0 ]
        then
            docker compose up -d
            echo "🚀 Containers are up and running"
            echo "intializing database "
            docker exec -it mongodatabase mongosh --quiet issuetracker init.mongo.js
            echo "🚀Done navigate to ${APP_ENDPOINT}"
            echo "To stop containers run docker compose down"
        fi
    else
        echo "ERROR: internal error"
    fi
}

if [[ "$1" == "start" ]];
then
    run
elif [[ "$1" == "stop" ]];
then
    clean
else
    tput blink && echo "-------< To run the program use app.sh start >------"
    tput blink && echo "-------< To clean the program run app.sh stop >------- "

fi







