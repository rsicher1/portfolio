const Book = require('../models/book');

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    res.json(books);
  } catch (err) {
    res.status(422).send(err);
  }
};

const createBook = async (req, res) => {
  try {
    const bookData = req.body;

    const book = new Book(bookData);

    await book.save();

    res.status(201).json(book);
  } catch (err) {
    res.status(422).send(err);
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookData = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }

    book.set(bookData);

    await book.save();

    res.status(201).json(book);
  } catch (err) {
    res.status(422).send(err);
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }

    await book.remove();

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(422).send(err);
  }
};

module.exports = { getBooks, createBook, updateBook, deleteBook };
