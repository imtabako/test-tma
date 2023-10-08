import { useEffect, useState } from 'react';
import { useBackButton, useWebApp, useMainButton } from '@tma.js/sdk-react';

import './App.css';

function App() {
  const webApp = useWebApp();
  const mainButton = useMainButton();
  const backButton = useBackButton();

  const [count, setCount] = useState(0)

  useEffect(() => {
    webApp.ready();

    const listener = () => webApp.close();
    backButton.on('click', listener);
    backButton.show();

    return () => {
      backButton.off('click', listener);
      backButton.hide();
    };
    // We know, that backButton and webApp will never change,
    // but let's follow React rules.
  }, [backButton, webApp]);

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
