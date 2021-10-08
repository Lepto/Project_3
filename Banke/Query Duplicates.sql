SELECT yd.business_id, yd.name, yd.stars, yd.is_open, yd.category, yd.user_id, yd.useful, yd.funny, yd.cool, yd.review_count,yd.yelping_since,
    COUNT(*) AS CNT
FROM yelp_data AS yd
GROUP BY yd.business_id, yd.name
     HAVING COUNT(*) > 1;
	 
SELECT *
    FROM yelp_data AS yd
    WHERE yd.business_id NOT IN
    (
        SELECT MAX(yd.business_id) AS MAXRECORDID
        FROM yelp_data AS yd
        GROUP BY yd.business_id, 
                 yd.name
    );
	
	
SELECT * FROM yelp_data

DELETE FROM yelp_data
    WHERE business_id NOT IN
    (
        SELECT MAX(business_id) AS MaxRecordID
        FROM yelp_data
        GROUP BY business_id, 
                 name            
    );

SELECT * FROM yelp_data

SELECT *,
ROW_NUMBER() OVER (PARTITION BY business_id, name ORDER BY business_id, name) AS 'row number'
FROM yelp_data


