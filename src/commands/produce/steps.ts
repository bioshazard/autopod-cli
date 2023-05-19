import { Command, Args } from '@oclif/core';
import * as YAML from 'yaml'
import * as fs from 'fs';

export default class Steps extends Command {

  static args = {
    configFile: Args.string({description: 'Pod process config.yml path', required: true}),
  }

  async run() {
    const {args, flags} = await this.parse(Steps)
    // console.log(args.config)
    
    // Parse YAML
    try {
      // Read the YAML file
      const yamlData = fs.readFileSync(args.configFile, 'utf8');
    
      // Parse the YAML data
      const produceConfig = YAML.parse(yamlData);
    
      // // Access and work with the parsed data
      // TODO: Stay in the try??
      // console.log(parsedData);
      produceConfig.steps.forEach((step: any) => {
        console.log(step)
        // const operation = step.name
        // if(step.name === "normalize_audio")
      });

    } catch (error) {
      console.error('Error parsing YAML file:', error);
    }

    // // Run another command programmatically
    // // const result = await this.config.runCommand('produce', ['--help']);
    // const result = await this.config.runCommand('produce', ['test', '--from', 'asdf']);
    // // Handle the result if needed
    // console.log(result);
  }
}
