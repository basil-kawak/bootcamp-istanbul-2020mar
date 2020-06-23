import React, { useState } from "react";
import db from "../firebaseConfig";



const Greet = (props) => {
//     setTimeout(() => {
//         props.history.push("/day")
//     }, 5000);

    const [user, setUser] = useState("");

    const handleChange = (e) => {
        setUser(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        db.collection("users").add({ 
            user : user,
            joined: currentDate.toDateString(),
         })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });    
        setUser("");
    }

    // const userSubmit = (user) => {
    //     return (
    //         <h2 className="center">`Hello {user}!`</h2>
    //     )
    // }
    
    // const showUser = user.map(userSubmit);

        return (
            <div>
                <form onSubmit={handleSubmit} className="center">
                    <input placeholder="Your name" type="text" onChange={handleChange} value={user}></input>
                    <button>Submit</button>
                </form>
                <h3 onChange={handleSubmit}>
                 Hello {user}!
                </h3>
            </div>
        )
}

export default Greet;