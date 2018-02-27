// @flow

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

type Props = {
  children: React.Node,
  title: string,
};

export default function ConstantItem(props: Props): View {
  return (
    <View style={styles.group}>
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </View>
  );
}
