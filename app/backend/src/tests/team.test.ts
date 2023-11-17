import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../Models/teamsModel';
import teamMock from './mocks/teamMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', function() {
    afterEach(function() {
      sinon.restore();
    });
  
    it('Should return all teams and status ok', async () => {
        sinon.stub(TeamModel, 'getAllTeams').resolves(teamMock as any);
        const {status , body}= await chai.request(app).get('/teams');
        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(teamMock);
    });
    
    it('Should return a specific team by ID and status ok', async () => {
        const teamId = 1;
        sinon.stub(TeamModel, 'getTeamById').withArgs(teamId).resolves(teamMock[0] as any);
        const { status, body } = await chai.request(app).get(`/teams/${teamId}`);
        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(teamMock[0]);
    });
    
    it('Should handle internal server error in getAllTeams', async () => {
        sinon.stub(TeamModel, 'getAllTeams').rejects();
        const { status, body } = await chai.request(app).get('/teams');
        expect(status).to.be.equal(500);
        expect(body).to.be.deep.equal({ error: 'Internal Server Error' });
    });
    
    it('Should handle internal server error in getTeamById', async () => {
        const teamId = 1;
        sinon.stub(TeamModel, 'getTeamById').withArgs(teamId).rejects();
        const { status, body } = await chai.request(app).get(`/teams/${teamId}`);
        expect(status).to.be.equal(500);
        expect(body).to.be.deep.equal({ error: 'Internal Server Error' });
    });
});