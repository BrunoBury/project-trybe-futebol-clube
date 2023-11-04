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
    it('Should return all teams and status ok', async () => {
        sinon.stub(TeamModel, 'getAllTeams').resolves(teamMock as any);
        const {status , body}= await chai.request(app).get('/teams');
        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(teamMock);
    });
});