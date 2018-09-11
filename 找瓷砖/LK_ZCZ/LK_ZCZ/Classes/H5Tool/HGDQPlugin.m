//
//  HGDQPlugin.m
//  NIM
//
//  Created by admin on 2018/6/30.
//  Copyright © 2018年 Netease. All rights reserved.
//


#import "HGDQPlugin.h"
#import "PDRCoreAppFrame.h"
#import "H5WEEngineExport.h"
#import "PDRToolSystemEx.h"
// 扩展插件中需要引入需要的系统库
#import <LocalAuthentication/LocalAuthentication.h>

//
#import "SendMessageToool.h"

// RongClound框架
#import <RongIMKit/RongIMKit.h>
//#import <RongIMLib/RongIMLib.h>
//#import "RCDChatViewController.h"

#import "AppDelegate.h"
@interface HGDQPlugin ()<UIAlertViewDelegate>
@end

@implementation HGDQPlugin{

}

#pragma mark - ✍🏻(系统方法) system method start

#warning 这里使用load或者initialize方法的时候,能够执行到方法,但是拿不到识别的时候回调的结果。\
            所以我是在用户点击识别身份证、银行卡的时候才开始监听识别回调方法

#pragma mark  ✍🏻(系统方法) system method end


#pragma mark - 🏫找瓷砖 start🏫
#pragma mark  所有逻辑，都需要在sdk初始化的时候才能操作
/**
 登录

 @param commands 服务器返回的参数
 */
- (void)loginChatNative:(PGMethod*)commands
{
    
    if ( commands ) {
        NSString* cbId = [commands.arguments objectAtIndex:0];
        NSString* pArgument1 = [commands.arguments objectAtIndex:1];
        NSArray* pResultString = [NSArray arrayWithObjects:pArgument1, nil];YHLog(@" 登录 %@",pResultString);
//        NSString *user_id = pResultString[0][@"user_id"];
        NSString *user_token   = pResultString[0][@"user_token"]; // 用来登录融云的
        [[RCIMClient sharedRCIMClient] setDeviceToken:user_token]; // 设置用于推送的token
        [[RCIMClient sharedRCIMClient] connectWithToken:user_token
                                                success:^(NSString *userId) {
                                                    NSLog(@"登陆成功。当前登录的用户ID：%@", userId);
                                                } error:^(RCConnectErrorCode status) {
                                                    NSLog(@"登陆的错误码为:%d", status);
                                                } tokenIncorrect:^{
                                                    //token过期或者不正确。
                                                    //如果设置了token有效期并且token过期，请重新请求您的服务器获取新的token
                                                    //如果没有设置token有效期却提示token错误，请检查您客户端和服务器的appkey是否匹配，还有检查您获取token的流程。
                                                    NSLog(@"token错误");
                                                }];
        
        
        PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusOK messageAsArray: pResultString];
//        PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusError messageAsString:@"惨了! 出错了！ 咋(wu)整(liao)"];
        // 通知JS层Native层运行结果
        [self toCallback:cbId withReslut:[result toJSONString]];
    }
}
/**
 进入单聊
 @param commands 服务器返回的参数
 */
- (void)toLiveRoomChatNative:(PGMethod*)commands
{
    if ( commands ) {
        NSString* cbId = [commands.arguments objectAtIndex:0];
        NSString* pArgument1 = [commands.arguments objectAtIndex:1];
        NSArray* pResultString = [NSArray arrayWithObjects:pArgument1, nil];
        
        // NSString *user_token   = pResultString[0][@"user_token"]; // 服务器返回来的数据
// code start ....
        YHLog(@"跳转到单聊");
        AppDelegate *AppDelegate_a = (AppDelegate *)[UIApplication sharedApplication].delegate;
        RCConversationViewController *_conversationVC = [[RCConversationViewController alloc] init];
        _conversationVC.conversationType = ConversationType_PRIVATE; // 单聊
        _conversationVC.targetId = @"lyh168";
        _conversationVC.userName = @"lyh16888";
        _conversationVC.title = @"lyh16888";
        //_conversationVC.conversation = model;
        [AppDelegate_a.nav pushViewController:_conversationVC animated:YES];
// code end ...
        
        
        PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusOK messageAsArray: pResultString];
        //        PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusError messageAsString:@"惨了! 出错了！ 咋(wu)整(liao)"];
        // 通知JS层Native层运行结果
        [self toCallback:cbId withReslut:[result toJSONString]];
    }
}




