const db = require('../routers/connection');

function products (req, res) {
  let sql = `SELECT * FROM products`;
  let products = db.query(sql, (err, result) => {
    res.send(result);
  });
}

module.exports.products = products;