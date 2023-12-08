  // server.js
  const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const mysql = require('mysql2/promise');
  const path = require('path');
  const userRoutes = require('./src/routes/user');
  const vehicleRoutes = require('./src/routes/vehicle');
  const app = express();
  const PORT = process.env.PORT || 8081;

  app.use(cors());
  app.use(bodyParser.json());

  // MySQL database connection configuration
  const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chasinghorizons',
  };

  const pool = mysql.createPool(dbConfig);

  app.use((req, res, next) => {
    req.db = pool;
    next();
  });

  // Serve static files from the "public" directory
  app.use('/public', express.static(path.join(__dirname, 'public')));  
  // Use userRoutes for /api/user routes
  app.use('/api/user', userRoutes);
  // Use vehicleRoutes for /api/vehicle routes
  app.use('/api/vehicle', vehicleRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
