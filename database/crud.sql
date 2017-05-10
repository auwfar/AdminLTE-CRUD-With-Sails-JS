-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.13-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5169
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for crud
CREATE DATABASE IF NOT EXISTS `crud` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `crud`;

-- Dumping structure for table crud.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_username` varchar(15) DEFAULT NULL,
  `admin_password` varchar(50) DEFAULT NULL,
  `admin_name` varchar(50) DEFAULT NULL,
  `admin_pict` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table crud.admin: ~2 rows (approximately)
DELETE FROM `admin`;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`admin_id`, `admin_username`, `admin_password`, `admin_name`, `admin_pict`) VALUES
	(1, 'auwfar', 'f0a047143d1da15b630c73f0256d5db0', 'Achmad Chadil Auwfar', 'favicon.png'),
	(2, 'ozil', 'f4e404c7f815fc68e7ce8e3c2e61e347', 'Mesut Ozil', 'profil2.jpg');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping structure for table crud.kelamin
CREATE TABLE IF NOT EXISTS `kelamin` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table crud.kelamin: ~2 rows (approximately)
DELETE FROM `kelamin`;
/*!40000 ALTER TABLE `kelamin` DISABLE KEYS */;
INSERT INTO `kelamin` (`id`, `nama`) VALUES
	(1, 'Laki laki'),
	(2, 'Perempuan');
/*!40000 ALTER TABLE `kelamin` ENABLE KEYS */;

-- Dumping structure for table crud.kota
CREATE TABLE IF NOT EXISTS `kota` (
  `kota_id` int(11) NOT NULL AUTO_INCREMENT,
  `kota_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`kota_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table crud.kota: ~6 rows (approximately)
DELETE FROM `kota`;
/*!40000 ALTER TABLE `kota` DISABLE KEYS */;
INSERT INTO `kota` (`kota_id`, `kota_name`) VALUES
	(1, 'Malang'),
	(2, 'Blitar'),
	(3, 'Tulungagung'),
	(4, 'Jakarta'),
	(5, 'Surabaya'),
	(6, 'Paris');
/*!40000 ALTER TABLE `kota` ENABLE KEYS */;

-- Dumping structure for table crud.pegawai
CREATE TABLE IF NOT EXISTS `pegawai` (
  `pegawai_id` int(11) NOT NULL AUTO_INCREMENT,
  `pegawai_name` varchar(255) DEFAULT NULL,
  `pegawai_telp` varchar(255) DEFAULT NULL,
  `pegawai_kota_id` int(11) DEFAULT NULL,
  `pegawai_gender` enum('L','P') DEFAULT NULL,
  `pegawai_posisi_id` int(11) DEFAULT NULL,
  `pegawai_status` enum('active','inactive') DEFAULT NULL,
  PRIMARY KEY (`pegawai_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- Dumping data for table crud.pegawai: ~11 rows (approximately)
DELETE FROM `pegawai`;
/*!40000 ALTER TABLE `pegawai` DISABLE KEYS */;
INSERT INTO `pegawai` (`pegawai_id`, `pegawai_name`, `pegawai_telp`, `pegawai_kota_id`, `pegawai_gender`, `pegawai_posisi_id`, `pegawai_status`) VALUES
	(1, 'Tolkha Hasan', '081233072122', 1, 'L', 4, 'active'),
	(2, 'Wawan Dwi Prasetyo', '085745966707', 4, 'L', 4, 'active'),
	(3, 'Mustofa Halim', '081330493322', 1, 'L', 3, 'active'),
	(4, 'Dody Ahmad Kusuma Jaya', '083854520015', 1, 'L', 2, 'active'),
	(5, 'Mokhammad Choirul Ikhsan', '085749535400', 3, 'L', 2, 'active'),
	(7, 'Achmad Chadil Auwfar', '08984119934', 4, 'L', 1, 'active'),
	(8, 'Rizal Ferdian', '087777284179', 1, 'L', 3, 'active'),
	(9, 'Redika Angga Pratama', '083834657395', 1, 'L', 3, 'active'),
	(10, 'Antony Febriansyah Hartono', '082199568540', 4, 'L', 1, 'active'),
	(11, 'Hafizh Asrofil Al Banna', '087859615271', 1, 'L', 1, 'active'),
	(12, 'Faiq Fajrullah', '085736333728', 1, 'L', 2, 'active');
/*!40000 ALTER TABLE `pegawai` ENABLE KEYS */;

-- Dumping structure for table crud.posisi
CREATE TABLE IF NOT EXISTS `posisi` (
  `posisi_id` int(11) NOT NULL AUTO_INCREMENT,
  `posisi_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`posisi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- Dumping data for table crud.posisi: ~16 rows (approximately)
DELETE FROM `posisi`;
/*!40000 ALTER TABLE `posisi` DISABLE KEYS */;
INSERT INTO `posisi` (`posisi_id`, `posisi_name`) VALUES
	(1, 'IT'),
	(2, 'HRD'),
	(3, 'Keuangan'),
	(4, 'Produk'),
	(5, 'Web Developer'),
	(6, 'Android Developer'),
	(7, 'IOS Developer'),
	(8, 'Game Developer'),
	(9, 'Marketing'),
	(10, 'IT Support'),
	(11, 'Software Analist'),
	(12, 'Accounting'),
	(13, 'Manager'),
	(14, 'Project Manager'),
	(15, 'CEO'),
	(17, 'Security');
/*!40000 ALTER TABLE `posisi` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
