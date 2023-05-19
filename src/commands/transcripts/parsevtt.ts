import {Command,Args} from '@oclif/core'
import * as path from 'path'
import * as fs from 'fs'
import { spawn } from 'child_process';

export default class ParseVTT extends Command {
  static description = 'ParseVTT'

  static examples = [
    `<%= config.bin %> <%= command.id %>
hello world! (./src/commands/hello/world.ts)
`,
  ]

  static flags = {}

  static args = {
    actor: Args.string({description: 'Transcript Actor', required: true}),
    infile: Args.string({description: 'Input VTT file', required: true}),
    outfile: Args.string({description: 'Output file', required: true}),
    offset: Args.string({description: 'Timestamp offset mm:ss', required: false}),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(ParseVTT)

    const parsemergepy = path.join(
      this.config.root, '..', '..', 
      'transcripts', 'parse-merge.py'
    )

    const outputStream = fs.createWriteStream(args.outfile);

    // maybe not needed to override env... spawned env handles it?
    process.env.VTT_ACTOR = args.actor
    process.env.VTT_FILE = args.infile
    const child = spawn('python', [parsemergepy], {
      env: process.env
    });

    child.stdout.on('data', (data: string | Buffer) => {
      console.log(`stdout: ${data}`);
      const output = data.toString();
      outputStream.write(output);
    });
    
    child.stderr.on('data', (data: string | Buffer) => {
      console.error(`stderr: ${data}`);
    });
    
    child.on('close', (code: number) => {
      outputStream.end();
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
