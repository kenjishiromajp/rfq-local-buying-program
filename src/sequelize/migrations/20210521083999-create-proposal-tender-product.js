module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProposalTenderProduct', {
      ID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Offer: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      TenderProduct_ID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'TenderProduct',
          key: 'ID',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
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
        allowNull: true,
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
    });
  },

  down: async queryInterface => {
    try {
      return Promise.all([
        queryInterface.removeColumn('TenderAttachment', 'URL'),
        queryInterface.removeColumn('TenderAttachment', 'Tender_ID'),
      ]);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
