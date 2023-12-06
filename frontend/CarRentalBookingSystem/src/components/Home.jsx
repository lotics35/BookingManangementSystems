import React, {useState} from 'react'
import ImageSlider from './Utilities/ImageSlider';
import { SliderData } from './Utilities/SliderData';
import SignUp from './Utilities/Signup';
import Login from './Utilities/Login';
import '../assets/home.css'

export const Home = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    console.log('Before Toggle:', showLogin);
    setShowLogin(!showLogin);
    console.log('After Toggle:', showLogin);
  };
  

  return (
    <div className="home-container">
        <div className="half left-half">
            <ImageSlider slides={SliderData} />
            <h1>LOREM IPSUM</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className="half right-half">
            <h1><center>Let's go and Book a car now for your vacation!</center></h1>
            {showLogin ? (
          <>
            <Login />
            <center>
            <p>
                Don't have an account?{' '}
                <button onClick={toggleForm}>Sign Up</button>
            </p>
            </center>
          </>
        ) : (
          <>
            <SignUp />
              <center>
              <p>
                Already have an account?{' '}
                <button onClick={toggleForm}>Log In</button>
              </p>
            </center>
          </>
        )}
        </div>
    </div>
  )
}

export default Home