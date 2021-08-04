import React, { useState } from 'react'
import BlogPostService from '../../services/blogposts.service'
import firebaseConfig from '../../config'


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
                <div>
                    <h4>Post submitted Successfully</h4>
                    <button className="btn btn-info" onClick={newBlogPost}>Add new Blog Post</button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={blogPost.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="post">Post</label>
                        <textarea
                            className="form-control"
                            id="post"
                            required
                            value={blogPost.post}
                            onChange={handleInputChange}
                            name="post"></textarea>
                    </div>

                    <button onClick={saveBlogPost} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    )
}

export default Newblogpost
