import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Productos from '../models/productos';

export const getProductos = async (req: Request, res: Response) => {
  const productos = await Productos.findAll();
  res.json(productos);
};

export const getProducto = async (req: Request, res: Response) => {
  const { id } = req.params;

  const producto = await Productos.findByPk(id);

  res.json(producto);
};

export const getProductosPorCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;

  const productos = await Productos.findAll({ where: { id_categoria: id } });
  res.json(productos);
};

export const getProductosPorNombre = async (req: Request, res: Response) => {
  const { body } = req;

  const productos = await Productos.findAll({
    where: {
      [Op.or]: [
        {
          nombre: {
            [Op.like]: '%' + body.name + '%',
          },
        },
      ],
    },
    limit: 100,
  });

  res.json(productos);
};

// export const postCategoria = async (req: Request, res: Response) => {
//   const { body } = req;

//   try {
//     const categoria = await Productos.findOne({
//       where: {
//         nombre: body.name
//       },
//     });

//     if (categoria) {
//       return res.status(403).json({
//         msg: `Código ${body.id} ya está asignado a otro categoria`,
//       });
//     }

//     const cat = await Productos.create(body);
//     await cat.save();
//     res.json(cat);
//   } catch (error) {
//     res.status(500).json({
//       msg: 'Ocurrió un error, contáctese con el administrador del sistema',
//       error,
//     });
//   }
// };

// export const putCategoria = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { body } = req;

//   try {
//     const categoria = await Productos.findByPk(id);

//     if (!categoria) {
//       return res.status(404).json({
//         msg: 'No existe la categoría con el id ' + id,
//       });
//     }

//     await categoria.update(body);
//     res.json(categoria);
//   } catch (error) {
//     res.status(500).json({
//       msg: 'Ocurrió un error, contáctese con el administrador del sistema',
//       error,
//     });
//   }
// };

// export const deleteCategoria = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const categoria = await Productos.findByPk(id);

//     if (!categoria) {
//       return res.status(404).json({
//         msg: 'No existe la categoría con el id ' + id,
//       });
//     }

//     await categoria.destroy();
//     res.json(categoria);
//   } catch (error) {
//     res.status(500).json({
//       msg: 'Ocurrió un error, contáctese con el administrador del sistema',
//       error,
//     });
//   }
// };
