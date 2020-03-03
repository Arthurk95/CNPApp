DELIMITER $$

CREATE PROCEDURE `AddWeatherData`(IN m VARCHAR(45),
									des  VARCHAR(45),
														 IN tem FLOAT,
                                                         IN feels FLOAT,
                                                         IN mins FLOAT,
                                                         IN maxs FLOAT,
                                                         IN press INT,
                                                         IN humi INT,
                                                         IN speed FLOAT, 
                                                         IN deg INT,
                                                         IN gust FLOAt)
BEGIN
	INSERT INTO `Weather` (dateTimes, main, description, temp, feels_like, temp_min, temp_max, pressure, humidity, wind_speed, wind_deg, wind_gust)
		VALUES(NOW(), m, des, tem, feels, mins, maxs, press, humi, speed, deg, gust);
END$$