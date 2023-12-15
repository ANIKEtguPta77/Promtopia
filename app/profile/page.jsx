"use client";

import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";

const MyProfile = () => {

    const {data:session}=useSession();
    const router=useRouter();
    const [posts,setPosts]=useState([]);
    const searchParams=useSearchParams();
    let ProfileId=searchParams.get("id")
    const [ProfileName,setProfileName]=useState("My");

    useEffect(()=>{

        
        
        if(ProfileId===null)
        ProfileId=session?.user.id
        
        const fetchPosts=async()=>{
          const response=await fetch(`/api/users/${ProfileId}/posts`);
          const data=await response.json();
            
          setPosts(data);
          if(ProfileId!==session?.user.id && data)
          setProfileName(data[0].creator.username)
          
        }
    
        if(ProfileId)fetchPosts();
      },[]);

 
  const handleEdit=(post)=>{

    router.push(`/update-prompt?id=${post._id}`)
  }


  const handleDelete=async(post)=>{
        const hasConfirmed=confirm("Are you sure you want to delete this prompt?")

        if(hasConfirmed)
        {
            try{
                await fetch(`/api/prompt/${post._id}`,{
                    method:'DELETE',

                });

                const filteredPosts=posts.filter((p)=>
                p._id!==post._id
                );

                setPosts(filteredPosts);
            }catch(error){
                console.log(error)
            }



        }
  }

  return (
    <Profile
        name={ProfileName}
        desc={ProfileId===session?.user.id?"Welcome to your personalized profile page":`Welcome to ${ProfileName} personalized profile page`}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile