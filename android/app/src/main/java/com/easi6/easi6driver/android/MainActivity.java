package com.easi6.easi6driver.android;

import android.support.annotation.LayoutRes;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {

    @LayoutRes
    @Override
    public int getSplashLayout() {
        return R.layout.landing_activity;
    }

}
