import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface SupplierAttributes {
  ID: number;
  Name: string;
  ABN: string;
  Logo: string;
  CreatedAt: Date;
  UpdatedAt?: Date;
  DeletedAt?: Date;
}
export interface SupplierModel
  extends Model<SupplierAttributes>,
    SupplierAttributes {}
export class Supplier extends Model<SupplierModel, SupplierAttributes> {}

export type SupplierStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): SupplierModel;
};

export function SupplierFactory(sequelize: Sequelize): SupplierStatic {
  return <SupplierStatic>sequelize.define(
    'Supplier',
    {
      ID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ABN: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      State_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      City_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      UpdatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      DeletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      freezeTableName: true,
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
    },
  );
}
