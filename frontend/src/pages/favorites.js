import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favorites = () => {
    const [smoothies_names, setSmoothies_names] = useState([]);
    const [smoothies, setSmoothies] = useState([]);
    const [userid, setUserid] = useState("");

    useEffect(() => {
        const loggedInUser = localStorage.getItem("users");
        console.log("useEffect called");
        if (loggedInUser) {
            setUserid(loggedInUser);
        }
        console.log("Called from useeffect: " + userid);
        console.log(typeof userid);
        console.log(userid.length);
        if (userid.length !== 0) {
            fetchSmoothies_names();
        }

    }, [userid]);



    const fetchSmoothies_names = () => {
        axios
            
            .get('http://localhost:5000/users')
            .then((res) => {
                console.log("fetching names")
                const item = Array.from(res.data).find(item => item.user === userid);
                var b = Array.from(item.fav)
                setSmoothies_names(b);
                console.log("FAV")
                fetchSmoothies(b);
                console.log(b);


                
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchSmoothies = (smooths) => {
        axios
            .get('http://localhost:5000/smoothie_shack')
            .then((res) => {
                console.log(res.data);
                console.log("res")
                console.log(smooths);
                var tempSmooth = [];
                for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < smooths.length; j++){
                        if (res.data[i].name === smooths[j]) {
                            tempSmooth.push(res.data[i])
                        }
                    }



                    
                }
                setSmoothies(Array.from(tempSmooth));
                console.log("temp" + tempSmooth)
                

                
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    if (userid.length === 0) {
        return (
            <>
                <div>
                    <div className="card">
                        <body>
                            You must sign in to view favorites!
                        </body>

                    </div>
                </div>
            </>
        );
    }
    return (
        <>     
            
            <h1>Here are your favorites: </h1>
            
            <div className='item-container'>
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

export default Favorites;