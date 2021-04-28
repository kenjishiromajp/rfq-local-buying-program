import { Sequelize } from 'sequelize';

import { UserFactory } from './User';
import {StateFactory} from './State';
import {ProposalAttachmentFactory} from './ProposalAttachment';
import {TenderAttachmentFactory} from './TenderAttachment';
import {CityFactory} from './City';
import {SupplierFactory} from './Supplier';
import {SupplyCategoryFactory} from './SupplyCategory';
import {ProposalFactory} from './Proposal';
import {BuyerFactory} from './Buyer';
import {TenderFactory} from './Tender';
// import {userFactory} from "./user-model";
// import {skillsFactory} from "./other-model";

export const dbConfig = new Sequelize(
  (process.env.DB_NAME = 'db-name'),
  (process.env.DB_USER = 'db-user'),
  (process.env.DB_PASSWORD = 'db-password'),
  {
    port: Number(process.env.DB_PORT) || 54320,
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

// export const Skills = skillsFactory(dbConfig);

// Users have skills then lets create that relationship
// User.hasMay(Skills, {
//   sourceKey: 'id',
//   foreignKey: 'categoryId',
//   as: 'notes',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

// or instead of that, maybe many users have many skills
// Skills.belongsToMany(Users, { through: 'users_have_skills' });
