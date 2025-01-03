// package com.matzipapp;

// import com.facebook.react.ReactActivity;
// import android.os.Bundle;
// import com.facebook.react.ReactActivityDelegate;
// import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
// import com.facebook.react.defaults.DefaultReactActivityDelegate;

// public class MainActivity extends ReactActivity {

//   /**
//    * Returns the name of the main component registered from JavaScript. This is used to schedule
//    * rendering of the component.
//    */
//   @Override
//   protected String getMainComponentName() {
//     return "MatzipApp";
//   }

//   /**
//    * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
//    * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
//    * (aka React 18) with two boolean flags.
//    */
//   @Override
//   protected ReactActivityDelegate createReactActivityDelegate() {
//     return new DefaultReactActivityDelegate(
//         this,
//         getMainComponentName(),
//         // If you opted-in for the New Architecture, we enable the Fabric Renderer.
//         DefaultNewArchitectureEntryPoint.getFabricEnabled());
//   }

//   @Override
//   protected void onCreate(Bundle savedInstanceState) {
//     super.onCreate(null);
//   }
// }
// import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView; // 추가

// public class MainActivity extends ReactActivity {
    
//     @Override
//     protected String getMainComponentName() {
//         return "MatzipApp";
//     }

//     @Override
//     protected ReactActivityDelegate createReactActivityDelegate() {
//         return new DefaultReactActivityDelegate(
//             this,
//             getMainComponentName(),
//             // If you opted-in for the New Architecture, we enable the Fabric Renderer.
//             DefaultNewArchitectureEntryPoint.getFabricEnabled()
//         );
//     }

//     @Override
//     protected ReactRootView createRootView() {
//         return new RNGestureHandlerEnabledRootView(this); // 추가
//     }

//     @Override
//     protected void onCreate(Bundle savedInstanceState) {
//         super.onCreate(null);
//     }
// }
package com.matzipapp;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView; // 추가
import com.facebook.react.ReactRootView; // 추가

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MatzipApp";
    }

    /**
     * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
     * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
     * (aka React 18) with two boolean flags.
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(
            this,
            getMainComponentName(),
            // If you opted-in for the New Architecture, we enable the Fabric Renderer.
            DefaultNewArchitectureEntryPoint.getFabricEnabled()
        );
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
    }

    // createRootView 메서드 제거
}

