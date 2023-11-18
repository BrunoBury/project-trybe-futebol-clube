import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeamModel from '../database/models/teamModel';
import checkTeams from '../middleware/matchesValidate';
import { app }  from '../app';


chai.use(chaiHttp);

const { expect } = chai;


type MockRequestBody = {
  body: {
    homeTeamId: number;
    awayTeamId: number;
  };
};


describe('CheckTeams Middleware', () => {
  let findByPkStub: sinon.SinonStub;

  beforeEach(() => {
    findByPkStub = sinon.stub(SequelizeTeamModel, 'findByPk');
  });

  afterEach(() => {
    findByPkStub.restore();
  });

  const mockRequest = {
    body: {
      homeTeamId: 1,
      awayTeamId: 1,
    },
  } as unknown as Request<Record<string, any>, any, MockRequestBody>;

  it('should return 422 if homeTeamId equals awayTeamId', async () => {
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as unknown as Response<any>;
    const next = sinon.spy(); 

    await checkTeams(
      mockRequest,
      res,
      next
    );

    sinon.assert.calledWith(res.status as sinon.SinonStub, 422);
  });
});