import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './adapt-post.scss';

export const AdaptPost = ({ comment, setIsCommentUpdated, setIsFormShown }) => {
    const { id } = useParams();
    const [userName, setUserName] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        if (!comment) {
            return;
        }
        setText(comment.text || '');
        setUserName(comment.name || '')
    }, [comment])

    function clearForm() {
        setText('');
        setUserName('');
        setIsFormShown();
    }

    function handleAdd(e) {
        fetch(`http://localhost:3001/posts/${id}/comments`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                text: text,
            })
        }).then((response) => response.json())
            .then((res) => {
                setIsCommentUpdated();
                clearForm();
            })
            .catch((err) => {
                console.log(err)
            });
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:3001/comments/${comment.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                text: text,
                postId: id,
            })
        }).then((response) => response.json())
            .then((res) => {
                setIsCommentUpdated();
                clearForm();
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <section>
            <h2 className="h-typography--m">{comment ? 'Edit' : 'Add'}</h2>
            <div className="h-vertical-spacer--s" />
            <form className="feat-adapt-post__form">
                <label className="h-typography--m">Name</label>
                <div className="h-vertical-spacer--xxs" />
                <input
                    className="feat-adapt-post__textfield"
                    type="text"
                    value={userName}
                    name="name"
                    onChange={(e) => setUserName(e.target.value)}
                />
                <div className="h-vertical-spacer--s" />
                <label className="h-typography--m">Text</label>
                <div className="h-vertical-spacer--xxs" />
                <textarea
                className="feat-adapt-post__textarea"
                    type="text"
                    value={text}
                    name="title"
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="h-vertical-spacer--m" />
                <div className="feat-adapt-post__buttons-wrapper">
                    <div className="col-6">
                        {comment ?
                            <button className="feat-adapt-post__btn-update" type="button" onClick={(e) => handleSubmit(e)}>Update</button>
                            :
                            <button className="feat-adapt-post__btn-update" type="button" onClick={(e) => handleAdd(e)}>Add</button>}
                    </div>
                    <div className="col-6">
                        <button className="feat-adapt-post__btn-cancel" type="button" onClick={() => setIsFormShown()}>Cancel</button>
                    </div>
                </div>
            </form>

        </section>
    );
}