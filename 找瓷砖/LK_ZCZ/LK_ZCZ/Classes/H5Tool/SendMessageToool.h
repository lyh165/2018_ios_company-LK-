//
//  SendMessageToool.h
//  HBuilder
//
//  Created by apple on 2018/1/29.
//  Copyright © 2018年 DCloud. All rights reserved.
//

#import <Foundation/Foundation.h>

//#define sendEventTool  [SendMessageToool showMessage]

@interface SendMessageToool : NSObject

@property(nonatomic,assign)BOOL isTuibi;

+(instancetype)showMessage;

-(void)fireEvent:(NSString*)event args:(id)args;

@end
