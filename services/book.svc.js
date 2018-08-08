const Book = require("../models/book.model");

class BookService {

  get() {
    return Book.find({}, { __v: 0 }).sort('-lastUpdated').exec();
  }

  save(data) {
    var book = new Book(data);
    return book.save();
  }

}


module.exports = new BookService()