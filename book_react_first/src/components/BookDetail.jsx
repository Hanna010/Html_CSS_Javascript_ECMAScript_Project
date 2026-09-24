/* ---------------------------------------------------------
   상세 보기 — alert을 컴포넌트로
   book_ecma의 ui/bookDetail.js(formatBookDetail)는 여러 줄
   문자열을 만들었지만, React는 화면에 낼 것이 문자열이 아니라
   JSX라서 그대로 옮기지 못하고 다시 씁니다.

   book이 null이면 null을 돌려주어 화면에서 사라진다 —
   MessageBox와 같은 패턴이다.
   --------------------------------------------------------- */

function BookDetail({ book, onClose }) {
  if (!book) return null;

  const detail = book.bookDetail;

  return (
    <div className="detail-overlay" onClick={onClose}>
      {/* 카드 안쪽 클릭은 닫히지 않도록 이벤트가 위로 안 올라가게 막는다 */}
      <div className="detail-card" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="detail-close-btn" onClick={onClose}>
          닫기
        </button>

        <h2>{book.title}</h2>
        <p>저자: {book.author}</p>
        <p>ISBN: {book.isbn}</p>
        <p>가격: {book.price != null ? `₩${book.price.toLocaleString()}` : "-"}</p>
        <p>출판일: {book.publishDate ?? "-"}</p>
        <p>언어: {detail?.language ?? "-"}</p>
        <p>출판사: {detail?.publisher ?? "-"}</p>
        <p>에디션: {detail?.edition ?? "-"}</p>
        <p>페이지 수: {detail?.pageCount ?? "-"}</p>
        <p>설명: {detail?.description ?? "-"}</p>

        {detail?.coverImageUrl && (
          <img src={detail.coverImageUrl} alt={`${book.title} 표지`} className="detail-cover" />
        )}
      </div>
    </div>
  );
}

export default BookDetail;