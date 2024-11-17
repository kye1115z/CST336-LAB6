import express, { query } from "express";
import mysql from "mysql2/promise";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

const pool = mysql.createPool({
  host: "3.133.12.47",
  user: "yeeun",
  // password: "Cst-336",
  database: "quote_app",
  connectionLimit: 10,
  waitForConnections: true,
});
const conn = await pool.getConnection();

//routes
// coming soon
app.get("/allAuthors", async (req, res) => {
  res.render("comingsoon");
});
app.get("/addAuthor", async (req, res) => {
  res.render("comingsoon");
});
app.get("/newQuote", async (req, res) => {
  res.render("comingsoon");
});

// home
app.get("/", async (req, res) => {
  res.render("home");
});

// api
app.get("/api/author/:authorId", async (req, res) => {
  let authorId = req.params.authorId;
  let sql = `SELECT * FROM authors WHERE authorId = ?`;
  let sqlParams = [authorId];
  const [rows] = await conn.query(sql, sqlParams);
  console.log(rows);
  res.send(rows);
});

// Search Quotes Page
app.get("/searchQuotes", async (req, res) => {
  let author_sql = `SELECT authorId, firstName, lastName, authorId FROM authors ORDER BY lastName`;
  let category_sql = `SELECT DISTINCT(category) FROM quotes`;
  const [author_rows] = await conn.query(author_sql);
  const [categroy_rows] = await conn.query(category_sql);
  res.render("searchQuotes", { authors: author_rows, category: categroy_rows });
});

app.get("/allQuotes", async (req, res) => {
  let sql =
    "SELECT `authorId`,`firstName`, `lastName`, `quote` FROM `quotes` NATURAL JOIN authors WHERE 1";
  const [rows] = await conn.query(sql);
  res.render("quotes", { rows: rows });
});

// Search Filters
app.get("/searchByKeyword", async (req, res) => {
  let keyword = req.query.keyword;
  let sql =
    "SELECT `authorId`, `firstName`, `lastName`, `quote` FROM `quotes` NATURAL JOIN authors WHERE quote LIKE ?";
  let sqlParams = [`%${keyword}%`];
  const [rows] = await conn.query(sql, sqlParams);
  res.render("quotes", { rows: rows });
});

app.get("/searchByAuthor", async (req, res) => {
  let author = req.query.author;
  let sql =
    "SELECT `authorId`, `firstName`, `lastName`, `quote` FROM `quotes` NATURAL JOIN authors WHERE authorId = ?";
  let sqlParams = [author];
  const [rows] = await conn.query(sql, sqlParams);

  res.render("quotes", { rows: rows });
});

app.get("/searchByCategory", async (req, res) => {
  let category = req.query.category;
  let sql = `
      SELECT authorId, authors.firstName, authors.lastName, quotes.quote 
      FROM quotes 
      NATURAL JOIN authors 
      WHERE category = ?`;
  let sqlParams = [category];
  const [rows] = await conn.query(sql, sqlParams);
  res.render("quotes", { rows: rows });
});

app.get("/searchByLikes", async (req, res) => {
  let min = req.query.min;
  let max = req.query.max;
  let sql = `
      SELECT authorId, authors.firstName, authors.lastName, quotes.quote 
      FROM quotes 
      NATURAL JOIN authors 
      WHERE quotes.likes >= ? AND quotes.likes <= ?`;
  let sqlParams = [min, max];
  const [rows] = await conn.query(sql, sqlParams);
  res.render("quotes", { rows: rows });
});

app.get("/dbTest", async (req, res) => {
  let sql = "SELECT CURDATE()";
  const [rows] = await conn.query(sql);
  res.send(rows);
}); //dbTest

app.listen(10040, () => {
  console.log("Express server running");
});
