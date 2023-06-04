## 1. Introduction
This is video sharing website where people can share each others their favorites movies
## 2. Prerequisites
- VS Code
- Studio 3T
- Postman
- Chrome
- Docker
## 3. Installation & Configuration
- Clone this repository to your machine
- In server, creates `.env` file and includes this below code : 
```
MONGO_INITDB_ROOT_USERNAME=<Your mongo db username>
MONGO_INITDB_ROOT_PASSWORD=<Your mongo db password>
YOUTUBE_API_KEY=<Your google api key>
```
## 4. Database Setup
- Create a mongodb server in your localhost, create a db name `video-sharing` with username and password above
## 5. Running the Application
- Open the project
- Create a terminal and run : `cd server && npm run dev` to start server
- Create another terminal and run : `cd client && npm run start` to start client
* If you are running Node 16 or lower, run `npm run dev` instead
## 6. Docker Deployment
- Open `docker-compose.yml` file, change environment and port if needed
- Open Terminal and run `docker compose up -d` to deploy project on Docker
## 7. Usage
- Login
- Playing video, movie
- Sharing favorite video
- Receive notification if others share new video
## 8. Troubleshooting
- The socket sends a notification of new video to both the video owner and viewers