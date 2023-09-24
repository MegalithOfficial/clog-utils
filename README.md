# Clog Utils

This is a custom logging library that allows you to create and apply log presets, change log styles, and customize log messages in your Node.js applications while still using `console.log`.

## Important Announcement
This module still in beta, please dont hesitate to Collaborate/Report issue!

## Installation

You can install the library using npm:

```shell
npm install clog-utils
```

## Getting Started

To get started, import the library and set it up:

```javascript
// ES/Typescript
import { clogUtils } from 'clog-utils';
// or CJS
const { clogUtils } = require("clog-utils");

const logger = new clogUtils({
//disableModification: false, --> Disables the console.log modification. Default: false
  presets: { // preset examples...
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

Now, you can use `console.log` as usual, and it will apply your custom presets and styles:

```javascript
console.log('This is a basic log message.');
console.log('This is an informational message.', 'info');
// or
console.log('This is an informational message.', { preset: "info" });
console.log('This is a warning message.', { preset: "Warning" });
// or you can set temp presets
console.log('This is a warning message.',  { preset: { prefix: 'Warning', prefixcolor: 'Red' }});
// you can use logger.log instead console.log if you want to.
```

## Anti Spam feature

Clog Utils will begin tracking duplicate console messages, and you can experiment with this functionality using setInterval:

```javascript
setInterval(() => {
 console.log('This is an counting message.', 'info'); // Output: [Info] This is an counting message. (number of duplicates)
}, 1000)
```

## Usages

### Restoring Original Logging

You can restore the original console logging behavior:

```javascript
logger.restore();
```
you can use to retrive the console.log implamention. 
```javascript
logger.setup();
```

### Managing Presets

You can manage presets using the following methods:


### Applying Presets

Presets define log prefixes and styles. You can apply presets like this:

```javascript
logger.addPreset({ info: { prefix: '[Info]', prefixcolor: 'green' }});
// you can use Hex color codes too!
console.log('This is an informational message.', 'info');
```

#### Set Presets

Set a collection of presets:

```javascript
const presets = {
  info: { prefix: '[Info]', prefixcolor: 'green' },
  warning: { prefix: '[Warning]', prefixcolor: 'yellow' },
};

logger.setPresets(presets);
```

#### Remove Preset

Remove a preset by name:

```javascript
logger.removePreset('info');
```

#### Get Preset

Get the configuration of a preset:

```javascript
const infoPreset = logger.getPreset('info');
console.log(infoPreset); // { prefix: '[Info]', prefixcolor: 'green', messageStructure: "%%prefix%% %%message%% %%counter%%" }
```

#### Get All Presets

Get all presets as an array of objects:

```javascript
const allPresets = logger.getAllPresets();
console.log(allPresets);
// [
//   { info: { prefix: '[Info]', prefixcolor: 'green', messageStructure: "%%prefix%% %%message%% %%counter%%" } },
//   { warning: { prefix: '[Warning]', prefixcolor: 'yellow', messageStructure: "%%prefix%% %%message%% %%counter%%" } },
//   { custom: { prefix: '[Custom]', prefixcolor: '\x1b[35m', messageStructure: "%%prefix%% %%message%% %%counter%%" } }
// ]
```

## Message Structures

Now you can setup customised message templates with Message Structures:

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

console.log("This message sent with Custom message structure.", "error") 
// Output: (0) This message sent with Custom message structure. [error]
```

## License

This library is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.