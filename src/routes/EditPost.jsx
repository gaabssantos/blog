import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import blogFetch from "../axios/config";

const EditPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const { id } = useParams();

  const getPost = async () => {
    const res = await blogFetch.get(`/posts/${id}`);
    const data = res.data;

    setTitle(data.title);
    setContent(data.body);
  };

  const editPost = async (e) => {
    e.preventDefault();

    const post = { title, content, userId: 1 };

    if (title && content) {
      blogFetch.put(`/posts/${id}`, {
        body: post,
      });
      navigate("/admin");
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="edit-post">
      <h2>Editar o post: {title}</h2>
      <form onSubmit={(e) => editPost(e)}>
        <div className="form-control">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="content">Conteúdo:</label>
          <textarea
            name="content"
            id="content"
            placeholder="Digite o conteúdo"
            value={content || ""}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <input type="submit" value="Editar o post" className="btn" />
      </form>
    </div>
  );
};

export default EditPost;
