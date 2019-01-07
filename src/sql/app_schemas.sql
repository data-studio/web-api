CREATE TABLE `app_schemas` (
  `Id` varchar(36) NOT NULL,
  `AppId` varchar(36) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Ref` varchar(255) NOT NULL,
  `Created` int(11) NOT NULL,
  `Deleted` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `AppId` (`AppId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
