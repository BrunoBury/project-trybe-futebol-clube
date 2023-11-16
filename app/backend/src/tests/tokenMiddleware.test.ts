import * as sinon from 'sinon';
import * as chai from 'chai';
import { Request, Response } from 'express';
// @ts-ignore
import chaiHttp = require('chai-http');

import * as jwt from '../utils/jwt';
import validateTokenMiddleware from '../middleware/validateTokenMiddleware';


chai.use(chaiHttp);
const { expect } = chai;

describe('Token Validation Middleware', function () {
  let verifyTokenStub: sinon.SinonStub<[string], any>;   
  beforeEach(function () {
      verifyTokenStub = sinon.stub(jwt, 'verifyToken');
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
});