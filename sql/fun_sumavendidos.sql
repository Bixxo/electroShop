CREATE OR REPLACE FUNCTION fun_sumavendidos(INTEGER, INTEGER)
RETURNS void
AS $$
DECLARE 
	productId ALIAS FOR $1;
	cantidad_vendidos ALIAS FOR $2;
	productos_vendidos INTEGER;
BEGIN
	--Buscar cuantos prodcutos tienen reseña
	SELECT sold INTO productos_vendidos FROM products WHERE id = productId;
	
	--Actualizar el registro
	UPDATE products SET sold = productos_vendidos + cantidad_vendidos WHERE id = productId;
END;
$$ LANGUAGE plpgsql;