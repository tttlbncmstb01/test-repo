import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from '../screens/Welcome';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';

const Stack = createStackNavigator();
const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );

export default AuthNavigator;