import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Blogs = () => {
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
                        <h3>{smoothie.name}</h3>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Blogs;
