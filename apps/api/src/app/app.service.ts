import { Injectable } from '@nestjs/common';
import Stripe from 'stripe'

@Injectable()
export class AppService {
  private readonly stripe: Stripe
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: '2020-08-27'
    })
  }
  getData(): { message: string } {
    return { message: 'Welcome to api!aaa' };
  }
  listProducts() {
    return this.stripe.products.list()
  }
}
