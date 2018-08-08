const Book = require("../models/book.model");

class BookService {

  get() {
    return Book.find({}, { __v: 0 }).exec();
  }

}


module.exports = new BookService()