class Book {
  constructor() {
    this.name = "";
    this.author = "";
    this.year = new Date().getFullYear();
    this.summary = "";
    this.cover = "";
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
  addBookCover() {
    return this.cover;
  }
}

function addBook() {
  const bookName = document.getElementById("book_name").value;
  const bookAuthor = document.getElementById("author").value;
  const bookYear = document.getElementById("year").value;
  const bookSummary = document.getElementById("summary").value;
  const bookCover = document.getElementById("cover").value;

  let book = new Book();
  book.name = bookName;
  book.author = bookAuthor;
  book.year = bookYear;
  book.summary = bookSummary;
  book.cover = bookCover;

  //   localStorage.setItem(book.name, bookName);
  localStorage.setItem(book.name, JSON.stringify(book));
  // console.log(localStorage.getItem(book));
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
  const booksContainer = document.getElementById("booksContainer");
  let rows = booksContainer.getElementsByClassName("row");
  let lastRow = rows[rows.length - 1];

  if (!lastRow || lastRow.children.length >= 4) {
    lastRow = document.createElement("div");
    lastRow.className = "row mt-1";
    booksContainer.appendChild(lastRow);
  }

  const bookColDiv = document.createElement("div");
  bookColDiv.className = "col-12 col-md-6 col-lg-3 mb-2 ";
  const bookDiv = document.createElement("div");
  const topDiv = document.createElement("div");
  const bottomDiv = document.createElement("div");
  bookDiv.className = "card border-0 equal-div h-100 m-1 shadow-sm ";
  topDiv.className = "top-div";
  topDiv.style.backgroundImage = `url('${book.cover}')`;
  topDiv.style.backgroundSize = "cover";
  topDiv.style.backgroundPosition = "center";
  topDiv.style.backgroundRepeat = "no-repeat";

  topDiv.innerHTML = `
  <div style="height: 23rem;">
        <i class="fas fa-arrows-alt float-end text-success bg-light rounded-5 m-2" style="font-size: 20px"></i>

                    </div>
                
  `;
  bottomDiv.innerHTML = `
  <div class="card-body d-flex flex-column justify-content-center align-items-center ">
  
                    <h5 class="card-title">${book.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">by ${book.author} (${book.year})</h6>
                    <p class="card-text d-none">${book.summary}</p>
                  
                </div>
  
  `;
  bookColDiv.appendChild(bookDiv);
  bookDiv.appendChild(topDiv);
  bookDiv.appendChild(bottomDiv);

  document.getElementById("booksContainer").appendChild(bookColDiv);
  lastRow.appendChild(bookColDiv);

  bookDiv.addEventListener("mouseover", () => {
    bottomDiv.querySelector(".card-text").classList.remove("d-none");
  });

  bookDiv.addEventListener("mouseout", () => {
    bottomDiv.querySelector(".card-text").classList.add("d-none");
  });
}

function loadBooks() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const bookData = localStorage.getItem(key);
    // const book = JSON.parse(bookData);
    try {
      const book = JSON.parse(bookData);
      if (
        book &&
        book.name &&
        book.author &&
        book.year &&
        book.summary &&
        book.cover
      ) {
        displayBook(book);
      } else {
        console.warn(`Invalid book data for key "${key}":`, book);
      }

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
