#!/usr/bin/env node

/**
 * CLI - Simple API Key Manager
 */

const { Command } = require('commander');
const SimpleStorage = require('./storage');
const crypto = require('crypto');

const storage = new SimpleStorage();

const program = new Command();

program
  .name('apik')
  .description('Simple API key manager')
  .version('1.0.0');

// Add a key
program
  .command('add')
  .description('Add an API key')
  .requiredOption('-n, --name <name>', 'Key name')
  .requiredOption('-k, --key <key>', 'API key')
  .option('-s, --service <service>', 'Service name', 'default')
  .action((options) => {
    const id = storage.add({ name: options.name, value: options.key, service: options.service });
    console.log(`Added: ${options.name} (${id})`);
  });

// List keys
program
  .command('list')
  .description('List all API keys')
  .action(() => {
    const keys = storage.list();
    if (keys.length === 0) {
      console.log('No keys found');
      return;
    }
    keys.forEach(k => {
      console.log(`${k.id} | ${k.name} | ${k.service} | ${k.createdAt}`);
    });
  });

// Get a key
program
  .command('get <id>')
  .description('Get an API key')
  .action((id) => {
    const key = storage.get(id);
    if (!key) {
      console.log('Key not found');
      return;
    }
    console.log(`Name: ${key.name}`);
    console.log(`Service: ${key.service}`);
    console.log(`Key: ${key.value}`);
    console.log(`Created: ${key.createdAt}`);
  });

// Delete a key
program
  .command('del <id>')
  .description('Delete an API key')
  .action((id) => {
    if (storage.delete(id)) {
      console.log('Deleted');
    } else {
      console.log('Key not found');
    }
  });

// Generate a key
program
  .command('gen')
  .description('Generate a random API key')
  .option('-l, --length <length>', 'Key length', '32')
  .action((options) => {
    const key = crypto.randomBytes(parseInt(options.length)).toString('base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    console.log(key);
  });

program.parse(process.argv);
