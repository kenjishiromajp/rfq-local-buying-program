module.exports = {
  up: async queryInterface => {
    try {
      await queryInterface.bulkInsert('City', [
        {
          Name: 'Brisbane',
          State_ID: 1,
        },
        {
          Name: 'Cairns',
          State_ID: 1,
        },
        {
          Name: 'Sydney',
          State_ID: 2,
        },
        {
          Name: 'Byron Bay',
          State_ID: 2,
        },
      ]);
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};
