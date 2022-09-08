import { useEffect, useState } from "react";
import React from 'react';
import { useStore } from "../hooks-store/store";

const Posts = () => {
    // const [apiData, setApiData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async() =>{
    //       const rawData = await fetch("https://jsonplaceholder.typicode.com/posts");
    //       const data = await rawData.json();
    //       setApiData(data);
    //     }
    //     fetchData();
    // // see if I get an error with empty dependancy array.
    //   // and if it works wihtout it.
    // }, []);

    const globalState = useStore()[0];

    // useEffect(() => {
    //     dispatch('FETCH_POSTS');
    // },[])

  // then apiData is used in the template
  const postsJSX = globalState.posts.slice(0,9).map(item => {   
    return (
            <li>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
            </li> 
    )
       
    });

  return (
      <>
        <h2>Posts component</h2>
        <ul>
          {postsJSX}
        </ul>
      </>
      
  );
};

const Widget = () => {
    // const [apiData, setApiData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async() =>{
    //       const rawData = await fetch("https://jsonplaceholder.typicode.com/posts");
    //       const data = await rawData.json();
    //       setApiData(data);
    //     }
    //     fetchData();
    // // see if I get an error with empty dependancy array.
    //   // and if it works wihtout it.
    // }, []);

    const globalState = useStore()[0];

    // useEffect(() => {
    //     dispatch('FETCH_POSTS');
    // },[])

  // then apiData is used in the template to show only 3 posts
  const postsJSX = globalState.posts.slice(0,2).map(item => {   
    return (
        <li>
            <h3>{item.title}</h3>
        </li>
    )
});
  return (
// React.fragments and title
      <>
        <h2>Widget component</h2>
        <ul>
            {postsJSX}
        </ul>
      </>  
  );
};



const HomePagePosts = () => {
  const dispatch = useStore()[1];

  useEffect(() => {
    dispatch('FETCH_POSTS');
  },[])

    return (<>
        <Posts/>
        <Widget />
    </>);
}

export default HomePagePosts;