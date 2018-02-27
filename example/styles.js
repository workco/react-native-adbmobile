// @flow

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  group: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderRadius: 4,
    padding: 4,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  item: {
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 2,
    padding: 2,
  },
  itemTitle: {
    color: '#999999',
    fontSize: 12,
    textAlign: 'left',
  },
  itemContents: {
    color: '#333333',
    fontSize: 12,
  },
  itemSubContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  itemContentsPlaceholder: {
    color: '#AAAAAA',
    fontSize: 20,
  },
  itemContentsLoading: {
    color: '#AAAAAA',
    fontSize: 20,
  },
});

export default styles;
