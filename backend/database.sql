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
  ),
  (
    "R44",
    7,
    7,
    "The Robinson R44 is a four-seat light helicopter produced by Robinson Helicopter Company since 1992. Based on the company's two-seat Robinson R22, the R44 features hydraulically assisted flight controls. It was first flown on 31 March 1990 and received FAA certification in December 1992, with the first delivery in February 1993.
The R44 has been the world's best-selling general aviation (GA) helicopter every year since 1999. It is one of the most-produced GA aircraft of the 21st century, with 5,941 deliveries from 2001 to 2020.",
    1990
  ),
  (
    "UH-1 Iroquois 'Huey'",
    8,
    7,
    "The Bell UH-1 Iroquois (nicknamed Huey) is a utility military helicopter designed and produced by the American aerospace company Bell Helicopter. It is the first member of the prolific Huey family, as well as the first turbine-powered helicopter in service with the United States military.",
    1956
  ),
  (
    "A321",
    3,
    4,
    "The Airbus A321 is a member of the Airbus A320 family of short to medium range, narrow-body, commercial passenger twin engine jet airliners, it carries 185 to 236 passengers. It has a stretched fuselage which was the first derivative of the baseline A320 and entered service in 1994, about six years after the original A320. The aircraft shares a common type rating with all other Airbus A320-family variants, allowing previous A320-family pilots to fly the aircraft without the need for further training.",
    1993
  ),
  (
    "737 Next Generation",
    2,
    4,
    "The Boeing 737 Next Generation, commonly abbreviated as 737NG, or 737 Next Gen, is a narrow-body aircraft powered by two jet engines and produced by Boeing Commercial Airplanes. Launched in 1993 as the third generation derivative of the Boeing 737, it has been produced since 1997 and is an upgrade of the 737 Classic (-300/-400/-500) series.

It has a redesigned wing with a larger area, a wider wingspan, greater fuel capacity, and higher maximum takeoff weights (MTOW) and longer range. It has CFM International CFM56-7 series engines, a glass cockpit, and upgraded and redesigned interior configurations. The series includes four variants, the -600/-700/-800/-900, seating between 108 and 215 passengers. The 737NG's primary competition is the Airbus A320 family.",
    1997
  ),
  (
    "King Air",
    9,
    6,
    "The Beechcraft King Air is a line of American utility aircraft produced by Beechcraft. The King Air line comprises a number of twin-turboprop models that have been divided into two families. The Model 90 and 100 series developed in the 1960s are known as King Airs, while the later T-tail Model 200 and 300 series were originally marketed as Super King Airs, with the name Super being dropped by Beechcraft in 1996 (although it is still often used to differentiate the 200 and 300 series King Airs from their smaller stablemates).

The King Air was the first aircraft in its class and was produced continuously from 1964 to 2021. It outsold all of its turboprop competitors combined. It recently faced competition from jet aircraft such as the Embraer Phenom 100, Honda HA-420 HondaJet and Cessna Citation Mustang; as well as from newer turboprop aircraft including the Piaggio P180 Avanti, and single-engine Piper Malibu Meridian, Pilatus PC-12, and Socata TBM.",
    1964
  ),
  (
    "747",
    2,
    4,
    "The Boeing 747 is a large, long-range wide-body airliner designed and manufactured by Boeing Commercial Airplanes in the United States. After introducing the 707 in October 1958, Pan Am wanted a jet 2+1/2 times its size, to reduce its seat cost by 30% to democratize air travel. In 1965, Joe Sutter left the 737 development program to design the 747, the first twin-aisle airliner. In April 1966, Pan Am ordered 25 Boeing 747-100 aircraft and in late 1966, Pratt & Whitney agreed to develop its JT9D engine, a high-bypass turbofan. On September 30, 1968, the first 747 was rolled out of the custom-built Everett Plant, the world's largest building by volume. The first flight took place on February 9, 1969, and the 747 was certified in December of that year. It entered service with Pan Am on January 22, 1970. The 747 was the first airplane dubbed Jumbo Jet, the first wide-body airliner.

The 747 is a four-engined jet aircraft, initially powered by Pratt & Whitney JT9D turbofan engines, then General Electric CF6 and Rolls-Royce RB211 engines for the original variants. With a ten-abreast economy seating, it typically accommodates 366 passengers in three travel classes. It has a pronounced 37.5° wing sweep, allowing a Mach 0.85 (490 kn; 900 km/h) cruise speed, and its heavy weight is supported by four main landing gear legs, each with a four-wheel bogie. The partial double-deck aircraft was designed with a raised cockpit so it could be converted to a freighter airplane by installing a front cargo door, as it was initially thought that it would eventually be superseded by supersonic transports. Freighter variants of the 747 remain popular with cargo airlines.",
    1969
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
  ),
  (
    "Lockheed Martin",
    "Lockheed Martin Corporation is an American aerospace, arms, defense, information security, and technology corporation with worldwide interests. It was formed by the merger of Lockheed Corporation with Martin Marietta in March 1995. It is headquartered in North Bethesda, Maryland, in the Washington, D.C. area. Lockheed Martin employs approximately 115,000 employees worldwide, including about 60,000 engineers and scientists as of January 2022."
  ),
  (
    "Piper Aircraft",
    "Piper Aircraft, Inc. is a manufacturer of general aviation aircraft, located at the Vero Beach Regional Airport in Vero Beach, Florida, United States and owned since 2009 by the Government of Brunei. Throughout much of the mid-to-late 20th century, it was considered to be one of the Big Three in the field of general aviation manufacturing, along with Beechcraft and Cessna."
  ),
  (
    "Robinson Helicopter Company",
    "The Robinson Helicopter Company, based at Zamperini Field in Torrance, California, is a manufacturer of civil helicopters. Robinson produces three models - the two-seat R22, the four-seat R44, both of which use Lycoming piston engines, and the five-seat R66, which uses a turbine engine."
  ),
  (
    "Bell Textron",
    "The Bell Aircraft Corporation was an American aircraft manufacturer, a builder of several types of fighter aircraft for World War II but most famous for the Bell X-1, the first supersonic aircraft, and for the development and production of many important civilian and military helicopters. Bell also developed the Reaction Control System for the Mercury Spacecraft, North American X-15, and Bell Rocket Belt. The company was purchased in 1960 by Textron, and lives on as Bell Textron."
  ),
  (
    "Beechcraft",
    "Beechcraft is a brand of Textron Aviation[1] since 2014. Originally, it was a brand of Beech Aircraft Corporation, an American manufacturer of general aviation, commercial, and military aircraft, ranging from light single-engined aircraft to twin-engined turboprop transports, business jets, and military trainers. Beech later became a division of Raytheon and then Hawker Beechcraft before a bankruptcy sale turned its assets over to Textron (parent company of Beech's historical cross-town Wichita rival, Cessna Aircraft Company). It remains a brand of Textron Aviation."
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

INSERT INTO
  `image` (`aircraft_id`, `imgLink`)
VALUES
  (1, "c172.jpg"),
  (2, "r44.jpg"),
  (3, "uh1h.jpg"),
  (4, "a321.jpg"),
  (5, "737.jpg"),
  (6, "kingair.jpg"),
  (7, "747.jpg");

CREATE TABLE
  `favorite` (`user_id` INT NOT NULL, `aircraft_id` INT NOT NULL);