//STRUKTURA
function createStructure(){
    var dropdownCheckList = document.createElement('div');
    dropdownCheckList.classList.add('dropdown-check-list');

    var field = document.createElement('div');
    field.classList.add('field');

    var anchor = document.createElement('span');
    anchor.classList.add('anchor');

    var input = document.createElement('input');
    input.classList.add('input');
    input.placeholder = 'Select elements...';
    input.type = 'text';

    var clearButton = document.createElement('button');
    clearButton.classList.add('clear');
    clearButton.textContent = '✖';

    field.appendChild(anchor);
    field.appendChild(input);
    field.appendChild(clearButton);

    var itemList = document.createElement('ul');
    itemList.classList.add('items');

    dropdownCheckList.appendChild(field);
    dropdownCheckList.appendChild(itemList);

    document.body.appendChild(dropdownCheckList);
}

createStructure()

let options = []
let selectedOptions = []

const checkList = document.querySelector('.dropdown-check-list');
let anchor = document.querySelector('.anchor')
let input = document.querySelector('.input')
const items = document.querySelector('.items')
let clearButton = document.querySelector('.clear')
const field = document.querySelector('.field')
let isVisible = false;

async function request(){
    const response = await fetch('https://6409ecabd16b1f3ed6e14668.mockapi.io/items')
    options = await response.json()
    options.forEach((item, index) => {
    
        let opt = document.createElement('li')
        opt.id = index
        opt.tabIndex = index // ne robe
        opt.textContent = item
        items.appendChild(opt)
    })
    
    const optionsList = document.querySelectorAll('.items li')
    optionsList.forEach((item, index) => {
        item.addEventListener('click', () => {
            add(index)
        })
    })
}
request()


function toggleVisibility(isVisible) {
    isVisible ? checkList.classList.add('visible') : checkList.classList.remove('visible')
}

input.onclick = () => toggleVisibility(true)

function removeSelected(item){
    let itemToRemove = item.textContent;
    let index = selectedOptions.indexOf(itemToRemove);
    selectedOptions.splice(index, 1);
}


function add(id){
    let item = document.createElement('div')
    let li = document.getElementById(id)
    
    item.textContent = li.textContent;
    item.className = 'selectedItem'

    if(!li.classList.contains("chosen")){
        selectedOptions.push(item.textContent)
    }
    

    let removeButton = document.createElement('button')
    removeButton.onclick = () => {
        item.remove()
        li.classList.remove('chosen')
        removeSelected(li)
    }
    removeButton.textContent = "✖"
    removeButton.classList.add('removeButton')
    item.appendChild(removeButton)
  
    if(Array.from(anchor.children).find(arrItem => {return arrItem.textContent === item.textContent})){
        anchor.removeChild(Array.from(anchor.children).find(arrItem => {return arrItem.textContent === item.textContent}))
    } else { 
        anchor.appendChild(item)
    }

    anchor.style.display = "inline-block";
    if(li.classList.contains("chosen")){
        li.classList.remove('chosen')
        removeSelected(li)
    } else{
        li.classList.add('chosen')
    }
}

clearButton.onclick = ()=>{
    // anchor.innerHTML = ''
    selectedOptions = []
    while (anchor.firstChild) {
        anchor.removeChild(anchor.firstChild);
    }
    let chosen = items.children;
    for(let i = 0; i<chosen.length; i++){
        chosen[i].classList.remove('chosen')
    }
};

function handleClick(event) {
    if (
        event.target === field || field.contains(event.target) ||
        event.target === items || items.contains(event.target) ||
        event.target.classList.contains('removeButton')
      ) {
        console.log(event.target)
        return;
      }

      toggleVisibility(false)
    }
    document.addEventListener('click', handleClick);

input.addEventListener('input', function() {
  var searchValue = input.value.toLowerCase();
  var liItems = items.getElementsByTagName('li');

  Array.from(liItems).forEach(function(item) {
    var text = item.textContent.toLowerCase();

    if (text.includes(searchValue)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});





