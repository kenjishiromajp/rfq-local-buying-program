import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface ProposalAttributes {
  ID: number;
  Tender_ID?: number;
  Supplier_ID?: number;
  Description: string;
  ApprovedAt?: Date;
  Offer?: number;
  CreatedAt: Date;
  UpdatedAt?: Date;
  DeletedAt?: Date;
}
export interface ProposalModel
  extends Model<ProposalAttributes>,
    ProposalAttributes {}
export class Proposal extends Model<ProposalModel, ProposalAttributes> {}

export type ProposalStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): ProposalModel;
};

export function ProposalFactory(sequelize: Sequelize): ProposalStatic {
  return <ProposalStatic>sequelize.define(
    'Proposal',
    {
      ID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Tender_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Supplier_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ApprovedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Offer: {
        type: DataTypes.DECIMAL,
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
      DeletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
    },
  );
}
