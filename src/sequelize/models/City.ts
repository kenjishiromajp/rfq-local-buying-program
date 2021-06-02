import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface CityAttributes {
  ID: number;
  Name: string;
  State_ID: number;
}
export interface CityModel extends Model<CityAttributes>, CityAttributes {}
export class City extends Model<CityModel, CityAttributes> {}

export type CityStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): CityModel;
};

export function CityFactory(sequelize: Sequelize): CityStatic {
  return <CityStatic>sequelize.define(
    'City',
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
      State_ID: {
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
