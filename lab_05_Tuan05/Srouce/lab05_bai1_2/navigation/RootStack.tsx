import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SmartphoneDetail from "../components/SmartphoneDetail";
import ColorPicker from "../components/ColorPicker";
import { fetchSmartphones } from "../data/api";
import { mapSmartphoneFromApi, SmartphoneData, SmartphoneColor } from "../data/mapApiToLocal";
import { ActivityIndicator, View, Text } from "react-native";

export type RootStackParamList = {
  Detail: { selectedColor?: SmartphoneColor | null; smartphone: SmartphoneData };
  ColorPicker: { selectedColor?: SmartphoneColor | null; smartphone: SmartphoneData };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const [selectedColor, setSelectedColor] = useState<SmartphoneColor | null>(null);
  const [smartphones, setSmartphones] = useState<SmartphoneData[]>([]);
  const [selectedSmartphone, setSelectedSmartphone] = useState<SmartphoneData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSmartphones()
      .then(apiList => setSmartphones(apiList.map(mapSmartphoneFromApi)))
      .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (smartphones.length > 0) {
      setSelectedSmartphone(smartphones[0]);
      setSelectedColor(null);
    }
  }, [smartphones]);

  if (loading) {
    return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size="large" /></View>;
  }

  if (!selectedSmartphone) {
    return <View><Text>Không có smartphone!</Text></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Detail" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Detail">
          {({ navigation }) => (
            <SmartphoneDetail
              smartphone={selectedSmartphone}
              selectedColor={selectedColor}
              onPressChooseColor={() =>
                navigation.navigate("ColorPicker", { selectedColor, smartphone: selectedSmartphone })
              }
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ColorPicker">
          {({ navigation, route }) => (
            <ColorPicker
              smartphone={route.params?.smartphone ?? selectedSmartphone}
              selectedColor={selectedColor}
              onSelectColor={(color) => setSelectedColor(color)}
              onDone={() => navigation.navigate("Detail")}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;