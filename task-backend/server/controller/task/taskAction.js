const Joi = require("joi");

const {
  UNAUTHORIZED,
  DATABASE_INTERNAL
} = require("../../common/errorMessages");
const { insertTask, getTask } = require("../../models/taskmodel");
const { taskCreateSchema } = require("../apiValidation/validation");

const handleActions = async (req, res, next) => {
  const { action } = req.params;
  const body = req.body;
  const user = req.user[0];

  try {
    //  1.  Validate params
    await validate(action, body, user);

    //  2.  Action models
    const taskAction = await actionModels(action, body, user);

    //  3.  Response send
    res.send({
      data: taskAction
    });
  } catch (error) {
    //  Go to error handler
    return next(error);
  }
};

const validate = async (action, body, user) => {
  if (typeof action === "undefined") {
    throw new Error(UNAUTHORIZED);
  }

  if (typeof user.id === "undefined") {
    throw new Error(UNAUTHORIZED);
  }

  let validationSchema;

  switch (action) {
    case "create":
      validationSchema = taskCreateSchema;
      break;
  }

  if (typeof validationSchema !== "undefined") {
    const validateData = Joi.validate(body, validationSchema);

    if (validateData.error !== null) {
      throw new Error(validateData.error.message);
    }
  }
};

const actionModels = async (action, body, user) => {
  switch (action) {
    case "list":
      const taskListData = await taskList(body);
      return taskListData;

    case "create":
      const taskCreateData = await taskCreate(body);
      return taskCreateData;
  }
};

const taskList = async body => {
  const list = await getTask({});

  return list.data;
};

const taskCreate = async body => {
  const insertTaskObj = body;

  const taskInsert = await insertTask(insertTaskObj);

  if (taskInsert.error != null) {
    throw new Error(DATABASE_INTERNAL);
  }

  const taskData = await getTask({ id: taskInsert.data[0] });

  if (taskData.error != null) {
    throw new Error(DATABASE_INTERNAL);
  }

  return taskData.data[0];
};

exports.post = handleActions;
