'use strict';
const createRouter = require('@arangodb/foxx/router');
const router = createRouter();
module.context.use(router);

const entryModel = require('./models/entry.model');
const {
  EntryRepository,
} = require('./repositories/entry.repository');
const {
  EntryHandler,
} = require('./handlers/entry.handler');

const db = require('@arangodb').db;
const entriesColl = db._collection('myFoxxCollection');

const entryRepository = new EntryRepository(entriesColl);
const entryHandler = new EntryHandler(entryRepository);

const joi = require('joi');

router.post('/entries', entryHandler.createEntries)
  .body(joi.alternatives().try(
    joi.object(entryModel.createSchema).required(),
    joi.array().items(joi.object(entryModel.createSchema).required())
  ), 'Entry or entries to store in the collection.')
  .response(joi.alternatives().try(
    joi.object().required(),
    joi.array().items(joi.object().required())
  ), 'Entry or entries stored in the collection.')
  .summary('Store entry or entries')
  .description('Store a single entry or multiple entries ' +
    'in the "myFoxxCollection" collection.');

router.get('/entries/:key', entryHandler.getEntry)
  .pathParam('key', joi.string().required(), 'Key of the entry.')
  .response(joi.object().required(), 'Entry stored in the collection.')
  .summary('Retrieve an entry')
  .description('Retrieves an entry from the "myFoxxCollection" ' +
    'collection by key.');


router.get('/entries', entryHandler.listEntries)
  .response(joi.array().items(
    joi.array().items(joi.object().required())
  ).required(), 'List of entries.')
  .summary('List entries')
  .description('Assembles a list of entries in the collection.');
