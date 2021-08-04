import React, { useState } from 'react'
import BlogPostService from '../../services/blogposts.service'
import firebaseConfig from '../../config'
import "./new-blogpost.css"


function Newblogpost() {    
    const initialBlogPostState = {
        title: "",
        post: "",
        dateOfCreation: "",
        author: "",
        published: false
    }

    

    const [blogPost, setBlogPost] = useState(initialBlogPostState)
    const [submitted, setSubmitted] = useState(false)

    
    const saveBlogPost = () => {
        let blogPostData = {
            title: blogPost.title,
            post: blogPost.post,
            dateOfCreation: getCurrentDate(),
            author: getCurrentUser(),
            published: true
        }

        BlogPostService.createBlogPost(blogPostData).then(() => {
            setSubmitted(true)
        }).catch((error) => {
            window.alert(error)
        })
    }  

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBlogPost({ ...blogPost, [name]: value })
    }

    const getCurrentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        return today
    }

    const getCurrentUser = () => {
        let loggedInUser = firebaseConfig.auth().currentUser
        return loggedInUser.displayName
    }

    const newBlogPost = () => {
        setBlogPost(initialBlogPostState)
        setSubmitted(false)
    }



    return (
        <div className="submit-form">
            {submitted ? (
                <div className="card p-5 m-5">
                    <h4>Post submitted Successfully</h4>
                    <button className="btn btn-info" onClick={newBlogPost}>Add new Blog Post</button>
                </div>
            ) : (
                <div className="card p-5 m-5">
                    <h4>Add New Blog Post</h4>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={blogPost.title}
                            onChange={handleInputChange}
                            name="title"
                            placeholder="Title"
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            className="form-control"
                            id="post"
                            required
                            value={blogPost.post}
                            onChange={handleInputChange}
                            name="post"
                            placeholder="Your Post"></textarea>
                    </div>

                    <button onClick={saveBlogPost} className="btn submit-btn">
                        Submit
                    </button>
                </div>
            )}
        </div>
    )
}

export default Newblogpost
