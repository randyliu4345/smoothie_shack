import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Trending = () => {
    const [smoothies, setSmoothies] = useState([]);

    const fetchSmoothies = () => {
        axios
            .get('http://localhost:5000/smoothie_shack')
            .then((res) => {               
                var sorted = [...res.data].sort((a, b) => (a["frequency"] < b["frequency"] ? 1 : -1));
                setSmoothies(sorted);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchSmoothies();
    },[]); 

    return (
        <>
            <h1>Trending Smoothies!</h1>
            <br></br>
            
            <div className='item-container'>
                {smoothies.map((smoothie) => (
                    <div className='card'>
                        <h2>{smoothie.name}</h2>
                        <h3>Ingredients: {smoothie.ingredients}</h3>
                        <h3>Calories: {smoothie.calories}</h3>
                        <h3>Protein(g): {smoothie.protein}</h3>
                        <h3>{smoothie.frequency} Users Favorited This Smoothie!</h3>
                        <br></br>
                    </div>
                ))}
            </div>
        </>
    
    
    );
};

export default Trending;
