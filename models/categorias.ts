import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Categoria = db.define(
  'categorias',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, },
    nombre: { type: DataTypes.STRING(200), unique: true, allowNull: false, },
    imagen: { type: DataTypes.STRING(4294967295), allowNull: false, },
    descripcion: { type: DataTypes.STRING(4294967295), allowNull: false, },
    link_pdf: { type: DataTypes.STRING(65535), allowNull: true, defaultValue: null, },
    estado: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: '1', },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);

export default Categoria;
