import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth'
import { QUERY_POST } from '../utils/queries';
import { CREATE_COMMENT } from '../utils/mutations';

import CommentButton from '../components/CommentButton';
import LikeButton from '../components/LikeButton';
import DeletePostButton from '../components/DeletePostButton'

function Post() {
    const {postId} = useParams()
    const {loading, data} = useQuery(QUERY_POST, {
        variables: {postId: postId}
    })

    const [comment, setComment] = useState('')

    const [createComment] = useMutation(CREATE_COMMENT, {
        update() {
            setComment('')
        },
        variables: {
            postId: postId,
            body: comment
        }
    })

    const comPost = () => console.log(comments)
    const history = useNavigate()
    const deleteReroute = () => {
        history('/newsfeed')
    }

    const {_id, likeCount, body, username, image, createdAt, comments, userId} = data?.getPost || {};
    const likes = data?.getPost?.likes || [];

    const profData = Auth.getProfile()
    const userData = profData.data
    const rightUser = userData._id === userId
    
    return(
        <div>
            <br></br>
            <p>created at: {createdAt}</p>
            <img src={`/images/${image}`}/>
            <h3>{body}</h3>
            <h4>By: {username}</h4>
            <hr/>
            {/* <button onClick={comPost}>💬</button> */}
            {/* <CommentButton /> */}
            <LikeButton user={userData} post={{_id, likes, likeCount}}/>
            {rightUser ? <DeletePostButton postId={{_id}} callback={deleteReroute} /> : null}
            {Auth.loggedIn() && 
                <div>
                    <p>Post a comment</p>
                    <form>
                        <div>
                            <input 
                                type={"text"} 
                                placeholder={"comment.."} 
                                value={comment} 
                                onChange={e => setComment(e.target.value)} 
                            />
                            <button 
                                type='submit' 
                                disabled={comment.trim() === ''}
                                onClick={createComment}
                            >Create Comment</button>
                        </div>
                    </form>
                </div>
            }
            {comments?.map(comment =>
                <div key={comment.id}>
                    <br></br><hr></hr>
                    <h4>comment: {comment.body}</h4>
                    <p>by: {comment.username}</p>
                    <p>at: {comment.createdAt}</p>
                    <DeletePostButton postId={{_id}} commentId={comment.id} />
                    {/* {userData._id === comment.userId ?
                        <DeletePostButton postId={{_id}} commentId={comment.id} /> :
                        null
                    } */}
                </div>
            )}
            <br></br>
        </div>
    )
}

export default Post