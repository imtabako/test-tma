import { useState } from 'react'
import {SDKProvider, useSDK, useBackButton, useWebApp, useMainButton} from '@tma.js/sdk-react';

import './App.css'

function App() {
  const mainButton = useMainButton();
  const backButton = useBackButton();
  const webApp = useWebApp();

  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App
