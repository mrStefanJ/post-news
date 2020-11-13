import React from "react";
import { Link } from "react-router-dom";
import "./post.scss";

export const Post = (props) => {
    const { id, description, title, image, commentsCount } = props;
    return (
        <article className="feat-post">
            <Link to={`/post/${id}`} className="feat-post__link">
                <div className="feat-post__image-wrapper"><img src={image} alt={title}/></div>
                <div className="feat-post__comments-box">
                    <span className="h-typography--m feat-post__comments-box-text">{commentsCount}</span>
                    </div>
                <div className="feat-post__text-wrapper">
                    <p className="h-typography--xl h-typography--bold">{title}</p>
                    <p className="h-typography--m">{description}</p>
                </div>
            </Link>
        </article>
    )
}

