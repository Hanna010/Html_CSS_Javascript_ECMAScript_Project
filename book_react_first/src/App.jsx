import { useEffect, useRef, useState } from "react";
import "./style.css";
import { fetchBooks, fetchBook, createBook, updateBook, deleteBook } from "./api/bookApi";
import { validateBook } from "./lib/validation";
import { EMPTY_FORM, toRequest, toFormValues } from "./lib/bookData";
import { APP_MODE } from "./config";
import BookTable from "./components/BookTable";
import BookForm from "./components/BookForm";
import BookDetail from "./components/BookDetail";

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState(null);
  const [message, setMessage] = useState(null);
  const [detailBook, setDetailBook] = useState(null);

  const formRef = useRef(null);

  const isEditing = editingId !== null;

  // 제목 옆 배지 — APP_MODE는 "TEST" 또는 "PROD" 문자열 그대로 온다
  const isProd = APP_MODE === "PROD";
  const modeClass = isProd ? "app-mode prod" : "app-mode";

  async function loadBooks() {
    setLoading(true);
    setListError(null);

    try {
      const books = await fetchBooks();
      setBooks(books);
    } catch (error) {
      setListError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    if (!message || message.type !== "success") return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
  }

  function handleCancel() {
    resetForm();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage(null);

    const bookData = toRequest(form);
    const errorText = validateBook(bookData);

    if (errorText) {
      setMessage({ text: errorText, type: "error" });
      return;
    }

    try {
      if (editingId === null) {
        await createBook(bookData);
        setMessage({ text: "등록되었습니다.", type: "success" });
      } else {
        await updateBook(editingId, bookData);
        setMessage({ text: "수정되었습니다.", type: "success" });
      }

      resetForm();
      await loadBooks();
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  }

  async function handleEdit(id) {
    try {
      const book = await fetchBook(id);
      setForm(toFormValues(book));
      setEditingId(id);
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  }

  async function handleDelete(id) {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteBook(id);
      setMessage({ text: "삭제되었습니다.", type: "success" });

      if (editingId === id) {
        resetForm();
      }

      await loadBooks();
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  }

  async function handleDetail(id) {
    try {
      const book = await fetchBook(id);
      setDetailBook(book);
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  }

  function handleCloseDetail() {
    setDetailBook(null);
  }

  return (
    <>
      <h1>
        도서 관리 시스템 <span className={modeClass}>{APP_MODE}</span>
      </h1>

      <BookForm
        form={form}
        isEditing={isEditing}
        message={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        containerRef={formRef}
      />

      <BookTable
        books={books}
        loading={loading}
        error={listError}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={handleDetail}
      />

      <BookDetail book={detailBook} onClose={handleCloseDetail} />
    </>
  );
}

export default App;