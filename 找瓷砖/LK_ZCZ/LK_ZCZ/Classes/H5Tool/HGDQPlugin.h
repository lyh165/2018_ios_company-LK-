//
//  HGDQPlugin.h
//  NIM
//
//  Created by admin on 2018/6/30.
//  Copyright © 2018年 Netease. All rights reserved.
//

#import "PGPlugin.h"
#include "PGMethod.h"
#import <Foundation/Foundation.h>
@class SendMessageToool;
@interface HGDQPlugin : PGPlugin
@property (nonatomic,strong)SendMessageToool *messageTool;



#pragma mark - 🏫教育直播 start🏫
- (void)toLiveRoomChatNative:(PGMethod*)commands;                // 打开直播
#pragma mark  🏫教育直播 end🏫














#pragma mark - system start

- (void)PluginTestFunction:(PGMethod*)command;
- (void)PluginTestFunctionArrayArgu:(PGMethod*)command;
- (NSData*)PluginTestFunctionSync:(PGMethod*)command;
- (NSData*)PluginTestFunctionSyncArrayArgu:(PGMethod*)command;
#pragma mark  system end

#pragma mark - 🐒lyh start🐒
#pragma mark h5前端JavaScript编写固定方法名, iOS、Android遵守规则。使用插件,大家就可以调用起来
/*
 JavaScript
    plus.HGDQPlugin.loginChatNative(params, function(data) {}, function(data) {});
    意思是使用 调用 原生的插件HGDQPlugin 的loginChatNative 方法。其中 js这边会传递一个data参数给原生界面
iOS
    - (void)loginChatNative:(PGMethod*)commands;
    意思是iOS遵守h5框架规则,通过js和原生之间交互
    让js调用原生HGDQPlugin的loginChatNative方法.参数会在commands里面存放
    commands参数的第一个值是
    第二个值是 服务器返回来的参数
    CallBackid 异步方法的回调id，H5+ 会根据回调ID通知JS层运行结果成功或者失败
    NSString* cbId = [commands.arguments objectAtIndex:0];//YHLog(@"cbId %@",cbId);
    NSString* pArgument1 = [commands.arguments objectAtIndex:1];//YHLog(@"pArgument1 %@",pArgument1);
 */
#pragma mark 清洁助手交互的方法
- (void)loginChatNative:(PGMethod*)commands;                // 推送
- (void)startOperationDollNative:(PGMethod*)commands;       // 识别银行卡
- (void)openProductNative:(PGMethod*)commands;              // 识别身份证
#pragma mark  🐒lyh end🐒

@end
