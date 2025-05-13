import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from 'sequelize';
import { sequelize } from '../config/database';

export class EmployeeModel extends Model<
  InferAttributes<EmployeeModel>,
  InferCreationAttributes<EmployeeModel>
> {
  declare DNI: string;
  declare name: string;
  declare email: string;
  declare password: string;
  declare registration_date: Date;
  declare job_functions: CreationOptional<string>;
  declare phone: CreationOptional<string>;
  declare schelude: CreationOptional<string>;
  declare status: CreationOptional<boolean>;
}

EmployeeModel.init(
  {
    DNI: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    job_functions: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    schelude: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'employee',
    timestamps: false
  }
);