const Sequelize = require('sequelize');

module.exports = {
  up: async queryInterface => {
    try {
      const { transaction } = queryInterface;
      await queryInterface.createTable(
        'State',
        {
          ID: {
            allowNull: false,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          Name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          Acronym: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'City',
        {
          ID: {
            allowNull: false,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          Name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          State_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'State',
              key: 'ID',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Supplier',
        {
          ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          Name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          ABN: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          Logo: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          State_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'State',
              key: 'ID',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          City_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'City',
              key: 'ID',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          CreatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          UpdatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          DeletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'SupplyCategory',
        {
          ID: {
            allowNull: false,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          Name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          Description: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          SupplyCategory_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'SupplyCategory',
              key: 'ID',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Buyer',
        {
          ID: {
            allowNull: false,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          Name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          ABN: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          Logo: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          CreatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          UpdatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          DeletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Tender',
        {
          ID: {
            allowNull: false,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          Buyer_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'Buyer',
              key: 'ID',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          PublishedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          ClosingAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          Description: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          Title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          HeadingImage: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          State_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'State',
              key: 'ID',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          City_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'City',
              key: 'ID',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          Offer: {
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
          DeletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          CreatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
          },
          UpdatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'TenderAttachment',
        {
          ID: {
            allowNull: false,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Proposal',
        {
          ID: {
            allowNull: false,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          Tender_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'Tender',
              key: 'ID',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          Supplier_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'Supplier',
              key: 'ID',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          Description: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          ApprovedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          Offer: {
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
          CreatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
          },
          UpdatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
          },
          DeletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'ProposalAttachment',
        {
          ID: {
            allowNull: false,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          URL: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          Proposal_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'Proposal',
              key: 'ID',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
        },
        { transaction },
      );
      return await queryInterface.createTable(
        'User',
        {
          ID: {
            allowNull: false,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          Name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          Email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          Password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          Supplier_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'Supplier',
              key: 'ID',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          Buyer_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'Buyer',
              key: 'ID',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          DeletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
          },
          CreatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          UpdatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          Token: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          RefreshToken: {
            type: Sequelize.STRING,
            allowNull: true,
          },
        },
        { transaction },
      );
      // return Promise.all([
      //   queryInterface.createTable('State', {
      //     ID: {
      //       allowNull: false,
      //       type: Sequelize.INTEGER,
      //       autoIncrement: true,
      //       primaryKey: true,
      //     },
      //     Name: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     Acronym: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //   }),
      //   queryInterface.createTable('City', {
      //     ID: {
      //       allowNull: false,
      //       type: Sequelize.INTEGER,
      //       autoIncrement: true,
      //       primaryKey: true,
      //     },
      //     Name: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //   }),
      //   queryInterface.createTable('Supplier', {
      //     ID: {
      //       allowNull: false,
      //       type: Sequelize.INTEGER,
      //       autoIncrement: true,
      //       primaryKey: true,
      //     },
      //     Name: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     ABN: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     Logo: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     CreatedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: false,
      //       defaultValue: Sequelize.NOW,
      //     },
      //     UpdatedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //     },
      //     DeletedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //       defaultValue: Sequelize.NOW,
      //     },
      //   }),
      //   queryInterface.createTable('SupplyCategory', {
      //     ID: {
      //       allowNull: false,
      //       type: Sequelize.INTEGER,
      //       autoIncrement: true,
      //       primaryKey: true,
      //     },
      //     Name: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     Description: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     SupplyCategory_ID: {
      //       type: Sequelize.INTEGER,
      //       allowNull: true,
      //       references: {
      //         model: 'SupplyCategory',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     },
      //   }),
      //   queryInterface.createTable('Tender', {
      //     ID: {
      //       allowNull: false,
      //       type: Sequelize.INTEGER,
      //       autoIncrement: true,
      //       primaryKey: true,
      //     },
      //     Buyer_ID: {
      //       type: Sequelize.INTEGER,
      //       allowNull: true,
      //       references: {
      //         model: 'Buyer',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     },
      //     PublishedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //     },
      //     ClosingAt: {
      //       type: Sequelize.DATE,
      //       allowNull: false,
      //     },
      //     Description: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     State_ID: {
      //       type: Sequelize.INTEGER,
      //       allowNull: true,
      //       references: {
      //         model: 'State',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     },
      //     City_ID: {
      //       type: Sequelize.INTEGER,
      //       allowNull: true,
      //       references: {
      //         model: 'City',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     },
      //     Offer: {
      //       type: Sequelize.DECIMAL,
      //       allowNull: false,
      //     },
      //     DeletedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //     },
      //     CreatedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //       defaultValue: Sequelize.NOW,
      //     },
      //     UpdatedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //       defaultValue: Sequelize.NOW,
      //     },
      //   }),
      //   queryInterface.createTable('TenderAttachment', {
      //     ID: {
      //       allowNull: false,
      //       type: Sequelize.INTEGER,
      //       autoIncrement: true,
      //       primaryKey: true,
      //     },
      //   }),
      //   queryInterface.createTable('Proposal', {
      //     ID: {
      //       allowNull: false,
      //       type: Sequelize.INTEGER,
      //       autoIncrement: true,
      //       primaryKey: true,
      //     },
      //     Tender_ID: {
      //       type: Sequelize.INTEGER,
      //       allowNull: true,
      //       references: {
      //         model: 'Tender',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     },
      //     Supplier_ID: {
      //       type: Sequelize.INTEGER,
      //       allowNull: true,
      //       references: {
      //         model: 'Supplier',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     },
      //     Description: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     ApprovedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //     },
      //     Offer: {
      //       type: Sequelize.DECIMAL,
      //       allowNull: false,
      //     },
      //     CreatedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //       defaultValue: Sequelize.NOW,
      //     },
      //     UpdatedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //       defaultValue: Sequelize.NOW,
      //     },
      //     DeletedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //     },
      //   }),
      //   queryInterface.createTable('ProposalAttachment', {
      //     ID: {
      //       allowNull: false,
      //       type: Sequelize.INTEGER,
      //       autoIncrement: true,
      //       primaryKey: true,
      //     },
      //     URL: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     Proposal_ID: {
      //       type: Sequelize.INTEGER,
      //       allowNull: true,
      //       references: {
      //         model: 'Proposal',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     },
      //   }),
      //   queryInterface.createTable('Buyer', {
      //     ID: {
      //       allowNull: false,
      //       type: Sequelize.INTEGER,
      //       autoIncrement: true,
      //       primaryKey: true,
      //     },
      //     Name: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     ABN: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     Logo: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     CreatedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: false,
      //       defaultValue: Sequelize.NOW,
      //     },
      //     UpdatedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //     },
      //     DeletedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //       defaultValue: Sequelize.NOW,
      //     },
      //   }),
      //   queryInterface.createTable('User', {
      //     ID: {
      //       allowNull: false,
      //       type: Sequelize.INTEGER,
      //       autoIncrement: true,
      //       primaryKey: true,
      //     },
      //     Name: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     Email: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     Password: {
      //       type: Sequelize.STRING,
      //       allowNull: false,
      //     },
      //     Supplier_ID: {
      //       type: Sequelize.INTEGER,
      //       allowNull: true,
      //       references: {
      //         model: 'Supplier',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     },
      //     Buyer_ID: {
      //       type: Sequelize.INTEGER,
      //       allowNull: true,
      //       references: {
      //         model: 'Buyer',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     },
      //     DeletedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //       defaultValue: Sequelize.NOW,
      //     },
      //     CreatedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: false,
      //       defaultValue: Sequelize.NOW,
      //     },
      //     UpdatedAt: {
      //       type: Sequelize.DATE,
      //       allowNull: true,
      //     },
      //     Token: {
      //       type: Sequelize.STRING,
      //       allowNull: true,
      //     },
      //     RefreshToken: {
      //       type: Sequelize.STRING,
      //       allowNull: true,
      //     },
      //   }),
      // ]);
      // .then(() => {
      //   return Promise.all([
      //     // SupplyCategory
      //     queryInterface.addIndex('SupplyCategory', {
      //       references: {
      //         model: 'SupplyCategory',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     }),
      //     // Buyer
      //     queryInterface.addIndex('Tender', {
      //       references: {
      //         model: 'Buyer',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     }),
      //     // State
      //     queryInterface.addIndex('Tender', {
      //       references: {
      //         model: 'State',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     }),
      //     // City
      //     queryInterface.addIndex('Tender', {
      //       references: {
      //         model: 'City',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     }),
      //     // Tender
      //     queryInterface.addIndex('Proposal', {
      //       references: {
      //         model: 'Tender',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     }),
      //     // Supplier
      //     queryInterface.addIndex('Proposal', {
      //       references: {
      //         model: 'Supplier',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     }),
      //     // Proposal
      //     queryInterface.addIndex('ProposalAttachment', {
      //       references: {
      //         model: 'Proposal',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     }),
      //     // Supplier
      //     queryInterface.addIndex('User', {
      //       references: {
      //         model: 'Supplier',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     }),
      //     // Buyer
      //     queryInterface.addIndex('User', {
      //       references: {
      //         model: 'Buyer',
      //         key: 'ID',
      //       },
      //       onUpdate: 'cascade',
      //       onDelete: 'cascade',
      //     }),
      //   ]);
      // });
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  down: queryInterface => {
    try {
      return Promise.all([
        queryInterface.dropTable('User'),
        queryInterface.dropTable('Buyer'),
        queryInterface.dropTable('City'),
        queryInterface.dropTable('Proposal'),
        queryInterface.dropTable('ProposalAttachment'),
        queryInterface.dropTable('State'),
        queryInterface.dropTable('Supplier'),
        queryInterface.dropTable('SupplyCategory'),
        queryInterface.dropTable('Tender'),
        queryInterface.dropTable('TenderAttachment'),
        queryInterface.dropTable('User'),
      ]);
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};
