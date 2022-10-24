import { expect } from 'chai';
import { StripePayment } from './stripe-payment.service';
import { baseConfig } from '../../../config';

describe('stripe payment service', () => {
	let services;

	beforeEach((done) => {
		services = new StripePayment(baseConfig);
		done();
	});

	it('should get stripe object', (done) => {
		expect(services.stripe).to.exist;

		done();
	});
});
