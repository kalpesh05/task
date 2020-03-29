const tableName = "user";
//Database connectivity
const knex = require("../../include/database");

exports.findByUserEmail = async email => {
  let obj = {
    error: null,
    data: null
  };
  try {
    const data = await knex(tableName)
      .where("email", email)
      .limit(1);
    obj.data = data;
    return obj;
  } catch (error) {
    obj.error = error;
    return obj;
  }
};

exports.getByIdUser = async id => {
  let obj = {
    error: null,
    data: null
  };
  try {
    const data = await knex(tableName)
      .where({ id: id })
      .limit(1);
    obj.data = data;
    return obj;
  } catch (error) {
    obj.error = error;
    return obj;
  }
};
