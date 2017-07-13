'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const {
  SUCCESS,
} = require('../shared/const').results;

const {
  EntryRepository,
} = require('./entry.repository');

describe('EntryRepository', () => {
  let entriesColl = {
    save: sinon.stub(),
    document: sinon.stub(),
  };

  describe('create', () => {
    it('コレクションに保存して結果をSUCCESSで返していること', () => {
      // Arrange
      const meta = {
        meta: 'meta',
      };
      entriesColl.save.returns(meta);

      const repository = new EntryRepository(entriesColl);
      const entries = [{
          name: 'hoge',
        },
        {
          name: 'moge',
        },
      ];

      // Act
      const result = repository.create(entries);

      // Assert
      expect(result.type).to.equal(SUCCESS);
      expect(result.detail[0].meta).to.equal(meta.meta);
      expect(result.detail[0].name).to.equal('hoge');

    });
  });

  afterEach(() => {
    entriesColl.save.reset();
    entriesColl.document.reset();
  });

});
