import { useEffect, useState } from "react";
import { getBook, updateBook } from "../api/booksApi";
import BookForm from "../components/BookForm";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams();
  const [initial, setInitial] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getBook(id)
      .then(setInitial)
      .catch(() => setError("Book not found"));
  }, [id]);

  const submit = async (data) => {
    try {
      setSubmitting(true);
      await updateBook(id, data);
      navigate("/");
    } finally {
      setSubmitting(false);
    }
  };

  if (error)
    return (
      <div className="container">
        <div className="card">{error}</div>
      </div>
    );
  if (!initial)
    return (
      <div className="container">
        <div className="card">Loading…</div>
      </div>
    );

  return (
    <div className="container">
      <div className="header">
        <h2>Edit Book</h2>
      </div>
      <div className="card">
        <BookForm initial={initial} onSubmit={submit} submitting={submitting} />
      </div>
    </div>
  );
}
