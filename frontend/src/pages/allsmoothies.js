import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AllSmoothies = () => {
    const [smoothies, setSmoothies] = useState([]);
    useEffect(() => {
        fetchSmoothies();
    }, []);

    const fetchSmoothies = () => {
        axios
            .get('http://localhost:5000/smoothie_shack')
            .then((res) => {               
                console.log(res);
                setSmoothies(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <h1>You can write your blogs!</h1><div className='item-container'>
                {smoothies.map((smoothie) => (
                    <div className='card'>
                        <h2>Name: {smoothie.name}</h2>
                        <h3>Ingredients: {smoothie.ingredients}</h3>
                        <h3>Calories: {smoothie.calories}</h3>
                        <h3>Protein(g): {smoothie.protein}</h3>
                        <br></br>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AllSmoothies;
