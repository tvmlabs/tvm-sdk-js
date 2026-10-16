{
  'variables': {
    'base_cflags': [
      '-Wall',
      '-Wextra',
      '-Wno-unused-parameter',
      '-std=c++11',
    ],
    'debug_cflags': ['-g', '-O0'],
    'release_cflags': ['-O3'],
  },
  'targets': [
    {
      'target_name': 'tvmsdk',
      'sources': ['binding.cc'],
      # binding.cc defines NAPI_EXPERIMENTAL; with newer Node.js headers that
      # switches finalizers to node_api_basic_env (earlier named nogc_env),
      # which the `unload` finalizer does not take. Opting out under both names
      # keeps the classic signature; headers without the change ignore them.
      'defines': [
        'NODE_API_EXPERIMENTAL_BASIC_ENV_OPT_OUT',
        'NODE_API_EXPERIMENTAL_NOGC_ENV_OPT_OUT',
      ],
      'conditions': [
        ['OS == "win"', {
          'libraries': [
            '../tvmsdk.lib',
            'advapi32.lib',
            'ws2_32.lib',
            'userenv.lib',
            'shell32.lib',
            'Secur32.lib',
            'Crypt32.lib',
            'Bcrypt.lib',
            'ntdll.lib'
          ],
        }, {
          'libraries': [
            '../libtvmsdk.a',
            '-Wl,-rpath,./addon/'
          ],
        }],
      ],
      'configurations': {
        'Debug': {
          'cflags': ['<@(debug_cflags)'],
          'xcode_settings': {
            'OTHER_CFLAGS': ['<@(debug_cflags)'],
          },
        },
        'Release': {
          'cflags': ['<@(release_cflags)'],
          'xcode_settings': {
            'OTHER_CFLAGS': ['<@(release_cflags)'],
          },
        },
      },
      'cflags': ['<@(base_cflags)'],
      'xcode_settings': {
        'OTHER_CFLAGS': ['<@(base_cflags)'],
      },
    },
  ],
}
