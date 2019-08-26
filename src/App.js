import React, { Component } from 'react'
import Navigation from './components/Navigation'
import SignIn from './components/SignIn'
import Register from './components/Register'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition'
import Rank from './components/Rank'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: ''
})

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


class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false
    }
  }

  // @param the response from the Clarifai API request
  // the response has the locations of faces detected in the image in floating point form
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

  displayFaceBoxes = boxes => {
    this.setState({ boxes: boxes })
  }

  onInputHandler = event => {
    this.setState({ input: event.target.value })
  }

  // sends request to the Calrifai API for image prediction (face detection)
  // calls 'displayFaceBoxes' to draw the boxes around detected faces
  onSubmitHandler = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(resp => this.displayFaceBoxes(this.calculateFaceLocations(resp)))
      .catch(err => console.log('Big error', err))
  }

  // handler for setting 'route' and 'isSignedIn' states
  // 'route' determines what elements are rendered in App
  // 'isSignedIn' determines what elements are rendered in Navigation / do we need this? could we just use 'route'?
  // called from SignIn, Register, and Navigation components
  onRouteChange = route => {
    if (route === 'signout') {
      // this.setState({ isSignedIn: false })
      this.setState({ imageUrl: ''})
    } else if (route === 'home') {
      // this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state

    return (
      <div>
        <Particles className='particles' params={particlesOptions} />
        <Navigation
          route={route}
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange} />

        {route === 'home'
          ? <div>
              <Logo />
              <Rank />
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
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
