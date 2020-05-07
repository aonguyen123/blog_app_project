import React, { useState, createElement } from 'react';
import { Comment, Avatar, Tooltip, Tag, Spin } from 'antd';
import { Link } from 'react-router-dom';
import {
    DislikeOutlined,
    LikeOutlined,
    LikeTwoTone,
    DislikeTwoTone,
    LoadingOutlined
} from '@ant-design/icons';
import Img from 'react-image';
import moment from 'moment';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import PopOver from './../PopOver';
import ContentPopOver from './../ContentPopover';
import './styles.css';

import { PhotoProvider, PhotoConsumer } from 'react-photo-view';
import 'react-photo-view/dist/index.css';

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
                {createElement(
                    action === 'liked' ? LikeTwoTone : LikeOutlined,
                    {
                        onClick: like
                    }
                )}
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

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                },
            },
            {
                breakpoint: 989,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            }
        ]
    };
    const renderImage = images => {
        return (
            <PhotoProvider>
                <div className="images-content">
                    <Slider {...settings}>
                        {images.map((item, index) => (
                            <PhotoConsumer key={index} src={item.url}>
                                <Img
                                    src={item.url}
                                    alt=""
                                    className="images-item"
                                    loader={
                                        <Spin
                                            indicator={
                                                <LoadingOutlined spin />
                                            }
                                        />
                                    }
                                />
                            </PhotoConsumer>
                        ))}
                    </Slider>
                </div>
            </PhotoProvider>
        );
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
                    {post?.images.length > 0 && renderImage(post.images)}
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
