rzp-cli
=======

rzp integrations cli

[![razorpay](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
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
* [`rzp-cli login`](#rzp-cli-login)
* [`rzp-cli webhook_listen`](#rzp-cli-webhook_listen)

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

## `rzp-cli login`

Login to Razorpay using key Id & secret

```
USAGE
  $ rzp-cli login

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/login.ts](https://github.com/ayush-razorpay/rzp-cli/blob/v0.0.0/src/commands/login.ts)_

## `rzp-cli webhook_listen`

describe the command here

```
USAGE
  $ rzp-cli webhook_listen

OPTIONS
  -h, --help     show CLI help
  -u, --url=url  (required) App url for Webhook http request forwarding
```

_See code: [src/commands/webhook_listen.ts](https://github.com/ayush-razorpay/rzp-cli/blob/v0.0.0/src/commands/webhook_listen.ts)_
<!-- commandsstop -->
