import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./loginStyles.css";

function Login() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    

    useEffect(() => {
        const loggedInUser = localStorage.getItem("users");
        console.log("Users =")
        console.log(loggedInUser)
        if (loggedInUser) {
            console.log(loggedInUser);
            console.log("HIN HERE");
            setUserInfo({ name: loggedInUser });
            console.log("Found user " + { loggedInUser});

        }
    }, []);
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = [];
        //database.find((user) => user.username === uname.value);
        axios
            .get('http://localhost:5000/smoothie_shack/users')
            .then((res) => {
                console.log(res.data);
                console.log(Array.from(res))
                const item = Array.from(res.data).find(item => item.user === {uname})
                console.log("NAME Below")
                console.log(item.user);
                console.log("NAME ABOVE")
                setUserInfo({
                    name: item.user,
                    pass: item.pass

                });
            })
            .catch((err) => {
                console.log(err);
            });
        console.log("USERNAME AND PASSWORD")
        // Compare user info
        if (typeof userInfo.user === 'undefined') { //we didnt find that user
            
        } else if(userInfo.pass !== pass){ //if the real password is not the same
            
        }


        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };
    const handleLogout = () => {
        setUserInfo([]);
        localStorage.clear();
        console.log("LOGOUT")
        setIsSubmitted(false);
        return (<div>
            <div>You have successfully logged out</div>
        </div >
        )
    };
    console.log("USERRRRRRR");
    console.log(userInfo.length);
    console.log(userInfo);
    if (userInfo && (userInfo !== null)&& (typeof userInfo.name !== 'undefined') && (userInfo.name.length !== 0)) {
        return (
            <div><div>{userInfo.name} is loggged in</div>
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
                <div className="title">Login</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );

}

export default Login;