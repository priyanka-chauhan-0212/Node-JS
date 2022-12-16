-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2022 at 01:46 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `surveypage`
--

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------


--
-- Table structure for table `usersnew`
--

CREATE TABLE `usersnew` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role` int(11) NOT NULL DEFAULT 1 COMMENT '1 = Super Admin, 2 = Subscriber',
  `name` varchar(191) NOT NULL,
  `first_name` varchar(250) DEFAULT NULL,
  `last_name` varchar(250) DEFAULT NULL,
  `username` varchar(250) NOT NULL,
  `layoutDetail` longtext DEFAULT NULL,
  `sheetID` varchar(255) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `mobile_no` bigint(20) DEFAULT NULL,
  `profile_pic` varchar(250) DEFAULT NULL,
  `brand_logo` varchar(250) DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `password_resets_token` varchar(10) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usersnew`
--

INSERT INTO `usersnew` (`id`, `role`, `name`, `first_name`, `last_name`, `username`, `layoutDetail`, `sheetID`, `email`, `email_verified_at`, `mobile_no`, `profile_pic`, `brand_logo`, `password`, `remember_token`, `password_resets_token`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Ewani Jariwala', 'Ewani', 'Jariwala', 'Ewani123', '{\"lg\":[{\"w\":2,\"h\":1,\"x\":0,\"y\":0,\"i\":\"1\",\"minW\":2,\"moved\":false,\"static\":false},{\"w\":2,\"h\":1,\"x\":5,\"y\":0,\"i\":\"2\",\"minW\":2,\"moved\":false,\"static\":false},{\"w\":3,\"h\":2,\"x\":2,\"y\":0,\"i\":\"3\",\"minW\":2,\"minH\":2,\"moved\":false,\"static\":false},{\"w\":3,\"h\":2,\"x\":5,\"y\":1,\"i\":\"4\",\"minW\":2,\"minH\":2,\"moved\":false,\"static\":false},{\"w\":7,\"h\":3,\"x\":0,\"y\":3,\"i\":\"5\",\"minW\":4,\"minH\":2.4,\"moved\":false,\"static\":false},{\"w\":4,\"h\":2,\"x\":8,\"y\":0,\"i\":\"6\",\"minW\":4,\"minH\":2,\"moved\":false,\"static\":false},{\"w\":5,\"h\":3,\"x\":7,\"y\":3,\"i\":\"7\",\"minW\":2,\"minH\":2.5,\"moved\":false,\"static\":false}]}', '1eaSB-wDVxkDuHBbfPIcAz1b-z2XLeTuu', 'ewani.v2web@gmail.com', NULL, 9685968596, '1654081944264avatar-s-11.1d46cc62.png', '1666004944185fieldLogo.png', '$2a$10$Nz9D0VH3Ggg2G6raDYQ0bu9cbO5rYPdts5f3YK4/3YtKPhnhqGDDq', NULL, NULL, '2022-06-06 09:24:04', '2022-10-17 11:09:04'),
(2, 2, 'bhavik gevariya', 'bhavik', 'gevariya', 'bhavik20', NULL, NULL, 'bhavik.v2web@gmail.com', NULL, 9685968596, '1662542175868esparza_logo.png', '1662542175869esparza_logo.png', '$2a$10$/bSKvQINZaLmTJkZKeCDjuEY8mygfMzH0RzAYkQOkjsXZhn.Dq9kS', NULL, NULL, '2022-09-07 09:10:56', '2022-09-07 09:16:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `password_resets_email_index` (`email`) USING BTREE;


--
-- Indexes for table `usersnew`
--
ALTER TABLE `usersnew`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


--
-- AUTO_INCREMENT for table `usersnew`
--
ALTER TABLE `usersnew`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
