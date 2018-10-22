// @flow

import { NativeModules } from 'react-native';

const { RNADBMobileVisitor: Native } = NativeModules;

type VisitorID = {|
  +authState: string,
  +id: string,
|};

type VisitorIDMap = { [string]: VisitorID };

export type AuthState =
  | 'AUTH_STATE_AUTHENTICATED'
  | 'AUTH_STATE_LOGGED_OUT'
  | 'AUTH_STATE_UNKNOWN';
const AuthStateValues: {|
  authenticated: AuthState,
  loggedOut: AuthState,
  unknown: AuthState,
|} = {
  authenticated: Native.AUTH_STATE_AUTHENTICATED,
  loggedOut: Native.AUTH_STATE_LOGGED_OUT,
  unknown: Native.AUTH_STATE_UNKNOWN,
};

export class Visitor {
  static AuthState = AuthStateValues;

  static appendToURL(url: string): Promise<string> {
    return Native.appendToURL(url);
  }

  static getMarketingCloudId(): Promise<string> {
    return Native.getMarketingCloudId();
  }

  static async getCustomerIDs(): Promise<VisitorIDMap> {
    const array = await Native.getCustomerIDs();
    const ret: VisitorIDMap = {}; // same format as ADBMobile JavaScript API
    array.forEach(({ authState, idType, id }: Object) => {
      ret[idType] = { authState, id };
    });
    return ret;
  }

  static setCustomerIDs(visitorIds: VisitorIDMap | { [string]: string }) {
    const array = [];
    Object.entries(visitorIds).forEach(([idType, value]: [string, any]) => {
      let id: string;
      let authState: string;
      if (typeof value === 'string') {
        // shorthand similar to JavaScript API
        id = value;
        authState = Visitor.AuthState.unknown;
      } else {
        ({ id, authState } = value);
        if (!authState) {
          authState = Visitor.AuthState.unknown;
        }
      }
      array.push({ authState, id, idType });
    });
    Native.setCustomerIDs(array);
  }
}
