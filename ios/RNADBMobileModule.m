#import "RNADBMobileModule.h"
#import <React/RCTLog.h>

@implementation RNADBMobile

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
    return @{@"myConstant": @"value"};
}

RCT_EXPORT_METHOD(myMethod:(NSString *)arg)
{
    RCTLogInfo(@"myMethod: %@", arg);
}

@end
