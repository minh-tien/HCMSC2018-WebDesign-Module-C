-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: worldskills_2018
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.30-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `airline_company`
--

DROP TABLE IF EXISTS `airline_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `airline_company` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `airline_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `airline_name` (`airline_name`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airline_company`
--

LOCK TABLES `airline_company` WRITE;
/*!40000 ALTER TABLE `airline_company` DISABLE KEYS */;
INSERT INTO `airline_company` VALUES (5,'a','b'),(6,'aa','b'),(8,'asa','b'),(9,'gggasa','b'),(11,'gggayysa','b'),(14,'gggayfsfsysa','b'),(15,'gggayfsfgjfsysa','b'),(16,'gggghayfsfgjfsysa','b'),(21,'rrr','b'),(22,'rrfdsr','b'),(24,'abc','b'),(25,'abjck','b');
/*!40000 ALTER TABLE `airline_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airline_flight`
--

DROP TABLE IF EXISTS `airline_flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `airline_flight` (
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `flight_time` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `arrival_time` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `from_city_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `to_city_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `airline_id` int(10) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airline_flight`
--

LOCK TABLES `airline_flight` WRITE;
/*!40000 ALTER TABLE `airline_flight` DISABLE KEYS */;
INSERT INTO `airline_flight` VALUES ('2018-02-24','2018-02-24','5','6','abc','ddf',1,33,1),('2018-02-24','2018-02-24','5','6','abc','ddf',2,33,2),('2018-02-24','2018-02-24','5','6','abc','ddf',5,33,3),('2018-02-24','2018-02-24','5','6','abc','ddf',7,33,4),('2018-02-24','2018-02-24','5','6','abc','ddf',7,33,5);
/*!40000 ALTER TABLE `airline_flight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `token` varchar(100) COLLATE utf8_unicode_ci DEFAULT '',
  `role` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','adminpass','0ff488866d32b26c4d8b4720093822a1','admin',1),('user1','user1pass','6e469cf45f46659aa5c96fe079e9af91','user',2),('user2','user2pass','','user',3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-15 11:07:18
