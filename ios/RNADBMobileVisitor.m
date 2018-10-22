#import "RNADBMobileVisitor.h"
#import "ADBMobile.h"

#import <React/RCTUtils.h>

@implementation RNADBMobileVisitor

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
    return YES; // reason: constantsToExport
}

- (NSDictionary *)constantsToExport
{
    return @{@"AUTH_STATE_UNKNOWN": @"AUTH_STATE_UNKNOWN",
             @"AUTH_STATE_AUTHENTICATED": @"AUTH_STATE_AUTHENTICATED",
             @"AUTH_STATE_LOGGED_OUT": @"AUTH_STATE_LOGGED_OUT"};
}

static NSString *authenticationStateToString(ADBMobileVisitorAuthenticationState state) {
    switch (state) {
        case ADBMobileVisitorAuthenticationStateAuthenticated:
            return @"AUTH_STATE_AUTHENTICATED";
        case ADBMobileVisitorAuthenticationStateLoggedOut:
            return @"AUTH_STATE_LOGGED_OUT";
        case ADBMobileVisitorAuthenticationStateUnknown:
        default:
            return @"AUTH_STATE_UNKNOWN";
    }
}

static ADBMobileVisitorAuthenticationState authenticationStateFromString(NSString *str) {
    if ([str isEqualToString:@"AUTH_STATE_AUTHENTICATED"]) {
        return ADBMobileVisitorAuthenticationStateAuthenticated;
    } else if ([str isEqualToString:@"AUTH_STATE_LOGGED_OUT"]) {
        return ADBMobileVisitorAuthenticationStateLoggedOut;
    } else {
        return ADBMobileVisitorAuthenticationStateUnknown;
    }
}

RCT_EXPORT_METHOD(appendToURL:(nonnull NSString *)url resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
{
    NSURL *input = [NSURL URLWithString:url];
    NSURL *decoratedURL = [ADBMobile visitorAppendToURL:input];
    NSString *output = [decoratedURL absoluteString];

    resolver(output);
}

RCT_EXPORT_METHOD(getMarketingCloudId:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
{
    NSString *output = [ADBMobile visitorMarketingCloudID];

    resolver(output);
}

RCT_EXPORT_METHOD(getCustomerIDs:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)
{
    NSArray *array = [ADBMobile visitorGetIDs];

    if (!array) {
        rejecter(RCTErrorUnspecified, @"Unable to get visitor IDs", nil);
        return;
    }

    NSMutableArray *output = [[NSMutableArray alloc]initWithCapacity:[array count]];
    for (ADBVisitorID *visitor in array) {
        ADBMobileVisitorAuthenticationState state = [visitor authenticationState];
        NSString *authStateStr = authenticationStateToString(state);
        NSDictionary *dict = @{@"idType": [visitor idType],
                               @"id": [visitor identifier],
                               @"authState": authStateStr};
        [output addObject:dict];
    }

    resolver(output);
}

RCT_EXPORT_METHOD(setCustomerIDs:(nonnull NSArray *)input)
{
    for (NSDictionary *dict in input) {
        NSString *idType = dict[@"idType"];
        NSString *identifier = dict[@"id"];
        NSString *authStateStr = dict[@"authState"];
        ADBMobileVisitorAuthenticationState state = authenticationStateFromString(authStateStr);
        [ADBMobile visitorSyncIdentifierWithType:idType identifier:identifier authenticationState:state];
    }
}

@end
