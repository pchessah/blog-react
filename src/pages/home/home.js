import "./home.css"
import React, { useState, useEffect } from 'react';
import BlogPostService from '../../services/blogposts.service'
import { Link } from "react-router-dom"
import CircularProgress from '@material-ui/core/CircularProgress';

function Home() {

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


    return (
        <>
            <div>
                {loading ? <CircularProgress className="loader" /> : <div className="row blogpost-card-holder">
                    {blogposts && blogposts.map((blogpost, index) =>
                        <Link key={blogpost.id} className="blog-card card p-1 m-1 col-12" to={`/singleBlogpost/${blogpost.id}`}>
                            <div className="card-content">
                                <h5>{blogpost.title}</h5>
                                by
                                <p><em>{blogpost.author}</em></p>
                            </div>
                            <div className="card-footer mb-0">

                                <i className="fas fa-eye"></i>

                                <div> <p>Posted on {blogpost.dateOfCreation}</p> </div>
                                <i className="fas fa-share-alt"></i>
                            </div>
                        </Link>
                    )}
                </div>}

            </div>
        </>
    )
}

export default Home
