import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchesService from '../Service/matchesService';
import MatchesController from '../Controller/matchesController';

chai.use(chaiHttp);
const { expect } = chai;

describe("Matches Controller", function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Should handle internal server error', async () => {
    const req: Partial<Request> = { query: { inProgress: 'invalidValue' } };
    const res: Partial<Response> = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };

    const getAllMatchesStub = sinon.stub(MatchesService, 'getAllMatches').rejects();

    await MatchesController.getAllMatches(req as Request, res as Response);

    expect(getAllMatchesStub.called).to.be.true; 
    expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true; 
    expect((res.json as sinon.SinonStub).calledWith({ error: 'Internal server error' })).to.be.true; 
}); 
});