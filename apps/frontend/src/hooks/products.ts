import { useEffect, useState } from 'react';
import { API } from '../classes/api';


export type StripePrice = {
    id: string;
    nickname: string;
    unit_amount: number;
    unit_amount_decimal: string;
    currency: string;
    recurring: {
      aggregate_usage: string | null;
      interval: string;
      interval_count: number;
      trial_period_days: number | null;
      usage_type: string;
    };
  };
  export type StripePrices = Array<StripePrice>;
  export type StripeProduct = {
    id: string;
    description: string;
    name: string;
    images: string[];
    prices: StripePrices;
  };
  export type StripeProducts = Array<StripeProduct>;

  export const useListProductsHook = () => {
    const [products, setProducts] = useState<StripeProducts>([]);
    useEffect(() => {
      fetch(API.create('products/prices'))
        .then((data) => data.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }, []);
    return products
}