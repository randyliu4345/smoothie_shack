import React from "react";
import axios from 'axios';
import './addsmoothies.css'

const AddSmoothies = () => {

    const sendSmoothie = (inName, inIngredients, inCalories, inProtein) => {   
        axios
            .post('http://localhost:5000/addSmoothies', {name:inName, ingredients:inIngredients, calories:inCalories, protein:inProtein})
            .then((res) => {
                console.log(inName);
                console.log(inIngredients);
                console.log(inCalories);
                console.log(inProtein);
                console.log("DATA")
                //setUsers(inUser, inPass);
                //localStorage.setItem('users', inUser)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        //event.preventDefault();
        
        var { smoothiename, ingredients, caloriecount, proteincount } = document.forms[0];


        //Before we send, check if its already taken
        /*
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
            */

        sendSmoothie(smoothiename.value, ingredients.value, caloriecount.value, proteincount.value);

        
    };

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Name of Smoothie </label>
                    <input type="text" name="smoothiename" required />
                </div>
                <div className="input-container">
                    <label>List of Ingredients </label>
                    <input type="text" name="ingredients" required />
                </div>
                <div className="input-container">
                    <label>Calories </label>
                    <input type="text" name="caloriecount" required />
                </div>
                <div className="input-container">
                    <label>Protein (g) </label>
                    <input type="text" name="proteincount" required />
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );


    return (
        <div className = "card3">
            <h1>
                Add your own smoothies!
            </h1>

            <p>
                Want to share your favorite drink with the rest of the world? Fill out the following information
                about your smoothie and it will be displayed for all to see!
            </p>

            {renderForm}

            <br></br>
        </div>

    );
};

export default AddSmoothies;

