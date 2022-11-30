import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [users, setUsers] = useState([]);
    

    const sendUser = (inUser, inPass) => {   
        axios
            .post('http://localhost:5000/signUp', {user:inUser, pass:inPass, fav: []})
            .then((res) => {
                console.log(inUser)
                console.log(inPass);
                console.log("DATA")
                setUsers(inUser, inPass);
                localStorage.setItem('users', inUser)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    
    // User Login info
    useEffect(() => {
        const loggedInUser = localStorage.getItem("users");
        console.log("Users =")
        console.log(loggedInUser)
        if (loggedInUser) {
            const foundUser = (loggedInUser);
            console.log("WE HAVE A USER ALREADY LOGGED IN!");
            setUsers(foundUser);
        }
    }, []);
    const errors = {
        uname: "username already taken"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
        
        var { uname, pass } = document.forms[0];


        //Before we send, check if its already taken
        axios
            .get('http://localhost:5000/users')
            .then((res) => {
                console.log(Array.from(res))
                const item = Array.from(res.data).find(item => item.user === uname.value)
                if (typeof item !== 'undefined') { //we found that user
                    setErrorMessages({ name: "uname", message: errors.uname });
                    console.log("UNDEFINED USERNAME");
                    setIsSubmitted(false);
                    setErrorMessages({ name: "uname", message: errors.uname });

                } else { //we didnt find that user
                    sendUser(uname.value, pass.value);
                    setIsSubmitted(true);
                }

            })
            .catch((err) => {
                console.log(err);

            });
        
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const handleLogout = () => {
        setUsers(false);
        localStorage.clear();
        console.log("LOGOUT")
        setIsSubmitted(false);
        return (<div>
            <div>You have successfully logged out.</div>
            </div >
        )
    };
    // if there's a user show the message below

    if (users && (users !== null) && (users.length !== 0)) {
        return (
            <div><div className="card"><body>{users} is loggged in!</body></div>
                <button onClick={() => {
                    handleLogout();

                }}>logout</button>
            </div>
        );
    }
    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );
            
    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign Up</div>
                {isSubmitted ? <div>You have successfully created an account</div> : renderForm}
            </div>
        </div>
    );
};

export default SignUp;
