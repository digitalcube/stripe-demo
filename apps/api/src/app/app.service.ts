import { Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class AppService {
  private readonly stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: '2020-08-27',
    });
  }
  getData(): { message: string } {
    return { message: 'Welcome to api!aaa' };
  }
  public async listProducts() {
    const { data } = await this.stripe.products.list();
    const products = data.map(({ id, description, name, images }) => ({
      id,
      description,
      name,
      images,
    }));
    return products;
  }

  public async listPrices() {
    const products = await this.listProducts();
    const results = await Promise.all(
      products.map(async (product) => {
        const { data: prices } = await this.stripe.prices.list({
          product: typeof product === 'string' ? product : product.id,
        });
        return {
          ...product,
          prices: prices
            .filter((price) => price.active)
            .map(
              ({
                id,
                nickname,
                unit_amount,
                unit_amount_decimal,
                currency,
                recurring,
              }) => ({
                id,
                nickname,
                unit_amount,
                unit_amount_decimal,
                currency,
                recurring,
              })
            ),
        };
      })
    );
    return results;
  }

  public async launchPortal(
    params: Stripe.BillingPortal.SessionCreateParams,
    options?: Stripe.RequestOptions
  ) {
    return this.stripe.billingPortal.sessions.create(params, options);
  }

  public async getStripeCustomer(customerId: string) {
    const customer = await this.stripe.customers.retrieve(customerId);
    if (customer.deleted) throw new NotFoundException('No such customer');
    const { id, name } = customer as Stripe.Customer;
    return {
      id,
      name,
    };
  }

  public async getCustomerBySession(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    if (!session || !session.customer)
      throw new NotFoundException('No such customer');
    const customerId =
      typeof session.customer === 'string'
        ? session.customer
        : session.customer.id;
    return this.getStripeCustomer(customerId);
  }
}
