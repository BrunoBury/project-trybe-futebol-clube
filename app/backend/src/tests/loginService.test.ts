import * as sinon from 'sinon';
// @ts-ignore
import { expect } from 'chai';
import * as bcrypt from 'bcryptjs';

import SequelizeUserModel from '../database/models/userLoginModel';
import userLoginModel from '../Models/userLoginModel';
import userLoginService from '../Service/userLoginService';

describe('UserLoginService', function () {
    afterEach(function () {
      sinon.restore();
    });
  
    it('Should authenticate user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
      };
      const hashedPassword = await bcrypt.hash('password123', 10);
  
      const userStub = {
        email: userData.email,
        password: hashedPassword,
      };
  
      const findOneStub = sinon.stub(SequelizeUserModel, 'findOne').resolves(userStub as any);
  
      const authenticatedUser = await userLoginService.authenticateUser(userData.email, userData.password);
  
      sinon.assert.calledOnce(findOneStub);
      expect(authenticatedUser).to.deep.equal(userStub);
    });
    it('Should return role for a valid user', async () => {
        sinon.stub(userLoginModel, 'getRole').resolves('admin');
        const role = await userLoginService.getRole('test@example.com');
        expect(role).to.equal('admin');
      });
    
      it('Should return null if no role found for user', async () => {
        sinon.stub(userLoginModel, 'getRole').resolves(null);
        const role = await userLoginService.getRole('test@example.com');
        expect(role).to.equal(null);
      });
    });