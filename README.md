# SurveyBanana

## Purpose 
Build a system to create surveys that can be shared on the internet. Anyone could visit a
survey’s public link and submit their answers. The customer will need to be able to download all
submitted answers for any survey in CSV format.

## Assumptions 
1. User is John doe, who is already logged in
2. Single select multiple choice questions only
3. No editing of survey once it is created 

## Tech Stack 
* NodeJS
* ExpressJS
* ReactJS
* MongoDB Atlas
* Typescript

## Set up guide with Docker
### Prerequisites 
* Please ensure Docker is installed and running else follow this [guide](https://docs.docker.com/engine/install/)

### Set up the connection to MongoDB
1. download and copy the `nodemon.json` file in this ~folder~ containing the username and password
2. Paste the file in the `backend` root directory

### Running the application
1. Build the backend image by running `docker build -t backend .` in the `backend` root directory
2. Run `docker run -p 4000:4000 backend` to start the backend
3. Build the frontend image by running `docker build -t frontend .` in the `frontend` root directory
4. Run `docker run -p 3000:3000 frontend` to start the frontend
5. Go to http://localhost:3000/ 


## Demo
* For guidance on usage, please watch the video in the ~folder~

## Future extensions
1. Use the Command and Query Responsibility Segregation Pattern, and split the backend into read and write services with 2 different databases. We will not modify the data using the read service and able to write custom schema to optimise reads.
2. We can add a load balancer like Nginx and Kubernetes to manage traffic and containers.
3. We can add a cache in the middleware such as Redis to cache popular URLs.
