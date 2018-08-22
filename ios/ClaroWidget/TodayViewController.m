#import "TodayViewController.h"
#import <NotificationCenter/NotificationCenter.h>
#import <React/RCTBundleURLProvider.h> // add this
#import <React/RCTRootView.h> // add this


@interface TodayViewController () <NCWidgetProviding>

@end

@implementation TodayViewController

// add this
- (void)loadView {
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"TodayWidget"
                                               initialProperties:nil
                                                   launchOptions:nil];
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:0];
  
  self.view = rootView;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  // add this
  [self.extensionContext setWidgetLargestAvailableDisplayMode:NCWidgetDisplayModeCompact];
  // or add this if widget should be expandable
  [self.extensionContext setWidgetLargestAvailableDisplayMode:NCWidgetDisplayModeExpanded];
}

// add this if widget should be expandable
- (void)widgetActiveDisplayModeDidChange:(NCWidgetDisplayMode)activeDisplayMode withMaximumSize:(CGSize)maxSize {
  if (activeDisplayMode == NCWidgetDisplayModeCompact) {
    self.preferredContentSize = maxSize;
  }
  else {
    self.preferredContentSize = CGSizeMake(maxSize.width, 300); // height of expanded widget
  }
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

- (void)widgetPerformUpdateWithCompletionHandler:(void (^)(NCUpdateResult))completionHandler {
  // Perform any setup necessary in order to update the view.
  
  // If an error is encountered, use NCUpdateResultFailed
  // If there's no update required, use NCUpdateResultNoData
  // If there's an update, use NCUpdateResultNewData
  
  completionHandler(NCUpdateResultNewData);
}

@end
