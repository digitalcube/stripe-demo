import { Controller, Get, Param, Put } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('products/prices')
  public listPrices() {
    return this.appService.listPrices()
  }

  @Get('customers/:customer_id')
  public async getCustomer(
    @Param('customer_id') customerId: string
  ) {
    return this.appService.getStripeCustomer(customerId)
  }
  @Get('sessions/:session_id/customer')
  public async getCustomerBySession(
    @Param('session_id') sessionId: string
  ) {
    return this.appService.getCustomerBySession(sessionId)
  }

  @Get('customers/:customer_id/billing/portal')
  public async launchBillingPortal(
    @Param('customer_id') customerId: string
  ) {
    const result = await this.appService.launchPortal({
      customer: customerId
    })
    return result
  }
}
