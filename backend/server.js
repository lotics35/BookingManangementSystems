  // server.js
  const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const mysql = require('mysql2/promise');
  const path = require('path');
  const userRoutes = require('./src/routes/user');
  const vehicleRoutes = require('./src/routes/vehicle');
  const driverRoutes = require('./src/routes/driver');
  const bookingRoutes = require('./src/routes/booking')
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
    // Use driverRouter for /api/driver routes
  app.use('/api/driver', driverRoutes);
   //Use bookingRouter for /api/booking routes
  app.use('/api/booking', bookingRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
