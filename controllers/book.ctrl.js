const bookSvc = require('../services/book.svc');

class BookCtrl {

  async get(req, res) {
    try {

      const books = await bookSvc.get();
      res.status(200);
      res.render("books", { loading: true, books: books });
    }
    catch (err) {
      //log
      console.log(err);
      res.render("books");
    }
  }
}

module.exports = new BookCtrl()