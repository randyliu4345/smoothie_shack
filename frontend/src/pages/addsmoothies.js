import React, {useState} from "react";
import axios from 'axios';
import './addsmoothies.css'

const AddSmoothies = () => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const sendSmoothie = (inName, inIngredients, inCalories, inProtein, inFrequency) => {   
        axios
            .post('http://localhost:5000/addSmoothies', {name:inName, ingredients:inIngredients, calories:inCalories, protein:inProtein, frequency:inFrequency})
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

    const errors = {
        invalidnumber: "Please input a valid number for nutritional data.",
        none: ""
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
        
        var { smoothiename, ingredients, caloriecount, proteincount } = document.forms[0];

        
        if(isNaN(parseFloat(caloriecount.value)) || isNaN(parseFloat(proteincount.value))) {
            setErrorMessages({ name: "invalidnumber", message: errors.invalidnumber });
            setIsSubmitted(false);
        }
        else {
            sendSmoothie(smoothiename.value, ingredients.value, parseFloat(caloriecount.value), parseFloat(proteincount.value), 0);
            document.getElementById("smoothieForm").reset();
            setErrorMessages({ name: "invalidnumber", message: errors.none });
            setIsSubmitted(true);
        }
        
    };

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit} id="smoothieForm">
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

                {renderErrorMessage("invalidnumber")}
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
            
            {isSubmitted ? <p style={{color:"MediumSeaGreen"}}>Your smoothie was successfully submitted. Go check it out!</p> : ""}
            
            <br></br>
        </div>

    );
};

export default AddSmoothies;

