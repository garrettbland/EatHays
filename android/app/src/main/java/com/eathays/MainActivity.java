package com.eathays;

import com.facebook.react.ReactActivity;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnative.photoview.PhotoViewPackage;

import android.graphics.Color;
import android.os.Bundle;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.mehcode.reactnative.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {


  @Override
  protected void onCreate(Bundle savedInstanceState) {
      // Show the js-controlled splash screen
      SplashScreen.show(this);

      // After react is initialized; set our background color (override splash screen theme)
      getReactNativeHost().getReactInstanceManager().addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
          @Override
          public void onReactContextInitialized(ReactContext context) {
              // Hide the native splash screen
              getWindow().getDecorView().setBackgroundColor(Color.parseColor("#c0392b"));
          }
      });

      super.onCreate(savedInstanceState);

      // [...]
  }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "EatHays";
    }


}
