const Book = require("../models/book.model");

class BookService {

  get() {
    return Book.find({}, { __v: 0 }).sort('-lastUpdated').exec();
  }

  save(data) {
    var book = new Book(data);
    return book.save();
  }

  delete(id) {
    return Book.findByIdAndRemove(id).exec();
  }

}


module.exports = new BookService()