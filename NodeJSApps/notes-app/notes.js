const chalk = require('chalk');

const fs = require('fs');
const getNotes = function () {
    return 'your notes...'
}
const addNote = function (title, body) {

    console.log('input title is ------- ', title)
    console.log('input body is ------- ', body)
    const jsonData = loadNotes();
    console.log('jsonData', jsonData)
    const isDuplicateTitle = jsonData.filter(function (JsonTitle) {
        console.log('jsonData ', jsonData)
        console.log('title ', title)
        return JsonTitle.title === title ? true : false
    })
    console.log('isDuplicateTitle value', isDuplicateTitle)
    if (isDuplicateTitle.length == 0) {
        jsonData.push({
            title: title,
            body: body
        })
        saveDate(jsonData);
        console.log(chalk.green.inverse(`Successfully added the title ${title} & body ${body} in json `))
    } else {
        console.log(chalk.red.inverse(`duplicate title ${title} has been entered`))
    }

}

function removeNote(title) {
    console.log('-----going to remove notes---------------- ', title)
    const jsonData = loadNotes();

    console.log('jsonData', jsonData)
    const notesToKeep = jsonData.filter((JsonTitle) => {
        return JsonTitle.title != title
    })
    console.log('notesToKeep ', notesToKeep);

    if (jsonData.length > notesToKeep.length) {
        saveDate(notesToKeep);
        console.log(chalk.green.inverse(`Successfully removed the title ${title} from json`))
    } else {
        console.log(chalk.red.inverse(`Sorry the title ${title} is does not matches from json data`))
    }
}

function getNote(title) {
    console.log('-----going to remove notes---------------- ', title)
    const jsonData = loadNotes();

    console.log('jsonData', jsonData)
    const dataBuffer = jsonData.find((JsonTitle) => {
        return JsonTitle.title === title
    })
    console.log('dataBuffer---------' ,dataBuffer)
    console.log('dataBuffer.length---------' ,dataBuffer.length)
    if (dataBuffer!=null && dataBuffer!=undefined) {

        var jsonParse = JSON.stringify(dataBuffer);
        console.log(chalk.green.inverse(`For the title ${title} we found data ${jsonParse}`))
    } else {
        console.log(chalk.red.inverse(`Sorry the title ${title} is does not matches from json data`))
    }
}

function getAllNotes() {
    debugger
    const jsonData = loadNotes();
    if (jsonData.length > 0) {
        const jsonParse = JSON.stringify(jsonData);
        console.log(chalk.green.inverse(`${jsonParse}`))
    } else {
        console.log(chalk.red.inverse(`Sorry we have not found any data from json file`))
    }
}

function saveDate(jsonData) {
    const content = JSON.stringify(jsonData);
    fs.writeFileSync('notes.json', content);
}

function loadNotes() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        console.log('dataJSON', dataJSON);
        return JSON.parse(dataJSON);

    } catch (e) {
        console.log('i am inside of else block')
        //  console.log(e);

        return [];
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    getNote: getNote,
    getAllNotes:getAllNotes
}