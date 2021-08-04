import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import BlogPostService from "../../services/blogposts.service"

function SingleBlogpost(props) {
    const initialBlogPostState = {
        title: "",
        post: "",
        dateOfCreation: "",
        author: "",
        published: false
    }

    let { id } = useParams();
    const [blogPost, setBlogpost] = useState(initialBlogPostState)

    BlogPostService.getAllBlogPosts().doc(id).get().then((snapshot) => {
        setBlogpost(snapshot.data())
    })

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
                <p>{blogPost.post}</p>

            </div>

        </>
    )
}

export default SingleBlogpost
