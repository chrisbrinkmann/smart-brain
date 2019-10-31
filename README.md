## Smart Brain App - About
This app detects faces in images. The user provides an image URL and the app will draw a box around any human faces found in the image. The app uses the Clarifai API 'face detection model' (https://docs.clarifai.com).


### Design Goals
The goal of making this app is to make a full stack web app. The app requires users to register and sign in with valid credentials.

The front end is built with React. It is single page design with 3 views - sign in, register, home.

### Server - https://github.com/chrisbrinkmann/smart-brain-server
The server is built using Node and Express. User passwords are encrypted before being stored in the database. Knex is used for database queries.

The database that I used is PostgreSQL, which is provided by Heroku, where the App is hosted.
