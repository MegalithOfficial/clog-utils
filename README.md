# Clog Utils - Custom Logging Library for Node.js
[![CodeQL](https://github.com/MegalithOffical/clog-utils/workflows/CodeQL/badge.svg)](https://github.com/MegalithOffical/clog-utils/actions?query=workflow%3ACodeQL)
![GitHub](https://img.shields.io/github/license/Megalithoffical/clog-utils)

Clog Utils is a versatile logging library designed for Node.js applications. It empowers developers to create and apply log presets, change log styles, and customize log messages while still utilizing the familiar `console.log` functionality.

## Features 🚀
- **Lightweight**: Clog Utils is a lightweight logging library, ensuring minimal impact on your Node.js applications.
- **Zero Dependencies**: Designed with zero external dependencies, keeping your project's dependencies clean and simple.
- **Optimized for Speed**: Built for super-fast performance to minimize any logging overhead in your application.
- **Simple to Use**: Easy-to-use API allows you to quickly customize log messages while still using `console.log`.
- **Compatible with Chalk and Similar Modules**: Clog Utils seamlessly integrates with libraries like Chalk, enhancing your log messages with colorful styling.

## Installation 📦

You can install the library via npm:

```shell
npm install clog-utils
```

## Getting Started 🚀

To get started, follow these simple steps:

1. Import the library based on your project's module system (ES/Typescript or CommonJS):

```javascript
// ES/Typescript
import { clogUtils } from 'clog-utils';

// CommonJS
const { clogUtils } = require("clog-utils");
```

2. Initialize the logger and configure presets:

```javascript
const logger = new clogUtils({
  // Configuration options (see below for details)
  presets: {
    error: {
      prefix: '[error]',
      prefixcolor: 'red',
    },
    info: {
      prefix: '[info]',
      prefixcolor: '#a8c9e3',
    }
  }
});
```

Now, you can use `console.log` as usual, and it will apply your custom presets and styles to your log messages.

```javascript
console.log('This is a basic log message.');
console.log('This is an informational message.', 'info');
// or
console.log('This is an informational message.', { preset: "info" });
console.log('This is a warning message.', { preset: "Warning" });
// or you can set temporary presets
console.log('This is a warning message.',  { preset: { prefix: 'Warning', prefixcolor: 'Red' }});
// You can also use logger.log instead of console.log if you prefer.
```

## Anti-Spam Feature 🚫

Clog Utils includes an anti-spam feature that tracks duplicate console messages. You can experiment with this functionality using `setInterval`:

```javascript
setInterval(() => {
 console.log('This is a counting message.', 'info'); // Output: [Info] This is a counting message. (number of duplicates)
}, 1000)
```
![](https://github.com/MegalithOffical/clog-utils/blob/main/images/counting.gif)

You can disable the Anti-Spam feature by adding the `disableAntiSpam` option to presets:

```javascript
const logger = new clogUtils({
  presets: {
    error: {
      prefix: '[error]',
      prefixcolor: 'red',
      disableAntiSpam: true, // Default: false
    }
  }
});
```

## Usages 💡

### Warn and Error Functions ⚠️❌

You can send warnings and errors with customized messages:

```javascript
logger.warn("This is a warning");

logger.error("This is an error");
// Or for error objects
logger.error(new Error("This is an error"));
```
![](https://github.com/MegalithOffical/clog-utils/blob/main/images/error.png)
![](https://github.com/MegalithOffical/clog-utils/blob/main/images/warning.png)
![](https://github.com/MegalithOffical/clog-utils/blob/main/images/errorwithcontructor.png)

### Restoring Original Logging 🔄

You can restore the original console logging behavior:

```javascript
logger.restore();
```

You can also retrieve the original `console.log` implementation:

```javascript
logger.setup();
```

### Managing Presets 🎨

You can manage presets using the following methods:

#### Applying Presets ✔️

Presets define log prefixes and styles. You can apply presets like this:

```javascript
logger.addPreset({ info: { prefix: '[Info]', prefixcolor: 'green' }});
// You can use Hex color codes too!
console.log('This is an informational message.', 'info');
```

#### Set Presets 📝

Set a collection of presets:

```javascript
const presets = {
  info: { prefix: '[Info]', prefixcolor: 'green' },
  warning: { prefix: '[Warning]', prefixcolor: 'yellow' },
};

logger.setPresets(presets);
```

#### Remove Preset 🗑️

Remove a preset by name:

```javascript
logger.removePreset('info');
```

#### Get Preset 🧐

Get the configuration of a preset:

```javascript
const infoPreset = logger.getPreset('info');
console.log(infoPreset); // { prefix: '[Info]', prefixcolor: 'green', messageStructure: "%%prefix%% %%message%% %%counter%%" }
```

#### Get All Presets 📋

Get all presets as an array of objects:

```javascript
const allPresets = logger.getAllPresets();
console.log(allPresets);
// Example output:
// [
//   { info: { prefix: '[Info]', prefixcolor: 'green', messageStructure: "%%prefix%% %%message%% %%counter%%" } },
//   { warning: { prefix: '[Warning]', prefixcolor: 'yellow', messageStructure: "%%prefix%% %%message%% %%counter%%" } },
//   { custom: { prefix: '[Custom]', prefixcolor: '\x1b[35m', messageStructure: "%%prefix%% %%message%% %%counter%%" } }
// ]
```

## Message Structures 📝📜

Customize your log messages using message structures:

```javascript 
const logger = new clogUtils({
  presets: { 
    error: {
      prefix: '[error]',
      prefixcolor: 'red',
      messageStructure: "%%counter%% %%message%% %%prefix%%"
    },
    info: {
      prefix: '[info]',
      prefixcolor: '#a8c9e3',
      // Default is --> messageStructure: "%%prefix%% %%message%% %%counter%%"
    }
  }
});

/*
    Placeholders:

    %%prefix%% - Prefix with the prefixColor.
    %%prefixWithoutColor%% - Prefix without the prefixColor.
    %%message%% - Your message content.
    %%counter%% - Anti-spam feature's counter.
*/

console.log("This message is sent with a custom message structure.", "error") 
// Output: (0) This message is sent with a custom message structure. [error]
```

## License 📄

This library is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.
