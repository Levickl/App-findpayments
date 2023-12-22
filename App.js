import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Repass from './src/pages/Repass';
import Consulta from './src/pages/Consultas';
import DemonstrativoScreen from './src/pages/Demonstrativo.js';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Feather from 'react-native-vector-icons/Feather';

const TabNavigator = ({ route }) => (
  <Tab.Navigator 
  screenOptions={{
    navigationBarHidden: true,
    headerBackVisible: false,
    headerTintColor: 'white',
    tabBarHideOnKeyboard: true,
    headerStyle:{
      backgroundColor: '#284A62',
    },
    tabBarInactiveTintColor: '#ffffff',
    tabBarStyle:{
      backgroundColor: '#284A62',
    },
    tabBarLabelStyle: {
      fontSize: 14,
    },
  }}>
    <Tab.Screen
    name='sHome'
    component={Home}
    options={{
      title: 'Home',
      tabBarIcon: ({ color, size }) => {
        return <Feather name="home" color={color} size={size} />
      }
    }}
    />
    
    <Tab.Screen
    name='Consulta'
    component={Consulta}
    initialParams={{ user: route.params?.params?.user }}
    options={{
      tabBarIcon: ({ color, size }) => {
        return <Feather name="file-text" color={color} size={size} />
      }
    }}
    />
  </Tab.Navigator>
);

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Login" 
        component={Login}
        options={{
          headerShown: false,  
        }}
        />
        <Stack.Screen 
        name="Home" 
        component={TabNavigator}
        options={{
          headerShown: false,
          navigationBarHidden: true,
          headerBackVisible: false,
          headerTintColor: 'white',
          headerStyle:{
            backgroundColor: '#284A62',
          }
        }}
        />
        
        <Stack.Screen 
        name="Demonstrativo" 
        component={DemonstrativoScreen}
        options={{
          navigationBarHidden: true,
          headerTintColor: 'white',
          headerStyle:{
            backgroundColor: '#284A62',
          }
        }}
        />

        <Stack.Screen 
        name="Repass" 
        component={Repass}
        options={{
        headerShown: false,
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}