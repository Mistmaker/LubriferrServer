import { Router } from 'express';
import { getCategorias, getCategoria, getCategoriaByNombre, postCategoria, putCategoria, deleteCategoria } from '../controllers/categorias.controller';

const router = Router();

router.get('/', getCategorias);
router.get('/:id', getCategoria);
router.post('/nombre', getCategoriaByNombre);
router.post('/', postCategoria);
router.put('/:id', putCategoria);
router.delete('/:id', deleteCategoria);

export default router;
