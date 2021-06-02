module.exports = {
  up: async queryInterface => {
    try {
      await queryInterface.bulkInsert('SupplyCategory', [
        {
          Name: 'Bulk Materials',
          Description: 'Goods that are procured by weight or olume',
        },
        {
          Name: 'Conveyor Belting & Parts',
          Description: 'Goods that are procured by weight or olume',
        },
        {
          Name: 'Engineering & Construction',
          Description: 'Enginnering services',
        },
      ]);
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};
