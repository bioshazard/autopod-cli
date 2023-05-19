import {Command,Args} from '@oclif/core'
import * as fs from 'fs-extra'
import * as path from 'path'
// import { $ } from 'zx' // https://github.com/google/zx#importing-into-other-scripts
// const $ = require('zx')

// import { exec } from 'child_process';
import { spawn, spawnSync } from 'child_process';


export default class AIO extends Command {
  static description = 'AIO'

  static examples = [
    `<%= config.bin %> <%= command.id %>
hello world! (./src/commands/hello/world.ts)
`,
  ]

  static flags = {}

  async run(): Promise<void> {

    // const normalizeSh = path.join(this.config.root, '..', '..', 'aio.sh')



    

    const directoryPath = 'raw'
    fs.readdir('raw', readRaw);
    
    function readRaw(err: any, files: any[]) {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }
    
      const fileNames = files.map(file => path.join(directoryPath, file));
      console.log('Filenames:', fileNames);

      // Get duration of first track for delaying the outro
      const duration = spawnSync('ffprobe', [
        '-v', 'error',
        '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        fileNames[0]
      ]).stdout.toString().trim().split('.')[0];
      
      // Build FFMPEG command
      const cmd = 'ffmpeg'
      const cmdArgs: string[] = [
        '-i', '../../auto-pod/intro.mp3',
        '-i', '../../auto-pod/outro.mp3',
      ]
      fileNames.forEach(mp3 => {
        cmdArgs.push('-i')
        cmdArgs.push(mp3)
      });

      cmdArgs.push('-filter_complex')

      const complexFilters: string[] = []

      // Prepare normalize vocals
      const normalizedVocalTracksList: string[] = []
      fileNames.forEach( (mp3, index) => {
        complexFilters.push(`[${2 + index}:a]dynaudnorm=f=150:g=15[normalized${2 + index}]`)
        normalizedVocalTracksList.push(`[normalized${2 + index}]`)
      })
      
      // Combine vocals with 10s delay (for intro)
      complexFilters.push(`${normalizedVocalTracksList.join('')}amix=inputs=${fileNames.length}:duration=longest,adelay=10000,volume=2[vocals]`)

      // Delay outro by duration of first track
      complexFilters.push(`[1:a]adelay=${duration}000[outro]`)

      // Combine intro, vocals, and outro
      // const finalVolumeFix1 = 'volume=2'
      const finalVolumeFix2 = 'dynaudnorm=f=150:g=15'
      complexFilters.push(`[0:a][vocals][outro]amix=inputs=3:duration=longest,${finalVolumeFix2}[aout]`)

      // Join filters as next cmdArg
      cmdArgs.push(complexFilters.join(';'))

      cmdArgs.push('-map')
      cmdArgs.push('[aout]')
      cmdArgs.push(`output-aio-${Math.floor(new Date().getTime() / 1000)}.mp3`)
      console.log(cmdArgs)

      const child = spawn(cmd, cmdArgs, { });
  
      child.stdout.on('data', (data: string | Buffer) => {
        // console.log(`stdout: ${data}`);
      });
      
      child.stderr.on('data', (data: string | Buffer) => {
        // console.error(`stderr: ${data}`);
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
}
