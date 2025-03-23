const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}


const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
  // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});


// Register a new user
regd_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

regd_users.get('/profile', (req, res) => {
    const username = req.session.authorization?.username;

    if (username) {
        res.send(`Welcome to your profile, ${username}!`);
    } else {
        res.status(401).send('User not logged in');
    }
});



// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

     const bookId = req.params.isbn;
     const review = req.body.review;
     const reviewer = req.session.authorization?.username;
    // Check if the book exists
    if (books[bookId]) {
        let reviewUpdated = false;

        // Check if the reviewer already has a review
        for (let reviewId in books[bookId].reviews) {
            if (books[bookId].reviews[reviewId].reviewer === reviewer) {
                // Update the existing review
                books[bookId].reviews[reviewId].review = review;
                reviewUpdated = true;
                break;
            }
        }

        if (!reviewUpdated) {
            // Add a new review if no existing review by the same reviewer
            const reviewIds = Object.keys(books[bookId].reviews).map(Number);
            const newReviewId = reviewIds.length > 0 ? Math.max(...reviewIds) + 1 : 1;
            books[bookId].reviews[newReviewId] = { reviewer, review };
        }

        res.status(201).send('Review processed successfully');
    } else {
        res.status(404).send('Book not found');
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
