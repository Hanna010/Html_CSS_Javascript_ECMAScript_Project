/* ---------------------------------------------------------
   메시지 한 줄 — book_ecma의 ui/message.js를 대신한다
   book_ecma에서는 showError()가 formError 요소를 찾아 textContent와
   style을 직접 바꿨습니다.

   React에서는 "무엇을 보여줄지"만 넘겨받아 그립니다.
   보여줄 것이 없으면 아무것도 그리지 않으므로
   화면을 지우는 clearMessages()가 따로 필요 없습니다.
   --------------------------------------------------------- */

// 메시지 종류별 글자색 — book_ecma의 COLORS와 같다.
const COLORS = {
    error: "#dc3545",
    success: "#28a745",
};

/* 컴포넌트는 화면 한 조각을 돌려주는 함수다.
   중괄호 안의 message는 부모(App)가 넘겨준 값이고, 이것을 props라고 한다.
   부모가 <MessageBox message={...} /> 라고 쓰면 여기로 들어온다. */
function MessageBox({ message }) {
    // null을 돌려주면 아무것도 그리지 않는다.
    // book_ecma처럼 display: none으로 숨길 필요가 없다.
    if (!message) {
        return null;
    }

    // style에는 문자열이 아니라 객체를 넘긴다. 그래서 중괄호가 두 겹이다.
    const textStyle = { color: COLORS[message.type] ?? COLORS.error };

    return (
        <span className="error-message" style={textStyle}>
            {message.text}
        </span>
    );
}

export default MessageBox;