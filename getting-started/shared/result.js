'use strict';

class Result {

  /**
   * 
   * @param {string} type 
   * @param {object} detail 
   */
  constructor(type, detail) {
    this.type = type;
    this.detail = detail;
  }

}

module.exports = {
  Result,
};
