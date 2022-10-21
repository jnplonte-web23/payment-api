import * as supertest from 'supertest';
import { expect } from 'chai';

import app from '../../../../app';

describe('test component', () => {
	it('should be able to call test component', (done) => {
		supertest(app)
			.get('/v1/main/test?test=true')
			.set('x-payment-api-key', 'ak5RbXZueFhFalI3S1h3ZnVjZ2VyVGY2WXdaVjVBbXo1YXd3eGY1UEZna3BHcmIzUGw=')
			.expect('Content-Type', /json/)
			.expect(200, (err, res) => {
				if (err) {
					return done(err);
				}

				expect(res.body.status).to.equal('success');

				done();
			});
	});
});
