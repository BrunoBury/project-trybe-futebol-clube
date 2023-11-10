import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import UserModel from '../Models/userLoginModel'
import SequelizeUserModel from '../database/models/userLoginModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('User Login test', function () {
    let findOneStub: sinon.SinonStub;
  
    beforeEach(function () {
      findOneStub = sinon.stub(SequelizeUserModel, 'findOne');
    });
  
    afterEach(function () {
      findOneStub.restore();
    })

  it('Should return undefined for incorrect credentials', async () => {
    const email = 'user@example.com';
    const password = 'incorrectPassword';

    findOneStub.resolves(undefined);

    const authenticatedUser = await UserModel.authLoginUser(email, password);

    expect(authenticatedUser).to.be.undefined;
  });  
});
