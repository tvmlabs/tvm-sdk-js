#include <jni.h>
#include <jsi/jsi.h>
#include <fbjni/fbjni.h>
#include <CallInvokerHolder.h>

#include "TvmClientJsiModule.h"

using namespace facebook;

struct TvmClientJsiModule : jni::JavaClass<TvmClientJsiModule>
{
public:
  __unused static constexpr auto kJavaDescriptor = "Lcom/tonlabs/TvmClientjsi/TvmClientJSIModulePackage;";

  static void registerNatives()
  {
    javaClassStatic()->registerNatives({makeNativeMethod("installJSIBindings", TvmClientJsiModule::installJSIBindings)});
  }

private:
  static void installJSIBindings(jni::alias_ref<jni::JClass>,
                                 jlong jsContext,
                                 jni::alias_ref<facebook::react::CallInvokerHolder::javaobject> jsCallInvokerHolder,
                                 jni::alias_ref<tonlabs::TvmClientJsiBlobManager> javaBlobManager)
  {
    jsi::Runtime *runtime = reinterpret_cast<facebook::jsi::Runtime *>(jsContext);

    std::shared_ptr<facebook::react::CallInvoker> jsCallInvoker =
        jsCallInvokerHolder->cthis()->getCallInvoker();

    std::unique_ptr<tonlabs::BlobManager> blobManager =
        std::make_unique<tonlabs::BlobManager>(make_global(javaBlobManager));

    std::unique_ptr<tonlabs::TvmClientJsiModule> TvmClientJsiModule =
        std::make_unique<tonlabs::TvmClientJsiModule>(*runtime, jsCallInvoker, std::move(blobManager));

    runtime->global().setProperty(
        *runtime,
        jsi::PropNameID::forAscii(*runtime, "TvmClientJsiModule"),
        jsi::Object::createFromHostObject(*runtime, std::move(TvmClientJsiModule)));
  }
};

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *)
{
  return facebook::jni::initialize(vm, []
                                   { TvmClientJsiModule::registerNatives(); });
}
