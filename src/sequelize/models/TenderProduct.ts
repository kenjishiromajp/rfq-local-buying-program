import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface TenderProductAttributes {
  ID: number;
  Name: string;
  Quantity: number;
  Tender_ID: number;
}
export interface TenderProductModel
  extends Model<TenderProductAttributes>,
    TenderProductAttributes {}
export class TenderProduct extends Model<
  TenderProductModel,
  TenderProductAttributes
> {}

export type TenderProductStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): TenderProductModel;
};

export function TenderProductFactory(
  sequelize: Sequelize,
): TenderProductStatic {
  return <TenderProductStatic>sequelize.define(
    'TenderProduct',
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
      Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Tender_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
    },
  );
}
