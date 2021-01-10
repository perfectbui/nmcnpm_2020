import React, { useState, useEffect } from "react";

import "./Test.css"
import Axios from "axios";

const Test = (props) => {
    const [test, setTest] = useState();
    const [answer, setAnswer] = useState()

    const postHandler = (event) => {
        event.preventDefault();
        Axios({
            method: "post",
            url: "/api/test/" + props.match.params.id,
            data: answer,
            headers: {
                "Content-Type": "multipart/form-data",
                "X-Requested-with": "XMLHttpRequest",
            },
        })
            .then((response) => {
                alert("Submit successfully!")
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        Axios({
            method: "get",
            url: "/api/test/" + props.match.params.id,
            headers: {
                "Content-Type": "multipart/form-data",
                "X-Requested-with": "XMLHttpRequest",
            },
        })
            .then((response) => {
                console.log(response.data)
                setTest(response.data)
            })
            .catch(error => console.log(error))
    }, [])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h2>INTERVIEW TEST</h2>
            <p>{test ? test.content : null}</p>
            <textarea
                className="answer"
                placeholder="Write your answer"
                onChange={(event) => setAnswer(event.target.value)}
            />
            <button className="btn-post-answer" onClick={event => postHandler(event)}>
                POST
             </button>
        </div>
    )
}

export default Test;