import React, { useContext, useState, useEffect } from 'react'
import BlogPostService from '../../services/blogposts.service'
import { Link, Redirect } from "react-router-dom"
import { AuthContext } from "../../Auth"
import firebaseConfig from '../../config'
import "./currentUserBlogPosts.css"
import { Table } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';


function CurrentUserBlogPosts(props) {

    const [blogposts, setBlogposts] = useState([])
    const [loading, setLoading] = useState(true)



    const onDataChange = (items) => {
        let blogPosts = []

        items.docs.forEach((item) => {
            let id = item.id;
            let data = item.data()
            blogPosts = [...blogPosts, {
                id: id,
                title: data.title,
                post: data.post,
                author: data.author,
                dateOfCreation: data.dateOfCreation,
                published: data.published
            }]
        })
        setBlogposts(blogPosts)
        blogPosts.length > 1 ? setLoading(false) : setLoading(true)

    }

    useEffect(() => {
        const unsubscribe = BlogPostService.getAllBlogPosts().orderBy("dateOfCreation", "desc").onSnapshot(onDataChange)
        return () => unsubscribe();
    }, [])



    const { currentUser } = useContext(AuthContext)

    let loggedInUser = firebaseConfig.auth().currentUser

    if (!currentUser) {
        window.alert("Log in first to view page.")
        return <Redirect to="/login" />
    }

    const deleteBlogPost = (id) => {
        if (window.confirm("Are you sure you want to delete post?")) {
            BlogPostService.removeBlogPost(id)
        } else {
            return null
        }
    }


    const NoUserPosts = () => {
        return (
            <>
                <div className="card p-5 mt-5">
                    <h4>You have No posts yet</h4>
                    <Link to="/new-blogpost" className="btn btn-info">Add new Blog Post</Link>
                </div>
            </>
        )
    }



    return (
        <>
            <div>
                {loading ? <CircularProgress className="loader" /> : <div className="card p-3 mt-5">
                    {(blogposts.filter(blogPost => blogPost.author === loggedInUser.displayName)).length === 0 ? <NoUserPosts /> : <div>
                        <h4>{loggedInUser?.displayName}'s Blog Posts</h4>
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {blogposts && blogposts.filter(blogPost => blogPost.author === loggedInUser.displayName).map((blogPost, index) =>
                                <tbody key={blogPost.id}>
                                    <tr >
                                        <td>{blogPost.title}</td>
                                        <td>{blogPost.dateOfCreation}</td>
                                        <td className="action-btns">
                                            <Link to={`/singleBlogpost/${blogPost.id}`}>
                                                <i className="fas fa-eye ml-1 mr-1 pl-2 pr-2"></i>
                                            </Link>

                                            <Link to={`/editBlogPost/${blogPost.id}`}>
                                                <i className="far fa-edit ml-1 mr-1 pl-2 pr-2"></i>
                                            </Link>

                                            <i onClick={() => deleteBlogPost(blogPost.id)} className="far fa-trash-alt ml-1 mr-1 pl-2 pr-2"></i>
                                        </td>
                                    </tr>

                                </tbody>
                            )}
                        </Table>

                    </div>}

                </div>}

            </div>
        </>



    )
}

export default CurrentUserBlogPosts
