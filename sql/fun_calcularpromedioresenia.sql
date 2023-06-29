CREATE OR REPLACE FUNCTION fun_calcularpromedioresenia(INTEGER, INTEGER)
RETURNS void
AS $$
DECLARE 
	productId ALIAS FOR $1;
	valor_resenia ALIAS FOR $2;
	num_products INTEGER;
	sumatoria_resenia INTEGER;
BEGIN
	--Buscar cuantos prodcutos tienen reseña
	SELECT COUNT(*) INTO num_products FROM review WHERE product_id = productId;
	
	--Evaluar si el articulo no tiene reseñas
	IF num_products = 0 THEN
		UPDATE product SET review = valor_resenia WHERE id = productId;
		RETURN;
	END IF;
	
	--Calcualr el promedio
	SELECT SUM(rating) INTO sumatoria_resenia FROM review WHERE product_id = productId;
	UPDATE product SET review = (sumatoria_resenia + valor_resenia) / (num_products) WHERE id = productId;
END;
$$ LANGUAGE plpgsql;