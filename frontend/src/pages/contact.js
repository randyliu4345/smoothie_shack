import React from 'react';

const Contact = () => {
    console.log("CONTACT US PAGE, USERS is :")
    console.log(localStorage.users);
    return (
        <div>
            <h1>Mail us on feedback@geeksforgeeks.org</h1>
            <div>{localStorage.users} is signed in btw</div>
        </div>
    );
};

export default Contact;
