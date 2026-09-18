// import.meta.env 는 Vite 가 .env 파일의 값을 넣어 주는 자리다.
//   ?.  왼쪽이 없으면(undefined) 멈추고 undefined 를 돌려준다.
//   ??  왼쪽이 null 이나 undefined 일 때만 오른쪽 값을 쓴다.
export const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? "http://localhost:8080";
 
// 학생 API 의 경로. axios 가 baseURL 뒤에 이어 붙인다.
export const STUDENTS_PATH = "/api/students";
