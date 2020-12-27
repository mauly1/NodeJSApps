// first way
/*const square =(x)=>{
    return x*x;
}*/

// second way
/*const square =(x)=>x*x*/

//console.log('output is ',square(5))

/*
const event ={
    name:'Birth Day Party',
    printGuestList: function (){
        console.log('Event for ',this.name)
    }
}
event.printGuestList();*/

const event = {
    name: 'Birth Day Party',
    guestNames: ['sunil', 'amit', 'akif', 'vinay'],
    printGuestList: () => {
        console.log(`event for ${event.name}`)
         event.guestNames.forEach((guest) => {
            console.log(`${guest} is going to attend ${event.name}`)
        })
    }
}
event.printGuestList();