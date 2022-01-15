import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Categoria from '../models/categorias';

export const getCategorias = async (req: Request, res: Response) => {
  const categorias = await Categoria.findAll();
  res.json(categorias);
};

export const getCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;

  const categoria = await Categoria.findByPk(id);

  res.json(categoria);
};

export const getCategoriaByNombre = async (req: Request, res: Response) => {
  const { body } = req;

  const categorias = await Categoria.findAll({
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

  res.json(categorias);
};

export const postCategoria = async (req: Request, res: Response) => {
  const { body } = req;

  console.log(body)
  try {
    const categoria = await Categoria.findOne({
      where: {
        nombre: body.nombre
      },
    });

    if (categoria) {
      return res.status(403).json({
        msg: `Nombre ${body.nombre} ya está asignado a otra categoria`,
      });
    }

    const cat = await Categoria.create(body);
    await cat.save();
    return res.status(200).json(cat);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Ocurrió un error, contáctese con el administrador del sistema',
      error,
    });
  }
};

export const putCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        msg: 'No existe la categoría con el id ' + id,
      });
    }

    await categoria.update(body);
    res.json(categoria);
  } catch (error) {
    res.status(500).json({
      msg: 'Ocurrió un error, contáctese con el administrador del sistema',
      error,
    });
  }
};

export const deleteCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        msg: 'No existe la categoría con el id ' + id,
      });
    }

    await categoria.destroy();
    res.json(categoria);
  } catch (error) {
    res.status(500).json({
      msg: 'Ocurrió un error, contáctese con el administrador del sistema',
      error,
    });
  }
};
