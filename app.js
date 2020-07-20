//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;

}



//UI Constructor
function UI() { }

//add book to list
UI.prototype.addBookToList = function (book) {


    const list = document.getElementById('book-list');

    //Create tr Element
    const row = document.createElement('tr');

    //insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
    `;
    list.append(row);
}
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}


//Add Book In Local Storage

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;

    }
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function (book) {
            const ui = new UI;
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))

    }

    static removeBooks(isbn) {

        const books = Store.getBooks();

        books.forEach(function (book) {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books))
    }
}

//DISPLAY LS USE IN displayBooks
//Dom Load Event Use for Display the Book List 
document.addEventListener('DOMContentLoaded', Store.displayBooks);


//delete book-list
UI.prototype.deletebook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();

    }

}

//Event Listener
document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    console.log(title, author, isbn);

    const book = new Book(title, author, isbn)
    console.log(book);
    //Instantiate UI
    const ui = new UI();

    //Validation
    if (title === '' || author === '' || isbn === '') {

        //alert
        alert('failed')

    } else {

        //add book  to list
        ui.addBookToList(book);

        //Add To Local Storage
        Store.addBook(book)

        //Clear fields
        ui.clearFields();

    }
    e.preventDefault();
});

//delete books

document.getElementById('book-list').addEventListener('click', function (e) {

    //Instantiate UI
    const ui = new UI();
    
    // if (window.confirm('Really u want to delete')) {

        //Delete Book
        ui.deletebook(e.target);

        //Remove From LS
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // }
    e.preventDefault();

})




























