import { useNavigate } from "react-router-dom";
import "./NewPost.css";
import { useState } from "react";
import blogFetch from "../axios/config";

const NewPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const createPost = async (e) => {
    e.preventDefault();

    const post = { title, content, userId: 1 };

    if (title && content) {
      await blogFetch.post("/posts", {
        body: post,
      });
      navigate("/");
    }
  };

  return (
    <div className="new-post">
      <h2>Inserir novo post:</h2>
      <form onSubmit={(e) => createPost(e)}>
        <div className="form-control">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="content">Conteúdo:</label>
          <textarea
            name="content"
            id="content"
            placeholder="Digite o conteúdo"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <input type="submit" value="Criar o post" className="btn" />
      </form>
    </div>
  );
};

export default NewPost;
