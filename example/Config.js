// @flow

import * as React from 'react';
import { Config } from 'react-native-adbmobile';

import Group from './Group';
import ConstantItem from './ConstantItem';
import ButtonItem from './ButtonItem';
import GetterItem from './GetterItem';

const toggler = (
  getter: () => Promise<boolean>,
  setter: boolean => void,
): (() => void) => () => {
  getter().then((value: boolean): void => setter(!value));
};

export default function(): React.Node {
  return (
    <Group title="Config">
      <ConstantItem title="version" contents={Config.version} />
      <GetterItem
        title="application type"
        getter={Config.getApplicationType}
        auto
      />
      <ButtonItem
        title="set application type"
        subtitle="wearable"
        action={(): void =>
          Config.setApplicationType(Config.ApplicationType.wearable)
        }
      />
      <ButtonItem
        title="set application type"
        subtitle="handheld"
        action={(): void =>
          Config.setApplicationType(Config.ApplicationType.handheld)
        }
      />
      <GetterItem
        title="privacy status"
        getter={Config.getPrivacyStatus}
        auto
      />
      <ButtonItem
        title="set privacy status"
        subtitle="opt in"
        action={(): void =>
          Config.setPrivacyStatus(Config.MobilePrivacyStatus.optIn)
        }
      />
      <ButtonItem
        title="set privacy status"
        subtitle="opt out"
        action={(): void =>
          Config.setPrivacyStatus(Config.MobilePrivacyStatus.optOut)
        }
      />
      <GetterItem
        title="user identifier"
        getter={Config.getUserIdentifier}
        auto
      />
      <ButtonItem
        title="set user identifier"
        subtitle="example"
        action={(): void => Config.setUserIdentifier('example')}
      />
      <GetterItem title="debug logging" getter={Config.getDebugLogging} auto />
      <ButtonItem
        title="toggle debug logging"
        action={toggler(Config.getDebugLogging, Config.setDebugLogging)}
      />
      <GetterItem
        title="lifetime value"
        getter={Config.getLifetimeValue}
        auto
      />
      <ButtonItem
        title="start collect lifecycle data"
        action={Config.collectLifecycleData}
      />
      <ButtonItem
        title="pause collect lifecycle data"
        action={Config.pauseCollectingLifecycleData}
      />
    </Group>
  );
}
