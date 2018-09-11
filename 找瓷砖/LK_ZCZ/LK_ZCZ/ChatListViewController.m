//
//  ChatListViewController.m
//  LK_ZCZ
//
//  Created by lee on 2018/9/11.
//  Copyright © 2018年 lee. All rights reserved.
//

#import "ChatListViewController.h"

@implementation ChatListViewController
- (instancetype)init
{
    self = [super init];
    if (self) {
        [self setDisplayConversationTypes:@[@(ConversationType_PRIVATE),@(ConversationType_GROUP),@(ConversationType_DISCUSSION)]];
        
        // 会话类型聚合
        [self setCollectionConversationType:@[@(ConversationType_PRIVATE)]];
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor = [UIColor redColor];
}

- (void)onSelectedTableRow:(RCConversationModelType)conversationModelType
         conversationModel:(RCConversationModel *)model
               atIndexPath:(NSIndexPath *)indexPath
{
    
    // 聚合类型判断
    if (conversationModelType == RC_CONVERSATION_MODEL_TYPE_COLLECTION) {
        ChatListViewController *temp = [[ChatListViewController alloc]init];
        NSArray *array = [NSArray arrayWithObjects:[NSNumber numberWithInt:model.conversationType], nil];
        [temp setDisplayConversationTypes:array];  // 设置在列表中需要显示的会话类型
        [temp setCollectionConversationType:nil]; // 设置在列表中需要聚合为一条显示的会话类型
        temp.isEnteredToCollectionViewController = YES;
        [self.navigationController pushViewController:temp animated:YES];
        
    }
    else if (model.conversationModelType == ConversationType_PRIVATE)
    {//  单聊
        RCConversationViewController *vc = [[RCConversationViewController alloc]init];
        vc.conversationType = model.conversationType;
        vc.targetId = model.targetId;
        vc.title = @"lyh168";
        [self.navigationController pushViewController:vc animated:YES];
    }
    
    
}
@end
