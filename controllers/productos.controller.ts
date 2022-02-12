import { Request, Response } from 'express';
import { Op, literal } from 'sequelize';
import Productos from '../models/productos';

export const getProductos = async (req: Request, res: Response) => {
  const productos = await Productos.findAll({
    attributes: {
      include: [
        [
          // Note the wrapping parentheses in the call below!
          literal(`(
              SELECT nombre
              FROM categorias AS categorias
              WHERE categorias.id = productos.id_categoria
          )`),
          'NombreCategoria'
        ]
      ]
    },
  });
  res.json(productos);
};

export const getProducto = async (req: Request, res: Response) => {
  const { id } = req.params;

  const producto = await Productos.findByPk(id);

  res.json(producto);
};

export const getProductosPorCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;

  const productos = await Productos.findAll({
    attributes: {
      include: [
        [
          // Note the wrapping parentheses in the call below!
          literal(`(
              SELECT nombre
              FROM categorias AS categorias
              WHERE categorias.id = productos.id_categoria
          )`),
          'NombreCategoria'
        ]
      ]
    },
    where: { id_categoria: id }
  });
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

export const postProducto = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const producto = await Productos.findOne({
      where: {
        nombre: body.nombre
      },
    });

    if (producto) {
      return res.status(403).json({
        msg: `Producto ${body.nombre} ya existe`,
      });
    }

    const prod = await Productos.create(body);
    await prod.save();
    res.json(prod);
  } catch (error) {
    res.status(500).json({
      msg: 'Ocurrió un error, contáctese con el administrador del sistema',
      error,
    });
  }
};

export const putProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const producto = await Productos.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        msg: 'No existe el producto con el id ' + id,
      });
    }

    await producto.update(body);
    res.json(producto);
  } catch (error) {
    res.status(500).json({
      msg: 'Ocurrió un error, contáctese con el administrador del sistema',
      error,
    });
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const producto = await Productos.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        msg: 'No existe el producto con el id ' + id,
      });
    }

    await producto.destroy();
    res.json(producto);
  } catch (error) {
    res.status(500).json({
      msg: 'Ocurrió un error, contáctese con el administrador del sistema',
      error,
    });
  }
};
