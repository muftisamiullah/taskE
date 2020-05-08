-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 08, 2020 at 11:34 AM
-- Server version: 5.7.30-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eResolute`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `is_approved` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `role`, `is_approved`, `created_at`, `updated_at`, `deleted_at`) VALUES
(10, 'zaffasr', 'mehraj', 'zaffarmehraj@gmail.com', '$2b$10$mdTFRGJ6an458IjQrFwopO50huIUVe2xH8P6H6JQMab5HZcXbm7um', 'user', 1, '2020-05-07 10:47:11', '2020-05-07 17:33:03', NULL),
(14, 'zaffar', 'mehraj', 'zaffra@gmail.com', '$2b$10$NewL6bQJ9YyFXL2yaVqE4.IsGXSdW33kvWXbQbIElAeaUsgWN2Fda', 'user', 1, '2020-05-07 11:07:28', '2020-05-07 11:07:28', NULL),
(15, 'sajid', 'Iqbal', 'sajid@gmail.com', '$2b$10$Qg0nDwc161nFc.DeMcdwK.AYax7O8FLEZo74kiZGP9YyOESuIfqxe', 'user', NULL, '2020-05-07 11:07:44', '2020-05-07 11:07:44', NULL),
(16, 'waseem', 'abdullah', 'muftiwaseem@gmail.com', '$2b$10$k8V2codO04DLxaeYQGJfVubGcVCQpqy5BdteEBi9./pnpLnCbItdW', 'admin', NULL, '2020-05-08 05:52:40', '2020-05-08 05:52:40', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
