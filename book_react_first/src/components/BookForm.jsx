/* ---------------------------------------------------------
   도서 등록 · 수정 폼
   book_ecma까지는 폼이 index.html에 있었고, ui/bookForm.js가
   그 요소를 찾아 값을 읽고 쓰고 버튼 글자를 바꿨습니다.

   React에서는 폼이 이 파일 안에 있습니다. 그리고 입력칸의
   값은 DOM이 아니라 부모가 준 form 객체에서 옵니다.

     화면에 보이는 값 = props.form
     값이 바뀌면      = props.onChange로 부모에게 알린다

   이런 입력을 제어 컴포넌트(controlled component)라고 합니다.
   이 컴포넌트는 값을 저장하지 않습니다. 그리기만 합니다.
   --------------------------------------------------------- */

import MessageBox from "./MessageBox.jsx";

function BookForm({
    form,          // 화면에 보일 입력값 열한 개
    isEditing,     // 수정 모드인가
    message,       // 폼 아래 보여 줄 메시지
    onChange,      // 입력칸이 바뀔 때 부를 함수
    onSubmit,      // 제출할 때 부를 함수
    onCancel,      // 취소를 누를 때 부를 함수
    containerRef,  // 수정 시 이 위치로 스크롤하기 위한 참조
}) {
    // book_ecma의 setEditMode가 classList.toggle로 하던 일을 문자열로 표현한다.
    let containerClass = "form-container";
    if (isEditing) {
        containerClass = "form-container editing";
    }

    // 등록 모드와 수정 모드에서 글자만 달라진다.
    let actionLabel = "등록";
    if (isEditing) {
        actionLabel = "수정";
    }

    return (
        <div className={containerClass} ref={containerRef}>
            <h2>도서 {actionLabel}</h2>

            <form onSubmit={onSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="title">제목:</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            value={form.title}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author">저자:</label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            required
                            value={form.author}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="isbn">ISBN:</label>
                        <input
                            id="isbn"
                            name="isbn"
                            type="text"
                            required
                            value={form.isbn}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">가격:</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pageCount">페이지 수:</label>
                        <input
                            id="pageCount"
                            name="pageCount"
                            type="number"
                            value={form.pageCount}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="publishDate">출판일:</label>
                        <input
                            id="publishDate"
                            name="publishDate"
                            type="date"
                            value={form.publishDate}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="language">언어:</label>
                        <input
                            id="language"
                            name="language"
                            type="text"
                            value={form.language}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="publisher">출판사:</label>
                        <input
                            id="publisher"
                            name="publisher"
                            type="text"
                            value={form.publisher}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edition">에디션:</label>
                        <input
                            id="edition"
                            name="edition"
                            type="text"
                            value={form.edition}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="coverImageUrl">표지 이미지 URL:</label>
                        <input
                            id="coverImageUrl"
                            name="coverImageUrl"
                            type="url"
                            value={form.coverImageUrl}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">설명:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="button-group">
                    <button type="submit">도서 {actionLabel}</button>

                    {isEditing && (
                        <button type="button" className="cancel-btn" onClick={onCancel}>
                            취소
                        </button>
                    )}

                    <MessageBox message={message} />
                </div>
            </form>
        </div>
    );
}

export default BookForm;