oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g autopod
$ autopod COMMAND
running command...
$ autopod (--version)
autopod/0.0.0 linux-x64 node-v18.14.0
$ autopod --help [COMMAND]
USAGE
  $ autopod COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`autopod hello PERSON`](#autopod-hello-person)
* [`autopod hello world`](#autopod-hello-world)
* [`autopod help [COMMANDS]`](#autopod-help-commands)
* [`autopod plugins`](#autopod-plugins)
* [`autopod plugins:install PLUGIN...`](#autopod-pluginsinstall-plugin)
* [`autopod plugins:inspect PLUGIN...`](#autopod-pluginsinspect-plugin)
* [`autopod plugins:install PLUGIN...`](#autopod-pluginsinstall-plugin-1)
* [`autopod plugins:link PLUGIN`](#autopod-pluginslink-plugin)
* [`autopod plugins:uninstall PLUGIN...`](#autopod-pluginsuninstall-plugin)
* [`autopod plugins:uninstall PLUGIN...`](#autopod-pluginsuninstall-plugin-1)
* [`autopod plugins:uninstall PLUGIN...`](#autopod-pluginsuninstall-plugin-2)
* [`autopod plugins update`](#autopod-plugins-update)

## `autopod hello PERSON`

Say hello

```
USAGE
  $ autopod hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/bioshazard/autopod/blob/v0.0.0/dist/commands/hello/index.ts)_

## `autopod hello world`

Say hello world

```
USAGE
  $ autopod hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ autopod hello world
  hello world! (./src/commands/hello/world.ts)
```

## `autopod help [COMMANDS]`

Display help for autopod.

```
USAGE
  $ autopod help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for autopod.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `autopod plugins`

List installed plugins.

```
USAGE
  $ autopod plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ autopod plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.4/src/commands/plugins/index.ts)_

## `autopod plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ autopod plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ autopod plugins add

EXAMPLES
  $ autopod plugins:install myplugin 

  $ autopod plugins:install https://github.com/someuser/someplugin

  $ autopod plugins:install someuser/someplugin
```

## `autopod plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ autopod plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ autopod plugins:inspect myplugin
```

## `autopod plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ autopod plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ autopod plugins add

EXAMPLES
  $ autopod plugins:install myplugin 

  $ autopod plugins:install https://github.com/someuser/someplugin

  $ autopod plugins:install someuser/someplugin
```

## `autopod plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ autopod plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ autopod plugins:link myplugin
```

## `autopod plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ autopod plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ autopod plugins unlink
  $ autopod plugins remove
```

## `autopod plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ autopod plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ autopod plugins unlink
  $ autopod plugins remove
```

## `autopod plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ autopod plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ autopod plugins unlink
  $ autopod plugins remove
```

## `autopod plugins update`

Update installed plugins.

```
USAGE
  $ autopod plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
