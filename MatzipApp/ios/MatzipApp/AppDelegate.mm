#import "AppDelegate.h"

#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTBundleURLProvider.h>
// #import <ReactNativeGestureHandler/ReactNativeGestureHandler.h> // 추가
#import <React/RCTRootView.h> // 추가
#import <RNGestureHandler.h>
// #import <ReactNativeReanimated/ReactNativeReanimated.h> // 추가

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyCnA7HjfIud01nYaJEUW8vjHH-o-wBc0fk
"];
  // [RNGestureHandlerModule initGestureHandler];
  
  // Reanimated와 제스처 핸들러 활성화
  // [RNGestureHandlerRootView class]; // 추가

  // Reanimated 초기화 (선택 사항)
  RCTLogInfo(@"Reanimated is initialized.");

  self.moduleName = @"MatzipApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
