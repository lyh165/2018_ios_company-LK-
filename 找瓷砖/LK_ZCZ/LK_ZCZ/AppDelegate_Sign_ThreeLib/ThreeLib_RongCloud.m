//
//  ThreeLib_RongCloud.m
//  LK_ZCZ
//
//  Created by lee on 2018/9/11.
//  Copyright © 2018年 lee. All rights reserved.
//

#import "ThreeLib_RongCloud.h"
#import <RongIMKit/RongIMKit.h>
#import <RongIMLib/RongIMLib.h>
#import "ChatListViewController.h"
#import "AppDelegate.h"

@interface ThreeLib_RongCloud()<RCIMUserInfoDataSource>
@property (strong,nonatomic) AppDelegate *appDelegate;
@end

@implementation ThreeLib_RongCloud
+ (ThreeLib_RongCloud *)getInstance{
    static ThreeLib_RongCloud *sharedInstance;
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
        [self initRongCloud];
    }
    return self;
}

- (void)initRongCloud
{
    [[RCIM sharedRCIM]initWithAppKey:@"c9kqb3rdcooaj"];
    /*
    [[RCIM sharedRCIM]connectWithToken:@"XZ5GUw6t+mwlmwyRZr+R8eP/bLeTsVctwZjwZwcK2mzpuJisKcAeDvl2U9n/Sec0Ag5wAah95goXBOwGPPOCGw==" success:^(NSString *userId) {
        dispatch_async(dispatch_get_main_queue(), ^{
            NSLog(@"userid %@",userId);
            [[RCIM sharedRCIM]setUserInfoDataSource:self]; // 登录的时候 设置用户信息提供者的代理
            
            RCUserInfo *userinfo = [[RCUserInfo alloc]init];
            userinfo.userId = userId;
            userinfo.name = @"lyh165";
            //            userinfo.portraitUri = @"https://imgsa.baidu.com/forum/pic/item/d11373f082025aaf7a7c4de5f6edab64034f1a55.jpg";
            userinfo.portraitUri = @"https://imgsa.baidu.com/forum/pic/item/c9177f3e6709c93dbe94dfd9923df8dcd10054be.jpg";
            
            NSLog(@"用户名称 %@",[RCIM sharedRCIM].currentUserInfo.name);
            NSLog(@"用户userId %@",[RCIM sharedRCIM].currentUserInfo.userId);
            NSLog(@"用户portraitUri %@",[RCIM sharedRCIM].currentUserInfo.portraitUri);
            [RCIM sharedRCIM].currentUserInfo = userinfo;
            
            
            ChatListViewController *chatListVC = [[ChatListViewController alloc]init];
            self.appDelegate.nav = [[UINavigationController alloc]initWithRootViewController:chatListVC];
            self.appDelegate.window.rootViewController = self.appDelegate.nav;
        });
    } error:^(RCConnectErrorCode status) {
        
    } tokenIncorrect:^{
        
    }];
     */
    
}



#pragma mark - 设置用户的头像和昵称
- (void)getUserInfoWithUserId:(NSString *)userId completion:(void (^)(RCUserInfo *userInfo))completion
{
    NSLog(@"userId  --- %@",userId);
    if([userId isEqualToString:@"lyh168"])
    {
        RCUserInfo *userinfo = [[RCUserInfo alloc]init];
        userinfo.userId = userId;
        userinfo.name = @"lyh168";
        userinfo.portraitUri = @"http://f2.topitme.com/2/58/7f/11231445813f57f582o.jpg";
        completion(userinfo);
    }
    else
    {
        RCUserInfo *userinfo = [[RCUserInfo alloc]init];
        userinfo.userId = userId;
        userinfo.name = @"lyh165";
        userinfo.portraitUri = @"http://imgtu.5011.net/uploads/content/20170209/4934501486627131.jpg";
        completion(userinfo);
    }
}

@end
