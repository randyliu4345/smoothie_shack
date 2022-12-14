import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./loginStyles.css";

function Login() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    

    useEffect(() => {
        const loggedInUser = localStorage.getItem("users");

        if (loggedInUser) {

            setUserInfo({ name: loggedInUser });


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
        //database.find((user) => user.username === uname.value);
        axios
            .get('http://localhost:5000/users')
            .then((res) => {
                const item = Array.from(res.data).find(item => item.user === uname.value)
                /*
                console.log(item)
                console.log("NAME Below")
                console.log(item.user);
                console.log("Password they should have below:");
                console.log(item.pass);
                setUserInfo({
                    name: item.user,
                    pass: item.pass

                });*/
                if (typeof item === 'undefined') { //we didnt find that user
                    setErrorMessages({ name: "uname", message: errors.uname });

                    setIsSubmitted(false);
                    setUserInfo({
                        name: [],
                        pass: []

                    });
                } else if (item.pass !== pass.value) { //if the real password is not the same
                    setErrorMessages({ name: "pass", message: errors.pass });
                    setIsSubmitted(false);
                    setUserInfo({
                        name: [],
                        pass: []

                    });
                } else {
                    localStorage.setItem('users', item.user);
                    setIsSubmitted(true);
                    setUserInfo({
                        name: item.user,
                        pass: item.pass

                    });

                }
            })
            .catch((err) => {
                console.log(err);
                
            });
        // Compare user info inside of handle submit



    };
    const handleLogout = () => {
        setUserInfo([]);
        localStorage.clear();
 
        setIsSubmitted(false);
        return (<div>
            <div>You have successfully logged out.</div>
        </div >
        )
    };


    if (userInfo && (userInfo !== null)&& (typeof userInfo.name !== 'undefined') && (userInfo.name.length !== 0)) {
        return (
            <div><div className="card"><body>{userInfo.name} is logged in!</body></div>
                
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
                {isSubmitted ? <div>User is successfully logged in.</div> : renderForm}
            </div>
        </div>
    );

}

export default Login;