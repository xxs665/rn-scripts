'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pathExists = require('path-exists');

var _pathExists2 = _interopRequireDefault(_pathExists);

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _log = require('../util/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// UPDATE DEPENDENCY VERSIONS HERE
var DEFAULT_DEPENDENCIES = {
  expo: '^16.0.0',
  react: '16.0.0-alpha.6',
  'react-native': '^0.43.4',
  "react-navigation": "^1.0.0-beta.9",
  "react-redux": "^5.0.5",
  "redux": "^3.6.0",
  "redux-logger": "^3.0.6",
  "redux-thunk": "^2.2.0",
};

// TODO figure out how this interacts with ejection
var DEFAULT_DEV_DEPENDENCIES = {
  'jest-expo': '^0.4.0',
  'react-test-renderer': '16.0.0-alpha.6',
  "babel-eslint": "^7.1.1",
  "eslint": "^3.12.2",
  "eslint-config-airbnb": "^13.0.0",
  "eslint-config-airbnb-base": "7.1.0",
  "eslint-plugin-import": "^2.2.0",
  "eslint-plugin-jsx-a11y": "^2.2.3",
  "eslint-plugin-react": "^6.8.0"
};

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(appPath, appName, verbose) {
    var cwd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var ownPackageName, ownPath, useYarn, readmeExists, appPackagePath, appPackage, data, command, args, proc;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ownPackageName = require('../../package.json').name;
            ownPath = _path2.default.join(appPath, 'node_modules', ownPackageName);
            _context.next = 4;
            return (0, _pathExists2.default)(_path2.default.join(appPath, 'yarn.lock'));

          case 4:
            useYarn = _context.sent;
            _context.next = 7;
            return (0, _pathExists2.default)(_path2.default.join(appPath, 'README.md'));

          case 7:
            readmeExists = _context.sent;

            if (!readmeExists) {
              _context.next = 11;
              break;
            }

            _context.next = 11;
            return _fsPromise2.default.rename(_path2.default.join(appPath, 'README.md'), _path2.default.join(appPath, 'README.old.md'));

          case 11:
            appPackagePath = _path2.default.join(appPath, 'package.json');
            _context.t0 = JSON;
            _context.next = 15;
            return _fsPromise2.default.readFile(appPackagePath);

          case 15:
            _context.t1 = _context.sent;
            appPackage = _context.t0.parse.call(_context.t0, _context.t1);


            // mutate the default package.json in any ways we need to
            appPackage.main = './node_modules/react-native-scripts/build/bin/crna-entry.js';
            appPackage.scripts = {
              start: 'react-native-scripts start',
              eject: 'react-native-scripts eject',
              android: 'react-native-scripts android',
              ios: 'react-native-scripts ios',
              test: 'node node_modules/jest/bin/jest.js --watch'
            };

            appPackage.jest = {
              preset: 'jest-expo'
            };

            if (!appPackage.dependencies) {
              appPackage.dependencies = {};
            }

            if (!appPackage.devDependencies) {
              appPackage.devDependencies = {};
            }

            // react-native-scripts is already in the package.json devDependencies
            // so we need to merge instead of assigning
            (0, _assign2.default)(appPackage.dependencies, DEFAULT_DEPENDENCIES);
            (0, _assign2.default)(appPackage.devDependencies, DEFAULT_DEV_DEPENDENCIES);

            // Write the new appPackage after copying so that we can include any existing
            _context.next = 26;
            return _fsPromise2.default.writeFile(appPackagePath, (0, _stringify2.default)(appPackage, null, 2));

          case 26:
            _context.next = 28;
            return _fsPromise2.default.copy(_path2.default.join(ownPath, 'template'), appPath);

          case 28:
            _context.prev = 28;
            _context.next = 31;
            return _fsPromise2.default.rename(_path2.default.join(appPath, 'gitignore'), _path2.default.join(appPath, '.gitignore'));

          case 31:
            _context.next = 46;
            break;

          case 33:
            _context.prev = 33;
            _context.t2 = _context['catch'](28);

            if (!(_context.t2.code === 'EEXIST')) {
              _context.next = 45;
              break;
            }

            _context.next = 38;
            return _fsPromise2.default.readFile(_path2.default.join(appPath, 'gitignore'));

          case 38:
            data = _context.sent;
            _context.next = 41;
            return _fsPromise2.default.appendFile(_path2.default.join(appPath, '.gitignore'), data);

          case 41:
            _context.next = 43;
            return _fsPromise2.default.unlink(_path2.default.join(appPath, 'gitignore'));

          case 43:
            _context.next = 46;
            break;

          case 45:
            throw _context.t2;

          case 46:

            // Run yarn or npm
            command = '';
            args = [];


            if (useYarn) {
              command = 'yarnpkg';
            } else {
              command = 'npm';
              args = ['install', '--save'];

              if (verbose) {
                args.push('--verbose');
              }
            }

            (0, _log2.default)('Installing dependencies using ' + command + '...');
            (0, _log2.default)(); // why is this here

            if (command === 'yarnpkg') {
              // it's weird to print a yarn alias that no one uses
              command = 'yarn';
            }

            proc = (0, _crossSpawn2.default)(command, args, { stdio: 'inherit' });

            proc.on('close', function (code) {
              if (code !== 0) {
                console.error('`' + command + ' ' + args.join(' ') + '` failed');
                return;
              }

              // display the cleanest way to get to the app dir
              // if the cwd + appName is equal to the full path, then just cd into appName
              var cdpath = void 0;
              if (_path2.default.resolve(cwd, appName) === appPath) {
                cdpath = appName;
              } else {
                cdpath = appPath;
              }

              (0, _log2.default)('\n\nSuccess! Created ' + appName + ' at ' + appPath + '\nInside that directory, you can run several commands:\n\n  ' + _chalk2.default.cyan(command + ' start') + '\n    Starts the development server so you can open your app in the Expo\n    app on your phone.\n\n  ' + _chalk2.default.cyan(command + ' run ios') + '\n    (Mac only, requires Xcode)\n    Starts the development server and loads your app in an iOS simulator.\n\n  ' + _chalk2.default.cyan(command + ' run android') + '\n    (Requires Android build tools)\n    Starts the development server and loads your app on a connected Android\n    device or emulator.\n\n  ' + _chalk2.default.cyan(command + ' test') + '\n    Starts the test runner.\n\n  ' + _chalk2.default.cyan(command + ' run eject') + '\n    Removes this tool and copies build dependencies, configuration files\n    and scripts into the app directory. If you do this, you can\u2019t go back!\n\nWe suggest that you begin by typing:\n\n  ' + _chalk2.default.cyan('cd ' + cdpath) + '\n  ' + _chalk2.default.cyan(command + ' start'));

              if (readmeExists) {
                (0, _log2.default)('\n' + _chalk2.default.yellow('You had a `README.md` file, we renamed it to `README.old.md`'));
              }

              (0, _log2.default)();
              (0, _log2.default)('Happy hacking!');
            });

          case 54:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[28, 33]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=init.js.map