//
//  LYH_LogConstant.h
//  RCloudMessage
//
//  Created by lee on 2018/8/15.
//  Copyright © 2018年 RongCloud. All rights reserved.
//

#ifndef LYH_LogConstant_h
#define LYH_LogConstant_h

#pragma mark ------------------------ 日志输出 ------------------------

#define K_H5App_BaseInit_Location_pWWWPath @"Pandora/apps/H55E48D08/www"    // www的路径
#define K_H5App_BaseInit_Location_IndexPath @"form_mobile/index/foot.html"    // launch_path的路径

// 解决Xcode8 log问题
#ifdef DEBUG
#define YHLog(format, ...) printf("类名: < %p %s:(%d) > \n方法名: %s \n打印内容是:\n%s\n", self, [[[NSString stringWithUTF8String:__FILE__] lastPathComponent] UTF8String], __LINE__, __PRETTY_FUNCTION__, [[NSString stringWithFormat:(format), ##__VA_ARGS__] UTF8String] )
#else
#define YHLog(format, ...)
#endif

#endif /* LYH_LogConstant_h */
