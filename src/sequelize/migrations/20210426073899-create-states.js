module.exports = {
  up: async queryInterface => {
    try {
      await queryInterface.bulkInsert('State', [
        {
          ID: 1,
          Name: 'Queensland',
          Acronym: 'QLD',
        },
        {
          ID: 2,
          Name: 'New South Wales',
          Acronym: 'NSW',
        },
      ]);
      // await sequelize.query("INSERT INTO State (ID, Name, Acronym) Values (1, 'Queensland', 'QLD')");
      // await sequelize.query("INSERT INTO State (ID, Name, Acronym) Values (2, 'New South Wales', 'NSW')");
      // await sequelize.query("INSERT INTO City (Name, State_ID) values ('Brisbane', 1)");
      // await sequelize.query("INSERT INTO City (Name, State_ID) values ('Cairns', 1)");
      // await sequelize.query("INSERT INTO City (Name, State_ID) values ('Sydney', 2)");
      // await sequelize.query("INSERT INTO City (Name, State_ID) values ('Byron Bay', 2)");
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};
