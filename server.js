const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public')); // Serve static files from 'public' folder

// Create connection to your MySQL DB
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        
  password: 'Family#1',        
  database: 'business' 
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// API route to get sales data by product
app.get('/api/sales-by-product', (req, res) => {
  const query = `
    SELECT product_name, SUM(sale_amount) AS total_sales
    FROM sales
    GROUP BY product_name 
    ORDER BY total_sales DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(results);
  });
});

// API route to get sales data by region
app.get('/api/sales-by-region', (req, res) => {
  const query = `
    SELECT region, SUM(sale_amount) AS total_sales
    FROM sales
    GROUP BY region 
    ORDER BY total_sales DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(results);
  });
});

// API route to get sales data by month
app.get('/api/sales-by-month', (req, res) => {
  const query = `
    SELECT DATE_FORMAT(sale_date, '%M') AS sale_month, SUM(sale_amount) AS total_sales
    FROM sales
    GROUP BY sale_month
    ORDER BY total_sales ASC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});