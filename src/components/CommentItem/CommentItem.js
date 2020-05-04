import React, { useState, createElement } from 'react';
import { Comment, Avatar, Tooltip, Tag } from 'antd';
import { Link } from 'react-router-dom';
import {
    DislikeOutlined,
    LikeOutlined,
    LikeTwoTone,
    DislikeTwoTone
} from '@ant-design/icons';
import { FullsizePicture } from 'react-responsive-picture';
import moment from 'moment';
import SliderImage from './../SliderImage';
import PopOver from './../PopOver';
import ContentPopOver from './../ContentPopover';
import './styles.css';

export default function CommentItem({ post }) {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <span key="comment-basic-like">
            <Tooltip title="Like">
                {createElement(action === 'liked' ? LikeTwoTone : LikeOutlined, {
                    onClick: like
                })}
            </Tooltip>
            <span className="comment-action">{likes}</span>
        </span>,
        <span key=' key="comment-basic-dislike"'>
            <Tooltip title="Dislike">
                {React.createElement(
                    action === 'disliked' ? DislikeTwoTone : DislikeOutlined,
                    {
                        onClick: dislike
                    }
                )}
            </Tooltip>
            <span className="comment-action">{dislikes}</span>
        </span>,
        <span key="comment-basic-reply-to">Reply to</span>
    ];

    const renderImage = images => {
        return images.map((value, key) => (
            <div key={key}>
                <div style={{ height: 200 }}>
                    <FullsizePicture
                        sources={[
                            {
                                srcSet: value.url
                            }
                        ]}
                        cover="height"
                        center="true"
                    />
                </div>
            </div>
        ));
    };
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
            author={<Link to={`/profile/${post.idUser._id}`}>{post.idUser.displayName}</Link>}
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
                        <SliderImage>{renderImage(post.images)}</SliderImage>
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
        />
    );
}
