CREATE TABLE yelp_dataii as SELECT DISTINCT * FROM yelp_data;
DELETE FROM yelp_data; 
INSERT INTO yelp_data SELECT * FROM yelp_dataii

SELECT * FROM yelp_dataii;

SELECT yd.business_id, yd.name, yd.stars, yd.is_open, yd.category, yd.user_id, yd.useful, yd.funny, yd.cool, yd.review_count,yd.yelping_since,
    COUNT(*) AS CNT
FROM yelp_dataii AS yd
GROUP BY yd.business_id, yd.name
     HAVING COUNT(*) > 1;


CREATE TABLE yelp_clean as SELECT DISTINCT * FROM yelp_data;

insert into yelp_clean(business_id, name, stars, is_open, category, user_id, useful, funny, cool, review_count, yelping_since)
select business_id, name, stars, is_open, category, user_id, useful, funny, cool, review_count, yelping_since from yelp_data group by business_id, name, stars, is_open, category, user_id, useful, funny, cool, review_count, yelping_since having count(*)>=1

SELECT * FROM yelp_clean;

SELECT yd.business_id, yd.name, yd.stars, yd.is_open, yd.category, yd.user_id, yd.useful, yd.funny, yd.cool, yd.review_count,yd.yelping_since,
    COUNT(*) AS CNT
FROM yelp_clean AS yd
GROUP BY yd.business_id, yd.name
     HAVING COUNT(*) > 1;
	 
	 
CREATE TABLE yelp_final as SELECT DISTINCT * FROM yelp_clean;

insert into yelp_clean(business_id, name, stars, is_open, category, user_id, useful, funny, cool, review_count, yelping_since)
select business_id, name, stars, is_open, category, user_id, useful, funny, cool, review_count, yelping_since from yelp_clean group by business_id, name having count(*)>=1

SELECT * FROM yelp_final;

SELECT yd.business_id, yd.name, yd.stars, yd.is_open, yd.category, yd.user_id, yd.useful, yd.funny, yd.cool, yd.review_count,yd.yelping_since,
    COUNT(*) AS CNT
FROM yelp_final AS yd
GROUP BY yd.business_id, yd.name
     HAVING COUNT(*) > 1;
	 
CREATE TABLE yelp_unique as SELECT DISTINCT * FROM yelp_data;

ALTER TABLE yelp_unique
ADD UNIQUE KEY unq (business_id, name, stars, is_open, category, user_id, useful, funny, cool, review_count,yelping_since);
INSERT IGNORE INTO yelp_unique
SELECT * FROM yelp_data;

-- ALTER TABLE yelp_dataii RENAME yelp_dataii_old;
-- ALTER TABLE yelp_dataii_unique RENAME yelp_dataii;

SELECT * FROM yelp_unique;

CREATE TABLE yelp_dup as SELECT DISTINCT * FROM yelp_unique;

insert into yelp_dup(business_id, name, stars, is_open, category, user_id, useful, funny, cool, review_count, yelping_since)
select business_id, name, stars, is_open, category, user_id, useful, funny, cool, review_count, yelping_since from yelp_unique group by name having count(*)>=1

SELECT * FROM yelp_dup;

CREATE TABLE yelp_busid as SELECT DISTINCT * FROM yelp_dup;

insert into yelp_busid(business_id, name, stars, is_open, category, user_id, useful, funny, cool, review_count, yelping_since)
select business_id, name, stars, is_open, category, user_id, useful, funny, cool, review_count, yelping_since from yelp_dup group by business_id having count(*)>=1

SELECT * FROM yelp_busid;

DELETE FROM yelp_busid WHERE rowid NOT IN (SELECT min(rowid) FROM yelp_busid GROUP BY business_id, name);

SELECT * FROM yelp_busid;

DROP TABLE yelp_data;

ALTER TABLE yelp_busid 
	RENAME TO yelp_data;

