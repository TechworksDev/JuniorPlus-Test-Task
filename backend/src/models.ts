import { DataTypes, Model } from 'sequelize';
import sequelize from './db';

interface NoteAttributes {
  id?: number;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Note extends Model<NoteAttributes> implements NoteAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Note',
    tableName: 'notes',
    timestamps: true,
  }
);

export default Note;
