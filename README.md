## Smart Brain App - About
This app detects faces in images. The user provides an image URL and the app will draw a box around any human faces found in the image. The app uses the Clarifai API 'face detection model' (https://docs.clarifai.com).

## NOTE
In order to use this App, you will need to obtain your own Clarifai API key from https://www.clarifai.com. The keys are free to obtain for limited use.

Insert your key into App.js in this line of code:
```
const app = new Clarifai.App({
  apiKey: 'PUT YOUR API KEY HERE'
})
```

### Design Goals
The goal of making this app is to incorporate a back-end server & database into a webapp. The app should have a register, sign in, and home page view. User data should be stored in the database. 
