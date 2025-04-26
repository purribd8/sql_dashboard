const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

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
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);  // Sends back the sales data as JSON
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});