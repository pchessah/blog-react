import React, { useState } from 'react'
import BlogPostService from '../../services/blogposts.service'
import firebaseConfig from '../../config'
import "./new-blogpost.css"
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));



function Newblogpost() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);


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
        setOpen(true)
        let blogPostData = {
            title: blogPost.title,
            post: blogPost.post,
            dateOfCreation: getCurrentDate(),
            author: getCurrentUser(),
            published: true
        }

        BlogPostService.createBlogPost(blogPostData).then(() => {
            setOpen(false)
            window.alert("Blog post created succesfully")
            setSubmitted(true)
        }).catch((error) => {
            setOpen(false)
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
        <>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="submit-form">
                {submitted ? (
                    <div className="card p-5 mt-5">
                        <h4>Post submitted Successfully</h4>
                        <button className="m-2 btn btn-info" onClick={newBlogPost}>Add new Blog Post</button>
                        <Link className="m-2 btn btn-success" to="/your-blogpost">

                            View Your Blog Posts

                        </Link>
                    </div>
                ) : (
                    <div className="card pt-5 pb-5 pl-2 pr-2 mt-5">
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
        </>
    )
}

export default Newblogpost
