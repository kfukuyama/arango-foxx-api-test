'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const {
  EntryHandler,
} = require('./entry.handler');

let dummyEntry = {
  name: 'hoge',
};

let baseReq = {
  body: {},
};

let baseRes = {
  send: () => {},
};

describe('EntryHandler', () => {
  let entryRepository = null;
  beforeEach(() => {
    entryRepository = {};
  });

  describe('createEntries', () => {
    describe('エントリが1つの場合', () => {
      it('リポジトリに作成依頼してレスポンスを1つ返していること', () => {
        // Arrange
        const req = {
          body: dummyEntry,
        };

        const res = {
          send: sinon.spy(),
        };

        const expectedResult = [{}];

        entryRepository.create = sinon.stub().returns(expectedResult);
        const handler = new EntryHandler(entryRepository);

        // Act
        handler.createEntries(req, res);

        // Assert
        expect(res.send.calledWith(expectedResult[0])).to.be.true;

      });
    });

    describe('エントリが複数の場合', () => {
      it('リポジトリに作成依頼してレスポンスを配列で返していること', () => {
        // Arrange
        const req = {
          body: [dummyEntry, dummyEntry],
        };

        const res = {
          send: sinon.spy(),
        };

        const expectedResult = [{}, {}];

        entryRepository.create = sinon.stub().withArgs(req.body).returns(expectedResult);
        const handler = new EntryHandler(entryRepository);

        // Act
        handler.createEntries(req, res);

        // Assert
        expect(res.send.calledWith(expectedResult)).to.be.true;

      });
    });
  });

});
