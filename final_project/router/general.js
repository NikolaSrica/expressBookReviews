const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    // Retrieve the email parameter from the request URL and send the corresponding friend's details
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const booksByAuthor = [];

    // Iterate through the books object
    for (let key in books) {
        if (books[key].author === author) {
            booksByAuthor.push(books[key]);
        }
    }

    if (booksByAuthor.length > 0) {
        res.json(booksByAuthor);
    } else {
        res.status(404).send('No books found by this author');
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const booksByTitle = [];

    // Iterate through the books object
    for (let key in books) {
        if (books[key].title === title) {
            booksByTitle.push(books[key]);
        }
    }

    if (booksByTitle.length > 0) {
        res.json(booksByTitle);
    } else {
        res.status(404).send('No books found by this title');
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    // Retrieve the email parameter from the request URL and send the corresponding friend's details
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
        const reviews = book.reviews;
        res.json(reviews);
    } else {
        res.status(404).send('Book not found');
    }
});

public_users.delete('/isbn/:isbn',function (req, res) {
    const bookId = req.params.isbn;

    // Check if the book exists
    if (books[bookId]) {
        delete books[bookId];
        res.status(200).send('Book deleted successfully');
    } else {
        res.status(404).send('Book not found');
    }
});


module.exports.general = public_users;
