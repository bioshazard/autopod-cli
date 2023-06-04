import {Command,Args} from '@oclif/core'
import * as path from 'path'
import * as fs from 'fs'
import { spawn } from 'child_process';

export default class TranscriptGPT extends Command {
  static description = 'TranscriptGPT'

  static examples = [
    `<%= config.bin %> <%= command.id %>
hello world! (./src/commands/hello/world.ts)
`,
  ]

  static flags = {}

  static args = {
    transcriptFile: Args.string({description: 'Transcript file', required: true}),
    promptKey: Args.string({description: 'Prompt key', required: false}),
    batchSize: Args.string({description: 'Timestamp offset mm:ss', required: false}),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(TranscriptGPT)

    const pyscript = path.join(this.config.root, 'src', 'scripts', 'summarizeChat.py'

      // this.config.root, '..', '..', 
      // 'transcripts', 'podcast-desc.py'

      // 'transcripts', 'recap.py'
      // 'transcripts', 'summarize.py'
    )

    // const outputStream = fs.createWriteStream(args.outfile);

    // maybe not needed to override env... spawned env handles it?
    process.env.TRANSCRIPT_FILE = args.transcriptFile
    // process.env.PROMPT_KEY = "short-summary"
    // process.env.PROMPT_KEY = args.promptKey
    // process.env.BATCH_SIZE = args.batchSize
    const child = spawn('python', [pyscript], {
      env: process.env
    });

    child.stdout.on('data', (data: string | Buffer) => {
      // console.log(`stdout: ${data}`);
      // const output = data.toString();
      // outputStream.write(output);
    });
    
    child.stderr.on('data', (data: string | Buffer) => {
      console.error(`stderr: ${data}`);
    });
    
    child.on('close', (code: number) => {
      // outputStream.end();
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
