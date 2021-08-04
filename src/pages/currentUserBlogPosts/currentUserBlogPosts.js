import React, { useContext, useState, useEffect } from 'react'
import BlogPostService from '../../services/blogposts.service'
import { Link, Redirect } from "react-router-dom"
import { AuthContext } from "../../Auth"
import firebaseConfig from '../../config'
import "./currentUserBlogPosts.css"
import { Table } from 'reactstrap';

function CurrentUserBlogPosts(props) {
 
    const [blogposts, setBlogposts] = useState([])


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
    }

    useEffect(() => {
        const unsubscribe = BlogPostService.getAllBlogPosts().orderBy("title", "asc").onSnapshot(onDataChange)
        return () => unsubscribe();
    }, [])



    const { currentUser } = useContext(AuthContext)

    let loggedInUser = firebaseConfig.auth().currentUser

    if (!currentUser) {
        window.alert("Log in first to view page.")
        return <Redirect to="/login" />
    }


    return (
        <div className="card p-3 m-5">
            <h4>{loggedInUser?.displayName}'s Blog Posts</h4>
            <div>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {blogposts && blogposts.filter(blogPost=> blogPost.author === loggedInUser.displayName).map((blogPost, index) =>
                        <tbody>
                            <tr key={blogPost.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{blogPost.title}</td>
                                <td>{blogPost.dateOfCreation}</td>
                                <td>
                                    <Link to={`/singleBlogpost/${blogPost.id}`}>
                                        <button className="btn btn-sm btn-info  ml-1 mr-1 pl-2 pr-2">
                                            View
                                        </button>
                                    </Link>


                                    <button className="btn btn-sm btn-outline-danger ml-1 mr-1 pl-2 pr-2">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    )}

                </Table>

            </div>
        </div>

    )
}

export default CurrentUserBlogPosts
