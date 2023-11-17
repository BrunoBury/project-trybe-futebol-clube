import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchesService from '../Service/matchesService';
import MatchesController from '../Controller/matchesController';
import { InterfaceMatches } from '../Interfaces/interfaceMatches';
import MatchesModel from '../Models/matchesModel';

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

  it('Should get all matches successfully', async () => {
   const req: Partial<Request> = { query: { inProgress: 'true' } };
   const res: Partial<Response> = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
  };

  const matchesMock: InterfaceMatches[] = [
    {
      id: 1,
      homeTeamId: 10,
      homeTeamGoals: 2,
      awayTeamId: 20,
      awayTeamGoals: 1,
      inProgress: true,
      homeTeam: { teamName: 'Home Team' },
      awayTeam: { teamName: 'Away Team' },
    },
  ]
  const getMatchesStub = sinon.stub(MatchesService, 'getMatchesByStatus').resolves(matchesMock);

  await MatchesController.getAllMatches(req as Request, res as Response);

  sinon.assert.calledOnce(getMatchesStub);
  sinon.assert.calledOnce(res.status as sinon.SinonStub);
  sinon.assert.calledWithExactly(res.status as sinon.SinonStub, 200);
  sinon.assert.calledWithExactly(res.json as sinon.SinonStub, matchesMock);
});

it('Should finish match successfully', async () => {
  const req: Partial<Request> = { params: { id: '1' } };
  const res: Partial<Response> = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };

  const finishMatchStub = sinon.stub(MatchesService, 'finishMatch').resolves(true);

  await MatchesController.finishMatch(req as Request, res as Response);

  sinon.assert.calledOnceWithExactly(finishMatchStub, 1);
  sinon.assert.calledOnce(res.status as sinon.SinonStub);
  sinon.assert.calledWithExactly(res.status as sinon.SinonStub, 200);
  sinon.assert.calledWithExactly(res.json as sinon.SinonStub, { message: 'Finished' });
});

it('Should handle updating match results not found', async () => {
  const req: Partial<Request> = {
    params: { id: '999' },
    body: { homeTeamGoals: 3, awayTeamGoals: 1 },
  };
  const res: Partial<Response> = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };

  const updateMatchResultsStub = sinon.stub(MatchesService, 'updateMatchResults').resolves(false);

  await MatchesController.updateMatchResults(req as Request, res as Response);

  sinon.assert.calledOnceWithExactly(updateMatchResultsStub, 999, {
    homeTeamGoals: 3,
    awayTeamGoals: 1,
  });
  sinon.assert.calledOnce(res.status as sinon.SinonStub);
  sinon.assert.calledWithExactly(res.status as sinon.SinonStub, 404);
  sinon.assert.calledWithExactly(res.json as sinon.SinonStub, { error: 'Partida não encontrada' });
});

describe('MatchesModel', () => { 
  describe('getAllMatches', () => {
    it('Should return an array of matches', async () => {
      const matches = await MatchesModel.getAllMatches();
      expect(matches).to.be.an('array');      
    });
  });

  
describe('getMatchesByStatus', () => {
    it('Should return an array of matches based on status', async () => {
      const inProgressMatches = await MatchesModel.getMatchesByStatus(true);
      expect(inProgressMatches).to.be.an('array');
     
    });
  });
});

describe('finishMatch', () => {
  it('Should finish a match successfully', async () => {
    
    const matchFinished = await MatchesModel.finishMatch(10);
    expect(matchFinished).to.equal(true);  
  });

  it('Should throw an error when match is not found', async () => {
    try {
      await MatchesModel.finishMatch(9999);
      throw new Error('Should have thrown an error');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).to.equal('Partida não encontrada');
      } else {
        throw new Error('Unexpected error type');
      }
    }
  });
 })
 describe('MatchesService', () => {
  describe('getAllMatches', () => {
    it('Should return an array of matches', async () => {
      const matchesMock = [
        { id: 1, homeTeamId: 10, awayTeamId: 20 },
        { id: 2, homeTeamId: 15, awayTeamId: 25 },
      ];

      sinon.stub(MatchesModel, 'getAllMatches').resolves(matchesMock as any);

      const matches = await MatchesService.getAllMatches();
      expect(matches).to.be.an('array');
    });
  });
});
describe('getMatchesByStatus', () => {
  it('Should return an array of matches based on status', async () => {
    const inProgressMatchesMock = [
      { id: 1, homeTeamId: 10, awayTeamId: 20 },
      { id: 2, homeTeamId: 15, awayTeamId: 25 },
    ];

    sinon.stub(MatchesModel, 'getMatchesByStatus').resolves(inProgressMatchesMock as any);

    const inProgressMatches = await MatchesService.getMatchesByStatus(true);
    expect(inProgressMatches).to.be.an('array');
  });
});
describe('updateMatchResults', () => {
  it('Should update match results successfully', async () => {
    sinon.stub(MatchesModel, 'updateMatchResults').resolves(true);

    const updated = await MatchesService.updateMatchResults(10, { homeTeamGoals: 3, awayTeamGoals: 1 });
    expect(updated).to.equal(true);
  });
 });
});