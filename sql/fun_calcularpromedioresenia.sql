CREATE OR REPLACE FUNCTION fun_calcularpromedioresenia(INTEGER)
RETURNS void
AS $$
DECLARE 
	productId ALIAS FOR $1;
	num_products DECIMAL(10,1);
	sumatoria_resenia DECIMAL(10,1);
	prom NUMERIC(2,1);
BEGIN
	--Buscar cuántos productos tienen reseña
	SELECT COUNT(*) INTO num_products FROM review WHERE product_id = productId;
	
	--Calcular el promedio
	SELECT SUM(rating) INTO sumatoria_resenia FROM review WHERE product_id = productId;
	prom := (sumatoria_resenia) / (num_products);
	prom := ROUND(prom, 1);
	UPDATE products SET review = prom WHERE id = productId;
END;
$$ LANGUAGE plpgsql;
