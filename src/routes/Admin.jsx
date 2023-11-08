import blogFetch from "../axios/config";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./Admin.css";

const Admin = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await blogFetch.get("/posts");
      const data = res.data;

      setPosts(data);
    } catch (err) {
      console.log(`Houve um erro: ${err}`);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="admin">
      <h1>Gerenciar posts</h1>
      {posts.length === 0 ? <p>Carregando...</p> : (
        posts.map((post) => (
            <div className="post" key={post.id}>
                <h2>{post.title}</h2>
                <div className="actions">
                    <Link className="btn edit-btn">Editar</Link>
                    <button className="btn delete-btn">Excluir</button>
                </div>
            </div>
        ))
      )}
    </div>
  );
};

export default Admin;
