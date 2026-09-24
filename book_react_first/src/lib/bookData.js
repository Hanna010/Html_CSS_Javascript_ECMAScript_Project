export const EMPTY_FORM = {
  title: "", 
  author: "", 
  isbn: "", 
  price: "", 
  publishDate: "",
  language: "", 
  publisher: "", 
  edition: "", 
  coverImageUrl: "",
  pageCount: "", 
  description: ""
};

function toNumberOrNull(value) {
  if (value === "" || value == null) return null;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
}

export function toRequest(form) {
  return {
    title: form.title.trim(),
    author: form.author.trim(),
    isbn: form.isbn.trim(),
    price: toNumberOrNull(form.price),
    publishDate: form.publishDate || null,
    bookDetail: {
      description: form.description.trim() || null,
      language: form.language.trim() || null,
      pageCount: toNumberOrNull(form.pageCount),
      publisher: form.publisher.trim() || null,
      coverImageUrl: form.coverImageUrl.trim() || null,
      edition: form.edition.trim() || null,
    },
  };
}

export function toFormValues(book) {
  const detail = book.bookDetail;
  return {
    title: book.title ?? "",
    author: book.author ?? "",
    isbn: book.isbn ?? "",
    price: book.price ?? "",
    publishDate: book.publishDate ?? "",
    description: detail?.description ?? "",
    language: detail?.language ?? "",
    pageCount: detail?.pageCount ?? "",
    publisher: detail?.publisher ?? "",
    coverImageUrl: detail?.coverImageUrl ?? "",
    edition: detail?.edition ?? "",
  };
}