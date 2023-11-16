import * as sinon from 'sinon';
import * as chai from 'chai';
import { Request, Response } from 'express';
// @ts-ignore
import chaiHttp = require('chai-http');

import { verifyToken } from '../utils/jwt';
import validateTokenMiddleware from '../middleware/validateTokenMiddleware';


chai.use(chaiHttp);
const { expect } = chai;

describe('Token Validation Middleware', function () {
    let verifyTokenStub: sinon.SinonStub<[string], object>;   
    beforeEach(function () {
      verifyTokenStub = sinon.stub<[string], object>(); 
      verifyTokenStub.returns({}); 
    });
  
    afterEach(function () {
      verifyTokenStub.restore();
    });
  
  it('Should reject requests without a token', async () => {
    const req: Request = {
      headers: {},
    } as Request;
    const res: Response = {
      status: (statusCode) => {
        expect(statusCode).to.equal(401);
        return {
          json: (data) => {
            expect(data).to.have.property('message', 'Token not found');
          },
        };
      },
    } as Response;

    await validateTokenMiddleware(req, res, () => {});
    expect(verifyTokenStub.called).to.be.false;
  });

  it('Should reject requests with an invalid token', async () => {
    const req: Request = {
      headers: { authorization: 'Bearer invalidToken' },
    } as Request;
    const res: Response = {
      status: (statusCode) => {
        expect(statusCode).to.equal(401);
        return {
          json: (data) => {
            expect(data).to.have.property('message', 'Token must be a valid token');
          },
        };
      },
    } as Response;

    verifyTokenStub.throws(new Error('Invalid token'));

    await validateTokenMiddleware(req, res, () => {});
    expect(verifyTokenStub.calledOnce).to.be.true;
  });

  it('Should add payload to request body for valid token', async () => {
    const validPayload = { userId: '123', role: 'user' };
    const token = 'validToken';
    const req: Request = {
      headers: { authorization: `Bearer ${token}` },
      body: {},
    } as Request;
    const res: Response = {} as Response;

    verifyTokenStub.returns(validPayload);

    await validateTokenMiddleware(req, res, () => {});
    expect(verifyTokenStub.calledWith(token)).to.be.true;
    expect(req.body.payload).to.deep.equal(validPayload);
  });
});
