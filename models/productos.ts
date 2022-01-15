import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Productos = db.define(
  'productos',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, },
    id_categoria: { type: DataTypes.INTEGER, allowNull: false, },
    nombre: { type: DataTypes.STRING(200), allowNull: false, },
    imagen: { type: DataTypes.STRING(4294967295), allowNull: false, },
    descripcion: { type: DataTypes.STRING(4294967295), allowNull: true, defaultValue: null, },
    precio1: { type: DataTypes.FLOAT, allowNull: true, defaultValue: null, },
    precio2: { type: DataTypes.FLOAT, allowNull: true, defaultValue: null, },
    precio3: { type: DataTypes.FLOAT, allowNull: true, defaultValue: null, },
    estado: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: '1', },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);

export default Productos;
