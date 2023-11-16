import * as sinon from 'sinon';
import * as chai from 'chai';
import { Request, Response} from 'express';
// @ts-ignore
import chaiHttp = require('chai-http');

import UserLoginService from '../Service/userLoginService';
import UserLoginController from '../Controller/userLoginController';
import emailValidationMiddleware from '../middleware/emailValidationMiddleware'

chai.use(chaiHttp);
const { expect } = chai;

describe('User Login Controller', function () {
  let authenticateUserStub: sinon.SinonStub;

  beforeEach(function () {
    authenticateUserStub = sinon.stub(UserLoginService, 'authenticateUser');
  });

  afterEach(function () {
    authenticateUserStub.restore();
  });


  it('Should return an error response for incorrect credentials', async () => {
    const req: Request = {
      body: { email: 'user@example.com', password: 'incorrectPassword' },
    } as Request;
    const res: Response = {
      status: (statusCode) => {
        expect(statusCode).to.equal(401);
        return {
          json: (data) => {
            expect(data).to.have.property('message', 'Invalid email or password');
          },
        };
      },
    } as Response;

    authenticateUserStub.resolves(undefined);

    await UserLoginController.authenticateUser(req, res);
});

it('Should return an error response for missing email or password', async () => {
    const req: Request = {
      body: {},
    } as Request;
    const res: Response = {
      status: (statusCode) => {
        expect(statusCode).to.equal(400);
        return {
          json: (data) => {
            expect(data).to.have.property('message', 'All fields must be filled');
          },
        };
      },
    } as Response;

    await UserLoginController.authenticateUser(req, res);
});

it('Should return an error response for missing email', async () => {
    const req: Request = {
      body: { password: 'password123' },
    } as Request;
    const res: Response = {
      status: (statusCode) => {
        expect(statusCode).to.equal(400);
        return {
          json: (data) => {
            expect(data).to.have.property('message', 'All fields must be filled');
          },
        };
      },
    } as Response;

    await UserLoginController.authenticateUser(req, res);
});

it('Should return an error response for missing password', async () => {
    const req: Request = {
      body: { email: 'user@example.com' },
    } as Request;
    const res: Response = {
      status: (statusCode) => {
        expect(statusCode).to.equal(400);
        return {
          json: (data) => {
            expect(data).to.have.property('message', 'All fields must be filled');
          },
        };
      },
    } as Response;

    await UserLoginController.authenticateUser(req, res);
  });
});

const mockNext = () => {};

describe('Email Validation Middleware', () => {
  it('Should allow valid email', (done) => {
    const req: Request = {
      body: { email: 'valid@example.com' },
    } as Request;
    const res: Response = {} as Response;

    emailValidationMiddleware(req, res, mockNext);

    expect(req.body.email).to.equal('valid@example.com');
    done();
  });

  it('Should reject invalid email', (done) => {
    const req: Request = {
      body: { email: 'invalid-email' },
    } as Request;
    const res: Response = {
      status: (statusCode) => {
        expect(statusCode).to.equal(401);
        return {
          json: (data) => {
            expect(data).to.have.property('message', 'Invalid email or password' );
            done();
          },
        };
      },
    } as Response;

    emailValidationMiddleware(req, res, mockNext);
  });
});