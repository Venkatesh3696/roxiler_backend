const db = require("../config/database");

// GET transactions
const getAllTransactions = async (req, res) => {
  console.log("db===>>>", db);
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);

  var total = 0;
  await db.get("SELECT COUNT(*) AS total FROM transactions", (error, rows) => {
    if (error) {
      console.log("error getting count", error);
    } else {
      console.log("rows", rows);
      total = rows.total;
    }
  });
  const offset = (page - 1) * limit;

  const getAllTransactionsQuery = `SELECT * FROM transactions LIMIT ${limit} OFFSET ${offset}`;
  //   const getAllTransactionsQuery = "SELECT * FROM transactions ;";

  const lastPage = Math.ceil(total.total / limit);

  const result = await db.all(getAllTransactionsQuery, (err, rows) => {
    if (err) {
      console.log("err", err);
    } else {
      const data = rows;
      res.send({
        total: total.total,
        current_page: page,
        per_page: limit,
        last_page: lastPage,
        data,
      });
    }
  });
};

const getTransaction = () => {};
module.exports = { getAllTransactions, getTransaction };
