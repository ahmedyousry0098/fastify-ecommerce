GRANT CREATE ON *.* TO 'ahmed'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

GRANT ALL PRIVILEGES ON ecommerce.* TO 'ahmed';
FLUSH PRIVILEGES;

SHOW GRANTS FOR 'ahmed'@'%';
