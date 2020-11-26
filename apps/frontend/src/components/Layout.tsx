import React, {  FC, ReactNode } from 'react';
import { shifter } from "@digitalcube/galaxy/src/themes/shifter"
import { ThemeProvider } from 'theme-ui'
import { Container, Copyright, FooterNav, Grid, Header,  } from '@digitalcube/galaxy'

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
          <Grid columns={[1, 2, null, null, 4]}>
          <FooterNav
            title="About"
            navItems={[{
              label: 'Company',
              href: 'https://www.digitalcube.jp/'
            }, {
                label: 'Service',
                href: 'https://www.digitalcube.jp/products/stripe/'
            }]}
          />
          <FooterNav
            title="Legal"
            navItems={[{
              label: 'プライバシーポリシー',
              href: 'https://www.digitalcube.jp/privacy_policy/'
            }]}
          />
          </Grid>
        </Container>
        <Copyright />
      </Container>
    </ThemeProvider>
  )