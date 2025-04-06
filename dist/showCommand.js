import fs from 'fs';
import path from 'path';
import { printFunko } from './listCommand.js';
import chalk from 'chalk';
export const log = console.log;
/**
 * Show command wiht obligatory options
 */
export const showCommand = {
    command: 'show',
    describe: 'shows information of a concrete funko',
    builder: (yargs) => {
        return yargs
            .option('user', {
            description: 'username',
            type: 'string',
            demmandOption: true
        })
            .option('id', {
            description: 'funko id',
            type: 'number',
            demmandOption: true
        });
    },
    handler: (args) => {
        showFunko(args.user, args.id);
    }
};
/**
 *
 * @param user - username
 * @param id Funko id
 */
export function showFunko(user, id) {
    fs.readFile(path.join(process.cwd(), `/${user}/${user}.json`), (err, data) => {
        if (err) {
            log(chalk.red('Error reading the file'));
        }
        else {
            let JSONdata = JSON.parse(data.toString());
            JSONdata = JSONdata.filter(funko => {
                return funko.id === id;
            });
            if (JSONdata.length === 0) {
                log(chalk.red(`Error: the funko ${id} is not on th elist`));
            }
            else {
                printFunko(JSONdata[0]);
            }
        }
    });
}
