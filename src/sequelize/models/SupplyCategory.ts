import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface SupplyCategoryAttributes {
  ID: number;
  Name: string;
  Description: string;
  SupplyCategory_ID?: number;
}
export interface SupplyCategoryModel
  extends Model<SupplyCategoryAttributes>,
    SupplyCategoryAttributes {}
export class SupplyCategory extends Model<
  SupplyCategoryModel,
  SupplyCategoryAttributes
> {}

export type SupplyCategoryStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): SupplyCategoryModel;
};

export function SupplyCategoryFactory(
  sequelize: Sequelize,
): SupplyCategoryStatic {
  return <SupplyCategoryStatic>sequelize.define(
    'SupplyCategory',
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
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SupplyCategory_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
}
