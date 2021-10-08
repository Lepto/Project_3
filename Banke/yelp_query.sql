SELECT b.business_id, b.name, b.stars, b.is_open, b.category, r.user_id, r.useful, r.funny, r.cool, u.review_count, u.yelping_since
FROM business_final AS b
	JOIN review AS r
	ON (b.business_id = r.business_id)
		JOIN tip AS t
		ON (t.user_id = r.user_id)
			JOIN user_final AS u
			ON (u.user_id = t.user_id);
			
			
-- Create view from query
CREATE VIEW yelp_data AS
SELECT b.business_id, b.name, b.stars, b.is_open, b.category, r.user_id, r.useful, r.funny, r.cool, u.review_count, u.yelping_since
FROM business_final AS b
	JOIN review AS r
	ON (b.business_id = r.business_id)
		JOIN tip AS t
		ON (t.user_id = r.user_id)
			JOIN user_final AS u
			ON (u.user_id = t.user_id);