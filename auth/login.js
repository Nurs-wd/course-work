const db = require('../routers/connection');

async function login(req, response) {
  console.log(req.body);

  let login = req.body.username.trim();
  let password = req.body.password.trim();

  let sql = `SELECT * FROM clients WHERE username='${login}' AND password=${password};`;

  let loginInfo = db.query(sql, (err, res) => {
    var data;
    if (err || !res) {
      response.send(`
            <h1 style="text-align: center; margin-top:3em">User name or password was invalid. Try again!</h1>
            `);
    } else {
      req.session.username = req.body.username;
      req.session.password = req.body.password;
      data = res[0];
      console.log(data);
      async function getData(data) {
        if (data.user_name == login && data.password == password) {
          console.log('successful auth');
        }
        console.log(res[0], login, password);
      }
      getData(data);
      response.redirect('/client');
    }
  });
}
module.exports = login;
