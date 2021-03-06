-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.4.18-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Zrzucanie danych dla tabeli movielist.filmgenres: ~7 rows (około)
/*!40000 ALTER TABLE `filmgenres` DISABLE KEYS */;
INSERT INTO `filmgenres` (`genre`) VALUES
	('Animation'),
	('Comedy'),
	('Criminal'),
	('Drama'),
	('Fantasy'),
	('Horror'),
	('Science-Fiction'),
	('Thriller');
/*!40000 ALTER TABLE `filmgenres` ENABLE KEYS */;

-- Zrzucanie danych dla tabeli movielist.usermovie: ~0 rows (około)
/*!40000 ALTER TABLE `usermovie` DISABLE KEYS */;
/*!40000 ALTER TABLE `usermovie` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
