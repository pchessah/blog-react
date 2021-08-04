import firebase from "../config"

const db = firebase.firestore().collection("/blogposts")

const getAllBlogPosts = () => {
    return db
}

const createBlogPost = (blogpost) => {
    return db.add(blogpost) 
}

const updateBlogPost = (id, value) => {
    return db.doc(id).update(value)
}

const removeBlogPost = (id) => {
    return db.doc(id).delete()
}

const BlogPostService = {
    getAllBlogPosts,
    createBlogPost,
    updateBlogPost,
    removeBlogPost
}

export default BlogPostService;