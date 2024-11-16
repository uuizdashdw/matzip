// #import <RCTAppDelegate.h>
// #import <UIKit/UIKit.h>

// @interface AppDelegate : RCTAppDelegate

// @end
#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <ReactNativeGestureHandler/ReactNativeGestureHandler.h> // 추가

@interface AppDelegate : RCTAppDelegate

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [RNGestureHandlerRootView class]; // 추가: 제스처 핸들러 활성화
    // 나머지 설정 그대로 유지
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

@end
