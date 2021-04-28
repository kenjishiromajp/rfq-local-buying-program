import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface UserAttributes {
  ID: number;
  Name: string;
  Email: string;
  Password: string;
  Supplier_ID?: number;
  Buyer_ID?: number;
  DeletedAt?: Date;
  CreatedAt: Date;
  UpdatedAt?: Date;
  Token?: string;
  RefreshToken?: string;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize): UserStatic {
  return <UserStatic>sequelize.define('User', {
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
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Supplier_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Buyer_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    DeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
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
    Token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RefreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
}
