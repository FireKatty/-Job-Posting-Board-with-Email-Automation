# -Job-Posting-Board-with-Email-Automation

## Please ensure that browser allow third parties cookies

# Steps to Set Up the Application:

1->Clone the Repository: If you haven't already cloned your repository, do it by running the following command in your terminal:

## git clone <https://github.com/FireKatty/-Job-Posting-Board-with-Email-Automation>
## cd <project_directory>

2->Install Dependencies: After navigating to your project folder, install the necessary dependencies by running:

# npm install

3->Create a .env file : provide environment variables (like API keys, DB credentials,JWT_KEY,MONGO_URI), create a .env file at the root or backend folder of the project and add any necessary

## PORT = 9876
## JWT_SECRET 
## MONGO_URI 
# MONGO_URI= mongodb://localhost:27017/Job-Posting
## EMAIL_USER 
## EMAIL_PASS 
## CLIENT_URL = http://localhost:3000
## NODE_ENV 

4-Change API URL in Frontend and CORS in server.js -
 
## http://localhost:9876/ Change in Frontend 
## http://localhost:3000  chang in server.js cors



4->Run the Application: To start the development server and view your app locally, use the following command:

## npm start 

     or 

## cd backend && node server.js
## cd frontend && npm start

->This will start a local development server, and the application should be available at http://localhost:3000.


