import React, { createElement } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
    Comment,
    Avatar,
    Tooltip,
    Tag,
    Typography
} from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import {
    DislikeOutlined,
    LikeOutlined,
    LikeTwoTone,
    DislikeTwoTone,
    MessageOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import moment from 'moment';
import PopOver from '../PopOver';
import ContentPopOver from '../ContentPopover';
import ImagesView from '../ImagesView';
import PopConfirm from './../PopConfirm';
import './styles.css';

const { Paragraph } = Typography;

export default function PostItem({
    post,
    children,
    idUser,
    likePostHome,
    dislikePostHome,
    deletePost
}) {
    const history = useHistory();

    const like = () => {
        likePostHome(post._id);
    };
    const dislike = () => {
        dislikePostHome(post._id);
    };

    const actions = [
        <span key="comment-basic-like">
            <Tooltip title={formatMessage({ id: 'home.post.like' })}>
                {createElement(
                    post?.likes?.findIndex(l => l.idUser._id === idUser) !== -1
                        ? LikeTwoTone
                        : LikeOutlined,
                    {
                        onClick: like
                    }
                )}
            </Tooltip>
            <span className="comment-action">{post?.likes?.length}</span>
        </span>,
        <span key=' key="comment-basic-dislike"'>
            <Tooltip title={formatMessage({ id: 'home.post.dislike' })}>
                {React.createElement(
                    post?.dislikes?.findIndex(
                        dl => dl.idUser._id === idUser
                    ) !== -1
                        ? DislikeTwoTone
                        : DislikeOutlined,
                    {
                        onClick: dislike
                    }
                )}
            </Tooltip>
            <span className="comment-action">{post?.dislikes?.length}</span>
        </span>,
        <span key="comment-basic-comments">
            <Tooltip title={formatMessage({ id: 'home.post.comment' })}>
                {React.createElement(MessageOutlined, {
                    onClick: () => history.push(`/comments/${post._id}`)
                })}
            </Tooltip>
            <span className="comment-action">{post?.comments?.length}</span>
        </span>,
        post?.idUser?._id === idUser && (
            <span key="other-options">
                <PopConfirm title='Are you want delete this post!' okText='OK' cancelText='Cancel' placement='topLeft' onConfirm={() => deletePost(post._id)}>
                    <Tooltip title={formatMessage({ id: 'home.post.delete' })}>
                        {React.createElement(DeleteOutlined, {
                            onClick: (e) => e.preventDefault()
                        })}
                    </Tooltip>
                </PopConfirm>
            </span>
        )
    ];

    const renderMentions = mentions => {
        return mentions.map(value => (
            <PopOver
                key={value.idUser._id}
                placement="topRight"
                content={
                    <ContentPopOver
                        user={value.idUser}
                        idUserCurrent={idUser}
                    />
                }
                trigger="click"
            >
                <Tag color="magenta" style={{ cursor: 'pointer' }}>
                    {value.idUser.displayName}
                </Tag>
            </PopOver>
        ));
    };

    return (
        <Comment
            actions={actions}
            author={
                <Link
                    to={
                        idUser === post?.idUser?._id
                            ? '/account'
                            : `/profile/${post?.idUser?._id}`
                    }
                >
                    {post?.idUser?.displayName}
                </Link>
            }
            avatar={
                <Avatar
                    src={post?.idUser?.photoURL}
                    alt={post?.idUser?.displayName}
                />
            }
            content={
                <>
                    <Paragraph
                        ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}
                    >
                        {post?.content}
                    </Paragraph>
                    {post?.mentions?.length > 0 &&
                        renderMentions(post?.mentions)}
                    {post?.images?.length > 0 && (
                        <ImagesView images={post?.images} />
                    )}
                </>
            }
            datetime={
                <Tooltip
                    title={moment(post?.createdAt).format(
                        'DD-MM-YYYY HH:mm:ss'
                    )}
                >
                    <span>{moment(post?.createdAt).fromNow()}</span>
                </Tooltip>
            }
        >
            {children}
        </Comment>
    );
}
