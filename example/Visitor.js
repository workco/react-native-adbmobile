// @flow

import * as React from 'react';
import { Visitor } from 'react-native-adbmobile';

import Group from './Group';
import ButtonItem from './ButtonItem';
import GetterItem from './GetterItem';

export default function(): React.Node {
  return (
    <Group title="Visitor">
      <GetterItem
        title="get customer ids"
        getter={Visitor.getCustomerIDs}
        auto
      />
      <GetterItem
        title="append to url"
        getter={(): Promise<string> =>
          Visitor.appendToURL('http://server.com/path')
        }
        auto
      />
      <GetterItem
        title="get marketing cloud id"
        getter={Visitor.getMarketingCloudId}
        auto
      />
      <ButtonItem
        title="set customer id"
        subtitle="userid: x, authenticated"
        action={(): void =>
          Visitor.setCustomerIDs({
            userid: { id: 'x', authState: Visitor.AuthState.authenticated },
          })
        }
      />
      <ButtonItem
        title="set customer id"
        subtitle="userid: y, logged out"
        action={(): void =>
          Visitor.setCustomerIDs({
            userid: { id: 'y', authState: Visitor.AuthState.loggedOut },
          })
        }
      />
      <ButtonItem
        title="set customer id"
        subtitle="userid: x / puuid: 123"
        action={(): void =>
          Visitor.setCustomerIDs({
            userid: 'x',
            puuid: '123',
          })
        }
      />
    </Group>
  );
}
