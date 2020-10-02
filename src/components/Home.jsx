import React from "react";
import localforage from "localforage";
import { useHistory } from "react-router-dom";


var Home = () => {
    const history = useHistory();
    localforage.getItem('user').then(function(value) {
        console.log(value);
        // This code runs once the value has been loaded
        // from the offline store.
        if(value!=null){
        console.log(value);
        }
        else{
            history.push("/login");
        }
        
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });

    return (<h1>Welcome</h1>);

}

export default Home;