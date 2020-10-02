import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import img from "../images/family.jpeg";
import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import OtpIn from "./OtpIn";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
//import  history  from '../helper'
import axios from "axios";
import { useHistory } from "react-router-dom";


firebase.initializeApp(firebaseConfig);
firebase.analytics();

function Login() {


  const history = useHistory();



  const [inputVal, setInput] = useState("");

  var handleOnChange = (event) => {
    setInput(event.target.value);
  }



  var handleSignUp = (event) => {
    console.log(event.target)
    event.preventDefault();
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('loginbtn', {
      'size': 'invisible',
      'callback': function (response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("Response is " + response)
        //onSignInSubmit();
      }
    });

    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber("+91" + "" + inputVal, appVerifier)
      .then(function (confirmationResult) {
        console.log("Success");
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
      .catch(function (error) {
        console.log("Error:" + error.code);
      });
  };

  var onVerifyCodeSubmit = (val) => {
    console.log(val);
    const verificationId = val;
    window.confirmationResult
      .confirm(verificationId)
      .then(function (result) {
        // User signed in successfully.

        var user = result.user;
        user.getIdToken().then(idToken => {
          apiCall(idToken);
          console.log(idToken);
        });
      }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        console.error("Error while checking the verification code", error);
        window.alert(
          "Error while checking the verification code:\n\n" +
          error.code +
          "\n\n" +
          error.message
        );
      });
  };

  var apiCall = (token) => {
    axios.get("http://localhost:8080/family/authenticate/" + "" + inputVal).then(res => {
      console.log(res.data.data);

      if (res.data.data === "0") {
        console.log("User Not Registered");
        history.push({
          pathname: '/register',
          state: {
            number: inputVal,
            firebaseToken: token
          }
        })
      }
      else {
        console.log("user registered");
        history.push("/")

      }

    }).catch(err => {
      console.log(err.code);
    })
  }


  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
      <Paper elevation={9} style={{ background: "#4c4c47", height: "600px", width: "800px" }}>
        <div className="row">
          <div className="col-md-6" >
            <img className="loginImage" src={img} style={{ width: "100%", height: "600px", borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }} />
          </div>
          <div className="col-md-6">
            <h1 className="loginHeading">Login</h1>
            <h1 className="brandName">Family-App</h1>
            <form onSubmit={handleSignUp}>
              <input onChange={handleOnChange} className="login-input form-control" type="tel" placeholder="Enter 10 digit mobile number" value={inputVal} />
              <button type="submit" className="loginbtn btn btn-dark"><i className="btnicon fa fa-sign-in" aria-hidden="true" id="loginbtn"></i>Proceed</button>
              {/* <p className="description">Read more about us here....</p> */}
            </form>
            <div>
              <OtpIn
                inputOtp={onVerifyCodeSubmit}


              />
            </div>
          </div>
        </div>
      </Paper>
    </div>

  )
}

export default Login;