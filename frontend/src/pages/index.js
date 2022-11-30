import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './generalStyles.css'

const Home = () => {
    const [smoothies, setSmoothies] = useState([]);
    const [query, setQuery] = useState(" ")
    const [smoothies_states, setSmoothieStates] = useState({});
    const [userid, setUserid] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`http://localhost:5000/smoothie_shack/${query}`)
                setSmoothies(data.data )
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [query])



    useEffect(() => {
        fetchSmoothies();
        console.log("fetchSmoothies called from useEffect")
    }, []);


    useEffect(() => {
        const loggedInUser = localStorage.getItem("users");
        console.log("useEffect called");
        if (loggedInUser) {
            setUserid(loggedInUser);
        }
        console.log("Called from useeffect: " + userid);
        // console.log(typeof userid);
        // console.log(userid.length);
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
                            <h2>{smoothie.name}</h2>
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
    }




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
                        <h3> <button id={smoothie.name} onClick={() => {addOrRemoveFavorite(smoothie.name);}}>{smoothies_states[smoothie.name] ? "Remove favorite" : "Add favorite"}</button></h3>
                        </body>
                    </div>
                )) : null}
            </div>
            
        </>
        
    );
};

export default Home;
