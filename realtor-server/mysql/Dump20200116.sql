CREATE DATABASE  IF NOT EXISTS `realtor` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `realtor`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: realtor
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apartment_history`
--

DROP TABLE IF EXISTS `apartment_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `apartment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(15) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment_history`
--

LOCK TABLES `apartment_history` WRITE;
/*!40000 ALTER TABLE `apartment_history` DISABLE KEYS */;
INSERT INTO `apartment_history` VALUES (1,26,2,'pending',NULL,'2020-01-13 17:49:01'),(2,20,2,'pending','update made','2020-01-14 13:29:05'),(3,20,2,'pending','update made','2020-01-14 13:31:08'),(4,20,2,'pending','update made','2020-01-14 13:31:24'),(5,20,2,'pending','update made','2020-01-14 13:33:13'),(6,20,2,'pending','update made','2020-01-14 13:33:54'),(7,20,2,'pending','update made','2020-01-14 13:34:29'),(8,20,2,'pending','update made','2020-01-14 13:35:29'),(9,20,2,'pending','update made','2020-01-14 13:37:18'),(10,20,2,'pending','update made','2020-01-14 13:52:16'),(11,20,2,'pending','update made','2020-01-14 13:56:11');
/*!40000 ALTER TABLE `apartment_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartments`
--

DROP TABLE IF EXISTS `apartments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `address` varchar(500) NOT NULL,
  `city_id` int(11) unsigned NOT NULL,
  `price` int(11) NOT NULL,
  `number_of_room` int(4) unsigned DEFAULT NULL,
  `number_of_bath` int(4) unsigned DEFAULT NULL,
  `sqft` int(6) NOT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(500) DEFAULT NULL,
  `sale_status` enum('sale','rent','both') NOT NULL,
  `availability` enum('available','suspended','removed') NOT NULL,
  `property_type` enum('house','ranch','condo','land') NOT NULL,
  `main_image` text,
  `status` enum('pending','approved','denied','removed') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `fk_apartments_cities` (`city_id`),
  KEY `fk_apartments_users` (`user_id`),
  CONSTRAINT `fk_apartments_cities` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `fk_apartments_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartments`
--

LOCK TABLES `apartments` WRITE;
/*!40000 ALTER TABLE `apartments` DISABLE KEYS */;
INSERT INTO `apartments` VALUES (1,2,'1 Main st',1,200,NULL,NULL,430,'2020-01-08 15:20:45','first apartment','sale','available','house',NULL,'pending'),(2,4,'6 Main st',3,1000,NULL,NULL,500,'2020-01-08 15:28:38','empty lot perfect to build your dream home','sale','available','land',NULL,'pending'),(3,2,'10 Main st',4,1500,NULL,NULL,200,'2020-01-08 15:28:38','apartment on the beach','both','available','condo',NULL,'pending'),(4,3,'2 Main st',2,500,NULL,NULL,900,'2020-01-08 15:29:43',NULL,'rent','available','condo',NULL,'pending'),(5,3,'30 Kind George St',2,3000,3,2,1000,'2020-01-13 13:30:29',NULL,'rent','available','condo',NULL,'approved'),(6,2,'202 Court St',1,1500,2,1,850,'2020-01-13 15:47:12','lovely small apartment, perfect for a couple or two roomates','rent','available','condo',NULL,'pending'),(7,2,'62 3rd st',3,30000,4,3,2033,'2020-01-13 16:23:54','welcome to the windy city','sale','available','ranch',NULL,'pending'),(9,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:00:17','delete later','sale','available','ranch',NULL,'pending'),(10,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:18:14','delete later','sale','available','ranch',NULL,'pending'),(11,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:24:32','delete later','sale','available','ranch',NULL,'pending'),(12,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:25:40','delete later','sale','available','ranch',NULL,'pending'),(13,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:26:03','delete later','sale','available','ranch',NULL,'pending'),(14,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:27:38','delete later','sale','available','ranch',NULL,'pending'),(16,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:29:05','delete later','sale','available','ranch',NULL,'pending'),(17,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:32:12','delete later','sale','available','ranch',NULL,'pending'),(18,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:42:29','delete later','sale','available','ranch',NULL,'pending'),(19,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:45:41','delete later','sale','available','ranch',NULL,'pending'),(20,2,'62 4th st',2,28999,4,3,2033,'2020-01-13 17:46:23','delete later','sale','available','ranch',NULL,'pending'),(21,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:47:25','delete later','sale','available','ranch',NULL,'pending'),(22,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:47:38','delete later','sale','available','ranch',NULL,'pending'),(23,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:48:19','delete later','sale','available','ranch',NULL,'pending'),(24,2,'62 4th st',2,1000,4,3,2033,'2020-01-13 17:48:29','delete later','sale','available','ranch',NULL,'pending'),(25,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:48:51','delete later','sale','available','ranch',NULL,'pending'),(26,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 17:49:01','delete later','sale','available','ranch',NULL,'pending'),(27,2,'62 4th st',2,30000,4,3,2033,'2020-01-13 18:07:56',NULL,'sale','available','ranch',NULL,'pending');
/*!40000 ALTER TABLE `apartments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `city_name` varchar(255) NOT NULL,
  `country_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cities_countries` (`country_id`),
  CONSTRAINT `fk_cities_countries` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Plymouth',1),(2,'Los Angeles',1),(3,'Chicago',1),(4,'Tel Aviv',2);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'United States','US'),(2,'Israel','IL');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forgot_password`
--

DROP TABLE IF EXISTS `forgot_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forgot_password` (
  `user_id` int(11) unsigned NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_forgot_password_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forgot_password`
--

LOCK TABLES `forgot_password` WRITE;
/*!40000 ALTER TABLE `forgot_password` DISABLE KEYS */;
/*!40000 ALTER TABLE `forgot_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `apartment_id` int(11) unsigned NOT NULL,
  `url` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_images_apartments` (`apartment_id`),
  CONSTRAINT `fk_images_apartments` FOREIGN KEY (`apartment_id`) REFERENCES `apartments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'add_apartment'),(2,'update_apartment');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('admin','user') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_permissions`
--

DROP TABLE IF EXISTS `roles_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_permissions` (
  `role_id` int(11) unsigned NOT NULL,
  `permission_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `fk_roles_permissions_permissions` (`permission_id`),
  CONSTRAINT `fk_roles_permissions_permissions` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  CONSTRAINT `fk_roles_permissions_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_permissions`
--

LOCK TABLES `roles_permissions` WRITE;
/*!40000 ALTER TABLE `roles_permissions` DISABLE KEYS */;
INSERT INTO `roles_permissions` VALUES (2,1),(2,2);
/*!40000 ALTER TABLE `roles_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_status_history`
--

DROP TABLE IF EXISTS `user_status_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_status_history` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `label` varchar(15) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_status_history`
--

LOCK TABLES `user_status_history` WRITE;
/*!40000 ALTER TABLE `user_status_history` DISABLE KEYS */;
INSERT INTO `user_status_history` VALUES (5,12,'active',NULL,'2020-01-14 11:49:46'),(6,13,'active',NULL,'2020-01-14 11:51:04');
/*!40000 ALTER TABLE `user_status_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(11) unsigned NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  KEY `fk_users_roles` (`role_id`),
  CONSTRAINT `fk_users_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'maya','bridge','mb@gmail.com','123','123456','active'),(2,2,'savelliy','s','s@gmail.com','456','1234567','active'),(3,2,'ziv','z','z@gmail.com','321','23456','active'),(4,2,'inna','i','i@gmail.com','789','765456','active'),(5,2,'lala',NULL,'lala@lala.com','TIZFsa7PMB5iw34hhuD0A26mgUgOFGzcG2MZXJC0v1kqzQ+lPMvCIVdC8MIX4HP9qfGdkG867aWFybLPJHemTA==','7272828','active'),(6,2,'lala',NULL,'lulu@lulu.com','NnSNj3rV6K2jrJ7aC/dUAqUEoLFVcXRgUQR8ESFhZPNxfWHA1tw0MR7sCsUsja2UzsCgN6drP5s3WCBp0h8cbw==','54353458','active'),(8,2,'debby',NULL,'debby@gmail.com','9spvCNp+/524KBgSwzjg6TCfW3fYhxSvo/yhxDICHfQzPhSLNLYfQtjQe1PgV7O10+fCg+JS4cgwHLTqTSe8jA==','98765','active'),(9,2,'jamie','smith','jamie@gmail.com','xoE3F8HJ0bVAkxhpRW5xf4VOxDw4ZicRhBkntkNfMNXZme7d9pZHvKoAm4zvzf1qbWl6KNvVQmiaTyHoq8DNNA==','34234234','active'),(10,2,'bobby','brown','bb@gmail.com','/kwSRMcJdn4JEZCTLMmZcpYpvq1NuMspOZ0kgWUz3llw1uB46HcaaJQ2VVlFRRYY15TbRkcqf7vI0+vYxs1svg==','324234','active'),(11,2,'bobby','brown','fsaf@gmail.com','/kwSRMcJdn4JEZCTLMmZcpYpvq1NuMspOZ0kgWUz3llw1uB46HcaaJQ2VVlFRRYY15TbRkcqf7vI0+vYxs1svg==','234234','active'),(12,2,'bobby','brown','fsgssf@gmail.com','/kwSRMcJdn4JEZCTLMmZcpYpvq1NuMspOZ0kgWUz3llw1uB46HcaaJQ2VVlFRRYY15TbRkcqf7vI0+vYxs1svg==','3423423','active'),(13,2,'bobby','brown','bobssf@gmail.com','/kwSRMcJdn4JEZCTLMmZcpYpvq1NuMspOZ0kgWUz3llw1uB46HcaaJQ2VVlFRRYY15TbRkcqf7vI0+vYxs1svg==','435345','active');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wish_list`
--

DROP TABLE IF EXISTS `wish_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wish_list` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `apartment_id` int(11) unsigned NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_wish_list_apartments` (`apartment_id`),
  KEY `fk_wish_list_users` (`user_id`),
  CONSTRAINT `fk_wish_list_apartments` FOREIGN KEY (`apartment_id`) REFERENCES `apartments` (`id`),
  CONSTRAINT `fk_wish_list_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wish_list`
--

LOCK TABLES `wish_list` WRITE;
/*!40000 ALTER TABLE `wish_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `wish_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'realtor'
--

--
-- Dumping routines for database 'realtor'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_apartment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_apartment`(in user_id int(11), in address varchar(500), in city_id int(11),
             in price int(11), in number_of_room int(4), in number_of_bath int(4), in sqft int(6), in in_description varchar(500),
             in sale_status enum('sale','rent','both'), in availability enum('available','suspended','removed'), in property_type enum('house','ranch','condo','land'),
             in main_image text, in in_status enum('pending','approved','denied','removed'))
BEGIN

Insert into apartments 
     (`id`, `user_id`, `address`, `city_id`, `price`, `number_of_room`, `number_of_bath`, `sqft`, `created_on`, `description`, `sale_status`, `availability`, `property_type`, `main_image`, `status`) 
values (default, user_id, address, city_id, price, number_of_room, number_of_bath, sqft, default, in_description, sale_status, availability, property_type, main_image, in_status);

select * from apartments where id = last_insert_id();

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `register_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `register_user`(
	in role_id int(11), 
    in first_name varchar(50), 
    in last_name varchar(50),
    in email varchar(255),
    in in_password varchar(255),
    in phone varchar(25))
BEGIN
	
insert into users 
   (id, role_id, first_name, last_name, email, `password`, phone, `status`)
values
   (default, role_id, first_name, last_name, email, in_password, phone, default);
   
select * from users where id = last_insert_id();

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_apartment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_apartment`(
	in in_id int(11), 
    in address varchar(500), 
    in city_id int(11),
	in price int(11), 
    in number_of_room int(4), 
    in number_of_bath int(4), 
    in sqft int(6), 
    in in_description varchar(500),
	in sale_status enum('sale','rent','both'), 
    in availability enum('available','suspended','removed'), 
    in property_type enum('house','ranch','condo','land'),
	in main_image text, 
    in in_status enum('pending','approved','denied','removed'))
BEGIN

update apartments 
set `address` = address, 
	`city_id` = city_id, 
    `price` = price, 
    `number_of_room` = number_of_room, 
    `number_of_bath` = number_of_bath, 
    `sqft` = sqft, 
    `description` = in_description, 
    `sale_status` = sale_status, 
    `availability` = availability, 
    `property_type` = property_type, 
    `main_image` = main_image, 
    `status` = in_status
where id = in_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_apartment_hist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_apartment_hist`(in apartment_id int(11), in user_id int(11), in in_status varchar(15), in in_description varchar(255))
BEGIN

insert into `apartment_history` 
    (`id`, `apartment_id`, `user_id`, `status`, `description`, `date`)
values (default, apartment_id, user_id, in_status, in_description, default);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_user_stat_hist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_user_stat_hist`(
	in user_id int(11), 
    in label varchar(50), 
    in in_description varchar(50))
BEGIN
	
insert into user_status_history 
   (id, user_id, label, `description`, `date`)
values
   (default, user_id, label, in_description, default);
   

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-16  9:31:14
