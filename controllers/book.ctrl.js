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
}

module.exports = new BookCtrl()