import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import { AdaptPost } from '../../components/AdaptPost/AdaptPost';
import './post-details.scss';

export const PostDetails = () => {

  const { id } = useParams();

  function getComments() {
    fetch(`http://localhost:3001/comments`)
      .then(res => res.json())
      .then((data) => {
        setComments(data)
      })
      .catch(console.log);
  };

  function getPost() {
    fetch(`http://localhost:3001/posts/${id}`)
      .then(res => res.json())
      .then((data) => {
        setPost(data)
      })
      .catch(console.log);
  };

  const [post, setPost] = useState(undefined);
  const [comments, setComments] = useState(undefined);
  const [commentForAdaptation, setCommentForAdaptation] = useState(undefined);
  const [isCommentUpdated, setIsCommentUpdated] = useState(false)
  const [isFormShown, setIsFormShown] = useState(false);

  useEffect(() => {
    if (!post) {
      getPost();
    }
    if (!comments || isCommentUpdated) {
      getComments();
      setIsCommentUpdated(false);
    }
  }, [comments, post, isCommentUpdated])

  if (!post || !comments) {
    return null;
  }

  return (
    <div className="feat-post-details">
      <div className="feat-post-details__image-wraper"><img src={post.image} alt={post.title} /></div>
      <div className="h-vertical-spacer--l" />
      <h1 className="h-typography--xl h-typography--bold">{post.title}</h1>
      <div className="h-vertical-spacer--xxl" />
      <p className="h-typography--m">{post.text}</p>
      <div className="h-vertical-spacer--l" />
      <button className="feat-post-details__btn-add" type="button" onClick={() => setIsFormShown(true)}>Add a Comment</button>
      <div className="h-vertical-spacer--m" />
      <div className={classnames('feat-post-details__edit-form-wrapper', { 'feat-post-details__edit-form-wrapper--visible': isFormShown })}>
        <AdaptPost
          comment={commentForAdaptation}
          setIsCommentUpdated={() => setIsCommentUpdated(true)}
          setIsFormShown={() => setIsFormShown(false)}
        />
        <div className="h-vertical-spacer--l" />
      </div>
      {comments.filter((comment) => String(comment.postId) === id).map((comment) => {
        const { id, name, text } = comment;
        return (
          <div key={id} className="feat-post-details__comment">
            <div className="feat-post-details__comment-text-wrapper">
              <p className="h-typography--m">{name}</p>
              <p className="h-typography--s h-typography--italic">{text}</p>
            </div>
            <button type="button" className="feat-post-details__btn-edit" onClick={() => { setCommentForAdaptation(comment); setIsFormShown(true) }} />
          </div>
        )
      })}
    </div>
  )
}
