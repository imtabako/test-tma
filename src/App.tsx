import { useEffect, useState } from 'react';
import {
  useBackButton,
  useWebApp,
  useMainButton,
  useClosingBehaviour,
  useInitData,
  useCloudStorage
} from '@tma.js/sdk-react';

import './App.css';

function App() {
  const webApp = useWebApp();
  const initData = useInitData();
  const mainButton = useMainButton();
  const backButton = useBackButton();
  const cloudStorage = useCloudStorage();

  const [count, setCount] = useState(0);
  const [storage, setStorage] = useState({});

  useClosingBehaviour();

  useEffect(() => {
    webApp.ready();

    /* get user init Data */
    console.log(initData);
    if (initData === null) {
      console.log('initData is null');
    }

    /* determine if user visits for the 1st time */
    cloudStorage.getKeys()
      .then(keys => {
        console.log('KEYS, len = ' + keys.length);
        console.log(keys);
        if (keys.length === 0) {
          return;
        }

        cloudStorage.getValues(keys)
          .then(result => {
            console.log('VALUES')
            console.log(result);
            setStorage(result);
            console.log(storage);

            for (const key in result) {
              const value = result[key];
              console.log(key + ': ' + value);
            }
          });
      });
    console.log('CloudStorage Done');
    console.log(storage);

    mainButton.setText('Upload Photo');
    mainButton.show();

    const listener = () => webApp.close();
    backButton.on('click', listener);
    backButton.show();

    return () => {
      backButton.off('click', listener);
      backButton.hide();
    };
    // We know, that backButton and webApp will never change,
    // but let's follow React rules.
  }, [backButton, cloudStorage, initData, mainButton, storage, webApp]);

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
