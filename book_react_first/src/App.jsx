import { useEffect, useState } from "react";
import "./style.css";
import { fetchBooks } from "./api/bookApi";
import BookTable from "./components/BookTable";

function App() {
  const [books, setbooks] = useState([]);          // 표에 그릴 도서 목록
  const [form, setForm] = useState({});          // 입력칸 11 개의 값
  const [editingId, setEditingId] = useState(null);      // null 이면 등록 모드
  const [loading, setLoading] = useState(false);         // "로딩 중..." 을 보일까
  const [listError, setListError] = useState(null);      // 표 자리에 낼 오류 문구
  // 메시지는 { text: "문구", type: "error" 또는 "success" } 모양으로 담는다.
  const [message, setMessage] = useState(null);          //성공,오류 메시지
  const [detailBook, setDetailBook] = useState(null); //상세 보기로 고른 도서 null 이면 안그린다.

  <h1>도서 관리 시스템</h1>


  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    setLoading(true);
    setListError(null);

    try {
      const books = await fetchBooks();  // bookApi.js — 그대로
      console.log("도서 목록:", books); // 이 줄이 있어야 함
      setbooks(books);        // ② renderBookTable(books) → setBooks(books)
    } catch (error) {
      setListError(error.message);  // ③ renderTableError() → setListError(문구)
    } finally {
      setLoading(false);
    }
  }

  // 과제 9·10에서 실제로 채울 자리 — 지금은 빈 함수로 오류만 막아둔다
  function handleEdit() {}
  function handleDelete() {}
  function handleDetail() {}

  return (
    <>
      <h1>도서 관리 시스템</h1>

      <BookTable
        books={books}
        loading={loading}
        error={listError}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={handleDetail}
      />
    </>
  );

}

export default App;