package com.easi6.easi6driver.android;

import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.facebook.react.ReactApplication;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.wix.interactable.Interactable;
import com.horcrux.svg.SvgPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.peel.react.TcpSocketsModule;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.marianhello.react.BackgroundGeolocationPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.reactnativenavigation.NavigationApplication;
import com.airbnb.android.react.maps.MapsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new ExtraDimensionsPackage(),
        new Interactable(),
        new SvgPackage(),
        new RCTCameraPackage(),
        new VectorIconsPackage(),
        new TcpSocketsModule(),
        new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appcenterCrashes_whenToSendCrashes)),
        new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appcenterAnalytics_whenToEnableAnalytics)),
        new AppCenterReactNativePackage(MainApplication.this),
        new RNDeviceInfo(),
        new FIRMessagingPackage(),
        new BackgroundGeolocationPackage(),
        new RNSendIntentPackage(),
        new ReactNativeI18n(),
        new MapsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage

    return Arrays.<ReactPackage>asList(
      // eg. new VectorIconsPackage()
      new MainReactPackage(),
      new ExtraDimensionsPackage(),
      new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appcenterCrashes_whenToSendCrashes)),
      new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appcenterAnalytics_whenToEnableAnalytics)),
      new AppCenterReactNativePackage(MainApplication.this),
      new RNDeviceInfo(),
      new Interactable(),
      new SvgPackage(),
      new VectorIconsPackage(),
      new TcpSocketsModule(),
      new RCTCameraPackage(),
      new FIRMessagingPackage(),
      new BackgroundGeolocationPackage(),
      new RNSendIntentPackage(),
      new ReactNativeI18n(),
      new MapsPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
  }
}
