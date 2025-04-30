// Import required modules
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Create an instance of Express
const app = express();

// Middleware to allow Cross-Origin Resource Sharing (CORS) to make API calls from different origins
app.use(cors());

// Serve static files (such as HTML, CSS, JavaScript) from the 'public' folder
app.use(express.static('public'));

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',       // MySQL server address
  user: 'root',            // MySQL username
  password: 'Family#1',    // MySQL password
  database: 'business'    // The name of the database to connect to
});

// Connect to the MySQL database and log a success message if the connection is successful
db.connect(err => {
  if (err) throw err;  // Throw an error if the connection fails
  console.log('Connected to MySQL database.');  // Log a success message if connected successfully
});

// API route to get sales data by product
app.get('/api/sales-by-product', (req, res) => {
  // SQL query to get the total sales by product
  const query = `
    SELECT product_name, SUM(sale_amount) AS total_sales
    FROM sales
    GROUP BY product_name 
    ORDER BY total_sales DESC
  `;
  
  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);  // Log any error that occurs during the query
      res.status(500).json({ error: 'Database error' });  // Respond with a 500 error if there's a database error
      return;
    }
    res.json(results);  // Send the query results back as a JSON response
  });
});

// API route to get sales data by region
app.get('/api/sales-by-region', (req, res) => {
  // SQL query to get the total sales by region
  const query = `
    SELECT region, SUM(sale_amount) AS total_sales
    FROM sales
    GROUP BY region 
    ORDER BY total_sales DESC
  `;
  
  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);  // Log any error that occurs during the query
      res.status(500).json({ error: 'Database error' });  // Respond with a 500 error if there's a database error
      return;
    }
    res.json(results);  // Send the query results back as a JSON response
  });
});

// API route to get sales data by month
app.get('/api/sales-by-month', (req, res) => {
  // SQL query to get the total sales by month, formatted by month name
  const query = `
    SELECT DATE_FORMAT(sale_date, '%M') AS sale_month, SUM(sale_amount) AS total_sales
    FROM sales
    GROUP BY sale_month
    ORDER BY total_sales ASC
  `;
  
  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);  // Log any error that occurs during the query
      res.status(500).json({ error: 'Database error' });  // Respond with a 500 error if there's a database error
      return;
    }
    res.json(results);  // Send the query results back as a JSON response
  });
});

// Start the Express server and listen on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');  // Log message when the server starts
});