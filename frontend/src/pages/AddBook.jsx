import { useState } from "react";
import { createBook } from "../api/booksApi";
import BookForm from "../components/BookForm";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      setSubmitting(true);
      await createBook(data);
      navigate("/");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Add Book</h2>
      </div>
      <div className="card">
        <BookForm onSubmit={submit} submitting={submitting} />
      </div>
    </div>
  );
}
