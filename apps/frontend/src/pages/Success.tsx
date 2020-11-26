import React, { FC, useEffect } from 'react';
import { Container, Content, PostHeader } from '@digitalcube/galaxy';
import { useCheckoutCustomerHook } from '../hooks/customer';
import { useCustomerPortalHook } from '../hooks/portal';

export const PageSuccess: FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  useCheckoutCustomerHook(sessionId);
  const portal = useCustomerPortalHook();
  return (
    <Container>
      <PostHeader
        title={'Thank You!!'}
        subtitle={'You complete to subscribe the plan!'}
      />
      <Container
        size="1"
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
          <p>You can check your subscription by the following URL</p>
          <p>
            <a href={portal} target="_blank" rel="noopener noreferrer">
              {portal}
            </a>
          </p>
          <p>
            The URL is temporary.When the URL expired, you need to create again.
          </p>
        </Content>
      </Container>
    </Container>
  );
};
