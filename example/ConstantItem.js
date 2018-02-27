// @flow

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

type Props = {
  contents: string | number,
  title: string,
};

export default function ConstantItem(props: Props): View {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{props.title}</Text>
      <Text style={styles.itemContents}>{props.contents}</Text>
    </View>
  );
}
