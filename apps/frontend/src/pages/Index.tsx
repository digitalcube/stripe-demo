import React, {FC, useCallback} from 'react'
import { Benefits, Card, Container, Content, Grid, Heading, PageHeader, Text, } from '@digitalcube/galaxy'
import { Button } from 'theme-ui'
import { StripePrice, StripeProduct, useListProductsHook } from '../hooks/products'
import { useStripeCheckout } from '../hooks/checkout';
import { useCustomerPortalHook } from '../hooks/portal';

const Price: FC<{
    price: StripePrice;
    product: Pick<StripeProduct, 'name' | 'description' | 'images'>
}> = ({price, product}) => {
    const { stripe, handleBuy} = useStripeCheckout(price.id)
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

const CustomerPortal: FC = () => {
    const url = useCustomerPortalHook()
    return (
        <>
        <PageHeader title="Stripe Customer Portal デモ" subtitle="シンプルな支払い管理ポータル" />
          <Container
            size="2"
            sx={{
              my: 4,
            }}
          >
            <Content
              sx={{
                a: {
                  color: 'primary',
                },
              }}
            >
            <p>
                StripeのCustomer IDとユーザー情報を紐付けすることで、その顧客向けのポータルページを用意することができます。<br/>
                すでに一度ご利用のブラウザでテスト商品を購入されている場合、この下に購入したプランの支払い情報や履歴などを確認・管理できるURLが表示されます。
            </p>
            <p><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
        </Content>
        </Container>
        </>
    )
}

export const PageIndex: FC = () => {
    const products = useListProductsHook()
    return (
        <>
        <Benefits
            title="Stripe Billing Demoサイトへようこそ"
            subtitle="Stripe Billing / Checkout / Customer Portalを体験しましょう！"
            img={<img src="./assets/Stripe-Hosted-Invoices.jpg" style={{maxWidth: '100%', height: 'auto'}} />}
            nodes={[{
                title: "Billingで定期課金をお手軽に",
                excerpt: 'Stripe Billingを使うことで、簡単かつ拡張しやすい形であなたのサービスに定期課金を組み込むことができます。'
            }, {
                title: "Checkoutでシンプル/セキュアな購入フロー",
                excerpt: 'Stripe CheckoutはStripeがホストする購入ページを利用できる仕組みです。自前で購入処理を実装する必要がなく、より手軽より安全に購入画面を導入できます。'
            }, {
                title: "支払い管理はCustomer Portalで",
                excerpt: "Customer Portalを使うことで、カード情報の更新や支払い履歴の確認・プラン変更などのユーザー操作画面を簡単に提供できます。"
            }]}
        />
        <PageHeader title="テスト商品一覧" subtitle="体験用のデモ商品です。クレジットカードはテスト用の番号「4242 4242 4242 4242」、年月やCVCはお好きな番号を入力してお試しください。"/>
        <Container size="4" sx={{py: 7, px: '5%'}}>
            <Grid columns={[1, null, 2, null, 3]}>
                {products.map(product => <Product product={product} key={product.id} />)}
            </Grid>
        </Container>
        <CustomerPortal />
        </>
    )
}