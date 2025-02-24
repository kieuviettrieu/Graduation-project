import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/Store';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './variables.css';
import { LoadingProvider } from './LoadingProvider';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoadingProvider>
        <PayPalScriptProvider options={{ "client-id": "AeLU2w52yzZ091bAAEhB_n2quIcd-7EAOo4EVEa-WvG7DPZ3ceX7Q0GQ9WDoh9pjMzVdcpqs6qJUPOQj" }}>
          <App />
        </PayPalScriptProvider>
        </LoadingProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
