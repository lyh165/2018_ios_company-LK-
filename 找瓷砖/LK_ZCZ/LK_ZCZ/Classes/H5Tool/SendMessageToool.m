//
//  SendMessageToool.m
//  HBuilder
//
//  Created by apple on 2018/1/29.
//  Copyright © 2018年 DCloud. All rights reserved.
//

#import "SendMessageToool.h"
#import "PDRCore.h"
#import "PDRCoreAppWindow.h"

static id _instance;

@implementation SendMessageToool

+(instancetype)showMessage
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        
        _instance = [[self alloc]init];
        
    });
    
    return _instance;
}

#pragma mark -- 发送js事件
-(void)fireEvent:(NSString*)event args:(id)args{
    NSString *evalString = nil;
    NSError  *error      = nil;
    NSString *argsString = nil;
    
    if (args) {
        if ([args isKindOfClass:[NSString class]]) {
            argsString = args;
        }else{
            NSData   *jsonData   = [NSJSONSerialization dataWithJSONObject:args options:0 error:&error];
            argsString = [[NSString alloc]initWithData:jsonData encoding:NSUTF8StringEncoding];
            if (error) {
                NSLog(@"%@",error);
            }
        }
        evalString = [NSString stringWithFormat:@"\
                      var jpushEvent = document.createEvent('HTMLEvents');\
                      jpushEvent.initEvent('%@', true, true);\
                      jpushEvent.eventType = 'message';\
                      jpushEvent.arguments = '%@';\
                      document.dispatchEvent(jpushEvent);",event,argsString];
    }else{
        
        evalString = [NSString stringWithFormat:@"\
                      var jpushEvent = document.createEvent('HTMLEvents');\
                      jpushEvent.initEvent('%@', true, true);\
                      jpushEvent.eventType = 'message';\
                      document.dispatchEvent(jpushEvent);",event];
    }
    //调用上述方法
//    [self evaluatingJavaScriptFromString:argsString];
//    [self evaluatingJavaScriptFromString:evalString];
    NSLog(@"调用的方法 %@",event);
    NSLog(@"调用的方法 参数 args %@",args);
    NSLog(@"调用的方法 参数 argsString %@",argsString);
    [self evaluatingJavaScriptFromString:event withArg:args];
//    [self evaluatingJavaScriptFromString:event withArg:argsString];

}
  /*
   JavaScript调用方法并且传递json的数据
   javascript:facebook_google_loginPush({"code":"200","headimgurl":"https:\/\/platform-lookaside.fbsbx.com\/platform\/profilepic\/?asid=10215787392098572&height=50&width=50&ext=1532784232&hash=AeQwsjivoYgb_mTu","nickname":"Steven Wang","type":"2","openid":"10215787392098572"})
   */

//-(void)evaluatingJavaScriptFromString:(NSString*)string{
-(void)evaluatingJavaScriptFromString:(NSString*)string withArg:(id)arg{

//    NSLog(@"我的线程是:%@",[NSThread currentThread]);
   
    
    UIWindow *window = [[UIApplication sharedApplication] keyWindow];
    NSArray *views  = [[[window rootViewController] view] subviews];
    
    NSArray *frames = [self searchViews:views];
    //YHLog(@"frames : %ld",frames.count);
//    [appFrame stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"javascript:%@(%@)",string,arg]]; // 手动去执行指定的方法并且附带的参数

    for (PDRCoreAppFrame *appFrame in frames) {
        NSLog(@"appframe : %@",appFrame.currenLocationHref);
        // 只有包含ruzhidengji.html 才发送事件
        if ([appFrame.currenLocationHref containsString:@"ruzhidengji.html"])
        {
            // 使用异步并发队列操作
            dispatch_async(dispatch_get_global_queue(0, 0), ^{
                // 回到主队列去操作
                dispatch_async(dispatch_get_main_queue(), ^{
                    // 再次确认当前是否要发送的事件名称
                    if ([string containsString:@"setIdCardData"]) {
                        // 发送事件
//                        [appFrame stringByEvaluatingJavaScriptFromString:string]; // 这个方法可能会有点坑
                        //YHLog(@"--- %@",[NSString stringWithFormat:@"javascript:setIdCardData(%@)",arg]);
                        [appFrame stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"javascript:%@(%@)",string,arg]]; // 手动去执行指定的方法并且附带的参数
                    }
                    else if ([string containsString:@"setBankCardData"]) { // 银行卡事件
                        // 发送事件
                        //YHLog(@"--- %@",[NSString stringWithFormat:@"javascript:setBankCardData(%@)",arg]);
                        [appFrame stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"javascript:%@(%@)",string,arg]]; // 手动去执行指定的方法并且附带的参数
                    }
                    
                });
            });
        }
//        [appFrame stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"javascript:%@(%@)",string,arg]];
    }
    
    
}


- (NSMutableArray*)searchViews:(NSArray*)views{
    
    NSMutableArray *frames = [NSMutableArray array];
    for (UIView *temp in views) {
        
        if ([temp isMemberOfClass:[PDRCoreAppFrame class]]) {
            
            [frames addObject:temp];
        }
        if ([temp subviews]) {
            
            NSMutableArray *tempArray = [self searchViews:[temp subviews]];
            
            for (UIView *tempView in tempArray) {
                
                if ([tempView isMemberOfClass:[PDRCoreAppFrame class]]) {
                    
                    [frames addObject:tempView];
                }
            }
        }
    }

    return frames;
}


@end
