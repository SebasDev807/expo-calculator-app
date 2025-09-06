import { globalStyles } from '@/styles/global-styles'
import { useFonts } from 'expo-font'
import * as NavigationBar from 'expo-navigation-bar'
import { Slot } from 'expo-router'
import React from 'react'
import { Platform, StatusBar, View } from 'react-native'


//Color de barra de navegación en android
const isAndroid = Platform.OS === 'android';

if (isAndroid) NavigationBar.setBackgroundColorAsync('black');

//rnfe: exportación por defecto
const RootLayout = () => {

  //Hook para personalizar fuentes
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  //Verificar si la fuente esta cargada
  if (!loaded) return null;


  return (
    <View style={globalStyles.background}>

      {/* Mostrar rutas hijas */}
      <Slot />

      <StatusBar barStyle='light-content' />

    </View>
  )
}

export default RootLayout