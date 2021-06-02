import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface ProposalAttachmentAttributes {
  ID: number;
  Proposal_ID: number;
  URL: string;
}
export interface ProposalAttachmentModel
  extends Model<ProposalAttachmentAttributes>,
    ProposalAttachmentAttributes {}
export class ProposalAttachment extends Model<
  ProposalAttachmentModel,
  ProposalAttachmentAttributes
> {}

export type ProposalAttachmentStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): ProposalAttachmentModel;
};

export function ProposalAttachmentFactory(
  sequelize: Sequelize,
): ProposalAttachmentStatic {
  return <ProposalAttachmentStatic>sequelize.define(
    'ProposalAttachment',
    {
      ID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      URL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Proposal_ID: {
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
