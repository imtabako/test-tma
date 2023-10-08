import React from 'react';
import { SDKProvider } from '@tma.js/sdk-react';

import App from "./App.tsx";

function Root() {
  return (
    <SDKProvider>
      <App/>
    </SDKProvider>
  );
}

export default Root
