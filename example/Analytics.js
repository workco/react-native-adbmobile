// @flow

import * as React from 'react';
import { Analytics } from 'react-native-adbmobile';

import Group from './Group';
import ButtonItem from './ButtonItem';
import GetterItem from './GetterItem';

const aState = 'aState';
const aStateWithPayload = 'aStateWithPayload';
const anAction = 'anAction';
const anActionWithPayload = 'anActionWithPayload';
const aTimedAction = 'aTimedAction';
const aUUID = '90D6FDDA-C522-4141-A8E6-E31F6D579EE9';

const aPayload = {
  str: 'value1',
  int: 1,
  flt: 1.23,
  arr: [1, 2, 3],
};

const aLocation = {
  latitude: 1,
  longitude: 2,
  altitude: 3,
};

export default function(): React.Node {
  return (
    <Group title="Analytics">
      <ButtonItem
        title="track state"
        subtitle={aState}
        action={(): void => Analytics.trackState(aState)}
      />
      <ButtonItem
        title="track state"
        subtitle={aStateWithPayload}
        action={(): void => Analytics.trackState(aStateWithPayload, aPayload)}
      />
      <ButtonItem
        title="track action"
        subtitle={anAction}
        action={(): void => Analytics.trackAction(anAction)}
      />
      <ButtonItem
        title="track action"
        subtitle={anActionWithPayload}
        action={(): void =>
          Analytics.trackAction(anActionWithPayload, aPayload)
        }
      />
      <ButtonItem
        title="track location"
        subtitle={JSON.stringify(aLocation)}
        action={(): void => Analytics.trackLocation(aLocation, aPayload)}
      />
      <ButtonItem
        title="track beacon"
        subtitle={aUUID}
        action={(): void =>
          Analytics.trackBeacon(
            aUUID,
            '1',
            '2',
            Analytics.BeaconProximity.near,
            aPayload,
          )
        }
      />
      <ButtonItem title="clean beacon" action={Analytics.clearBeacon} />
      <ButtonItem
        title="increase lifetime value"
        subtitle="+1"
        action={(): void => Analytics.trackLifetimeValueIncrease(1, aPayload)}
      />
      <ButtonItem
        title="start timed action"
        subtitle={aTimedAction}
        action={(): void =>
          Analytics.trackTimedActionStart(aTimedAction, aPayload)
        }
      />
      <ButtonItem
        title="update timed action"
        subtitle={`${aTimedAction}, str='xyz'`}
        action={(): void =>
          Analytics.trackTimedActionUpdate(aTimedAction, { str: 'xyz' })
        }
      />
      <ButtonItem
        title="end timed action"
        subtitle={`${aTimedAction} (logic: none)`}
        action={(): void => Analytics.trackTimedActionEnd(aTimedAction)}
      />
      <ButtonItem
        title="end timed action"
        subtitle={`${aTimedAction} (logic: log + true)`}
        action={(): void =>
          Analytics.trackTimedActionEnd(
            aTimedAction,
            (start: Date, end: Date, data: Object): boolean => {
              console.log('start:', start, 'end:', end, 'data:', data); // eslint-disable-line no-console
              return true;
            },
          )
        }
      />
      <ButtonItem
        title="end timed action"
        subtitle={`${aTimedAction} (logic: log + false)`}
        action={(): void =>
          Analytics.trackTimedActionEnd(
            aTimedAction,
            (start: Date, end: Date, data: Object): boolean => {
              console.log('start:', start, 'end:', end, 'data:', data); // eslint-disable-line no-console
              return false;
            },
          )
        }
      />
      <GetterItem
        title="exists timed action"
        subtitle={aTimedAction}
        getter={(): Promise<boolean> =>
          Analytics.trackingTimedActionExists(aTimedAction)
        }
        auto
      />
      <GetterItem
        title="tracking identifier"
        getter={Analytics.getTrackingIdentifier}
        auto
      />
      <GetterItem title="queue size" getter={Analytics.getQueueSize} auto />
      <ButtonItem title="clear queue" action={Analytics.clearQueue} />
      <ButtonItem title="send queued hits" action={Analytics.sendQueuedHits} />
    </Group>
  );
}
