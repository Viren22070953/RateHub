const db = require("../config/db");
const userModel = require("./user.model");
const storeModel = require("./store.model");
const ratingModel = require("./ratings.model");

const models = [userModel, storeModel, ratingModel];

const initializeDatabase = async () => {
  for (const model of models) {
    await db.query(model.createTableQuery);
  }
};

module.exports = {
  initializeDatabase,
  models,
};
