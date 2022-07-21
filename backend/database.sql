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
  );

INSERT INTO
  `user` (`username`, `email`, `password`, `role`)
VALUES
  (
    "Admin",
    "acdb-admin@gmail.com",
    '$argon2id$v=19$m=4096,t=3,p=1$s9ymCm7z/yv4BQhltYWmoA$iC3/6d439LFJ8plXiqi0fXw9996tdASd3pda0q8EYpY',
    "Admin"
  ),
  (
    "Tibuntu",
    "tibuntu@gmail.com",
    '$argon2id$v=19$m=4096,t=3,p=1$s9ymCm7z/yv4BQhltYWmoA$iC3/6d439LFJ8plXiqi0fXw9996tdASd3pda0q8EYpY',
    "User"
  );

CREATE TABLE
  `aircraft` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `manufacturer_id` INT NOT NULL,
    `type_id` INT NOT NULL,
    `desc` TEXT(5000) NOT NULL,
    `year` INT NOT NULL
  );

INSERT INTO
  `aircraft` (`name`, `manufacturer_id`, `type_id`, `desc`, `year`)
VALUES
  (
    "Cessna 172 Skyhawk",
    1,
    1,
    "The Cessna 172 Skyhawk is the top-rated single-engine flight training aircraft in the world. These four-seat, fixed-wing planes comprise the majority of Epic's training fleet. We purchase new aircraft directly from Cessna, so our students enjoy state-of-the art avionics and equipment. More Cessna 172s have been manufactured than any airplane in history! When you train at Epic Flight Academy in a new Cessna 172, you'll see why it's the preferred training aircraft worldwide.",
    1975
  );

CREATE TABLE
  `type` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `desc` TEXT(1000) NOT NULL
  );

INSERT INTO
  `type`(`name`, `desc`)
VALUES
  (
    "Single-Piston Engine",
    "Aicraft with only one piston engine"
  ),
  (
    "Multi-Piston Engine",
    "Aicraft with multiple piston engines"
  ),
  (
    "Single-Jet Engine",
    "Aicraft with only one jet engine"
  ),
  (
    "Multi-Jet Engine",
    "Aicraft with multiple jet engines"
  ),
  (
    "Single Turboprop",
    "Aicraft with only one turboprop engine"
  ),
  (
    "Dual Turboprop",
    "Aicraft with two turboprop engines"
  ),
  (
    "Rotary Wing",
    "Aicraft with rotary wings, ex: helicopters"
  ),
  (
    "Glider",
    "Aicraft no engine, relying on the wind and airspeed to stay in the air"
  );

CREATE TABLE
  `manufacturer` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `desc` TEXT(1000) NOT NULL
  );

INSERT INTO
  `manufacturer`(`name`, `desc`)
VALUES
  (
    "Textron Aviation",
    "Textron Aviation Inc. is the general aviation business unit of the conglomerate Textron that was formed in March 2014 following the acquisition of Beech Holdings which included the Beechcraft and Hawker Aircraft businesses. The new business unit includes the Textron-owned Cessna. Textron Aviation sells Beechcraft and Cessna branded aircraft. While no longer selling new Hawker airplanes, Textron Aviation still supports the existing Hawker aircraft fleet through its service centers."
  ),
  (
    "Boeing",
    "The Boeing Company is an American multinational corporation that designs, manufactures, and sells airplanes, rotorcraft, rockets, satellites, telecommunications equipment, and missiles worldwide. The company also provides leasing and product support services. Boeing is among the largest global aerospace manufacturers; it is the third-largest defense contractor in the world based on 2020 revenue, and is the largest exporter in the United States by dollar value. Boeing stock is included in the Dow Jones Industrial Average. Boeing is incorporated in Delaware."
  ),
  (
    "Airbus",
    "Airbus is a European multinational aerospace corporation. Airbus designs, manufactures and sells civil and military aerospace products worldwide and manufactures aircraft in Europe and various countries outside Europe. The company has three divisions: Commercial Aircraft (Airbus S.A.S.), Defence and Space, and Helicopters, the third being the largest in its industry in terms of revenues and turbine helicopter deliveries. As of 2019, Airbus is the world's largest airliner manufacturer."
  ),
  (
    "Dassault Aviation",
    "Dassault Aviation S.A. is a French manufacturer of military aircraft and business jets.
It was founded in 1929 by Marcel Bloch as Société des Avions Marcel Bloch or MB. After World War II, Marcel Bloch changed his name to Marcel Dassault, and the name of the company was changed to Avions Marcel Dassault on 20 January 1947.
In 1971 Dassault acquired Breguet, forming Avions Marcel Dassault-Breguet Aviation (AMD-BA). In 1990 the company was renamed Dassault Aviation.
The Dassault Aviation Group has been headed by Éric Trappier since 9 January 2013."
  );

CREATE TABLE
  `comment` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `aircraft_id` INT NOT NULL,
    `text` TEXT(5000) NOT NULL,
    `postedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `editDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

INSERT INTO
  `comment` (`user_id`, `aircraft_id`, `text`)
VALUES
  (
    1,
    1,
    "This is a really nice aircraft, did my first flight on it!"
  ),
  (
    1,
    1,
    "Can't wait to be able to buy myself one at some point.. Argh, time is slow!"
  );

CREATE TABLE
  `user_vote` (`user_id` INT NOT NULL, `comment_id` INT NOT NULL);

CREATE TABLE
  `image` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    aircraft_id INT NOT NULL,
    `imgLink` VARCHAR(255) NOT NULL,
    `postedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  `favorite` (`user_id` INT NOT NULL, `aircraft_id` INT NOT NULL);