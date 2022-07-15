//
//  RNReadImage.m
//  MobileBillSplitter
//
//  Created by Jack Hughes on 20/06/2022.
//

#import "MBSReadImageModule.h"
#import <React/RCTLog.h>
#import <TesseractOCR/TesseractOCR.h>

#include <stdlib.h>

@implementation MBSReadImageModule {
  G8Tesseract *tesseract;
}

static int const MaximumSize = 750;

-(MBSReadImageModule*)init {
  self = [super init];
  
  tesseract = [[G8Tesseract alloc] initWithLanguage:@"eng"];
  tesseract.charWhitelist = @"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.=:£-/";
  
  return self;
}

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

// Solution for tranforming image found here https://stackoverflow.com/a/13545697
UIImage * transformImage (UIImage * image) {
  CGColorSpaceRef dColorSpace = CGColorSpaceCreateDeviceRGB();
  size_t dBytesPerRow = image.size.width * 4;
  unsigned char * imgData = (unsigned char*)malloc(image.size.height*dBytesPerRow);
  CGContextRef context =  CGBitmapContextCreate(imgData, image.size.width,
                                                image.size.height,
                                                8, dBytesPerRow,
                                                dColorSpace,
                                                kCGImageAlphaNoneSkipFirst);

  UIGraphicsPushContext(context);

  CGContextTranslateCTM(context, 0.0, image.size.height);
  CGContextScaleCTM(context, 1.0, -1.0);

  [image drawInRect:CGRectMake(0.0, 0.0, image.size.width, image.size.height)];
  UIGraphicsPopContext();

  CGImageRef newImage = CGBitmapContextCreateImage(context);
  UIImage * convertedImage = [[UIImage alloc] initWithCGImage:
                               newImage];

  CGImageRelease(newImage);
  CGContextRelease(context);
  CGColorSpaceRelease(dColorSpace);
  free(imgData);
  return convertedImage;
}

RCT_EXPORT_METHOD(processImage: (NSString *)imageLocation
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  UIImage *image = transformImage([UIImage imageWithContentsOfFile:imageLocation]);

  tesseract.image = image;
  [tesseract recognize];
  RCTLogInfo(@"%@", tesseract.recognizedText);
  resolve([tesseract.recognizedText componentsSeparatedByString:@"\n"]);
}

RCT_EXPORT_MODULE(ReadImageModule);

@end
