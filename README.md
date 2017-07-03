# FullStackChallengeBackend

## Setup Database with Docker

 - Run `docker-compose up` to setup the postgres database
 - Start the Docker Container with `docker-compose start`

## Setup Database Connection

 - Change the IP-Address of the Database-Connection in the `db-connection.js`-File to the right IP-Address of the DockerContainer, i.e. 'postgres://admin:craftworks@DOCKER-IP-ADRESS:5432/tasksdb'

## Running the app

 - Install Dependencies with `npm install`
 - Run the Node Server with `npm start`
