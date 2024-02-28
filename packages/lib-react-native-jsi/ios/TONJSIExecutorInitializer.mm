#import "BlobManager.h"
#import "TvmClientJsiModule.h"
#import "TONJSIExecutorInitializer.h"

namespace tonlabs
{
  using namespace facebook::react;

  JSIExecutor::RuntimeInstaller TONJSIExecutorRuntimeInstaller(
      RCTBridge *bridge,
      JSIExecutor::RuntimeInstaller runtimeInstallerToWrap)
  {
    const auto runtimeInstaller = [bridge, runtimeInstallerToWrap](facebook::jsi::Runtime &runtime)
    {
      if (!bridge)
      {
        return;
      }

      auto jsCallInvoker = bridge.jsCallInvoker;

      RCTBlobManager *reactBlobManager = [bridge moduleForName:@"BlobModule"];

      std::unique_ptr<tonlabs::BlobManager> blobManager =
          std::make_unique<tonlabs::BlobManager>(reactBlobManager);

      std::unique_ptr<tonlabs::TvmClientJsiModule> TvmClientJsiModule =
          std::make_unique<tonlabs::TvmClientJsiModule>(runtime, jsCallInvoker, std::move(blobManager));

      runtime.global().setProperty(
          runtime,
          jsi::PropNameID::forAscii(runtime, "TvmClientJsiModule"),
          jsi::Object::createFromHostObject(runtime, std::move(TvmClientJsiModule)));

      if (runtimeInstallerToWrap)
      {
        runtimeInstallerToWrap(runtime);
      }
    };
    return runtimeInstaller;
  }

} // namespace tonlabs
