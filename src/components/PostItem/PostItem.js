import React, { createElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Comment, Avatar, Tooltip, Tag } from 'antd';
import { Link } from 'react-router-dom';
import {
    DislikeOutlined,
    LikeOutlined,
    LikeTwoTone,
    DislikeTwoTone,
    MessageOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import PopOver from '../PopOver';
import ContentPopOver from '../ContentPopover';
import ImagesView from '../ImagesView';
import './styles.css';

export default function PostItem({post, children, idUser, likePostHome, dislikePostHome}) {    
    const history = useHistory();

    const like = () => {
        likePostHome(post._id);
    };
    const dislike = () => {
        dislikePostHome(post._id);
    };

    const actions = [
        <span key="comment-basic-like">
            <Tooltip title="Like">
                {createElement(
                    post.likes.findIndex(l => l.idUser === idUser) !== -1 ? LikeTwoTone : LikeOutlined,
                    {
                        onClick: like
                    }
                )}
            </Tooltip>
            <span className="comment-action">{post.likes.length}</span>
        </span>,
        <span key=' key="comment-basic-dislike"'>
            <Tooltip title="Dislike">
                {React.createElement(
                    post.dislikes.findIndex(dl => dl.idUser === idUser) !== -1 ? DislikeTwoTone : DislikeOutlined,
                    {
                        onClick: dislike
                    }
                )}
            </Tooltip>
            <span className="comment-action">{post.dislikes.length}</span>
        </span>,
        <span key="comment-basic-comments">
            <Tooltip title="Comments">
                {React.createElement(MessageOutlined, {
                    onClick: () => history.push(`/comments/${post._id}`, {post})
                })}
            </Tooltip>
            <span className="comment-action">{post.comments.length}</span>
        </span>
    ];

    const renderMentions = mentions => {
        return mentions.map(value => (
            <PopOver
                key={value._id}
                placement="topRight"
                title="Profile"
                content={<ContentPopOver user={value.idUser} />}
                trigger="click"
            >
                <Tag color="magenta">{value.idUser.displayName}</Tag>
            </PopOver>
        ));
    };

    return (
        <Comment
            actions={actions}
            author={
                <Link to={`/profile/${post.idUser._id}`}>
                    {post.idUser.displayName}
                </Link>
            }
            avatar={
                <Avatar
                    src={post.idUser.photoURL}
                    alt={post.idUser.displayName}
                />
            }
            content={
                <>
                    <p>{post.content}</p>
                    {post?.mentions.length > 0 && renderMentions(post.mentions)}
                    {post?.images.length > 0 && (
                        <ImagesView images={post.images} />
                    )}
                </>
            }
            datetime={
                <Tooltip
                    title={moment(post.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                >
                    <span>{moment(post.createdAt).fromNow()}</span>
                </Tooltip>
            }
        >
            {children}
        </Comment>
    );
}
