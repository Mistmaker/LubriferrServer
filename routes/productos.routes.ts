import { Router } from 'express';
import { getProductos, getProducto, getProductosPorNombre, getProductosPorCategoria } from '../controllers/productos.controller';

const router = Router();

router.get('/', getProductos);
router.get('/:id', getProducto);
router.get('/categoria/:id', getProductosPorCategoria);
router.post('/nombre', getProductosPorNombre);
// router.post('/', postCategoria);
// router.put('/:id', putCategoria);
// router.delete('/:id', deleteCategoria);

export default router;
