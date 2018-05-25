#import "RNADBMobileAnalytics.h"
#import "ADBMobile.h"
#import <CoreLocation/CoreLocation.h>

@implementation RNADBMobileAnalytics

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
    return YES; // reason: constantsToExport
}

- (NSDictionary *)constantsToExport
{
    return @{@"PROXIMITY_IMMEDIATE": @"PROXIMITY_IMMEDIATE",
             @"PROXIMITY_NEAR": @"PROXIMITY_NEAR",
             @"PROXIMITY_FAR": @"PROXIMITY_FAR",
             @"PROXIMITY_UNKNOWN": @"PROXIMITY_UNKNOWN"};
}

RCT_EXPORT_METHOD(trackState:(nonnull NSString *)state contextData:(NSDictionary *)contextData)
{
    [ADBMobile trackState:state data:contextData];
}

RCT_EXPORT_METHOD(trackAction:(nonnull NSString *)action contextData:(NSDictionary *)contextData) {
    [ADBMobile trackAction:action data:contextData];
}

RCT_EXPORT_METHOD(trackLocation:(NSDictionary *)coordinatesSpec contextData:(NSDictionary *)contextData)
{
    id objLat = coordinatesSpec[@"latitude"];
    id objLon = coordinatesSpec[@"longitude"];
    if (!objLat || !objLon) {
        NSLog(@"must provide latitude and longitude!");
        return;
    }
    double lat = [objLat doubleValue];
    double lon = [objLon doubleValue];

    id objAlt = coordinatesSpec[@"altitude"];
    double alt = objAlt ? [objAlt doubleValue] : 0;

    double vAccuracy = objAlt ? [coordinatesSpec[@"altitudeAccuracy"] doubleValue] : -1;
    double hAccuracy = [coordinatesSpec[@"accuracy"] doubleValue];
    double course = [coordinatesSpec[@"heading"] doubleValue];
    double speed = [coordinatesSpec[@"speed"] doubleValue];

    CLLocationCoordinate2D coord2d;
    coord2d.latitude = lat;
    coord2d.longitude = lon;

    CLLocation *location = [[CLLocation alloc]
                            initWithCoordinate:coord2d
                            altitude:alt
                            horizontalAccuracy:hAccuracy
                            verticalAccuracy:vAccuracy
                            course:course
                            speed:speed
                            timestamp:[NSDate date]];
    [ADBMobile trackLocation:location data:contextData];
}

RCT_EXPORT_METHOD(trackBeacon:(nonnull NSString *)uuid major:(nonnull NSString *)major minor:(nonnull NSString *)minor proximityName:(nonnull NSString *)proximityName contextData:(NSDictionary *)contextData)
{
    NSLog(@"trackBeacon() not supported on iOS. Meanwhile you can call\n\n"
          "  [ADBMobile trackBeacon:beacon data: contextData];\n\n"
          "From one of the CLLocationManager delegate methods, see:\n"
          "https://developer.apple.com/documentation/corelocation/determining_the_proximity_to_an_ibeacon");
}

RCT_EXPORT_METHOD(clearBeacon)
{
    [ADBMobile trackingClearCurrentBeacon];
}

RCT_EXPORT_METHOD(trackLifetimeValueIncrease:(double)amount contextData:(NSDictionary *)contextData)
{
    NSDecimalNumber *d = [[NSDecimalNumber alloc] initWithDouble:amount];
    [ADBMobile trackLifetimeValueIncrease:d data:contextData];
}

RCT_EXPORT_METHOD(trackTimedActionStart:(nonnull NSString *)action contextData:(NSDictionary *)contextData)
{
    [ADBMobile trackTimedActionStart:action data:contextData];
}

RCT_EXPORT_METHOD(trackTimedActionUpdate:(nonnull NSString *)action contextData:(NSDictionary *)contextData)
{
    [ADBMobile trackTimedActionUpdate:action data:contextData];
}

RCT_EXPORT_METHOD(trackTimedActionEnd:(nonnull NSString *)action hit:(BOOL)hit)
{
    [ADBMobile trackTimedActionEnd:action logic:^BOOL (NSTimeInterval inAppDuration, NSTimeInterval totalDuration, NSMutableDictionary *data) {
        return hit;
    }];
}

RCT_EXPORT_METHOD(trackingTimedActionExists:(nonnull NSString *)action resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
{
    resolver([NSNumber numberWithBool:[ADBMobile trackingTimedActionExists:action]]);
}

RCT_EXPORT_METHOD(getTrackingIdentifier:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
{
    resolver([ADBMobile trackingIdentifier]);
}

RCT_EXPORT_METHOD(getQueueSize:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    resolver([NSNumber numberWithUnsignedInteger:[ADBMobile trackingGetQueueSize]]);
}

RCT_EXPORT_METHOD(clearQueue)
{
    [ADBMobile trackingClearQueue];
}

RCT_EXPORT_METHOD(sendQueuedHits)
{
    [ADBMobile trackingSendQueuedHits];
}

@end
