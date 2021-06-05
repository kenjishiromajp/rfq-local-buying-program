import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface ProposalTenderProductAttributes {
  ID: number;
  Offer: number;
  Proposal_ID: number;
  TenderProduct_ID: number;
}
export interface ProposalTenderProductModel
  extends Model<ProposalTenderProductAttributes>,
    ProposalTenderProductAttributes {}
export class ProposalTenderProduct extends Model<
  ProposalTenderProductModel,
  ProposalTenderProductAttributes
> {}

export type ProposalTenderProductStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): ProposalTenderProductModel;
};

export function ProposalTenderProductFactory(
  sequelize: Sequelize,
): ProposalTenderProductStatic {
  return <ProposalTenderProductStatic>sequelize.define(
    'ProposalTenderProduct',
    {
      ID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Offer: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      TenderProduct_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Proposal_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
}