#pragma mark 原生主动调用js
- (void)iosCallHTMLRunJSWithfireEventName:(NSString*)event AndArgsString:(NSString *)str
{
    self.messageTool = [SendMessageToool showMessage];
    [self.messageTool fireEvent:event args:str];
}
- (void)iosCallHTMLRunJSWithArray:(NSArray *)array
{
    self.messageTool = [SendMessageToool showMessage];
    [self.messageTool fireEvent:@"startPusher" args:array];
}

#pragma mark  🏫找瓷砖 end🏫


#pragma mark - 👇👇👇的方法可以忽略不看.是h5框架自带的解释方法 start👇👇👇
#pragma mark 这个方法在使用WebApp方式集成时触发，WebView集成方式不触发

/*
 * WebApp启动时触发
 * 需要在PandoraApi.bundle/feature.plist/注册插件里添加autostart值为true，global项的值设置为true
 */
- (void) onAppStarted:(NSDictionary*)options{
    
    NSLog(@"5+ WebApp启动时触发");
    // 可以在这个方法里向Core注册扩展插件的JS
    
}

// 监听基座事件事件
// 应用退出时触发
- (void) onAppTerminate{
    //
    NSLog(@"APPDelegate applicationWillTerminate 事件触发时触发");
}

// 应用进入后台时触发
- (void) onAppEnterBackground{
    //
    NSLog(@"APPDelegate applicationDidEnterBackground 事件触发时触发");
}

// 应用进入前天时触发
- (void) onAppEnterForeground{
    //
    NSLog(@"APPDelegate applicationWillEnterForeground 事件触发时触发");
}

#pragma mark 以下为插件方法，由JS触发， WebView集成和WebApp集成都可以触发


- (void)PluginTestFunction:(PGMethod*)commands
{
    if ( commands ) {
        // CallBackid 异步方法的回调id，H5+ 会根据回调ID通知JS层运行结果成功或者失败
        NSString* cbId = [commands.arguments objectAtIndex:0];
        
        // 用户的参数会在第二个参数传回
        NSString* pArgument1 = [commands.arguments objectAtIndex:1];
        NSString* pArgument2 = [commands.arguments objectAtIndex:2];
        NSString* pArgument3 = [commands.arguments objectAtIndex:3];
        NSString* pArgument4 = [commands.arguments objectAtIndex:4];
        
        
        
        // 如果使用Array方式传递参数
        NSArray* pResultString = [NSArray arrayWithObjects:pArgument1, pArgument2, pArgument3, pArgument4, nil];
        
        // 运行Native代码结果和预期相同，调用回调通知JS层运行成功并返回结果
        // PDRCommandStatusOK 表示触发JS层成功回调方法
        // PDRCommandStatusError 表示触发JS层错误回调方法
        
        // 如果方法需要持续触发页面回调，可以通过修改 PDRPluginResult 对象的keepCallback 属性值来表示当前是否可重复回调， true 表示可以重复回调   false 表示不可重复回调  默认值为false
        
        PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusOK messageAsArray: pResultString];
        
        // 如果Native代码运行结果和预期不同，需要通过回调通知JS层出现错误，并返回错误提示
        //PDRPluginResult *result = [PDRPluginResult resultWithStatus:PDRCommandStatusError messageAsString:@"惨了! 出错了！ 咋(wu)整(liao)"];
        
        // 通知JS层Native层运行结果
        [self toCallback:cbId withReslut:[result toJSONString]];
    }
}


