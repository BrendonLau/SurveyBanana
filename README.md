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
* Please ensure Docker is installed else follow this [guide](https://docs.docker.com/engine/install/)

### Set up the connection to MongoDB
1. Copy the `nodemon.json` file in this [folder](https://drive.google.com/drive/folders/1q1b01cxG7p3L5mxinOdcVdOnBm58QIJq?usp=sharing) containing the username and password
2. Paste the file in the `backend` root directory

### Running the application
1. Build the frontend image by running `docker build -t <IMAGE_NAME> .` in the `frontend` root directory
2. Run `docker run -p 3000:3000 <IMAGE_NAME>` to start the frontend
3. Build the backend image by running `docker build -t <IMAGE_NAME> .` in the `backend` root directory
4. Run `docker run -p 4000:4000 <IMAGE_NAME>` to start the backend

## Demo
* For guidance on usage, please watch the video in the [folder](https://drive.google.com/drive/folders/1q1b01cxG7p3L5mxinOdcVdOnBm58QIJq?usp=drive_link)
