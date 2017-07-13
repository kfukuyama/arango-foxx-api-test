'use strict';

const {
  EntryRepository,
} = require('../repositories/entry.repository');

const {
SUCCESS,
} = require('../shared/const');

class EntryHandler {
  /**
   * 
   * @param {EntryRepository} entryRepository 
   */
  constructor(entryRepository) {
    this.entryRepository = entryRepository;
    this.createEntries = this.createEntries.bind(this);
    this.getEntry = this.getEntry.bind(this);
    this.listEntries = this.listEntries.bind(this);
  }

  createEntries(req, res) {

    const multiple = Array.isArray(req.body);
    const body = multiple ? req.body : [req.body];
    const result = this.entryRepository.create(body);

    res.send(multiple ? result : result[0]);
  }

  getEntry(req, res) {
    const result = this.entryRepository.getByKeyOrId(req.pathParams.key);

    if (result.type === SUCCESS) {
      res.send(result.detail);
    } else {
      res.throw(404, 'The entry does not exist', e);
    }
  }

  listEntries(req, res) {
    const result = this.entryRepository.list();
    res.send(result.detail);
  }
}


module.exports = {
  EntryHandler,
};
