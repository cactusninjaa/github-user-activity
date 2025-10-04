import { Command } from 'commander';
import {
    getUserDetails,
    getUserEvents
} from './hooks/index.js'

const program = new Command();

program
  .name('github-user-activity')
  .description('CLI to follow GitHub user activity')
  .version('0.1.0');

program.command('user-events')
  .description('List user events')
  .argument('<username>', 'Username to fetch')
  .option('-p, --payload', 'Get the payload of the events')
  .option('--number', 'only display events\'s number')
  .action(async (username, option) => {
    try {
      const events = await getUserEvents(username);
      if (option.number){
        console.log(`\x1b[32m${username}\x1b[0m made \x1b[32m${events.length}\x1b[0m events`);
      } else {
        events.map((event) => {
          const date = new Date (event.created_at).toDateString();
          const repoName = event.repo.name;
          const type = event.type;
          const payload = JSON.stringify(event.payload, null, 2);
          
          console.log('');
          console.log(`\x1b[32m${type} on ${repoName} at ${date}\x1b[0m`);
          if (option.payload){
            console.log('');
            console.log(`\x1b[34mWith payload\x1b[0m : ${payload}`);
          };
        });
      };
    } catch (err) {
      console.error('Error:', err.message);
    }
  });

program.command('user-details')
  .description('User details information')
  .argument('<username>', 'Username to fetch')
  .option('-i, --id', 'Retrieve user ID only')
  .action(async (username, options) => {
    try {
      const user = await getUserDetails(username);
      if (options.id) {
        console.log(user.id);
      } else {
        console.log(user);
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  });

program.parse();
