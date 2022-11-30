import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AllSmoothies = () => {
    const [smoothiesUnsorted, setSmoothiesUnsorted] = useState([]);
    const [smoothies, setSmoothies] = useState([]);
    const [sortType, setSortType] = useState("");

    const sortArray = type => {
        const types = {
        name: 'name',
        calories: 'calories',
        protein: 'protein',
        rcalories: 'calories',
        rprotein: 'protein'
        };
        const sortProperty = types[type];
        if(sortProperty === 'name'){
            var sorted = [...smoothiesUnsorted].sort((a, b) => (a[sortProperty] < b[sortProperty] ? -1 : 1));
        }else if(type === 'calories' | type === 'protein'){
            sorted = [...smoothiesUnsorted].sort((a, b) => b[sortProperty] - a[sortProperty]);
        }else{
            sorted = [...smoothiesUnsorted].sort((a, b) => a[sortProperty] - b[sortProperty]);
        }
        setSmoothies(sorted);
    };

    const fetchSmoothies = () => {
        axios
            .get('http://localhost:5000/smoothie_shack')
            .then((res) => {               
                console.log(res);
                setSmoothiesUnsorted(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchSmoothies();
    },[])

    useEffect(() => {
        setSmoothies(smoothiesUnsorted);
    },[smoothiesUnsorted])

    useEffect(() => {
        sortArray(sortType);
    },[sortType]); 

    
    return (
        <>
            <h1>All of our smoothies!</h1>

            <select onChange={(e) => setSortType(e.target.value)}> 
                <option value={sortType}>Select Sort Type</option>
                <option value="name">Name</option>
                <option value="calories">Calories (High to Low)</option>
                <option value="rcalories">Calories (Low to High)</option>
                <option value="protein">Protein (High to Low)</option>
                <option value="rprotein">Protein (Low to High)</option>
            </select> 
            
            <div className='item-container'>
                {smoothies.map((smoothie) => (
                    <div className='card'>
                        <h2>{smoothie.name}</h2>
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
