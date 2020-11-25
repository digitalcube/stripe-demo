import { Controller, Get, Param, Put } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('products')
  public listPlans() {
    return this.appService.listProducts()
  }
  @Get('products/prices')
  public listPrices() {
    return this.appService.listPrices()
  }
  @Put('customers')
  public async createCustomer() {
    const customer = await this.appService.createCustomer()
    return {
      customerId: customer.id,
    }
  }

  @Put('customers/:customer_id/billing/portal')
  public async launchBillingPortal(
    @Param('customer_id') customerId: string
  ) {
    const result = await this.appService.launchPortal({
      customer: customerId
    })
    return result
  }
  @Put('customers/:customer_id/subscriptions/sample')
  public async createSampleSubscription(@Param('customer_id') customerId: string) {

  }
}
