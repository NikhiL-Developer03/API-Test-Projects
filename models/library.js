// In-memory array for books
let books = [];

function addBook(title, author) {
  const newBook = {
    id: books.length + 1,
    title,
    author,
    available: true
  };
  books.push(newBook);
  return newBook;
}

function getAllBooks() {
  return books;
}

function getAvailableBooks() {
  return books.filter(b => b.available);
}

function borrowBook(id) {
  id = parseInt(id);
  const book = books.find(b => b.id === id);
  
  if (!book) {
    return { error: 'Book not found' };
  }
  
  if (!book.available) {
    return { error: 'Book already borrowed' };
  }
  
  book.available = false;
  return book;
}

function returnBook(id) {
  id = parseInt(id);
  const book = books.find(b => b.id === id);
  
  if (!book) {
    return { error: 'Book not found' };
  }
  
  book.available = true;
  return book;
}

module.exports = {
  addBook,
  getAllBooks,
  getAvailableBooks,
  borrowBook,
  returnBook
};