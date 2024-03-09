CREATE USER 'recipeshare'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON `RecipeSharingApp`.* TO 'recipeshare'@'localhost';
FLUSH PRIVILEGES;
