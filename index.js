const boxes = document.querySelectorAll('.box');
console.log(boxes)
var swapedElements = [boxes[0], boxes[0]];

for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    box.addEventListener('dragstart', dragStart,);
    box.addEventListener('dragenter', dragEnter);
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
}

function dragStart(e) {
    var crt = this.cloneNode(true);
    crt.style.backgroundColor = "red";
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(this, 0, 0);
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragEnter(e) {
    e.preventDefault()
    e.target.classList.add("drag-over");
}

function dragOver(e) {
    e.preventDefault()
    e.target.classList.add("drag-over");
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');

    const nodeA = e.target;
    const id = e.dataTransfer.getData('text/plain');
    const nodeB = document.getElementById(id);

    // Swaping
    swapElements(nodeA, nodeB);

    // Saving the swaped elements for UNDO button
    swapedElements = [nodeA, nodeB]

}

function swapElements(nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
}

const undo = document.getElementById("btn-undo");

undo.addEventListener("click", onClick);

function onClick(e) {
    swapElements(...swapedElements);
}