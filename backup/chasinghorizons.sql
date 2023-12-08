-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2023 at 08:33 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chasinghorizons`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `bookingId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `vehicleId` int(11) DEFAULT NULL,
  `pickupLocation` varchar(255) NOT NULL,
  `pickupDate` date NOT NULL,
  `dropoffLocation` varchar(255) NOT NULL,
  `dropoffDate` date NOT NULL,
  `additionalRequests` text DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`bookingId`, `startDate`, `endDate`, `vehicleId`, `pickupLocation`, `pickupDate`, `dropoffLocation`, `dropoffDate`, `additionalRequests`, `userId`) VALUES
(1, '2023-12-10', '2023-12-15', 1, 'Pickup Location', '2023-12-10', 'Dropoff Location', '2023-12-15', 'Additional requests or comments', 1);

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `DriverID` int(11) NOT NULL,
  `FullName` varchar(255) NOT NULL,
  `LicenseNumber` varchar(20) NOT NULL,
  `LicenseExpiryDate` date NOT NULL,
  `ContactNumber` varchar(15) DEFAULT NULL,
  `EmailAddress` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Nationality` varchar(50) DEFAULT NULL,
  `LicenseIssueDate` date DEFAULT NULL,
  `ActiveStatus` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`DriverID`, `FullName`, `LicenseNumber`, `LicenseExpiryDate`, `ContactNumber`, `EmailAddress`, `Address`, `DateOfBirth`, `Nationality`, `LicenseIssueDate`, `ActiveStatus`) VALUES
(1, 'John Doe', 'ABC123', '2023-12-31', '555-1234', 'john.doe@email.com', '123 Main St, Cityville', '1990-05-15', 'US', '2010-01-01', 1),
(2, 'Jane Smith', 'XYZ789', '2022-11-30', '555-5678', 'jane.smith@email.com', '456 Oak St, Townsville', '1985-08-22', 'UK', '2008-03-15', 0),
(3, 'Bob Johnson', 'DEF456', '2024-06-30', '555-9876', 'bob.johnson@email.com', '789 Pine St, Villagetown', '1982-12-10', 'CA', '2005-07-20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `paymentId` int(11) NOT NULL,
  `bookingId` int(11) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paymentDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `paymentMethod` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`paymentId`, `bookingId`, `amount`, `paymentDate`, `paymentMethod`, `status`, `userId`) VALUES
(1, 1, 150.00, '2023-12-15 04:30:00', 'Credit Card', 'Completed', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contactNumber` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `contactNumber`) VALUES
(1, 'John Doe', 'john.doe@example.com', '$2b$10$4V96obZUZzN1fCCAALf2KupIY41xJ8o4sQ8F1mQ3Qc6RRlVSpBL36', '12345678901'),
(17, 'Adriane', 'miguel.lotics@gmail.com', '$2b$10$vAE0V992PHsvmjXTMz3oh.OIM0TyjvZ27db15ybggsCFf4lhJrFFO', '09275792394'),
(19, 'Miguel', 'lotics.miguel@gmail.com', '$2b$10$deiHLIKco6K4Jj.Tohc5M.bPtoEZJ0A83iqLrWoOUH959sk5/NbRC', '09762004784');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE `vehicle` (
  `Vehicle_id` int(11) NOT NULL,
  `Vehicle_name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `Vehicle_model_year` int(11) NOT NULL,
  `Vehicle_brand` varchar(50) NOT NULL,
  `color` varchar(30) NOT NULL,
  `capacity` int(11) NOT NULL,
  `plate_number` varchar(20) NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`Vehicle_id`, `Vehicle_name`, `description`, `Vehicle_model_year`, `Vehicle_brand`, `color`, `capacity`, `plate_number`, `rate`, `image_path`) VALUES
(1, 'Toyota Camry', 'Sedan with advanced features', 2022, 'Toyota', 'Blue', 5, 'ABC123', 45.99, '/public/1.jpg'),
(2, 'Honda Civic', 'Compact car for city driving', 2023, 'Honda', 'Red', 4, 'XYZ789', 39.99, '/public/2.jpg'),
(3, 'Ford Mustang', 'Sports car with powerful performance', 2021, 'Ford', 'Yellow', 2, 'PQR456', 89.99, '/public/3.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`bookingId`),
  ADD KEY `vehicleId` (`vehicleId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`DriverID`),
  ADD UNIQUE KEY `LicenseNumber` (`LicenseNumber`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`paymentId`),
  ADD KEY `bookingId` (`bookingId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`Vehicle_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `bookingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `paymentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `Vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle` (`Vehicle_id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`bookingId`),
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
