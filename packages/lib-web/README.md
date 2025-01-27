# Building ever-sdk-js WASM
```
cd packages/lib-web/build
cargo build
cargo run
```

# Troubleshooting
If you encounter error "No available targets are compatible with triple "wasm32-unknown-unknown" 
follow the solution from this issue https://github.com/rust-lang/libz-sys/issues/103.

I.E. you need to install llvm with brew and then follow the installation tips to make this llvm primary:

```
If you need to have llvm first in your PATH, run
  echo 'export PATH="/opt/homebrew/opt/llvm/bin:$PATH"' >> /Users/ekaterinapantaz/.zshrc

For compilers to find llvm you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/llvm/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/llvm/include"

```


# How to check what compiler is used

Here is a bash command that will help you see all the paths to all the compilers on your system
```
for compiler in cc c++ gcc g++ clang clang++
do
which $compiler
$compiler --version
done
```

By default the result will look like this:
```
*/usr/bin/cc*
Apple clang version 14.0.3 (clang-1403.0.22.14.1)
Target: arm64-apple-darwin23.5.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
/usr/bin/c++
Apple clang version 14.0.3 (clang-1403.0.22.14.1)
Target: arm64-apple-darwin23.5.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
/usr/bin/gcc
Apple clang version 14.0.3 (clang-1403.0.22.14.1)
Target: arm64-apple-darwin23.5.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
/usr/bin/g++
Apple clang version 14.0.3 (clang-1403.0.22.14.1)
Target: arm64-apple-darwin23.5.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
/usr/bin/clang
Apple clang version 14.0.3 (clang-1403.0.22.14.1)
Target: arm64-apple-darwin23.5.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
/usr/bin/clang++
Apple clang version 14.0.3 (clang-1403.0.22.14.1)
Target: arm64-apple-darwin23.5.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
```
 
We need clang here - you can see that it takes clang from 
/Library/Developer/CommandLineTools/usr/bin - THIS IS NOT WHAT WE NEED.

After making the brew clang compiler path a primary one the result will look like this

```
/usr/bin/cc
Apple clang version 14.0.3 (clang-1403.0.22.14.1)
Target: arm64-apple-darwin23.5.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
/usr/bin/c++
Apple clang version 14.0.3 (clang-1403.0.22.14.1)
Target: arm64-apple-darwin23.5.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
/usr/bin/gcc
Apple clang version 14.0.3 (clang-1403.0.22.14.1)
Target: arm64-apple-darwin23.5.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
/usr/bin/g++
Apple clang version 14.0.3 (clang-1403.0.22.14.1)
Target: arm64-apple-darwin23.5.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
/opt/homebrew/opt/llvm/bin/clang
Homebrew clang version 18.1.8
Target: arm64-apple-darwin23.5.0
Thread model: posix
InstalledDir: /opt/homebrew/opt/llvm/bin
/opt/homebrew/opt/llvm/bin/clang++
Homebrew clang version 18.1.8
Target: arm64-apple-darwin23.5.0
Thread model: posix
InstalledDir: /opt/homebrew/opt/llvm/bin

```

If your clang and clang++ compiler paths look like this the build command should be successful.







# (DEPRECATED) Building ever-sdk-js WASM inside docker
To build WASM you need `clang v8`. Use this workaround if you encounter a problem when building wasm binaries on your platform (MacOSX or Windows). 

## Pulling build image
```
docker pull tonlabs/build-tonclient-wasm
```
Change your current location to `ever-sdk-js` project. It is important because the next command will use this location to mount the volume with source code inside the docker container with build environment.
```
cd ever-sdk-js
```
Run build container in background. First attempt will take a long time.
```
docker run -v $(pwd):/tonlabs/TON-SDK --name build-tonclient-wasm -dt build-tonclient-wasm tail -f /dev/null
```
## Build WASM
```
docker exec -ti build-tonclient-wasm "build-tonclient-wasm.sh"
```
## Location of binaries
After successful build process, binaries will be located here
```
ever-sdk-js/packages/lib-web/index.js
ever-sdk-js/packages/lib-web/eversdk.wasm
Compressed
ever-sdk-js/packages/lib-web/publish/eversdk_1_31_wasm.gz
ever-sdk-js/packages/lib-web/publish/eversdk_1_31_wasm_js.gz
```
