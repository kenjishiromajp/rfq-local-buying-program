import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface TenderAttachmentAttributes {
  ID: number;
  URL: string;
  Tender_ID?: number;
}
export interface TenderAttachmentModel
  extends Model<TenderAttachmentAttributes>,
    TenderAttachmentAttributes {}
export class TenderAttachment extends Model<
  TenderAttachmentModel,
  TenderAttachmentAttributes
> {}

export type TenderAttachmentStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): TenderAttachmentModel;
};

export function TenderAttachmentFactory(
  sequelize: Sequelize,
): TenderAttachmentStatic {
  return <TenderAttachmentStatic>sequelize.define('TenderAttachment', {
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
    Tender_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
}
