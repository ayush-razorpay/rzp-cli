rzp-cli
=======

rzp integrations cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rzp-cli.svg)](https://npmjs.org/package/rzp-cli)
[![Downloads/week](https://img.shields.io/npm/dw/rzp-cli.svg)](https://npmjs.org/package/rzp-cli)
[![License](https://img.shields.io/npm/l/rzp-cli.svg)](https://github.com/ayush-razorpay/rzp-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g rzp-cli
$ rzp-cli COMMAND
running command...
$ rzp-cli (-v|--version|version)
rzp-cli/0.0.0 darwin-x64 node-v14.16.0
$ rzp-cli --help [COMMAND]
USAGE
  $ rzp-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`rzp-cli help [COMMAND]`](#rzp-cli-help-command)
* [`rzp-cli replay_webhook_events [FILE]`](#rzp-cli-replay_webhook_events-file)
* [`rzp-cli webhook_tailf`](#rzp-cli-webhook_tailf)

## `rzp-cli help [COMMAND]`

display help for rzp-cli

```
USAGE
  $ rzp-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `rzp-cli replay_webhook_events [FILE]`

describe the command here

```
USAGE
  $ rzp-cli replay_webhook_events [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/replay_webhook_events.ts](https://github.com/ayush-razorpay/rzp-cli/blob/v0.0.0/src/commands/replay_webhook_events.ts)_

## `rzp-cli webhook_tailf`

listen to webhook post calls

```
USAGE
  $ rzp-cli webhook_tailf

OPTIONS
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/webhook_tailf.ts](https://github.com/ayush-razorpay/rzp-cli/blob/v0.0.0/src/commands/webhook_tailf.ts)_
<!-- commandsstop -->
