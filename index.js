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
  .action(async (username) => {
    try {
      const events = await getUserEvents(username);
      console.log(events);
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
