import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import img from "../images/family.jpeg";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import localforage from "localforage";

var Register = () => {
    const location = useLocation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const phone = location.state.number;
    const history = useHistory()
        ;
    var handleNameChange = (event) => {
        setName(event.target.value);
    }

    var handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    var handleFormSubmission = (event) => {
        event.preventDefault();
        var user = constructUserObject();
        var header = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        axios.post("http://localhost:8080/family/authenticate/register", user, header).then(res => {
            localforage.setItem("user", res.data.data)
            history.push("/");
        }).catch(function (err) {
            console.log(err);
        })
    }


    var constructUserObject = () => {
        const userObj = {
            "email": email,
            "name": name,
            "phone": phone,
            "userType": "PARENT"
        };
        return JSON.stringify(userObj);
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
                        <h1 className="signupHeading">Sign Up</h1>
                        <h1 style={{ marginTop: "10%" }} className="brandName">Family-App</h1>
                        <form onSubmit={handleFormSubmission}>
                            <label className="signupLabel">Enter your Full Name</label>
                            <input onChange={handleNameChange} className="register-input form-control" type="text" />
                            <label className="signupLabel">Enter your phone</label>
                            <input className="register-input form-control" type="tel" value={phone} readOnly />
                            <label className="signupLabel">Enter your email</label>
                            <input onChange={handleEmailChange} className="register-input form-control" type="email" />
                            <button type="submit" className="loginbtn btn btn-dark"><i className="btnicon fa fa-sign-in" aria-hidden="true" id="loginbtn"></i>Proceed</button>
                            {/* <p className="description">Read more about us here....</p> */}
                        </form>
                    </div>
                </div>
            </Paper>
        </div>
    )
};

export default Register;