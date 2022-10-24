import { Request, Response } from 'express';
import { CoreMiddleware } from '../../../middlewares/core/core.middleware';

export class Payment extends CoreMiddleware {
	constructor(app, private response, private helper, private stripePayment) {
		super(app);
	}

	get services() {
		return {
			'POST /checkout': 'checkout',
		};
	}

	/**
	 * @api {get} /main/checkout payment checkout
	 * @apiVersion 1.0.0
	 * @apiName checkout
	 * @apiGroup MAIN
	 * @apiPermission all
	 *
	 * @apiDescription payment checkout using stripe
	 */
	checkout(req: Request, res: Response): void {
		const testData = [{ price: 10000, name: 'domain', quantity: 1 }];

		return this.stripePayment
			.createPayment(testData, 'usd')
			.then((checkoutResponse: any) => {
				console.log(checkoutResponse, this.helper.stripeSuccessUrl);
				return this.response.success(res, 'checkout', checkoutResponse.url);
			})
			.catch((error: any) => this.response.failed(res, 'checkout', error));
	}
}
