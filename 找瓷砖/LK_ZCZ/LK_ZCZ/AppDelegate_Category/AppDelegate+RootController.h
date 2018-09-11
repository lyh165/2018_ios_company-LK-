//
//  AppDelegate+RootController.h
//  LK_ZCZ
//
//  Created by lee on 2018/9/11.
//  Copyright © 2018年 lee. All rights reserved.
//

#import "AppDelegate.h"

@interface AppDelegate (RootController)
/**
 *  首次启动轮播图
 */
- (void)createLoadingScrollView;
/**
 *  tabbar实例
 */
- (void)setTabbarController;

/**
 *  window实例
 */
- (void)setAppWindows;

/**
 *  设置根视图
 */
- (void)setRootViewController;


@end
