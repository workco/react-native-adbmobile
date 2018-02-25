// @flow

import { NativeModules } from 'react-native';

import type { ContextData } from 'common';

const { RNADBMobileConfig: Native } = NativeModules;

export type ApplicationType =
  | 'APPLICATION_TYPE_HANDHELD'
  | 'APPLICATION_TYPE_WEARABLE';
const applicationTypeValues: {|
  handheld: ApplicationType,
  wearable: ApplicationType,
|} = {
  handheld: Native.APPLICATION_TYPE_HANDHELD,
  wearable: Native.APPLICATION_TYPE_WEARABLE,
};

export type MobilePrivacyStatus =
  | 'MOBILE_PRIVACY_STATUS_OPT_IN'
  | 'MOBILE_PRIVACY_STATUS_OPT_OUT'
  | 'MOBILE_PRIVACY_STATUS_UNKNOWN';
const mobilePrivacyStatusValues: {|
  optIn: MobilePrivacyStatus,
  optOut: MobilePrivacyStatus,
  unknown: MobilePrivacyStatus,
|} = {
  optIn: Native.MOBILE_PRIVACY_STATUS_OPT_IN,
  optOut: Native.MOBILE_PRIVACY_STATUS_OPT_OUT,
  unknown: Native.MOBILE_PRIVACY_STATUS_UNKNOWN,
};

export class Config {
  static ApplicationType = applicationTypeValues;
  static MobilePrivacyStatus = mobilePrivacyStatusValues;

  static version: string = Native.version;

  static getVersion(): Promise<string> {
    return Promise.resolve(Config.version);
  }

  static getApplicationType(): Promise<ApplicationType> {
    return Native.getApplicationType();
  }

  // Android only. On iOS it's fixed if compiled for watchOS or iOS
  static setApplicationType(type: ApplicationType) {
    Native.setApplicationType(type);
  }

  static getPrivacyStatus(): Promise<MobilePrivacyStatus> {
    return Native.getPrivacyStatus();
  }

  static setPrivacyStatus(status: MobilePrivacyStatus) {
    Native.setPrivacyStatus(status);
  }

  static getUserIdentifier(): Promise<string> {
    return Native.getUserIdentifier();
  }

  static setUserIdentifier(identifier: string) {
    Native.setUserIdentifier(identifier);
  }

  static setPushIdentifier(registrationId: String) {
    Native.setPushIdentifier(registrationId);
  }

  static getDebugLogging(): Promise<boolean> {
    return Native.getDebugLogging();
  }

  static setDebugLogging(debugLogging: boolean) {
    Native.setDebugLogging(debugLogging);
  }

  static getLifetimeValue(): Promise<string> {
    return Native.getLifetimeValue();
  }

  // this is automatically done, only needed if
  // pauseCollectingLifecycleData() is used
  static collectLifecycleData(contextData?: ContextData) {
    Native.collectLifecycleData(contextData || null);
  }

  // Android only
  static pauseCollectingLifecycleData() {
    Native.pauseCollectingLifecycleData();
  }

  // Android only
  static setIconResourceIds(resourcesMap: { large?: number, small?: number }) {
    Native.setIconResourceIds(resourcesMap);
  }
}
