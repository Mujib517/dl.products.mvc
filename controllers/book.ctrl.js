const bookSvc = require('../services/book.svc');

class BookCtrl {

  async get(req, res) {
    try {

      const books = await bookSvc.get();
      res.status(200);
      res.locals.books = books;
      res.render("books");
    }
    catch (err) {
      //log
      console.log(err);
      res.render("error");
    }
  }

  new(req, res) {
    res.render("new-book"); //new-book.hbs
  }

  async save(req, res) {
    try {
      //req.body.inStock = req.body.inStock ? true : false;
      req.body.inStock = !!req.body.inStock;
      await bookSvc.save(req.body);
      res.redirect('/books'); //book
    }
    catch (err) {
      res.render("error");
    }
  }

  async delete(req, res) {
    try {
      await bookSvc.delete(req.params.id);
      res.redirect('/books');
    }
    catch (err) {
      res.render("error");
    }
  }

  async getById(req, res) {
    try {
      const book = await bookSvc.getById(req.params.id);
      res.render("book-detail", { book: book });
    }
    catch (err) {
      res.render("error");
    }
  }
}

module.exports = new BookCtrl()