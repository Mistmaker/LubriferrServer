import { Router } from 'express';
import { getProductos, getProducto, getProductosPorNombre, getProductosPorCategoria, postProducto, putProducto, deleteProducto } from '../controllers/productos.controller';

const router = Router();

router.get('/', getProductos);
router.get('/:id', getProducto);
router.get('/categoria/:id', getProductosPorCategoria);
router.post('/nombre', getProductosPorNombre);
router.post('/', postProducto);
router.put('/:id', putProducto);
router.delete('/:id', deleteProducto);

export default router;
