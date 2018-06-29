package com.example.testmodul;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class TestModul extends ReactContextBaseJavaModule implements ActivityEventListener {
  static   ReactApplicationContext  reactContext;
    public TestModul(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        reactContext.addActivityEventListener(this);
    }

    public static void sendEvent(String event, WritableNativeMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(event, params);
    }
    @ReactMethod
    public  void callNativeToReact(String x,Callback callback){
        int k= Integer.parseInt(x);
        if(k%2==0){
            callback.invoke("Chẵn ");
        }else {
            callback.invoke("Lẻ");
        }

    }


    @Override
    public String getName() {
        return "TestModul";
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
