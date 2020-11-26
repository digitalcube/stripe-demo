export class SessionStorage {
  public static setStripeCustomerId(customerId: string) {
    window.sessionStorage.setItem('dc-stripe-demo-customer-id', customerId);
  }
  public static getStripeCustomerId(): string {
    return window.sessionStorage.getItem('dc-stripe-demo-customer-id');
  }
}
