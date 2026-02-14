import VerticalLayout from '@layouts/VerticalLayout'
import Providers from '@components/Providers'
import React, { } from 'react'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import HorizontalFooter from '@components/layout/horizontal/Footer'

import Navigation from '@components/layout/vertical/Navigation'
import HorizontalLayout from '@layouts/HorizontalLayout'

import Header from '@components/layout/horizontal/Header'

import ScrollToTop from '@core/components/scroll-to-top'
import LayoutWrapper from '@layouts/LayoutWrapper'
// MUI Imports
import Button from '@mui/material/Button'

type Props = ChildrenType & {
  params: Promise<{ lang: Locale }>
}


const App = function (props: Props) {
  const direction = 'ltr'
  const mode = null
  const systemMode = null
  const { children } = props
  return (
    <Providers direction={direction}>
      <VerticalLayout navigation={<Navigation mode={mode} />} navbar={<Navbar />} footer={<VerticalFooter />}>
            {children}
          </VerticalLayout>
      <ScrollToTop className='mui-fixed'>
        <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'>
          <i className='tabler-arrow-up' />
        </Button>
      </ScrollToTop>
    </Providers>
  )
}

export default App