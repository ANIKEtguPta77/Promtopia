'use client';

import {useState,useEffect} from 'react'
import PromptCard from './PromptCard';

const PromptCardList=({data,handleTagClick})=>{

  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}

        />
      ))}
    </div>
  )
}



const Feed = () => {


  const [searchText,setsearchText]=useState('');
  const [posts,setPosts]=useState([]);
  const [searchedPost,setSearchedPosts]=useState([]);


  

  const handleSearchChange=(e)=>{
    setsearchText(e.target.value);
    
    if(!e.target.value){
    setSearchedPosts(posts)
    
    }
    else{
     
      
      const newPosts=posts.filter((post)=>{
        if(post.prompt.includes(e.target.value) || post.tag.includes(e.target.value) || post.creator.username.includes(e.target.value))
        return post
    })

    setSearchedPosts(newPosts)
  }};

  const handletagClick=(tag)=>{
      setsearchText(tag)
      const newPosts=posts.filter((post)=>{
        if(post.tag.includes(tag))
        return post
      })

    setSearchedPosts(newPosts)
  }


  
 

  useEffect(()=>{

    const fetchPosts=async()=>{
      const response=await fetch('/api/prompt');
      const data=await response.json();

      setPosts(data);
      setSearchedPosts(data)
    }

    fetchPosts();
  },[]);

  return (
    <section className='feed'>

      <form className='relatice w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={searchedPost}
        handleTagClick={handletagClick}
        
      />

    </section>
  )
}

export default Feed