// 调用指纹解锁
- (void)AuthenticateUser:(PGMethod*)command
{
    if (nil == command) {
        return;
    }
    BOOL isSupport = false;
    NSString* pcbid = [command.arguments objectAtIndex:0];
    NSError* error = nil;
    NSString* LocalReason = @"HBuilder指纹验证";
    
    // Touch ID 是IOS 8 以后支持的功能
    if ([PTDeviceOSInfo systemVersion] >= PTSystemVersion8Series) {
        LAContext* context = [[LAContext alloc] init];
        if ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error]) {
            isSupport = true;
            [context evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics localizedReason:LocalReason reply:^(BOOL success, NSError * _Nullable error) {
                PDRPluginResult * pResult = nil;
                
                if (success) {
                    
                    pResult = [PDRPluginResult resultWithStatus: PDRCommandStatusOK messageAsDictionary:@{@"state":@(0), @"message":@"成功"}];
                }
                else{
                    NSDictionary* pStringError = nil;
                    switch (error.code) {
                        case LAErrorSystemCancel:
                        {
                            pStringError = @{@"state":@(-1), @"message":@"系统取消授权(例如其他APP切入)"};
                            break;
                        }
                        case LAErrorUserCancel:
                        {
                            pStringError = @{@"state":@(-2), @"message":@"用户取消Touch ID授权"};
                            break;
                        }
                        case LAErrorUserFallback:
                        {
                            pStringError  = @{@"state":@(-3), @"message":@"用户选择输入密码"};
                            break;
                        }
                        case LAErrorTouchIDNotAvailable:{
                            pStringError  = @{@"state":@(-4), @"message":@"设备Touch ID不可用"};
                            break;
                        }
                        case LAErrorTouchIDLockout:{
                            pStringError  = @{@"state":@(-5), @"message":@"Touch ID被锁"};
                            break;
                        }
                        case LAErrorAppCancel:{
                            pStringError  = @{@"state":@(-6), @"message":@"软件被挂起取消授权"};
                            break;
                        }
                        default:
                        {
                            pStringError  = @{@"state":@(-7), @"message":@"其他错误"};
                            break;
                        }
                    }
                    pResult = [PDRPluginResult resultWithStatus:PDRCommandStatusError messageAsDictionary:pStringError];
                    
                }
                
                [self toCallback:pcbid withReslut:[pResult toJSONString]];
            }];
        }
        else{
            NSDictionary* pStringError = nil;
            switch (error.code) {
                case LAErrorTouchIDNotEnrolled:
                {
                    pStringError  = @{@"state":@(-11), @"message":@"设备Touch ID不可用"};
                    break;
                }
                case LAErrorPasscodeNotSet:
                {
                    pStringError  = @{@"state":@(-12), @"message":@"用户未录入Touch ID"};
                    break;
                }
                    
                default:
                    break;
            }
        }
    }
    
    if (!isSupport) {
        PDRPluginResult* pResult = [PDRPluginResult resultWithStatus:PDRCommandStatusError messageAsString:@"Device Not Support"];
        [self toCallback:pcbid withReslut:[pResult toJSONString]];
    }
}


- (NSData*)PluginTestFunctionSync:(PGMethod*)command
{
    // 根据传入获取参数
    NSString* pArgument1 = [command.arguments objectAtIndex:0];
    NSString* pArgument2 = [command.arguments objectAtIndex:1];
    NSString* pArgument3 = [command.arguments objectAtIndex:2];
    NSString* pArgument4 = [command.arguments objectAtIndex:3];
    
    // 拼接成字符串
    NSString* pResultString = [NSString stringWithFormat:@"%@ %@ %@ %@", pArgument1, pArgument2, pArgument3, pArgument4];
    
    // 按照字符串方式返回结果
    return [self resultWithString: pResultString];
}


- (NSData*)PluginTestFunctionSyncArrayArgu:(PGMethod*)command
{
    // 根据传入参数获取一个Array，可以从中获取参数
    NSArray* pArray = [command.arguments objectAtIndex:0];
    
    // 创建一个作为返回值的NSDictionary
    NSDictionary* pResultDic = [NSDictionary dictionaryWithObjects:pArray forKeys:[NSArray arrayWithObjects:@"RetArgu1",@"RetArgu2",@"RetArgu3", @"RetArgu4", nil]];
    
    // 返回类型为JSON，JS层在取值是需要按照JSON进行获取
    return [self resultWithJSON: pResultDic];
}
#pragma mark  👆👆👆的方法可以忽略不看.是h5框架自带的解释方法 end👆👆👆

@end
