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

    const addOrRemoveFavorite = async(smoothieName) => {

        var smoothie_button = document.getElementById(smoothieName);
        // console.log(smoothie_button.innerHTML);
        if (smoothie_button.innerHTML === "Add favorite")
        {
            // const loggedInUser = localStorage.getItem("users");

            console.log("add called")
            axios
            .put('http://localhost:5000/smoothie_shack/addFavorite', {id: userid, newfav: smoothieName})
            .then(function (res) {
                console.log("Res: " + res);
            })
            .catch((err) => {
                console.log(err);
            });
            smoothie_button.innerHTML = "Remove favorite";

            

            // console.log("before getting user data")
            // await axios
            // .get('http://localhost:5000/smoothie_shack/users')
            // .then((res) => {
                
            //     // get user data
            //     const item = Array.from(res.data).find(item => item.user === loggedInUser)
            //     console.log(item);
            //     // add smoothieID to list of favorites
            //     setUserid(item.user);



            //     // smoothie_button.innerHTML = "Remove favorite";

                
            //     // console.log("before sending favorite")
            //     return axios
            //     .put('http://localhost:5000/smoothie_shack/addFavorite', {id: userid, newfav: smoothieName})
                
            // })
            // .then((res) => {
            //     console.log("add favorite request sent" + res);
            // })
            // .catch((err) => {
            //     console.log(err);
            // });

            // console.log("After getting user data: " + userid);

            // console.log("putting: " + favorites);

        }

        else // smoothie_button.innerHTML === "Remove favorite"
        {
            console.log("removed called")
            axios
            .put('http://localhost:5000/smoothie_shack/removeFavorite', {id: userid, newfav: smoothieName})
            .then(function (res) {
                console.log("Res: " + res);
            })
            .catch((err) => {
                console.log(err);
            });
            smoothie_button.innerHTML = "Add favorite";
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
