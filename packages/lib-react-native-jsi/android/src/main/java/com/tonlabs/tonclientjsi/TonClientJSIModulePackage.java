package com.tonlabs.TvmClientjsi;

import com.facebook.react.bridge.JSIModulePackage;
import com.facebook.react.bridge.JSIModuleSpec;
import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.blob.BlobModule;
import com.facebook.react.turbomodule.core.CallInvokerHolderImpl;

import java.util.Arrays;
import java.util.List;

public class TvmClientJSIModulePackage implements JSIModulePackage {
  static {
    System.loadLibrary("TvmClientjsi");
  }

  public static native void installJSIBindings(long jsiPtr, CallInvokerHolderImpl jsCallInvokerHolder, TvmClientJsiBlobManager TvmClientJsiBlobManager);

  @Override
  public List<JSIModuleSpec> getJSIModules(ReactApplicationContext reactApplicationContext, JavaScriptContextHolder jsContext) {
    long jsiPtr = reactApplicationContext.getJavaScriptContextHolder().get();
    CallInvokerHolderImpl jsCallInvokerHolder = (CallInvokerHolderImpl) reactApplicationContext.getCatalystInstance().getJSCallInvokerHolder();
    BlobModule reactNativeBlobModule = reactApplicationContext.getNativeModule(BlobModule.class);
    TvmClientJsiBlobManager TvmClientJsiBlobManager = new TvmClientJsiBlobManager(reactNativeBlobModule);

    // install JSI bindings before running bundled JS code
    TvmClientJSIModulePackage.installJSIBindings(jsiPtr, jsCallInvokerHolder, TvmClientJsiBlobManager);

    return Arrays.<JSIModuleSpec>asList();
  }
}
