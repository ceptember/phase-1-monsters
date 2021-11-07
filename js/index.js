/*
in the #monster-container div, list for each monster: 
Monster h2 
h4 Age 
p description

repeat x50
*/

let back = document.getElementById('back');
let forward = document.getElementById('forward');
let monsters = document.getElementById('monster-container');
let page = 1; 

//Add HTML for the Create Monster form inputs 
function buildForm (){
    document.getElementById('create-monster').innerHTML = "<form><input type='text' id='name' placeholder='name...'></input><input type='text' id='age' placeholder='age...'></input><input type='text' id='description' placeholder='description...'></input><button>create</button> </form> "
    let create = document.querySelector('form button')
    create.addEventListener('click', createMonster)
}

//Add a new monster to the db
function createMonster(event){
    event.preventDefault(); 
    let name = document.getElementById('name').value; 
    let age = document.getElementById('age').value; 
    let desc = document.getElementById('description').value
    console.log(name, age, desc);

    let fetchObj = {
        method: 'POST', 
        headers: {  "Content-Type": "application/json",
        Accept: "application/json"}, 
        body: JSON.stringify({
            name: name,
            age: age, 
            description: desc,
        })
    }
    fetch('http://localhost:3000/monsters', fetchObj)

    document.getElementById('name').value=""
    document.getElementById('age').value=""
    document.getElementById('description').value=""
}

//List 50 Monsters at a time in the DOM 
function listMonsters(){
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(data => {
            monsters.innerHTML="";
            for (let monst of data){
                let monDiv = document.createElement('div'); 
                monDiv.innerHTML = `<h2>${monst.name}</h2>
                                    <h4>${monst.age}</h4>
                                    <p>${monst.description}</p>`
                monsters.appendChild(monDiv);
            }
        })
}

function moveFwd(){
    page++; 
    listMonsters()
}

function moveBack(){
    page--; 
    listMonsters(); 
}

document.addEventListener('DOMContentLoaded', buildForm);
document.addEventListener('DOMContentLoaded', listMonsters);
forward.addEventListener('click', moveFwd);
back.addEventListener('click', moveBack);