import React, { Component } from 'react'
import Navigation from './components/Navigation'
import SignIn from './components/SignIn'
import Register from './components/Register'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition'
import Rank from './components/Rank'
import Particles from 'react-particles-js'

// particles background styles
const particlesOptions = {
  particles: {
    number: {
      value: 65,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

// set intial state of App component
const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  user: {
    id: '',
    email: '',
    password: '',
    name: '',
    entries: 0,
    joined: '',
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  // load user data on successful signin/register
  loadUser = userData => {
    const { id, name, email, entries, joined } = userData
    this.setState({
      user: {
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined
      }
    })
  }

  onInputHandler = event => {
    this.setState({ input: event.target.value })
  }

  // route detemines what elements are rendered by App
  onRouteChange = route => {
    if (route === 'signout') {
      this.setState(initialState)
    }
    this.setState({ route: route })
  }

  // boxes are the locations of any faces deteced in submitted images
  displayFaceBoxes = boxes => {
    this.setState({ boxes: boxes })
  }

  // @param the response (face locations) from the Clarifai API request
  // @return an array of objects which are the pixel coord's on the image
  // for where to draw the boxes
  calculateFaceLocations = resp => {
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    let faceLocations = []

    // build an array of bounding boxes from the API response
    resp.outputs[0].data.regions
      .map(region => faceLocations.push(region.region_info.bounding_box))

    // convert the boxes to pixel coordinates
    faceLocations = faceLocations.map(elem => {
      return {
        leftCol: elem.left_col * width,
        topRow: elem.top_row * height,
        rightCol: width - (elem.right_col * width),
        bottomRow: height - (elem.bottom_row * height)
      }
    })
    return faceLocations
  }

  // when a user submits an image url
  onSubmitHandler = () => {
    this.setState({ imageUrl: this.state.input })
    // send request to the Calrifai API for image prediction (face detection)
    fetch('http://localhost:3000/entryurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
          })
    })
      .then(clarifaiResp => clarifaiResp.json())
      .then(clarifaiResp => {
        console.log(clarifaiResp)
      // if we get a response from the API
        if (clarifaiResp) {
        // send a request to our DB server to update the user's entries count
        fetch('http://localhost:3000/entry', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        // the server will respond with the user's updated entries count
        .then(resp => resp.json())
        .then(count => {
        this.setState({
          user: {
            ...this.state.user,
            entries: count
          }
        })
        })
        .catch(console.log)
      }
      // finally call calc/display face boxes functions
      this.displayFaceBoxes(this.calculateFaceLocations(clarifaiResp))
    })
    .catch(err => console.log('Big error', err))
  }

  render() {
    const { imageUrl, route, boxes, user } = this.state

    return (
      <div>
        <Particles className='particles' params={particlesOptions} />
        <Navigation
          route={route}
          onRouteChange={this.onRouteChange} />

        {route === 'home'
          ? <div>
            <Logo />
            <Rank
              user={user}
            />
            <ImageLinkForm
              onInputHandler={this.onInputHandler}
              onSubmitHandler={this.onSubmitHandler}
            />
            <FaceRecognition
              boxes={boxes}
              imageUrl={imageUrl}
            />
          </div>
          : (
            route === 'signin'
              ? <SignIn
                  onRouteChange={this.onRouteChange}
                  loadUser={this.loadUser}
                />
              : <Register
                  onRouteChange={this.onRouteChange}
                  loadUser={this.loadUser}
                />
            )
        }
      </div>
    );
  }
}

export default App;
