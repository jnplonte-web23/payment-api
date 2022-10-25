import Stripe from 'stripe';

export class StripePayment {
	env: string = process.env.NODE_ENV || 'local';
	stripe: Stripe;

	constructor(private config) {
		this.stripe = new Stripe(this.config['api'][this.env]['keys']['stripe'], {
			apiVersion: '2022-08-01',
		});
	}

	createPayment(
		data: any,
		referenceId: string = '',
		currency: string = 'usd',
		email: string,
		successUrl: string,
		failedUrl: string
	) {
		return this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			customer_email: email,
			client_reference_id: referenceId,
			line_items: data.map((dData) => ({
				price_data: {
					currency: currency,
					product_data: {
						name: dData.name,
					},
					unit_amount: dData.price,
				},
				quantity: Number(dData.quantity),
			})),
			success_url: `${successUrl}&session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: failedUrl,
		});
	}
}
