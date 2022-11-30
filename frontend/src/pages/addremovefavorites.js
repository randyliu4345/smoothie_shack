import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AddRemoveFavorites = () => {
    const [smoothies_states, setSmoothieStates] = useState({});
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
        console.log("Called from useeffect: " + userid);
        console.log(typeof userid);
        console.log(userid.length);
    }, [userid]);

    

    const fetchSmoothies = () => {

            var userfavs;
            axios
            .get('http://localhost:5000/users')
            .then((res) => {
                var users = Array.from(res.data);
                for (let i = 0; i < users.length; i++) {
                    if (users[i].user == localStorage.getItem("users")) {
                        userfavs = Array.from(users[i].fav)
                    }
                }
                return axios.get('http://localhost:5000/smoothie_shack')
            })
            .then((res) => {
                // console.log(res.data);
                var smoothiesArray = res.data;
                var smoothiesMap = {};
                smoothiesArray.forEach(smoothie => {
                    smoothiesMap[smoothie.name] = false;
                })
                console.log(userfavs)
                userfavs.forEach(fav => {
                    smoothiesMap[fav] = true;
                })
                // console.log(smoothiesMap)
                setSmoothieStates(smoothiesMap);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addOrRemoveFavorite = (smoothieName) => {
        var smoothie_button = document.getElementById(smoothieName);
        // console.log(smoothie_button)
        // console.log(smoothie_button.innerHTML)
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
    if (userid.length === 0) {
        return (
            <>
                <div>
                    <div className="card">
                        <body>
                            You must sign in to add favorites!
                        </body>

                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <h1>Add or remove favorite smoothies!</h1><div className='item-container'>
                {Object.keys(smoothies_states).map((smoothie) => (
                    <div className='card'>
                        <h3> <button id={smoothie} onClick={() => {addOrRemoveFavorite(smoothie);}}>{smoothies_states[smoothie] ? "Remove favorite" : "Add favorite"}</button> {smoothie} </h3>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AddRemoveFavorites;
