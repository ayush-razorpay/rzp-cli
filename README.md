rzp-cli 
=======

Official Razorpay Integrations Cli

[![rzp-cli](https://img.shields.io/static/v1?label=cli&message=razorpay&color=%3CCOLOR%3E)](http://razorpay.com/)
[![Version](https://img.shields.io/npm/v/rzp-cli.svg)](https://npmjs.org/package/rzp-cli)
[![Downloads/week](https://img.shields.io/npm/dw/rzp-cli.svg)](https://npmjs.org/package/rzp-cli)
[![License](https://img.shields.io/npm/l/rzp-cli.svg)](https://github.com/ayush-razorpay/rzp-cli/blob/master/package.json)




## The Rzp-Cli helps you build, test, and manage your Razorpay integration right from the terminal.

With the Rzp-Cli CLI, you can:

* Securely test webhooks without relying on third-party tunneling software and added hassel of setting them up.
* Trigger new or Replay webhook events to easily test your integration.
* Create, retrieve, update, and delete API objects directly from the cli.

And of course the Rzp-Cli is open source with a public repository on GitHub. Contributions, features, sample apps from developers are encouraged.

[![Demo CountPages alpha](https://ayush-razorpay.github.io/rzp-cli/demo1.gif)](https://user-images.githubusercontent.com/78246948/113035787-258a6d80-91b1-11eb-91ad-2ed2bd299601.mov)

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
* [`rzp-cli get [OBJECTID]`](#rzp-cli-get-objectid)
* [`rzp-cli help [COMMAND]`](#rzp-cli-help-command)
* [`rzp-cli post [FILE]`](#rzp-cli-post-file)
* [`rzp-cli replay_webhook_events [QUERY]`](#rzp-cli-replay_webhook_events-query)
* [`rzp-cli webhook_tailf`](#rzp-cli-webhook_tailf)

## `rzp-cli get [OBJECTID]`

Get Razorpay object id

```
USAGE
  $ rzp-cli get [OBJECTID]
```

_See code: [src/commands/get.ts](https://github.com/ayush-razorpay/rzp-cli/blob/v0.0.0/src/commands/get.ts)_

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

## `rzp-cli post [FILE]`

describe the command here

```
USAGE
  $ rzp-cli post [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/post.ts](https://github.com/ayush-razorpay/rzp-cli/blob/v0.0.0/src/commands/post.ts)_

## `rzp-cli replay_webhook_events [QUERY]`

describe the command here

```
USAGE
  $ rzp-cli replay_webhook_events [QUERY]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

Secial credit : [localtunnel](https://github.com/localtunnel/localtunnel)_

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

# Credits 

* [localtunnel](https://github.com/localtunnel/localtunnel)_

## Motivation

https://github.com/PaystackOSS/paystack-cli

https://github.com/stripe/stripe-cli
