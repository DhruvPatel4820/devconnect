import {
  FiHeart,
  FiMessageCircle,
  FiEdit2,
  FiBookmark,
  FiTrash2,
} from "react-icons/fi";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./PostCard.module.css";

import {
  toggleLike,
  deletePost,
  toggleSave,
} from "../../../services/post.service";
import { useAuth } from "../../../hooks/useAuth";

import CommentModal from "../../Comment/CommentModal/CommentModal";
import EditPost from "../../Post/EditPost/EditPost";

import ImageViewer from "../../Common/ImageViewer/ImageViewer";

export default function PostCard({ post, posts, setPosts }) {
  const { user } = useAuth();

  const isOwner = user?._id === post.author._id;

  const [openComments, setOpenComments] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [openViewer, setOpenViewer] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const isLiked =
    post.likes?.some((id) => id.toString() === user?._id?.toString()) || false;

  // console.log("Current User:", user);
  // console.log("Post Author:", post.author);
  // console.log("Compare:", user?._id, post.author?._id);
  const isSaved =
    post.savedBy?.some((id) => id.toString() === user?._id?.toString()) ||
    false;

  const handleLike = async () => {
    try {
      const response = await toggleLike(post._id);

      const updatedPost = response.data;

      setPosts(
        posts.map((item) =>
          item._id === updatedPost._id ? updatedPost : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async () => {
    try {
      const response = await toggleSave(post._id);

      const updatedPost = response.data;

      setPosts(
        posts.map((item) =>
          item._id === updatedPost._id ? updatedPost : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      await deletePost(post._id);

      setPosts(posts.filter((item) => item._id !== post._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <article className={styles.card}>
        {/* Header */}

        <div className={styles.header}>
          <Link
            to={`/profile/${post.author.username}`}
            className={styles.author}
          >
            <img
              src={
                post.author.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  post.author.fullName,
                )}`
              }
              alt={post.author.fullName}
            />

            <div>
              <h3>{post.author.fullName}</h3>
              <p>@{post.author.username}</p>
            </div>
          </Link>

          {isOwner && (
            <div className={styles.actions}>
              <button
                className={styles.editBtn}
                onClick={() => setOpenEdit(true)}
              >
                <FiEdit2 />
              </button>

              <button className={styles.deleteBtn} onClick={handleDelete}>
                <FiTrash2 />
              </button>
            </div>
          )}
        </div>

        {/* Content */}

        <div className={styles.content}>
          <p>{post.content}</p>

          {post.images?.length > 0 && (
            <div
              className={`${styles.images} ${
                styles[`count${Math.min(post.images.length, 4)}`]
              }`}
            >
              {post.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={styles.imageBox}
                  onClick={() => {
                    setCurrentImage(index);
                    setOpenViewer(true);
                  }}
                >
                  <img src={image.url} alt={`post-${index}`} />

                  {index === 3 && post.images.length > 4 && (
                    <div className={styles.moreOverlay}>
                      +{post.images.length - 4}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}

        <div className={styles.footer}>
          <button onClick={handleLike}>
            {isLiked ? <FaHeart className={styles.liked} /> : <FiHeart />}

            <span>{post.likesCount}</span>
          </button>

          <button onClick={() => setOpenComments(true)}>
            <FiMessageCircle />
            <span>{post.commentsCount}</span>
          </button>

          <button onClick={handleSave}>
            {isSaved ? <FaBookmark className={styles.saved} /> : <FiBookmark />}
          </button>
        </div>
      </article>

      {openComments && (
        <CommentModal
          post={post}
          onClose={() => setOpenComments(false)}
          onCommentAdded={(updatedPost) => {
            setPosts(
              posts.map((item) =>
                item._id === updatedPost._id ? updatedPost : item,
              ),
            );
          }}
        />
      )}

      {openEdit && (
        <EditPost
          post={post}
          setPosts={setPosts}
          closeModal={() => setOpenEdit(false)}
        />
      )}
      {openViewer && (
        <ImageViewer
          images={post.images}
          currentIndex={currentImage}
          onClose={() => setOpenViewer(false)}
        />
      )}
    </>
  );
}
