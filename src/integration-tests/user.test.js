const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const { MongoClient } = require('mongodb');
const { dbConnect, dbDisconnect } = require('./connectionMock');
const app = require('../api/app');

describe('POST /users', () => {

  before(async () => {
    connectionMock = await dbConnect();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => await dbDisconnect());
  
  describe('quando cadastrado com sucesso', () => {
    let response;
    const DB_NAME = 'Cookmaster';
    const USERS_COLLECTION = 'users';

    before(async () => {
      await connectionMock.db(DB_NAME).collection(USERS_COLLECTION).deleteMany({});
      
      response = await chai.request(app)
      .post('/users')
      .send({
        name: 'Batista',
        email: 'brunobatista@gmail.com',
        password: '123456789'
      });
    });

    it('retorna o código status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('a propriedade "user" não deve estar vazia', () => {
      expect(response.body.user).to.be.not.empty;
    });
  });
});
