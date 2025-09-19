
const rx = 15;
const ry = 10;
const xLimit = -15;
const lineUpY = 50;
const color = "black";
const width = 2;
const yEverything = 80;

const NUMBER_LINE = 5
const SPACE_BETWEEN_LINE = 20;
const VERTICAL_LINE_COUNT = 4;

const circle = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
const svg = document.getElementById("svg");

let BPM = 75;
let dureeBatement = 60/BPM;
let DISTANCE = 100;
let SPEED_MOVEMENT = DISTANCE/dureeBatement;
let SPAWN_INTERVAL = (DISTANCE/SPEED_MOVEMENT)*1000;

const cleSol = [
    {name : "la"},
    {name : "sol"},
    {name : "fa"},
    {name : "mi"},
    {name : "re"},
    {name : "do"},
    {name : "si"},
    {name : "la"},
    {name : "sol"},
    {name : "fa"},
    {name : "mi"},
    {name : "re"},
    {name : "do"}
]
const cleFa = [
    {name : "do"},
    {name : "si"},
    {name : "la"},
    {name : "sol"},
    {name : "fa"},
    {name : "mi"},
    {name : "re"},
    {name : "do"},
    {name : "si"},
    {name : "la"},
    {name : "sol"},
    {name : "fa"},
    {name : "mi"}
]

let x = 600;

circle.setAttribute("rx", rx);
circle.setAttribute("ry", ry);
circle.setAttribute("fill",color)

line.setAttribute("stroke",color);
line.setAttribute("stroke-width",width);

group.classList.add("note");
group.appendChild(circle);
group.appendChild(line);



let noteCreated = [];
let counter = 0;
function getPositionY(noteIndex){
    return ((noteIndex) * (SPACE_BETWEEN_LINE / 2)) + yEverything;
}

function needLine(y) {
    let isOutOfRange = y <= yEverything || y > (yEverything + (NUMBER_LINE * SPACE_BETWEEN_LINE));
    let needLine = y % SPACE_BETWEEN_LINE == 0 ? true : false;
    return isOutOfRange && needLine;
}


function addNote(notes) {
    if (!paused) {
        let newNote = group.cloneNode(true);
        let ellipse = newNote.childNodes[0];
        let queue = newNote.childNodes[1];
        let noteIndex = getRandomInt(notes.length);
        let y = getPositionY(noteIndex);
    
        if (needLine(y)) {
            let line = document.createElementNS("http://www.w3.org/2000/svg","line");
            line.setAttribute("y1",y);
            line.setAttribute("y2",y);
            line.setAttribute("x1",x-(1.5*rx));
            line.setAttribute("x2",x+(1.5*rx));
            line.setAttribute("stroke",color);
            line.setAttribute("stroke-width",width);
            newNote.appendChild(line);
        }
    
        ellipse.setAttribute("cy",y);
        ellipse.setAttribute("cx",x);
        queue.setAttribute("y1",y);
        queue.setAttribute("y2",y - lineUpY);
        queue.setAttribute("x1",x+rx-1);
        queue.setAttribute("x2",x+rx-1);
        svg.appendChild(newNote);
    
        noteCreated.push({note:newNote, x:0, name : notes[noteIndex].name})
        console.log(notes[noteIndex].name)
        return newNote;
    }
}

for (let line = 1; line <= NUMBER_LINE; line++) {
    let l = document.createElementNS("http://www.w3.org/2000/svg","line");
    l.setAttribute("x1","0%");
    l.setAttribute("x1","100%");
    l.setAttribute("y1",yEverything + SPACE_BETWEEN_LINE * line);
    l.setAttribute("y2",yEverything + SPACE_BETWEEN_LINE * line);
    l.setAttribute("stroke", color);
    l.setAttribute("stroke-width", width);
    svg.appendChild(l);
}

function moveLeft(pixel) {
    if (!paused) {
        for (let index = noteCreated.length - 1; index >= 0; index--) {
            if (noteCreated[index].x+x > xLimit){
                noteCreated[index].x -= pixel;
                noteCreated[index].note.setAttribute("transform",`translate(${noteCreated[index].x},0)`);
            } else {
                noteCreated[index].note.remove();
                noteCreated.shift();
            }   
        }
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let timerSpawn = 0;
let timer = 0;
function animate(timestamp) {
    moveLeft((SPEED_MOVEMENT/1000) * (timestamp - timer));
    timer = timestamp;
    if (timestamp - timerSpawn > SPAWN_INTERVAL){
        addNote(selectedKey);
        timerSpawn = timestamp;
    }
    requestAnimationFrame(animate);
}

changeBPMInput = document.getElementById("bpm");
BPMOutput = document.getElementById("outputBPM");
BPMOutput.textContent = BPM;
changeBPMInput.value = BPM;
changeBPMInput.addEventListener("input",() => {
    changeBPM(changeBPMInput.value);
});

function changeBPM(value){
    BPM = value;
    dureeBatement = 60/BPM;
    SPEED_MOVEMENT = DISTANCE/dureeBatement;
    SPAWN_INTERVAL = (DISTANCE/SPEED_MOVEMENT)*1000;
    BPMOutput.textContent = BPM;
};

let buttonGuessList = document.getElementsByClassName("noteGuess");
let keyNotesList = ["a","z","e","r","i","o","p"];
let keyIndexPressed = 0;
for (let index = 0; index < buttonGuessList.length; index++) {
    const button = buttonGuessList[index];
    button.addEventListener("click",guessNote);
    button.textContent += ` : ${keyNotesList[index]}`;
};

document.addEventListener("keydown", (event) => {
    index = keyNotesList.findIndex((element) => event.key == element);
    console.log(index);
    if (index != -1){
        keyIndexPressed = index;
        guessNote();
    }
})

let score = 0;
let scoreOutput = document.getElementById("Score");
let answerText = document.getElementById("Answer");
scoreOutput.textContent = score;


function guessNote(evt) {
    if (!paused) {
        if (evt == undefined){
            button = buttonGuessList[keyIndexPressed];
        } else {
            button = evt.target;
        }
        let guessed = noteCreated.shift();
        if (guessed != undefined){
            guessed.note.remove();
            if (button.value == guessed.name){
                score++
                scoreOutput.textContent = score;
                answerText.textContent = "Bien joué !";
                answerText.classList.add("good");
                answerText.classList.remove("bad");
            } else {
                answerText.textContent = guessed.name;
                answerText.classList.remove("good");
                answerText.classList.add("bad");
            }

            
        }   
    }
};

let paused = true;
let pauseButton = document.getElementById("Pause");
function switchPause() {
    if (paused) {
        paused = false;
        pauseButton.textContent = "Pause";
    } else {
        paused = true;
        pauseButton.textContent = "Commencer"
    }
};

let selectedKey = cleSol;
function switchKey(){
    if (selectedKey == cleSol){
        selectedKey = cleFa;
        submit.textContent = "Clé : Fa";
    } else {
        selectedKey = cleSol;
        submit.textContent = "Clé : Sol";
    }
    while (noteCreated.length > 0){
        noteCreated[0].note.remove()
        noteCreated.shift();
    }
}

let submit = document.getElementById("selectKey");
submit.addEventListener("click", switchKey);
pauseButton.addEventListener("click", switchPause);
requestAnimationFrame(animate);