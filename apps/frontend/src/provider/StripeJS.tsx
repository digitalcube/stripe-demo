import React, { FC, ReactNode, createContext, useState, useEffect, useContext } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'

const StripeJSContext = createContext<{
    hasLoaded: boolean;
    stripe?: Stripe;
}>({
    hasLoaded: false,
})

export const useStripeJS = () => {
    const data = useContext(StripeJSContext)
    return data
}

export const StripeJSProvider: FC<ReactNode> = ({children}) => {
    const [stripe, setStripe] = useState<Stripe>(undefined)
    const [hasLoaded, isLoaded] = useState(false)
    useEffect(() => {
        if (hasLoaded || stripe) return;
        loadStripe('pk_test_51HrEr5DOP6RCnWSqIQsgJzgbhX7QSo5tORZL8lhQpqBMDk85SSoCiyUA6fmCxt3WyILrSSU0L3QlFVb0nKhfMbje00UOSx9yyA')
        .then(client => {
            setStripe(client)
            isLoaded(true)
        }).catch((e: Error) => {
            alert(`${e.name}: ${e.message}`)
        })
    }, [hasLoaded])
    return (
        <StripeJSContext.Provider
            value={{
                hasLoaded,
                stripe,
            }}
            children={children}
        />
    )
}