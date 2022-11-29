import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './generalStyles.css'

const Home = () => {
    const [smoothies, setSmoothies] = useState([]);
    const [query, setQuery] = useState("")


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`http://localhost:5000/smoothie_shack/find/${query}`)
                setSmoothies(data.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [query])

    return (
        <>
            <h1>Find your next favorite smoothie!</h1>
            <br></br>
            <div className="search">
                <input type="text"
                       placeholder={"Search Name or Ingredient"}
                       className={"input"}
                       onChange={event => setQuery(event.target.value)}
                       value={query}
                />
            </div>

            <div className='item-container'>
            {Array.isArray(smoothies)
                ?
                smoothies.map((smoothie) => (
                    <div className='card'>
                        <body>
                        <h2>Name: {smoothie.name}</h2>
                        <h3>Ingredients: {smoothie.ingredients}</h3>
                        <h3>Calories: {smoothie.calories}</h3>
                        <h3>Protein(g): {smoothie.protein}</h3>
                            <br></br>
                        </body>
                    </div>
                )) : null}
            </div>
            
        </>
        
    );
};

export default Home;
