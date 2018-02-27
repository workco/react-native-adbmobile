// @flow

import React from 'react';
import { Button, Text, View } from 'react-native';

import styles from './styles';

type Props = {
  action: () => void,
  actionTitle?: string,
  subtitle?: string,
  title: string,
};

export default function ButtonItem(props: Props): View {
  return (
    <View style={styles.item}>
      <View style={styles.itemSubContainer}>
        <Text style={styles.itemTitle}>{props.title}</Text>
        {props.subtitle && (
          <Text style={styles.itemContents}>{props.subtitle}</Text>
        )}
      </View>
      <Button
        title={props.actionTitle || 'DO!'}
        onPress={(): void => props.action()}
      />
    </View>
  );
}

ButtonItem.defaultProps = {
  actionTitle: 'DO!',
  subtitle: undefined,
};
