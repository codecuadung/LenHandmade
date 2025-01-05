import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppContent from './src/navigation/AppContent'
import { ThemeProvider } from './src/utils/ThemeContext'
import store from './src/redux/store'
import { Provider } from 'react-redux';
const App = () => {
  return (
    <Provider store={store}>
    <ThemeProvider>
      <AppContent/>
      </ThemeProvider>
      </Provider>
  )
}

export default App

const styles = StyleSheet.create({})