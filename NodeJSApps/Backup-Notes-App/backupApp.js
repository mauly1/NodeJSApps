const add = require('./util')
const validator = require('validator')
const yargs = require('yargs')



console.log(yargs.argv)

yargs.command({
    command: 'add',
    describe: 'command will be used to add two numbers',
    builder:{
        title:{
            describe:'Description for ADD operation builder title..',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Notes body',
            demandOption:true,
            type:'string'
        }
    },
    handler: function (argv) {
        console.log('Title: ',argv.title);
        console.log('Body: ',argv.body);
    }
})
yargs.parse();
/*
yargs.command({
    command: 'remove',
    describe: 'command will be used to subtract two numbers',
    builder:{
        title:{
            describe:'Description for REMOVE operation builder title..',
            demandOption:true
        }
    },
    handler: function (argv) {
        console.log('Subtracting two numbers ...',argv);
    }
})
yargs.command({
    command: 'list',
    describe: 'command will be used to the list',
    builder:{
        title:{
            describe:'Description for LIST operation builder title..',
            demandOption:true
        }
    },
    handler: function (argv) {
        console.log('List of the numbers ...',argv);
    }
})
yargs.command({
    command: 'read',
    describe: 'command will be used to the read the content',
    builder:{
        title:{
            describe:'Description for READ operation builder title..',
            demandOption:true
        }
    },
    handler: function (argv) {
        console.log('rea the numbers ...',argv);
    }
})
*/


/*
const command =process.argv[2];
const param1 =Number(process.argv[3]);
const param2 =Number(process.argv[4]);

if (command.toUpperCase('ADD')){
    console.log(`operation name is ${command} and after addition value is ${add(param1,param2)}`);
}*/
