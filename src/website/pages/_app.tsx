import type { AppProps } from 'next/app'
import JPBProvider from '@jpbbots/theme'

import { store } from '../store'

import './Global.css'
import 'xterm/css/xterm.css'
import { Provider } from 'react-redux'
import { API } from '../structures/API'

export default function App({ Component, pageProps }: AppProps) {
  API

  return (
    <JPBProvider useCssReset useGlobalStyle brandColor="#0288d1">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </JPBProvider>
  )
}
