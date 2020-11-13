import React, { useState } from 'react'
import { Post } from '../../components/Post/Post';
import './home.scss';

export const Home = () => {
    const getPosts = () => {
        fetch("http://localhost:3001/posts")
            .then(res => res.json())
            .then((data) => {
                setPosts(data)
            })
            .catch(console.log);
    }

    const [posts, setPosts] = useState([]);
    if (posts.length === 0) {
        getPosts();
    }
    return (
        <div className="feat-home">
            <h2>View post</h2>
            <div className="h-vertical-spacer--xxl" />
            <div className="feat-home__post-list">
                {posts.map(post =>
                    <div className="col-12 col-md-6 col-lg-4" key={post.id}>
                        <Post {...post} />
                        <div className="h-vertical-spacer--m" />
                    </div>
                )}
            </div>
        </div>
    )
}
