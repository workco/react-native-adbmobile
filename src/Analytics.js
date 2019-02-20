// @flow

import { NativeModules } from 'react-native';

import type { ContextData } from 'common';

const { RNADBMobileAnalytics: Native } = NativeModules;

type TimedAction = {|
  action: string,
  data: Object,
  timestamp: Date,
|};
const timedActions: { [string]: TimedAction | null } = {};

const newTimedAction = (
  action: string,
  data?: Object,
  now?: Date,
): TimedAction => {
  const ta = Object.freeze({
    action,
    data: Object.freeze(data || {}),
    timestamp: now || new Date(),
  });
  timedActions[action] = ta;
  return ta;
};

const updatedTimedAction = (action: string, data?: Object): TimedAction => {
  const prev = timedActions[action] || {};
  return newTimedAction(
    action,
    Object.assign({}, prev.data, data),
    prev.timestamp,
  );
};

export type BeaconProximity =
  | 'PROXIMITY_FAR'
  | 'PROXIMITY_IMMEDIATE'
  | 'PROXIMITY_NEAR'
  | 'PROXIMITY_UNKNOWN';
const beaconProximityValues: {|
  far: BeaconProximity,
  immediate: BeaconProximity,
  near: BeaconProximity,
  unknown: BeaconProximity,
|} = {
  far: Native.PROXIMITY_FAR,
  immediate: Native.PROXIMITY_IMMEDIATE,
  near: Native.PROXIMITY_NEAR,
  unknown: Native.PROXIMITY_UNKNOWN,
};

// Similar to https://www.w3.org/TR/geolocation-API/#coordinates_interface
type Coordinates = {|
  accuracy?: number, // of latitude and longitude, in meters
  altitude?: number, // specified in meters above the [WGS84] ellipsoid
  altitudeAccuracy?: number, // in meters
  heading?: number, // in degrees: 0.0 to 360
  latitude: number, // in decimal degrees
  longitude: number, // in decimal degrees
  speed?: number, // horizontal component in meters per second
|};

export class Analytics {
  static BeaconProximity = beaconProximityValues;

  static trackState(state: string, contextData?: ContextData) {
    Native.trackState(state, contextData || null);
  }

  static trackAction(action: string, contextData?: ContextData) {
    Native.trackAction(action, contextData || null);
  }

  // iOS-only
  static trackAdobeDeepLink(url: string) {
    Native.trackAdobeDeepLink(url);
  }

  static trackLocation(coordinates: Coordinates, contextData?: ContextData) {
    Native.trackLocation(coordinates, contextData || null);
  }

  static trackBeacon(
    uuid: string,
    major: string,
    minor: string,
    proximity: BeaconProximity,
    contextData?: ContextData,
  ) {
    Native.trackBeacon(uuid, major, minor, proximity, contextData || null);
  }

  static clearBeacon() {
    Native.clearBeacon();
  }

  static trackLifetimeValueIncrease(amount: number, contextData?: ContextData) {
    Native.trackLifetimeValueIncrease(amount, contextData || null);
  }

  static trackTimedActionStart(action: string, contextData?: ContextData) {
    const ta = newTimedAction(action, contextData);
    Native.trackTimedActionStart(action, ta.data);
  }

  static trackTimedActionUpdate(action: string, contextData?: ContextData) {
    const ta = updatedTimedAction(action, contextData);
    Native.trackTimedActionUpdate(action, ta.data);
  }

  // logic takes start + end Date object and the accumulated contextData,
  // with the summary of contextData passed to trackTimedActionStart() and
  // trackTimedActionUpdate().
  static trackTimedActionEnd(
    action: string,
    logic?: (start: Date, end: Date, data: Object) => boolean,
  ) {
    const now = new Date();
    const ta = timedActions[action] || newTimedAction(action, {}, now);
    const hit: boolean = logic ? logic(ta.timestamp, now, ta.data) : true;
    Native.trackTimedActionEnd(action, hit);
  }

  static trackingTimedActionExists(action: String): Promise<boolean> {
    return Native.trackingTimedActionExists(action);
  }

  static getTrackingIdentifier(): Promise<string> {
    return Native.getTrackingIdentifier();
  }

  static getQueueSize(): Promise<number> {
    return Native.getQueueSize();
  }

  static clearQueue() {
    Native.clearQueue();
  }

  static sendQueuedHits() {
    Native.sendQueuedHits();
  }
}
