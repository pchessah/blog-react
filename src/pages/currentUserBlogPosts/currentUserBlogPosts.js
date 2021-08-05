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
       if(window.confirm("Are you sure you want to delete post?")){
           BlogPostService.removeBlogPost(id)          
        } else {
            return null
        }
    }


    return (
        <div className="card p-3 mt-5">
            <h4>{loggedInUser?.displayName}'s Blog Posts</h4>
            <div>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {blogposts && blogposts.filter(blogPost=> blogPost.author === loggedInUser.displayName).map((blogPost, index) =>
                        <tbody>
                            <tr key={blogPost.id}>
                                <td>{blogPost.title}</td>
                                <td>{blogPost.dateOfCreation}</td>
                                <td className="action-btns">
                                    <Link to={`/singleBlogpost/${blogPost.id}`}>
                                        <i className="fas fa-eye ml-1 mr-1 pl-2 pr-2"></i>
                                    </Link>

                                    <Link to={`/editBlogPost/${blogPost.id}`}>
                                    <i className="far fa-edit ml-1 mr-1 pl-2 pr-2"></i>
                                    </Link>

                                    <i onClick={()=>deleteBlogPost(blogPost.id)} className="far fa-trash-alt ml-1 mr-1 pl-2 pr-2"></i>
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
