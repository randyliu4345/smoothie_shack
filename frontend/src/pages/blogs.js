import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Blogs = () => {
    const [smoothies, setSmoothies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [userid, setUserid] = useState("");

    useEffect(() => {
        setFavorites(favorites);
        console.log(favorites);
    }, [favorites]);
    
    useEffect(() => {
        fetchSmoothies();
    }, []);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("users");
        console.log("useEffect called");
        if (loggedInUser) {
            setUserid(loggedInUser);
        }
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

    const addFavorite = (smoothieName) => {
        // console.log(smoothieID);
        const loggedInUser = localStorage.getItem("users");
        // find loggedInUser in database
        axios
            .get('http://localhost:5000/smoothie_shack/users')
            .then((res) => {

                // get user data
                const item = Array.from(res.data).find(item => item.user === loggedInUser)
                console.log(item);
                // add smoothieID to list of favorites

                setUserid(item.user);
            })
            .catch((err) => {
                console.log(err);
            });


        // console.log("putting: " + favorites);
        axios
            .put('http://localhost:5000/smoothie_shack/addFavorite', {id: userid, newfav: smoothieName})
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <h1>You can write your blogs!</h1><div className='item-container'>
                {smoothies.map((smoothie) => (
                    <div className='card'>
                        <h3> <button onClick={() => {addFavorite(smoothie.name);}}>Add favorite </button> {smoothie.name} </h3>
                    </div>
                ))}
                
            </div>
        </>
    );
};

export default Blogs;
