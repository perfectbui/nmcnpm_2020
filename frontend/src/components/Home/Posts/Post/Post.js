import React from "react";
import {useSelector} from "react-redux"
import dateformat from "dateformat"

import "./Post.css";

const Post = (props) => {
  const {authenticated} = useSelector(state=>state.auth)

  const testHandler = (event) => {
    event.preventDefault()
    if(!authenticated) {
      alert("You need to sign in to do this test!") 
    } else {
      window.location.href="/test/" + props.id
    }
  }

  return (
    <div className="post">
      <div className="introduce-user">
        <i className="fas fa-user fa-2x" />
        <div className="name-date">
          <span>{props.name}</span>
          <span className="date">{dateformat(props.date, "dddd, mmmm dS, yyyy")}</span>
        </div>
      </div>
      <div className="content-post">{props.content}</div>
      <img src={props.image} style={{display:'block'}} />
      <div style={{width:'100%'}}>
      <div style={{width:'200px',backgroundColor:'grey',textAlign:'center',height:'50px',fontSize:'20px',padding:'10px',cursor:'pointer',borderRadius:'5px',margin:'0 auto'}} onClick={event => testHandler(event)}>Do The Test</div>
      </div>
    </div>
  );
};

export default Post;
