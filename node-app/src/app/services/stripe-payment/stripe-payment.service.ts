import Stripe from 'stripe';

export class StripePayment {
	env: string = process.env.NODE_ENV || 'local';
	stripe: Stripe;

	constructor(private config) {
		this.stripe = new Stripe(config['api'][this.env]['keys']['stripe'], {
			apiVersion: '2022-08-01',
		});
	}

	createPayment(data: any, currency: string = 'usd') {
		return this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			line_items: data.map((dData) => {
				return {
					price_data: {
						currency: currency,
						product_data: {
							name: dData.name,
						},
						unit_amount: dData.price,
					},
					quantity: Number(dData.quantity),
				};
			}),
			success_url: this.config['api'][this.env]['endpoints']['stripeSuccessUrl'],
			cancel_url: this.config['api'][this.env]['endpoints']['stripeFailedUrl'],
		});
	}
}
