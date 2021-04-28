import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface StateAttributes {
  ID: number;
  Name: string;
  Acronym: string;
}
export interface StateModel extends Model<StateAttributes>, StateAttributes {}
export class State extends Model<StateModel, StateAttributes> {}

export type StateStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): StateModel;
};

export function StateFactory(sequelize: Sequelize): StateStatic {
  return <StateStatic>sequelize.define('State', {
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
    Acronym: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}
