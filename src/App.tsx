import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  useBackButton,
  useWebApp,
  useMainButton,
  useClosingBehaviour,
  useInitData,
  useCloudStorage
} from '@tma.js/sdk-react';

import './App.css';
import Chats from './pages/Chats.tsx';
import Profile from './pages/Profile.tsx';
import Swipe from './pages/Swipe.tsx';

function App() {
  const webApp = useWebApp();
  const initData = useInitData();
  const mainButton = useMainButton();
  const backButton = useBackButton();
  const cloudStorage = useCloudStorage();

  // const [count, setCount] = useState(0);
  const [storage, setStorage] = useState({});

  useClosingBehaviour();

  const Tab = createBottomTabNavigator();

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
    console.log(Object.keys(storage).length);

    mainButton.setText('Upload Photo');
    // mainButton.show();

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
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Swipe" component={Swipe} />
          <Tab.Screen name="Chats" component={Chats} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App
