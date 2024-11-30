const books = [];

function addBook() {
  const id = new Date().getTime();
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = parseInt(document.getElementById("inputBookYear").value);
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  const newBook = {
    id,
    title,
    author,
    year,
    isComplete,
  };

  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

function renderBooks() {
  const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
  const completeBookshelfList = document.getElementById("completeBookshelfList");

  incompleteBookshelfList.innerHTML = "";
  completeBookshelfList.innerHTML = "";

  books.forEach((book) => {
    const bookElement = createBookElement(book);
    if (book.isComplete) {
      completeBookshelfList.appendChild(bookElement);
    } else {
      incompleteBookshelfList.appendChild(bookElement);
    }
  });
}

function createBookElement(book) {
  const bookItemElement = document.createElement("article");
  bookItemElement.classList.add("book_item");

  const bookTitleElement = document.createElement("h3");
  bookTitleElement.innerText = book.title;

  const bookAuthorElement = document.createElement("p");
  bookAuthorElement.innerText = `Penulis: ${book.author}`;

  const bookYearElement = document.createElement("p");
  bookYearElement.innerText = `Tahun: ${book.year}`;

  const bookActionElement = document.createElement("div");
  bookActionElement.classList.add("action");

  const moveToCompleteButton = document.createElement("button");
  moveToCompleteButton.classList.add(book.isComplete ? "red" : "green");
  moveToCompleteButton.innerText = book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca";
  moveToCompleteButton.addEventListener("click", () => {
    book.isComplete = !book.isComplete;
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("red");
  deleteButton.innerText = "Hapus buku";
  deleteButton.addEventListener("click", () => {
    const filteredBooks = books.filter((b) => b.id !== book.id);
    books.length = 0;
    books.push(...filteredBooks);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
  });

  if (book.isComplete) {
    moveToCompleteButton.classList.remove("red");
    moveToCompleteButton.classList.add("green");
  }

  bookActionElement.appendChild(moveToCompleteButton);
  bookActionElement.appendChild(deleteButton);

  bookItemElement.appendChild(bookTitleElement);
  bookItemElement.appendChild(bookAuthorElement);
  bookItemElement.appendChild(bookYearElement);
  bookItemElement.appendChild(bookActionElement);

  return bookItemElement;
}

function searchBook() {
  const searchTitle = document.getElementById("searchBookTitle").value.toLowerCase();
  const searchResults = books.filter((book) => book.title.toLowerCase().includes(searchTitle));

  displaySearchResults(searchResults);
}

function displaySearchResults(results) {
  const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
  const completeBookshelfList = document.getElementById("completeBookshelfList");

  incompleteBookshelfList.innerHTML = "";
  completeBookshelfList.innerHTML = "";

  results.forEach((book) => {
    const bookElement = createBookElement(book);
    if (book.isComplete) {
      completeBookshelfList.appendChild(bookElement);
    } else {
      incompleteBookshelfList.appendChild(bookElement);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const booksData = localStorage.getItem("books");
  if (booksData) {
    books.push(...JSON.parse(booksData));
  }

  renderBooks();

  document.getElementById("inputBook").addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
  });

  document.getElementById("searchBook").addEventListener("submit", (event) => {
    event.preventDefault();
    searchBook();
  });
});
