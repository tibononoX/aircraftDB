SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET
  time_zone = "+00:00";

CREATE TABLE
  `user` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `creationDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `role` ENUM("Admin", "User") DEFAULT "User" NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
  `user` (`username`, `email`, `password`, `role`)
VALUES
  (
    "Admin",
    "acdb-admin@gmail.com",
    '$argon2id$v=19$m=4096,t=3,p=1$s9ymCm7z/yv4BQhltYWmoA$iC3/6d439LFJ8plXiqi0fXw9996tdASd3pda0q8EYpY',
    "Admin"
  );