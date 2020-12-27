const chalk = require('chalk');
const yargs = require('yargs');
const notes=require('./notes')

// add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note Title'
           // demandOption: true,
           // type: String
        }, body: {
            describe: 'Note Title'
           // demandOption: true,
           // type: String
        }
    },
    handler: function (argv) {
        console.log('argv.title, argv.body',argv.title, argv.body)
        notes.addNote(argv.title, argv.body)
    }
})
//remove command

yargs.command({
    command: 'remove',
    describe: 'remove the body content',
    handler: function (argv) {
        console.log('removing the content from body of JSON--- command method---->',argv.title);
        notes.removeNote(argv.title)
    }
})

// get Note detail

yargs.command({
    command: 'get',
    describe: 'get the body content',
    handler: function (argv) {
        console.log('fetching the content from body of JSON--- command method---->',argv.title);
        notes.getNote(argv.title)
    }
})
yargs.command({
    command: 'getAll',
    describe: 'get the All body content',
    handler: function () {
        notes.getAllNotes()
    }
})

// create command

yargs.command({
    command: 'create',
    describe: 'create the body content',
    handler: function () {
        console.log('create the content from body of JSON');
    }
})

// view command

yargs.command({
    command: 'read',
    describe: 'read the body content',
    handler: function () {
        console.log('read the content from body of JSON');
    }
})

yargs.parse()