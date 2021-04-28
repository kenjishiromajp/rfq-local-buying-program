import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface TenderAttributes {
  ID: number;
  Buyer_ID?: number;
  PublishedAt?: Date;
  ClosingAt?: Date;
  Description: string;
  State_ID?: number;
  City_ID?: number;
  Offer?: number;
  DeletedAt?: Date;
  CreatedAt: Date;
  UpdatedAt?: Date;
}
export interface TenderModel
  extends Model<TenderAttributes>,
    TenderAttributes {}

export class Tender extends Model<TenderModel, TenderAttributes> {}

export type TenderStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): TenderModel;
};

export function TenderFactory(sequelize: Sequelize): TenderStatic {
  return <TenderStatic>sequelize.define('Tender', {
    ID: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Buyer_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PublishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ClosingAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Description: {
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
    Offer: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    DeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  });
}
