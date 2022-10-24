import { ApiResponse } from '../app/services/api-response/api-response.service';
import { Helper } from '../app/services/helper/helper.service';
import { StripePayment } from '../app/services/stripe-payment/stripe-payment.service';

import { Test } from '../app/v1/main/test/test.component';
import { Payment } from '../app/v1/main/payment/payment.component';

export function setup(app, config) {
	const response = new ApiResponse(),
		helper = new Helper(config),
		stripePayment = new StripePayment(config);

	app.version('v1/main', (appMain) => {
		appMain.use((req, res, next) => {
			res.startTime = new Date().getTime();
			if (
				typeof req.headers === 'undefined' ||
				helper.isEmpty(req.headers[config.secretKey]) ||
				Buffer.from(req.headers[config.secretKey], 'base64').toString('ascii') !== config.secretKeyHash
			) {
				return response.failed(res, 'token', '', 401);
			}

			next();
		});

		new Test(appMain, response);
		new Payment(appMain, response, helper, stripePayment);
	});

	return app;
}
