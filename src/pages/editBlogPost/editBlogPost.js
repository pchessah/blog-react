import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import BlogPostService from "../../services/blogposts.service"
import firebaseConfig from '../../config'
import "./editBlogPost.css"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


function EditBlogPost() {
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

    let { id } = useParams();
    let history = useHistory();



    useEffect(() => {
        BlogPostService.getAllBlogPosts().doc(id).get().then((snapshot) => {
            setBlogPost(snapshot.data())
        })
    }, [id]);

    const saveBlogPost = () => {
        setOpen(true)
        BlogPostService.updateBlogPost(id, ({
            title: blogPost.title,
            post: blogPost.post,
            dateOfCreation: getCurrentDate(),
            author: getCurrentUser(),
            published: true,
        })).then(() => setOpen(false)).then(() => {
            window.alert("Blogpost successfully edited")
            history.push("/your-blogpost")
        }).catch((e) => {
            setOpen(false)
            window.alert(e)
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



    return (
        <>   
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
            <div className="submit-form">
                <div className="card pt-5 pb-5 pl-2 pr-2 mt-5">
                    {blogPost.id}
                    <h4>Edit {blogPost.title}</h4>
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
            </div>
        </>

    )
}

export default EditBlogPost
