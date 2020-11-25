import React, { useCallback, useEffect, useMemo, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import {
  AppLayout,
  Button,
  Column,
  ColumnLayout,
  Container,
  Header,
  KeyValuePair,
  RadioButton,
  RadioGroup,
  Stack,
  Wizard,
} from 'aws-northstar';
import { WizardStep } from 'aws-northstar/components/Wizard/types';
import { StepClickDetail } from 'aws-northstar/components/Wizard';

class SessionStorage {
  public static setStripeCustomerId(customerId: string) {
    window.sessionStorage.setItem('dc-stripe-demo-customer-id', customerId);
  }
  public static getStripeCustomerId(): string {
    return window.sessionStorage.getItem('dc-stripe-demo-customer-id');
  }
}

const getWizardStep1 = (customerId?: string): WizardStep => {
  if (customerId) {
    return {
      title: 'Stripeに顧客情報を登録する',
      description:
        'Stripeカスタマーポータルを利用するには、Stripeに顧客情報を登録する必要があります。',
      content: (
        <p>
          すでにカスタマーを一度作成されています。Nextをクリックして、次に進みましょう。
        </p>
      ),
    };
  }
  return {
    title: 'Stripeに顧客情報を登録する',
    description:
      'Stripeカスタマーポータルを利用するには、Stripeに顧客情報を登録する必要があります。\nここではダミーのデータを一度作成し、ブラウザにそのカスタマーのIDを一時的に記録します。',
    content: <p>Nextをクリックして、次に進みましょう。</p>,
  };
};

const useWizardNextStepHandler = () => {
  const [portalUrl, setPortalURL] = useState('');
  const onNext = useCallback(
    (stepClickDetail: StepClickDetail) => {
      const customerId = SessionStorage.getStripeCustomerId();
      switch (stepClickDetail.requestedStepIndex) {
        case 1: {
          if (customerId) return true;
          fetch('http://localhost:3333/api/customers', {
            method: 'put',
          })
            .then((data) => data.json())
            .then((data) => {
              console.log(data);
              SessionStorage.setStripeCustomerId(data.customerId);
            })
            .catch((e) => {
              window.alert(e);
            });
          return true;
        }
        case 2: {
          if (!customerId) return false;
          fetch(
            'http://localhost:3333/api/customers/' +
              customerId +
              '/subscriptions/sample',
            {
              method: 'put',
            }
          ).catch((e) => {
            window.alert(e);
          });
          return true;
        }
        case 3: {
          if (!customerId) return false;
          fetch(
            'http://localhost:3333/api/customers/' +
              customerId +
              '/billing/portal',
            {
              method: 'put',
            }
          )
            .then((data) => data.json())
            .then((data) => {
              console.log(data);
              setPortalURL(data.url);
            })
            .catch((e) => {
              window.alert(e);
            });
          return true;
        }
        default:
          break;
      }
      return true;
    },
    [setPortalURL]
  );
  return {
    portalUrl,
    onNext,
  };
};

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

export function App() {
  const [products, setProducts] = useState<StripeProducts>([]);
  useEffect(() => {
    fetch('http://localhost:3333/api/products/prices')
      .then((data) => data.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const { onNext, portalUrl } = useWizardNextStepHandler();
  const customerId = SessionStorage.getStripeCustomerId();

  const steps: WizardStep[] = useMemo(() => {
    return [
      getWizardStep1(customerId),
      {
        title: '定期購読を開始する',
        description:
          'Stripeカスタマーポータルで管理するための定期購読プランを作成します。\nデモサイトですので、課金などは発生しません。',
        content: <p>Nextをクリックして、次に進みましょう。</p>,
      },
      {
        title: 'カスタマーポータルへのアクセスURLを作成する',
        description:
          'Stripeカスタマーポータルを利用するには、Stripeに顧客情報を登録する必要があります。',
        content: <p>Nextをクリックして、次に進みましょう。</p>,
      },
      {
        title: 'カスタマーポータルを開く',
        description: 'URLが作成できました！早速ポータルにアクセスしましょう！',
        content: (
          <>
            <code>{portalUrl}</code>
            <Button href={portalUrl} type="button" variant="link">
              ポータルへ移動する
            </Button>
          </>
        ),
      },
    ];
  }, [customerId, portalUrl]);
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.css file.
   */
  return (
    <AppLayout header={<Header title="Stripe Demo by Digitalcube" />}>
      <Container>
        <Wizard steps={steps} onNextButtonClick={onNext} />
        {portalUrl ? (
          <a href={portalUrl} target="_blank" rel="noopener">
            Portal
          </a>
        ) : null}
      </Container>
      <Container>
        <ColumnLayout>
          {products.map((product) => {
            return (
              <Column key={product.id}>
                <Stack>
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      style={{
                        height: 'auto',
                        maxWidth: '100%',
                      }}
                    />
                  ) : null}
                  <KeyValuePair label="Product name" value={product.name} />
                  <KeyValuePair
                    label="Description"
                    value={product.description}
                  />
                  <KeyValuePair
                    label="Prices"
                    value={
                      <RadioGroup
                        items={product.prices.map((price) => (
                          <RadioButton key={price.id} value={price.id}>
                            {price.nickname} <br />
                            {price.currency.toLocaleUpperCase()}{' '}
                            {price.unit_amount.toLocaleString()} /{' '}
                            {price.recurring.interval_count}{' '}
                            {price.recurring.interval}
                          </RadioButton>
                        ))}
                      />
                    }
                  />
                </Stack>
              </Column>
            );
          })}
        </ColumnLayout>
      </Container>
    </AppLayout>
  );
}

export default App;
