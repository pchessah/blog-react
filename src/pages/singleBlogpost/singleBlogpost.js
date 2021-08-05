import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import BlogPostService from "../../services/blogposts.service"
import "./singleBlogpost.css"

function SingleBlogpost(props) {
    const initialBlogPostState = {
        title: "",
        post: "",
        dateOfCreation: "",
        author: "",
        published: false
    }

    let { id } = useParams();
    let history = useHistory();

    const goBack = () => {
        history.push("/")
    }
    
    const [blogPost, setBlogpost] = useState(initialBlogPostState)

    BlogPostService.getAllBlogPosts().doc(id).get().then((snapshot) => {
        setBlogpost(snapshot.data())
    })

    useEffect(() => {
        // componentWillUnmount
        return () => {
          setBlogpost(null)
        }
      }, []);

    return (
        <>
            <div className="card m-3 p-4">
                <h4>{blogPost.title}</h4>
                <p>
                    <em>By {blogPost.author}</em>
                </p>

                <p>
                    <em>{blogPost.dateOfCreation}</em>
                </p>
                <hr></hr>
                <p className="blogpost">{blogPost.post}</p>
                <hr></hr>
                
                <i onClick={goBack} className="fas fa-step-backward"> Back to Feed</i>

            </div>

        </>
    )
}

export default SingleBlogpost
