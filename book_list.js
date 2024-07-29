class Book {
  constructor() {
    this.name = "";
    this.author = "";
    this.year = new Date().getFullYear();
    this.summary = "";
  }
  addBookName() {
    return this.name;
  }
  addBookAuthor() {
    return this.author;
  }
  addBookYear() {
    return this.year;
  }
  addBookSummary() {
    return this.summary;
  }
}

function addBook() {
  const bookName = document.getElementById("book_name").value;
  const bookAuthor = document.getElementById("author").value;
  const bookYear = document.getElementById("year").value;
  const bookSummary = document.getElementById("summary").value;

  let book = new Book();
  book.name = bookName;
  book.author = bookAuthor;
  book.year = bookYear;
  book.summary = bookSummary;

  //   localStorage.setItem(book.name, bookName);
  localStorage.setItem(book.name, JSON.stringify(book));
  console.log(localStorage.getItem(book));
  displayBook(book);

  console.log(
    `this book name is ${bookName} and it was written by ${bookAuthor} in the year ${bookYear}.`
  );

  // Clear the form fields after adding the book
  document.getElementById("bookForm").reset();

  return book;
}

// Function to display the books

function displayBook(book) {
  const bookColDiv = document.createElement("div");
  bookColDiv.className = "col-12 col-md-6 col-lg-3 mb-3 ";
  const bookDiv = document.createElement("div");
  bookDiv.className = "card border-0 equal-div h-75 m-1 shadow-sm";
  bookDiv.innerHTML = `
  <div class="card-body d-flex flex-column justify-content-center align-items-center">
                    <h5 class="card-title">${book.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">by ${book.author} (${book.year})</h6>
                    <p class="card-text">${book.summary}</p>
                </div>
  
  `;
  bookColDiv.appendChild(bookDiv);

  document.getElementById("booksContainer").appendChild(bookColDiv);
}

function loadBooks() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const bookData = localStorage.getItem(key);
    // const book = JSON.parse(bookData);
    try {
      const book = JSON.parse(bookData);

      // Display each book
      displayBook(book);
    } catch (e) {
      console.error(`Error parsing JSON for key "${key}":`, e);
      // Optionally, remove the invalid entry from local storage
      localStorage.removeItem(key);
    }

    // displayBook(book);
  }
}
// Prevent the form from submitting and refreshing the page
document
  .getElementById("bookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

window.onload = loadBooks;
