import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '@/presentation/styles/Global'
import { defaultTheme } from '@/presentation/styles/themes/Default'
import { BrowserRouter } from 'react-router-dom'
import { Router } from '@/routes/Router'
import { Provider } from 'react-redux'
import { persistor, store } from './config/redux/Persistence'
import { PersistGate } from 'redux-persist/integration/react'

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <GlobalStyle />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
