#import "RNADBMobileConfig.h"
#import "ADBMobile.h"
#import <AdSupport/ASIdentifierManager.h>

@implementation RNADBMobileConfig

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
    return YES; // reason: constantsToExport
}

- (NSDictionary *)constantsToExport
{
    return @{@"version": [ADBMobile version],
             @"APPLICATION_TYPE_HANDHELD": @"APPLICATION_TYPE_HANDHELD",
             @"APPLICATION_TYPE_WEARABLE": @"APPLICATION_TYPE_WEARABLE",
             @"MOBILE_PRIVACY_STATUS_OPT_IN": @"MOBILE_PRIVACY_STATUS_OPT_IN",
             @"MOBILE_PRIVACY_STATUS_OPT_OUT": @"MOBILE_PRIVACY_STATUS_OPT_OUT",
             @"MOBILE_PRIVACY_STATUS_UNKNOWN": @"MOBILE_PRIVACY_STATUS_UNKNOWN"};
}

RCT_EXPORT_METHOD(getApplicationType:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
{
    NSString *applicationTypeName;

#if TARGET_OS_WATCHOS
    applicationTypeName = @"APPLICATION_TYPE_WEARABLE";
#else
    applicationTypeName = @"APPLICATION_TYPE_HANDHELD";
#endif

    resolver(applicationTypeName);
}

RCT_EXPORT_METHOD(setApplicationType:(nonnull NSString *)appTypeName)
{
    NSLog(@"setApplicationType(%@) not supported on iOS", appTypeName);
}

RCT_EXPORT_METHOD(getPrivacyStatus:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
{
    NSString *statusName;
    switch ([ADBMobile privacyStatus]) {
        case ADBMobilePrivacyStatusOptIn:
            statusName = @"MOBILE_PRIVACY_STATUS_OPT_IN";
            break;
        case ADBMobilePrivacyStatusOptOut:
            statusName = @"MOBILE_PRIVACY_STATUS_OPT_OUT";
            break;
        default:
            statusName = @"MOBILE_PRIVACY_STATUS_UNKNOWN";
    }
    resolver(statusName);
}

RCT_EXPORT_METHOD(setPrivacyStatus:(nonnull NSString *)statusName)
{
    ADBMobilePrivacyStatus status;

    if ([statusName isEqualToString:@"MOBILE_PRIVACY_STATUS_OPT_IN"]) {
        status = ADBMobilePrivacyStatusOptIn;
    } else if ([statusName isEqualToString:@"MOBILE_PRIVACY_STATUS_OPT_OUT"]) {
        status = ADBMobilePrivacyStatusOptOut;
    } else {
        status = ADBMobilePrivacyStatusUnknown;
    }
    [ADBMobile setPrivacyStatus:status];
}

RCT_EXPORT_METHOD(getUserIdentifier:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
{
    resolver([ADBMobile userIdentifier]);
}

RCT_EXPORT_METHOD(setUserIdentifier:(nonnull NSString *)identifier)
{
    [ADBMobile setUserIdentifier:identifier];
}

RCT_EXPORT_METHOD(setPushIdentifier:(nonnull NSString *)registrationId)
{
    NSLog(@"setPushIdentifier() is not supported in JavaScript on iOS. Instead "
          "change `AppDelegate.m` and add the method "
          "`application:didRegisterForRemoteNotificationsWithDeviceToken` as below:\n\n"
          "  - (void) application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {\n"
          "      [ADBMobile setPushIdentifier:deviceToken];\n"
          "  }\n");
}

RCT_EXPORT_METHOD(getDebugLogging:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
{
    resolver([NSNumber numberWithBool:[ADBMobile debugLogging]]);
}

RCT_EXPORT_METHOD(setDebugLogging:(BOOL)debugLogging)
{
    [ADBMobile setDebugLogging:debugLogging];
}

RCT_EXPORT_METHOD(getLifetimeValue:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
{
    NSDecimalNumber *lifetimeValue = [ADBMobile lifetimeValue];
    if (!lifetimeValue) {
        resolver([NSNull null]);
        return;
    }
    resolver([lifetimeValue stringValue]);
}

RCT_EXPORT_METHOD(collectLifecycleData:(NSDictionary *)contextData)
{
    [ADBMobile collectLifecycleDataWithAdditionalData:contextData];
}

RCT_EXPORT_METHOD(pauseCollectingLifecycleData)
{
    NSLog(@"pauseCollectingLifecycleData() not supported on iOS");
}

RCT_EXPORT_METHOD(setIconResourceIds:(nonnull NSDictionary*)resourcesMap)
{
    NSLog(@"setIconResourceIds(%@) not supported on iOS", resourcesMap);
}

RCT_EXPORT_METHOD(setAdvertisingIdentifier:(nullable NSString *)idfa)
{
    if (idfa == nil || [idfa length] == 0) {
        idfa = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    }
    [ADBMobile setAdvertisingIdentifier:idfa];
}

@end
