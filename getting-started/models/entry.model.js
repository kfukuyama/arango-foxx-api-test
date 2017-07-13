'use strict';

const joi = require('joi');

module.exports = {
  createSchema: {
    name: joi.string().required(),
    age: joi.number().required(),
  },
};
