'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const request = require('@arangodb/request');

const db = require('@arangodb').db;
const entriesColl = db._collection('myFoxxCollection');

const {
  MOUNT_POINT,
  TEST_ENDPOINT,
} = require('../conf');


describe('Entry E2E Test', () => {
  afterEach(() => {
    entriesColl.truncate();
  });

  it('エントリを取得できていること', () => {
    // Arrange
    const expectedData1 = {
      name: 'Name1',
      age: 10,
    };

    // データ投入
    request.post(`${TEST_ENDPOINT}/${MOUNT_POINT}/entries`, {
      body: expectedData1,
      json: true,
    });

    // Act
    const result = request.get(`${TEST_ENDPOINT}/${MOUNT_POINT}/entries`);

    // Assert
    expect(result.statusCode).to.equal(200);
    const body = JSON.parse(result.body);
    const actualData1 = body[0];
    expect(actualData1).has.ownProperty('_key');
    expect(actualData1).has.ownProperty('_id');
    expect(actualData1.name).to.equal(expectedData1.name);
    expect(actualData1.age).to.equal(expectedData1.age);

  });
});
