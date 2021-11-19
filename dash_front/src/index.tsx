import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from 'app/App';
import theme from 'utils/theme';
import '@fontsource/titillium-web';
import { Provider } from 'react-redux';
import { persistor, store } from 'utils/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ChakraProvider>,
  document.getElementById('root'),
);
