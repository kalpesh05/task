const tableName = "task";
const knex = require("../../include/database");

exports.insertTask = async insertData => {
  let obj = {
    error: null,
    data: null
  };
  let knexTemp;
  try {
    const data = await knex(tableName)
      .insert(insertData)
      .into(tableName);
    obj.data = data;
    return obj;
  } catch (error) {
    obj.error = error;
    return obj;
  }
};
exports.updateTask = async (query, updateData) => {
  let obj = {
    error: null,
    data: null
  };

  try {
    const data = await knex(tableName)
      .where(query)
      .update(updateData);
    obj.data = data;
    return obj;
  } catch (error) {
    obj.error = error;
    return obj;
  }
};

exports.getTask = async query => {
  let obj = {
    error: null,
    data: null
  };

  try {
    const data = await knex(tableName).where(query);
    obj.data = data;
    return obj;
  } catch (error) {
    obj.error = error;
    return obj;
  }
};
