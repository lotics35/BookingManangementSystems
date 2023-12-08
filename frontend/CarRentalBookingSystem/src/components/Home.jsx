import React, {useState} from 'react'
import SignUp from './Utilities/Signup';
import Login from './Utilities/Login';
import './App.css';
import '../assets/home.css'
import ExampleCarouselImage1 from './ExampleCarouselImage1.jpg'
import ExampleCarouselImage2 from './ExampleCarouselImage2.jpg'
import ExampleCarouselImage3 from './ExampleCarouselImage3.jpg'
import ExampleCarouselImage4 from './ExampleCarouselImage4.jpg'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';

export const Home = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    console.log('Before Toggle:', showLogin);
    setShowLogin(!showLogin);
    console.log('After Toggle:', showLogin);
  };
  

  return (
    <div className="main">
      <Container style={{padding:'0px'}}>
        <Carousel fade>
          <Carousel.Item>
            <img src={ExampleCarouselImage1}></img>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={ExampleCarouselImage2}></img>
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={ExampleCarouselImage3}></img>
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={ExampleCarouselImage4}></img>
            <Carousel.Caption>
              <h3>Fourth slide label</h3>
              <p>Description.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
      <div className="half right-half">
        <h1><center>Let's go and Book a car now for your vacation!</center></h1>
          {showLogin ? (
          <>
            <Login />
            <center>
              <p>
                Don't have an account?{' '}
                <Button onClick={toggleForm}>Sign Up</Button>
              </p>
            </center>
          </>
          ) : (
          <>
            <SignUp />
            <center>
              <p>
                Already have an account?{' '}
                <Button onClick={toggleForm}>Log In</Button>
              </p>
            </center>
          </>
        )}
      </div>
    </div>
  )
}

export default Home