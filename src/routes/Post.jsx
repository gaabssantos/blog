import "./Post.css"

import React, { useEffect, useState } from "react";
import blogFetch from "../axios/config";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  const getPost = async () => {
    const res = await blogFetch.get(`/posts/${id}`);
    const data = res.data;

    setPost({ title: data.title, content: data.body });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="post-container">
      {!post.title ? (
        <p>Carregando...</p>
      ) : (
        <div className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
