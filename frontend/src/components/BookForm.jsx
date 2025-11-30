import { useState, useEffect } from "react";

export default function BookForm({ initial, onSubmit, submitting }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    year: 2020,
    price: 0,
    status: "AVAILABLE",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);
  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.title || form.title.trim().length < 2)
      e.title = "Please enter a valid title (2+ characters)";
    if (!form.author || form.author.trim().length < 2)
      e.author = "Please enter a valid author name";
    const y = Number(form.year);
    if (isNaN(y) || y < 1450 || y > 2100) e.year = "Invalid year";
    const p = Number(form.price);
    if (isNaN(p) || p < 0) e.price = "Price must be a number ≥ 0";
    if (!["AVAILABLE", "BORROWED"].includes(form.status))
      e.status = "Invalid status";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, year: Number(form.year), price: Number(form.price) });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="row">
        <div>
          <label>Title</label>
          <input
            className="input"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
          />
          {errors.title && (
            <small style={{ color: "#b91c1c" }}>{errors.title}</small>
          )}
        </div>
        <div>
          <label>Author</label>
          <input
            className="input"
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
          />
          {errors.author && (
            <small style={{ color: "#b91c1c" }}>{errors.author}</small>
          )}
        </div>
      </div>
      <div className="row">
        <div>
          <label>Year</label>
          <input
            className="input"
            type="number"
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
          />
          {errors.year && (
            <small style={{ color: "#b91c1c" }}>{errors.year}</small>
          )}
        </div>
        <div>
          <label>Price</label>
          <input
            className="input"
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
          />
          {errors.price && (
            <small style={{ color: "#b91c1c" }}>{errors.price}</small>
          )}
        </div>
      </div>
      <div className="row">
        <div>
          <label>Status</label>
          <select
            className="input"
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="BORROWED">BORROWED</option>
          </select>
          {errors.status && (
            <small style={{ color: "#b91c1c" }}>{errors.status}</small>
          )}
        </div>
      </div>
      <button disabled={submitting} className="btn primary" type="submit">
        {submitting ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
