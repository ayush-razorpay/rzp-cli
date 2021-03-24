import {Command, flags} from '@oclif/command'
import { SimpleServer } from './server';
//import SimpleServer from 'SimpleServer';

const localtunnel = require('localtunnel');

class Mynewcli extends Command {
  static description = 'Heath checl'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {

(async () => {
  const tunnel = await localtunnel({subdomain:'ayush-------12345678765432', port: 3000 });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  tunnel.url;
  this.log(tunnel.url)

  tunnel.on('close', () => {
    // tunnels are closed
  });
})();




    const {args, flags} = this.parse(Mynewcli)
    console.log(args);

    console.log(flags);

    let s = new SimpleServer();
    s.start();
    //?? null safety
    const name = flags.name ?? 'world'
    this.log(`hello ${name} from ./src/index.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}

export = Mynewcli
