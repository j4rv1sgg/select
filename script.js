function DropdownCheckList(options) {
    this.options = options
    this.selectedOptions = [];
    this.isVisible = false;
  
    
    this.createStructure = function() {
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
      

      
      let show = document.createElement('button')
      show.textContent = 'Show'
      show.onclick = ()=>{
        console.log(this.selectedOptions)
      }
      field.appendChild(show)


  
      field.appendChild(anchor);
      field.appendChild(input);
      field.appendChild(clearButton);
  
      var itemList = document.createElement('ul');
      itemList.classList.add('items');
  
      dropdownCheckList.appendChild(field);
      dropdownCheckList.appendChild(itemList);
  
      document.body.appendChild(dropdownCheckList);
  
      this.checkList = dropdownCheckList;
      this.anchor = anchor;
      this.input = input;
      this.items = itemList;
      this.clearButton = clearButton;
      this.field = field;
    };
  
    // by array
    this.request = function() { 
        
        this.options.forEach((item, index) => {
          let opt = document.createElement('li');
          opt.id = index;
          opt.className = `option-${index}`
          opt.textContent = item;
          this.items.appendChild(opt);
        });


    // by request
    // this.request = async function() {
    //   const response = await fetch('https://6409ecabd16b1f3ed6e14668.mockapi.io/items');
    //   this.options = await response.json();
    //   this.options.forEach((item, index) => {
    //     let opt = document.createElement('li');
    //     opt.id = index;
    //     opt.className = `option-${index}`
    //     opt.textContent = item;
    //     this.items.appendChild(opt);
    //   });
  
      const optionsList = this.items.querySelectorAll('li');
      optionsList.forEach((item, index) => {
        item.addEventListener('click', () => {
          this.add(index);
        });
      });
    };
  
    
    this.toggleVisibility = function(isVisible) {
      if (isVisible) {
        this.checkList.classList.add('visible');
        this.field.classList.add('field-border');
      } else {
        this.checkList.classList.remove('visible');
        this.field.classList.remove('field-border');
      }
    };
  
    
    this.add = function(id) {
      let item = document.createElement('div');
      let li = this.items.children[id];
      
      item.textContent = li.textContent;
      item.className = 'selectedItem';

  
      if (!this.selectedOptions.includes(item.textContent)) {
        li.classList.add(`chosen`);
        this.selectedOptions.push(item.textContent);
      }else{
        this.removeSelected(li);
        li.classList.remove(`chosen`);
      }
  
      let removeButton = document.createElement('button');
      removeButton.onclick = () => {
        item.remove();
        li.classList.remove('chosen');
        this.removeSelected(li);
      };
      removeButton.textContent = '✖';
      removeButton.classList.add('removeButton');
      item.appendChild(removeButton);
  
      if (Array.from(this.anchor.children).find(arrItem => arrItem.textContent === item.textContent)) {
        this.anchor.removeChild(Array.from(this.anchor.children).find(arrItem => arrItem.textContent === item.textContent));
      } else {
        this.anchor.appendChild(item);
      }
      
      this.anchor.style.display = 'inline-block';
    };
  
   
    this.removeSelected = function(item) {
      let itemToRemove = item.textContent;
      let index = this.selectedOptions.indexOf(itemToRemove);
      this.selectedOptions.splice(index, 1);
    };
  
    
    this.clearSelected = function() {
      this.selectedOptions = [];
      while (this.anchor.firstChild) {
        this.anchor.removeChild(this.anchor.firstChild);
      }
      let chosen = this.items.children;
      for (let i = 0; i < chosen.length; i++) {
        chosen[i].classList.remove('chosen');
      }
    };
  
    
    this.handleClick = function(event) {
      if (
        event.target === this.field ||
        this.field.contains(event.target) ||
        event.target === this.items ||
        this.items.contains(event.target) ||
        event.target.classList.contains('removeButton')
      ) {
        return;
      }
  
      this.toggleVisibility(false);
    };
  
    
    this.init = function() {
      this.createStructure();
      this.request();
  
      this.input.onclick = () => this.toggleVisibility(true);
  
      this.clearButton.onclick = () => {
        this.clearSelected();
      };
  
      document.addEventListener('click', this.handleClick.bind(this));
  
      this.input.addEventListener('input', () => {
        var searchValue = this.input.value.toLowerCase();
        var liItems = this.items.getElementsByTagName('li');
  
        Array.from(liItems).forEach(function(item) {
          var text = item.textContent.toLowerCase();
  
          if (text.includes(searchValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
  
      document.addEventListener('keydown', event => {
        if (document.activeElement === this.input) {
          let keyCode = event.keyCode || event.which;
          switch (keyCode) {
            case 13:
              this.toggleVisibility(true);
              break;
            case 27:
              this.input.value = '';
              this.toggleVisibility(false);
              break;
          }
        }
      });
    };
  }
  
  
  const dropdown1 = new DropdownCheckList(['car', 'show', 'button', 'click']);
  dropdown1.init();
  
  const dropdown2 = new DropdownCheckList(['Ukraine', 'Poland', 'Finland', 'Germany']);
  dropdown2.init();
  