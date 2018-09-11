//
//  LK_ZCZ.m
//  LK_ZCZ
//
//  Created by lee on 2018/9/11.
//  Copyright © 2018年 lee. All rights reserved.
//

#import "LK_ZCZ.h"


#import "LYH_H5WebAppViewController.h"
#import "AppDelegate.h"

@interface LK_ZCZ ()
@property (strong,nonatomic) AppDelegate *appDelegate;
@end

@implementation LK_ZCZ
+ (LK_ZCZ *)getInstance{
    static LK_ZCZ *sharedInstance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];
    });
    return sharedInstance;
}

- (id)init{
    if (self = [super init]) {
        AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
        self.appDelegate = appDelegate;
        NSLog(@"初始化h5");
        [self lyh_initWithAdd_H5App2Window];
        [self lyh_initWithH5_PDRCore];
    }
    return self;
}
/**
 1.创建window并且将h5App添加到window里面
 */
- (void)lyh_initWithAdd_H5App2Window
{
    self.appDelegate.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    LYH_H5WebAppViewController *vc = [[LYH_H5WebAppViewController alloc]init];
    self.appDelegate.nav = [[UINavigationController alloc]
                               initWithRootViewController:vc];
    self.appDelegate.window.rootViewController = self.appDelegate.nav;
    [self.appDelegate.window makeKeyAndVisible];
}
- (void)lyh_initWithH5_PDRCore
{
    // 初始化插件
    /**
     需要初始化插件,否则会出现黑屏状况
     */
    PDRCore* core = [PDRCore Instance];
    NSError *error = nil;
    NSString *JSPath = [[NSBundle mainBundle] pathForResource:@"Pandora/apps/HGDQtest/www/js/AppDelegate" ofType:@"js"];
    NSLog(@"%@",JSPath);
    NSString *logPluginJS = [NSString stringWithContentsOfFile:JSPath
                                                      encoding:NSUTF8StringEncoding
                                                         error:&error];
    [core regPluginWithName:@"HGDQPlugin" impClassName:@"HGDQPlugin" type:PDRExendPluginTypeFrame javaScript:logPluginJS];
    // 设置当前SDK运行模式
    // 设置当前SDK运行模式
    // 使用WebApp集成是使用的启动参数
}

@end
