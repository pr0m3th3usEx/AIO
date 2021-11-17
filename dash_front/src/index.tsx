import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from 'app/App';
import theme from 'utils/theme';
import '@fontsource/titillium-web';
import { Provider } from 'react-redux';
import store from 'utils/store';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  document.getElementById('root'),
);
