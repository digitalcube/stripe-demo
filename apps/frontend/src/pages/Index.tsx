import React, {FC, useCallback} from 'react'
import { Card, Container, Grid, Heading, Text, } from '@digitalcube/galaxy'
import { Button } from 'theme-ui'
import { StripePrice, StripeProduct, useListProductsHook } from '../hooks/products'
import { useStripeJS } from '../provider/StripeJS';
import { SessionStorage } from '../classes/SessionStorage';

const Price: FC<{
    price: StripePrice;
    product: Pick<StripeProduct, 'name' | 'description' | 'images'>
}> = ({price, product}) => {
    const { stripe } = useStripeJS()
    const customerId = SessionStorage.getStripeCustomerId()
    const handleBuy = useCallback(() => {
        if (!stripe) return;
        stripe.redirectToCheckout({
            lineItems: [{
                price: price.id,
                quantity: 1
            }],
            mode: 'subscription',
            successUrl: 'http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}',
            cancelUrl: 'http://localhost:4200',
            clientReferenceId: customerId
        })
        .then((result) => {
            console.log(result)
          if (result.error) {
            console.log(result.error)
            alert(result.error.message)
          }
        }).catch(e => {
            console.log(e)
            alert(e.name + ': ' + e.message)
        });
    }, [stripe, customerId])
    return (
        <Card
            img={product.images ? product.images[0] : null}
        >
            <Heading as="h4" size="2">{price.nickname}</Heading>
            <Heading as="h2" size="5">{product.name}</Heading>
            <Text>{product.description}</Text>
            <Text sx={{fontSize: 'small'}}>
                {price.currency.toLocaleUpperCase()} {price.unit_amount.toLocaleString()}{' '}
                (per {price.recurring.interval_count} {price.recurring.interval})
            </Text>
            <Button type="button" sx={{
                display: 'block',
                width: '100%',
                padding: '10px',
                marginTop: '10px'
            }} disabled={!stripe} onClick={handleBuy} >Buy</Button>
        </Card>
    )
}

const Product: FC<{
    product: StripeProduct
}> = ({product}) => {
    return (
        <>
           {product.prices.map(price => (
               <Price
                   key={price.id}
                   price={price}
                   product={product}
                />
           ))}
        </>
    )
}

export const PageIndex: FC = () => {
    const products = useListProductsHook()
    return (
        <Container size="4" sx={{py: 7, px: '5%'}}>
            <Grid columns={[1, null, 2, null, 3]}>
                {products.map(product => <Product product={product} key={product.id} />)}
            </Grid>
        </Container>
    )
}