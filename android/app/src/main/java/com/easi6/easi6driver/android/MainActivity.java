package com.easi6.easi6driver.android;

import android.support.annotation.LayoutRes;
import android.content.Intent;
import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {

    @LayoutRes
    @Override
    public int getSplashLayout() {
        return R.layout.landing_activity;
    }

     @Override
     public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode,  resultCode, data);
        }

}

