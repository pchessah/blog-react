import "./home.css"
import React, { useState, useEffect } from 'react';
import firebaseConfig from '../../config'
import BlogPostService from '../../services/blogposts.service'
import { Link, Redirect } from "react-router-dom"



function Home() {

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


    return (
        <>
            <div>
                <div className="row blogpost-card-holder">
                    {blogposts && blogposts.map((blogpost, index) =>
                        <div className="blog-card card p-1 m-1 col-6">
                            <div className="card-content">
                                <h5>{blogpost.title}</h5>
                                by
                                <p><e>{blogpost.author}</e></p>
                            </div>
                            <div className="card-footer mb-0">
                                <i className="fas fa-thumbs-up"></i>
                                <i className="fas fa-eye"></i>
                                <i className="fas fa-share-alt"></i>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home
