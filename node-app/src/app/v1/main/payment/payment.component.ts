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
	 *
	 * @apiParam (body) {String} orderId order id for reference <br/> Ex. `111-111-111-111`
	 * @apiParam (body) {String} email user email <br/> Ex. `test@test.com`
	 * @apiParam (body) {String} cart cart items <br/> Ex. `[{ price: 10000, name: 'domain', quantity: 1 }]`
	 * @apiParam (body) {String} successUrl payment success url <br/> Ex. `https://www.web23.io/success`
	 * @apiParam (body) {String} failedUrl payment failed url <br/> Ex. `https://www.web23.io/failed`
	 * @apiParam (body) {String} [currency=USD] currency
	 */
	checkout(req: Request, res: Response): void {
		const reqParameters = ['orderId', 'email', 'cart', 'successUrl', 'failedUrl'];
		if (!this.helper.validateData(req.body, reqParameters)) {
			return this.response.failed(res, 'data', reqParameters);
		}

		const data = req.body;
		const currency: string = data.currency ? data.currency.toLowerCase() : 'usd';

		return this.stripePayment
			.createPayment(data['cart'], data['orderId'], currency, data['email'], data['successUrl'], data['failedUrl'])
			.then((checkoutResponse: any) => this.response.success(res, 'checkout', checkoutResponse.url))
			.catch((error: any) => this.response.failed(res, 'checkout', error));
	}
}
