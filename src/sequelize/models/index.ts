import { Sequelize } from 'sequelize';

import { BuyerFactory } from './Buyer';
import { CityFactory } from './City';
import { ProposalFactory } from './Proposal';
import { ProposalAttachmentFactory } from './ProposalAttachment';
import { ProposalTenderProductFactory } from './ProposalTenderProduct';
import { StateFactory } from './State';
import { SupplierFactory } from './Supplier';
import { SupplyCategoryFactory } from './SupplyCategory';
import { TenderFactory } from './Tender';
import { TenderAttachmentFactory } from './TenderAttachment';
import { TenderProductFactory } from './TenderProduct';
import { UserFactory } from './User';
// import {userFactory} from "./user-model";
// import {skillsFactory} from "./other-model";

export const dbConfig = new Sequelize(
  (process.env.DB_NAME = 'postgres'),
  (process.env.DB_USER = 'postgres'),
  (process.env.DB_PASSWORD = 'example'),
  {
    port: Number(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },
  },
);

// SOMETHING VERY IMPORTANT them Factory functions expect a
// sequelize instance as parameter give them `dbConfig`

export const State = StateFactory(dbConfig);
export const City = CityFactory(dbConfig);
export const Supplier = SupplierFactory(dbConfig);
export const SupplyCategory = SupplyCategoryFactory(dbConfig);
export const Proposal = ProposalFactory(dbConfig);
export const ProposalAttachment = ProposalAttachmentFactory(dbConfig);
export const Buyer = BuyerFactory(dbConfig);
export const User = UserFactory(dbConfig);
export const Tender = TenderFactory(dbConfig);
export const TenderAttachment = TenderAttachmentFactory(dbConfig);
export const TenderProduct = TenderProductFactory(dbConfig);
export const ProposalTenderProduct = ProposalTenderProductFactory(dbConfig);

// STATE
State.hasMany(City, {
  sourceKey: 'ID',
  foreignKey: 'State_ID',
  as: 'Cities',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// City
City.belongsTo(State, {
  foreignKey: 'ID',
  as: 'State',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// Supplier
export const SupplierHasOneUSer = Supplier.hasOne(User, {
  sourceKey: 'ID',
  foreignKey: 'Supplier_ID',
  as: 'User',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Supplier.belongsTo(City, {
  foreignKey: 'City_ID',
  as: 'City',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Supplier.belongsTo(State, {
  foreignKey: 'State_ID',
  as: 'State',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Supplier.hasMany(Proposal, {
  sourceKey: 'ID',
  foreignKey: 'Supplier_ID',
  as: 'Proposals',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export const SupplierHasSupplyCategories = Supplier.belongsToMany(
  SupplyCategory,
  {
    as: 'SupplyCategories',
    through: 'Supplier_SupplyCategory',
    foreignKey: 'Supplier_ID',
    otherKey: 'SupplyCategory_ID', // replaces `categoryId`
    timestamps: false,
  },
);

// SupplyCategory
SupplyCategory.hasMany(SupplyCategory, {
  sourceKey: 'ID',
  foreignKey: 'SupplyCategory_ID',
  as: 'SupplyCategories',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
SupplyCategory.belongsTo(SupplyCategory, {
  foreignKey: 'SupplyCategory_ID',
  as: 'SupplyCategory',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// Proposal
Proposal.belongsTo(Tender, {
  foreignKey: 'ID',
  as: 'Tender',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Proposal.belongsTo(Supplier, {
  foreignKey: 'ID',
  as: 'Supplier',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Proposal.hasMany(ProposalAttachment, {
  sourceKey: 'ID',
  foreignKey: 'Proposal_ID',
  as: 'ProposalAttachments',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export const ProposalTenderProducts = Proposal.hasMany(ProposalTenderProduct, {
  sourceKey: 'ID',
  foreignKey: 'Proposal_ID',
  as: 'ProposalTenderProducts',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// Buyer
Buyer.hasOne(User, {
  sourceKey: 'ID',
  foreignKey: 'Buyer_ID',
  as: 'User',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Buyer.belongsTo(City, {
  foreignKey: 'City_ID',
  as: 'City',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Buyer.belongsTo(State, {
  foreignKey: 'State_ID',
  as: 'State',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Buyer.hasMany(Tender, {
  sourceKey: 'ID',
  foreignKey: 'Buyer_ID',
  as: 'Tenders',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// User
User.hasOne(Buyer, {
  sourceKey: 'Buyer_ID',
  foreignKey: 'ID',
  as: 'Buyer',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.hasOne(Supplier, {
  sourceKey: 'Supplier_ID',
  foreignKey: 'ID',
  as: 'Supplier',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// Tender
Tender.belongsTo(Buyer, {
  foreignKey: 'Buyer_ID',
  as: 'Buyer',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Tender.belongsTo(City, {
  foreignKey: 'City_ID',
  as: 'City',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Tender.belongsTo(State, {
  foreignKey: 'State_ID',
  as: 'State',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Tender.hasMany(TenderAttachment, {
  sourceKey: 'ID',
  foreignKey: 'Tender_ID',
  as: 'TenderAttachments',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Tender.hasMany(TenderProduct, {
  sourceKey: 'ID',
  foreignKey: 'Tender_ID',
  as: 'TenderProducts',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Tender.hasMany(Proposal, {
  sourceKey: 'ID',
  foreignKey: 'Tender_ID',
  as: 'Proposals',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ProposalTenderProduct.belongsTo(TenderProduct, {
  foreignKey: 'TenderProduct_ID',
  as: 'TenderProduct',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// or instead of that, maybe many users have many skills
// Skills.belongsToMany(Users, { through: 'users_have_skills' });
