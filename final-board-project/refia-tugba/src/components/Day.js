import React, { useState, useEffect } from "react";
import db from "../firebaseConfig";


const Day = () => {

    const [taskToSubmit, setTaskToSubmit] = useState("");
    const [tasksToShow, setTasksToShow] = useState([]);

   
    const handleChange = (e) => {    // This is called when the user changes an input.
        setTaskToSubmit(e.target.value) 
    }

        useEffect(() => {
            fetchTasksToShow();
        }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        db.collection("tasks").add({ 
            task : taskToSubmit,
            dueDate: currentDate.toDateString(),
        })
        .then(function() {
            fetchTasksToShow();
            console.log("Document successfully written!");

        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });    
        setTaskToSubmit("");
    }

    // This function gets the tasks and print them out to the screen.
    const fetchTasksToShow = () => {
         db.collection("tasks")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                console.log(data)
                setTasksToShow(data);
            })
    }

    //updateTask
    //deleteTask


const itemCard = (item) => {
    return (
        <li>{item.task} {item.dueDate}</li>
    )
}

const taskItemCards = tasksToShow.map(itemCard);


    return (
        <div className="container">
            <h4 className="center">Day</h4>
           
             <form onSubmit={handleSubmit} className="center">
                <input onChange={handleChange} type="text" placeholder="What do you want to do?" value={taskToSubmit}></input>
                <input type="date" placeholder="Due date" value={taskToSubmit}></input>
                <button>Add task</button>
             </form>

             <form className="container center">
                 <h2>Today's tasks</h2>
                    <ul>
                        {taskItemCards}
                    </ul>
             </form>
        </div>
    )
}

export default Day;
