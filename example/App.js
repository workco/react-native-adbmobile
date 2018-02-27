/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

import Config from './Config';
import Analytics from './Analytics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

type Props = {};
export default class App extends React.Component<Props> {
  render(): View {
    return (
      <ScrollView>
        <Text style={styles.title}>
          React Native Example:{'\n'}
          Adobe Mobile Services
        </Text>
        <Config />
        <Analytics />
      </ScrollView>
    );
  }
}
