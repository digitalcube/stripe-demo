import { useCallback } from 'react';
import { SiteURL } from '../classes/URL';
import { useStripeJS } from '../provider/StripeJS';

export const useStripeCheckout = (priceId: string) => {
  const { stripe } = useStripeJS();
  const handleBuy = useCallback(() => {
    if (!stripe) return;
    stripe
      .redirectToCheckout({
        lineItems: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        successUrl: SiteURL.create('success/?session_id={CHECKOUT_SESSION_ID}'),
        cancelUrl: SiteURL.create(),
      })
      .then((result) => {
        if (result.error) {
          console.log(result.error);
          alert(result.error.message);
        }
      })
      .catch((e) => {
        console.log(e);
        alert(e.name + ': ' + e.message);
      });
  }, [stripe]);
  return {
    handleBuy,
    stripe,
  };
};
