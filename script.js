'use strict';

function startGame() {
    setPrototypesParent();

    // let n = 50;
    // let m = 40;


    let n = prompt("N", 20);
    let m = prompt("M", 20);

    let widthCell = 10;
    let parentNode = new Parent('div', 'field');
    parentNode.setWidth(m, widthCell);

    let listOfCellObjects = createListOfCell(parentNode, n, m, widthCell);

    
    getRandomCells(listOfCellObjects, n, m)
    changeCells(listOfCellObjects, n, m)
}

function Cell(tag, className, width) {
    this.tag = tag;
    this.class = className;
    this.width = width;
    this.element = undefined;

    this.createElement = createElement;
    this.addElement = addElement;
}

function Parent(tag, className) {
    this.tag = tag;
    this.class = className;
    this.width = undefined;
    this.element = document.getElementsByClassName(this.class)[0];
}

function createListOfCell(parentNode, n, m, widthCell) {
    let listOfCellObjects = [];
    for (let i = 0; i < n; i++) {
        listOfCellObjects.push([]);
        for ( let j = 0; j < m; j++) {
            listOfCellObjects[i].push(new Cell('div', 'cell', widthCell));
            setParentToCell(listOfCellObjects[i][j], parentNode);
            listOfCellObjects[i][j].createElement().addElement();
        }
     }
     return listOfCellObjects;
}

function setPrototypesParent() {
    Parent.prototype.getElement = getElement;
    Parent.prototype.setWidth = setWidth;
}

function setParentToCell(childNode, parentNode) {
    Object.setPrototypeOf(childNode, parentNode)
}

function getElement() {
    return this.element;
}

function setWidth(value, width) {
    this.width = value * width;
    this.element.style.width = `${this.width}px`;
    return this;
}

function createElement() {
    this.element = document.createElement(this.tag);
    this.element.classList.add(this.class);
    return this;
}

function addElement() {
    this.__proto__.element.appendChild(this.element);
    return this;
}

function getRandomCells(listOfCellObjects, n, m) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            listOfCellObjects[i][j].element.style.background = getRandomInt(2) == 0 ? "red" : "green";
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
  
function isCellAlive(cell) {
    return cell.element.style.backgroundColor == "green" ? true : false;
}

function changeCells(listOfCellObjects, n, m) {
    let numberOfChange = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let colorStart = listOfCellObjects[i][j].element.style.backgroundColor
            if (isCellAlive(listOfCellObjects[i][j])) {
                listOfCellObjects[i][j].element.style.backgroundColor = aliveChange(tester(listOfCellObjects, i, j))
            } else {
                listOfCellObjects[i][j].element.style.backgroundColor = deadChange(tester(listOfCellObjects, i, j))
            }
            let colorEnd = listOfCellObjects[i][j].element.style.backgroundColor
    
            if (colorStart != colorEnd) {
                numberOfChange++;
            }
        }
    }
    
    if (numberOfChange > 0) {
        setTimeout(changeCells, .1, listOfCellObjects, n, m)
        // changeCells(listOfCellObjects, n, m)
    }
}

function tester(listOfCellObjects, i, j) {
    let dead = 0;
    let alive = 0;

    for (let l = -1; l <= 1; l++) {
        for (let k = -1; k <= 1; k++) {
            if (!(k == 0 && l == 0) && tryCount(listOfCellObjects, i+l, j+k)) {
                isCellAlive(listOfCellObjects[i+l][j+k]) ? alive++ : dead++ ;
            }
        }
    }
    return alive; 
}

function tryCount(listOfCellObjects, i, j) {
    try {
        if (listOfCellObjects[i][j].element.style.backgroundColor != undefined) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

function aliveChange(alive) {
    if (alive < 2) {
        return "red";
    } else if (alive == 2 || alive == 3) {
        return "green";
    } else {
        return "red";
    }
}

function deadChange(alive) {
    if (alive == 3) {
        return "green";
    } else {
        return "red";
    }
}

function checkChange() {
    return 
}

startGame()