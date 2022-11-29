import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Blogs = () => {
    const [smoothies, setSmoothies] = useState([]);
    const [userid, setUserid] = useState("");
    
    useEffect(() => {
        fetchSmoothies();
    }, []);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("users");
        console.log("useEffect called");
        if (loggedInUser) {
            setUserid(loggedInUser);
        }
        console.log("Called from useeffect: " + userid)
    }, [userid]);

    

    const fetchSmoothies = () => {
        axios
            .get('http://localhost:5000/smoothie_shack')
            .then((res) => {
                // console.log(res.data);
                setSmoothies(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addOrRemoveFavorite = (smoothieName) => {
        var smoothie_button = document.getElementById(smoothieName);
        if (smoothie_button.innerHTML === "Add favorite")
        {
            smoothie_button.innerHTML = "Remove favorite";
            axios.put('http://localhost:5000/smoothie_shack/addFavorite', {id : userid, fav : smoothieName});
            axios.put('http://localhost:5000/smoothie_shack/updateSmoothieFreq', {smoothie : smoothieName, count : 1})
        }

        else
        {
            smoothie_button.innerHTML = "Add favorite";
            axios.put('http://localhost:5000/smoothie_shack/removeFavorite', {id : userid, fav : smoothieName});
            axios.put('http://localhost:5000/smoothie_shack/updateSmoothieFreq', {smoothie : smoothieName, count : -1})
        }

        

    }

    return (
        <>
            <h1>You can write your blogs!</h1><div className='item-container'>
                {smoothies.map((smoothie) => (
                    <div className='card'>
                        <h3> <button id={smoothie.name} onClick={() => {addOrRemoveFavorite(smoothie.name);}}>Add favorite</button> {smoothie.name} </h3>
                    </div>
                ))}
                
            </div>
        </>
    );
};

export default Blogs;
