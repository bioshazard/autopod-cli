import {Command,Args} from '@oclif/core'
import * as fs from 'fs-extra'
import * as path from 'path'
// import { $ } from 'zx' // https://github.com/google/zx#importing-into-other-scripts
// const $ = require('zx')

// import { exec } from 'child_process';
import { spawn } from 'child_process';





export default class Mix extends Command {
  static description = 'Mix'

  static examples = [
    `<%= config.bin %> <%= command.id %>
hello world! (./src/commands/hello/world.ts)
`,
  ]

  static flags = {}

  static args = {
    // input: Args.string({description: 'Source file', required: true}),
    // output: Args.string({description: 'Output file', required: true}),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Mix)


    // let branch = await $`git branch --show-current`
    // this.log(this.config.configDir)
    // const userConfig = await fs.readJSON()
    // console.log(this.config.root)

    const mixSh = path.join(this.config.root, '..', '..', 'mix.sh')
    // const command = `INPUT_FILE=${args.input} OUTPUT_FILE=${args.output} bash ${normalizeSh}`
    this.log(mixSh)

    // const $ = await import('zx');
    // await $`ls`;
    // // void (async function () {
    // // })();


    // exec(command, (err: Error | null, stdout: string, stderr: string) => {
    //   if (err) {
    //     console.error(`Error: ${err}`);
    //     return;
    //   }
    //   console.log(`stdout: ${stdout}`);
    //   console.error(`stderr: ${stderr}`);
    // });

    // process.env.INPUT_FILE = args.input
    // process.env.OUTPUT_FILE = args.output
    const child = spawn('bash', [mixSh], {
      env: process.env
    });

    child.stdout.on('data', (data: string | Buffer) => {
      console.log(`stdout: ${data}`);
    });
    
    child.stderr.on('data', (data: string | Buffer) => {
      console.error(`stderr: ${data}`);
    });
    
    child.on('close', (code: number) => {
      console.log(`child process exited with code ${code}`);
      process.exit(code);
    });
    
    // Let the user input the answer to the STDIN prompt
    process.stdin.on('data', (data: string | Buffer) => {
      child.stdin.write(data);
    });
    
    process.stdin.on('end', () => {
      child.stdin.end();
    });
    
    // Forward the child process's STDIN to the console
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  }
}
