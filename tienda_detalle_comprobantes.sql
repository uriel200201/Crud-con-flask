-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: tienda
-- ------------------------------------------------------
-- Server version	5.6.51-log

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
-- Table structure for table `detalle_comprobantes`
--

DROP TABLE IF EXISTS `detalle_comprobantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_comprobantes` (
  `comprobante` varchar(255) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(6,2) NOT NULL,
  KEY `id_producto` (`id_producto`),
  KEY `detalle_comprobantes_ibfk_1_idx` (`comprobante`),
  CONSTRAINT `detalle_comprobantes_ibfk_1` FOREIGN KEY (`comprobante`) REFERENCES `comprobantes` (`comprobante`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `detalle_comprobantes_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_comprobantes`
--

LOCK TABLES `detalle_comprobantes` WRITE;
/*!40000 ALTER TABLE `detalle_comprobantes` DISABLE KEYS */;
INSERT INTO `detalle_comprobantes` VALUES ('2022-11-14 13:30:04',123,1,123.00),('2022-11-14 13:30:04',1,1,123.40),('2022-11-14 13:34:27',1,1,123.40),('2022-11-14 13:34:27',123,4,123.00),('2022-11-14 13:36:46',123,5,123.00),('2022-11-14 13:36:46',1,2,123.40),('2022-11-14 13:38:19',123,4,123.00),('2022-11-14 13:38:19',1,4,123.40);
/*!40000 ALTER TABLE `detalle_comprobantes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-14 13:51:17
