// @flow

import * as React from 'react';
import { Button, Text, View } from 'react-native';

import styles from './styles';

type Value = string | number | boolean | null;

type Props = {
  auto?: boolean,
  getter: () => Promise<Value>,
  title: string,
};

type State = {
  contents: string | null,
  loading: boolean,
};

export default class GetterItem extends React.Component<Props, State> {
  static defaultProps = {
    auto: false,
  };

  state = {
    contents: null,
    loading: false,
  };

  componentDidMount() {
    if (this.props.auto) {
      this.callGetter();
    }
  }

  getValueView(): Text {
    if (this.state.loading) {
      return <Text style={styles.itemContentsLoading}>Loading...</Text>;
    } else if (this.state.value === null) {
      return <Text style={styles.itemContentsPlaceholder}>not called yet</Text>;
    }
    return <Text style={styles.itemContents}>{this.state.contents}</Text>;
  }

  callGetter = () => {
    this.setState({ loading: true });
    this.props.getter().then((contents: Value) => {
      this.setState({
        contents: contents === null ? '' : String(contents),
        loading: false,
      });
    });
  };

  render(): View {
    return (
      <View style={styles.item}>
        <View style={styles.itemGetterContainer}>
          <Text style={styles.itemTitle}>{this.props.title}</Text>
          {this.getValueView()}
        </View>
        <Button onPress={this.callGetter} title="GET!" />
      </View>
    );
  }
}
