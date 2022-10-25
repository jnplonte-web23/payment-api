import * as supertest from 'supertest';
import { expect } from 'chai';

import app from '../../../../app';

const apiKey: string = 'ak5RbXZueFhFalI3S1h3ZnVjZ2VyVGY2WXdaVjVBbXo1YXd3eGY1UEZna3BHcmIzUGw=';

describe('payment component', () => {
	it('should be able checkout using stripe', (done) => {
		supertest(app)
			.post('/v1/main/checkout?test=true')
			.set('x-payment-api-key', apiKey)
			.send({
				orderId: '111-222-333-444',
				userId: '1111111111111111',
				email: 'test@test.com',
				cart: [
					{
						price: 10000,
						name: 'domain',
						quantity: 1,
					},
				],
				successUrl: 'https://www.google.com/success',
				failedUrl: 'https://www.google.com/failed',
			})
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
