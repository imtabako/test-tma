import { PropsWithChildren } from 'react';
import { SDKProvider, useSDK } from '@tma.js/sdk-react';
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";


/**
 * This component is the layer controlling the application display. It displays
 * application in case, the SDK is initialized, displays an error if something
 * went wrong, and a loader if the SDK is warming up.
 */
function Loader({children}: PropsWithChildren<{}>) {
  const {didInit, components, error} = useSDK();

  // There were no calls of SDK's init function. It means, we did not
  // even try to do it.
  if (!didInit) {
    return <div>SDK init function is not yet called.</div>;
  }

  // Error occurred during SDK init.
  if (error !== null) {
    return <div>Something went wrong.</div>;
  }

  // If components is null, it means, SDK is not ready at the
  // moment and currently initializing. Usually, it takes like
  // several milliseconds or something like that, but we should
  // have this check.
  if (components === null) {
    return <div>Warming up SDK.</div>;
  }

  // Safely render application.
  return <>{children}</>;
}

function Root() {
  return (
    <BrowserRouter>
      <SDKProvider>
        <Loader>
          <App/>
        </Loader>
      </SDKProvider>
    </BrowserRouter>
  );
}

export default Root
