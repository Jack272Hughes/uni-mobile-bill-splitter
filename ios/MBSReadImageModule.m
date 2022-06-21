//
//  RNReadImage.m
//  MobileBillSplitter
//
//  Created by Jack Hughes on 20/06/2022.
//

#import "MBSReadImageModule.h"
#import <React/RCTLog.h>
#include <stdlib.h>

@implementation MBSReadImageModule

RCT_EXPORT_METHOD(processImage: (NSString *)name
                  location: (NSString *)location
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  NSInteger randomInt = arc4random_uniform(100);
  if (randomInt) {
     resolve(@(randomInt));
   } else {
     reject(@"process_failure", @"no random number returned", nil);
   }
}

RCT_EXPORT_MODULE(ReadImageModule);

@end
