import React, { useState } from "react";
import OtpInput from 'react-otp-input';

var OtpIn = (props) => {


    const [inputVal, setInputVal] = useState("");
    var handleOnChange = (otpVal) => {
        setInputVal(otpVal)
    }

    var handleForm = (event) => {
        props.inputOtp(inputVal);
        event.preventDefault();
    }
    
    return (<div>
        <h1 className="otpHeading">Enter the verification code received</h1>
        <form onSubmit={handleForm}>
            <OtpInput
                value={inputVal}
                onChange={handleOnChange}
                inputStyle={{ width: "2rem", height: "2rem", color: "white", fontSize: "1rem", backgroundColor: "#282828", borderRadius: 4 }}
                containerStyle={{ paddingLeft: 30, paddingTop: 10 }}
                numInputs={6}
                separator={<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
            />
            <button type="submit" className="loginbtn btn btn-dark"><i className="btnicon fa fa-sign-in" aria-hidden="true" id="loginbtn"></i>Submit</button>
        </form>
    </div>)
}

export default OtpIn;