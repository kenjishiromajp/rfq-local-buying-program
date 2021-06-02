import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface BuyerAttributes {
  ID: number;
  Name: string;
  ABN: string;
  Logo: string;
  CreatedAt: Date;
  UpdatedAt?: Date;
  DeletedAt?: Date;
}
export interface BuyerModel extends Model<BuyerAttributes>, BuyerAttributes {}
export class Buyer extends Model<BuyerModel, BuyerAttributes> {}

export type BuyerStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): BuyerModel;
};

export function BuyerFactory(sequelize: Sequelize): BuyerStatic {
  return <BuyerStatic>sequelize.define(
    'Buyer',
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
