'use strict';

const {
  SUCCESS,
  ERROR,
} = require('../shared/const').results;

const {
  Result,
} = require('../shared/result');

const errors = require('@arangodb').errors;
const DOC_NOT_FOUND = errors.ERROR_ARANGO_DOCUMENT_NOT_FOUND.code;

class EntryRepository {

  /**
   * 
   * @param {Object} entriesColl entriesのCollection
   */
  constructor(entriesColl) {
    this.entriesColl = entriesColl;
  }

  /**
   * 
   * @param {Object} entries 
   */
  create(entries) {
    let data = [];
    for (const entry of entries) {
      const meta = this.entriesColl.save(entry);
      data.push(Object.assign(entry, meta));
    }

    return new Result(SUCCESS, data);
  }

  /**
   * 
   * @param {string} keyOrId 
   * @return {object}
   */
  getByKeyOrId(keyOrId) {
    try {
      const data = this.entriesColl.document(keyOrId);
      return new Result(SUCCESS, data);
    } catch (e) {
      if (!e.isArangoError || e.errorNum !== DOC_NOT_FOUND) {
        throw e;
      }
      return new Result(ERROR, e);
    }
  }

  list() {
    const data = this.entriesColl.all();
    return new Result(SUCCESS, data);
  }
}

module.exports = {
  EntryRepository,
};
