//
//  AppDelegate.m
//  LK_ZCZ
//
//  Created by lee on 2018/9/11.
//  Copyright © 2018年 lee. All rights reserved.
//

#import "AppDelegate.h"

#import "PDRCore.h" //
#import "LK_ZCZ.h"
#import "ThreeLib_RongCloud.h"
@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    [LK_ZCZ getInstance];
    [ThreeLib_RongCloud getInstance];
    
    [PDRCore initEngineWihtOptions:launchOptions withRunMode:PDRCoreRunModeAppClient];

    return YES;
}



@end
