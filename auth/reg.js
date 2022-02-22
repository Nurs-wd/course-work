const db = require('../routers/connection');

function register(req, res) {
  let sql = `INSERT INTO clients(username, email, password, name, surname) VALUES ('${req.body.username}', '${req.body.email}', '${req.body.password}', '${req.body.name}', '${req.body.surname}')`
  console.log(sql)
  db.query(sql, (err) => {
    if(err) throw err
  })
  
    session=req.session;
    session.username = req.body.username;
    session.email=req.body.email;
    session.password=req.body.password;
    console.log(req.session)
  
  res.redirect('/login')
} 
module.exports = register;