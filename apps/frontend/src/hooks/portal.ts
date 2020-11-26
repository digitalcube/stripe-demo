import { useEffect, useState } from 'react';
import {SessionStorage } from '../classes/SessionStorage'
  
export const useCustomerPortalHook = () => {
    const customerId = SessionStorage.getStripeCustomerId()
    const [url, setPortalURL] = useState<string>(null);
    useEffect(() => {
        if (!customerId) return;
      fetch(`http://localhost:3333/api/customers/${customerId}/billing/portal`)
        .then((data) => data.json())
        .then((data) => {
          setPortalURL(data.url);
        })
        .catch((e) => {
          console.log(e);
        });
    }, [customerId]);
    return url
}