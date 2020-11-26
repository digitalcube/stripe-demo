import React, {  FC, ReactChildren, ReactNode } from 'react';
import { shifter } from "@digitalcube/galaxy/src/themes/shifter"
import { ThemeProvider } from 'theme-ui'
import { Container, Content, Copyright, FooterNav, Grid, Header, Heading, PostHeader, } from '@digitalcube/galaxy'

export const Layout: FC<{
    children: ReactNode
}> = ({children}) => (
    <ThemeProvider theme={shifter as any}>
      <Header brand={<h1>Stripe Demo</h1>} href="/" nav={[[], [], []]} />
      {children}
      <Container as ="footer" size="3" sx={{
        pt: 7,
        px: '5%'
      }}>
        <Container as="footer">
          <Grid columns={[1, null, null, null, '4fr 8fr']}>
            <Content>
          <Heading size="4" as="h3">
              Say hello{' '}
              <span role="img" aria-label="Say hello waving hand">
                👋
              </span>
          </Heading>
          </Content>
          </Grid>
          <Grid columns={[1, 2, null, null, 4]}>
          <FooterNav
            title="Legal"
            navItems={[{
              label: 'プライバシーポリシー',
              href: '/'
            }]}
          />
          <FooterNav
            title="Legal"
            navItems={[{
              label: 'プライバシーポリシー',
              href: '/'
            }]}
          />
          </Grid>
        </Container>
        <Copyright />
      </Container>
    </ThemeProvider>
  )