import { useEffect, useMemo, useState } from 'react';
import {SessionStorage } from '../classes/SessionStorage'
export type StripeCustomer = {
    id: string;
    name: string;
}
  
export const useCustomerHook = () => {
    const customerId = SessionStorage.getStripeCustomerId()
    const [customer, setCustomer] = useState<StripeCustomer>(null);
    useEffect(() => {
        if (!customerId) return;
      fetch(`http://localhost:3333/api/customers/${customerId}`)
        .then((data) => data.json())
        .then((data) => {
          setCustomer(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }, [customerId]);
    return customer
}

export const useCheckoutCustomerHook = (sessionId: string) => {
    const [customer, setCustomer] = useState<StripeCustomer>(null);
    useEffect(() => {
        if (!sessionId) return;
      fetch(`http://localhost:3333/api/sessions/${sessionId}/customer`)
        .then((data) => data.json())
        .then((data) => {
          setCustomer(data);
          SessionStorage.setStripeCustomerId(data.id)
        })
        .catch((e) => {
          console.log(e);
        });
    }, [sessionId]);
    return customer

}