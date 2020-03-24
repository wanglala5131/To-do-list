(function () {
  // init
  let list = document.querySelector('#list')
  let mytodo = document.querySelector('#my-todo')
  let mydone = document.querySelector('#my-done')
  const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
  for (let todo of todos) {
    addItem(todo)
  }

  function addItem(text) {
    let newItem = document.createElement('li')
    newItem.innerHTML = `
    <label for="todo">${text}</label>
    <input type="text" class="modifyBox" value="${text}">
    <i class="check fa fa-check-square"></i>
    <i class="pencil fa fa-pencil"></i>
    <i class="delete fa fa-trash"></i>
  `
    if (text !== '') {               //若未輸入內容則不新增
      mytodo.appendChild(newItem)
    }
  }

  // Create
  const addBtn = document.querySelector('#addBtn')
  addBtn.addEventListener('click', function (event) {
    let inputBox = document.querySelector('#newTodo')
    let inputValue = inputBox.value
    addItem(inputValue)
    inputBox.value = ""   //輸入完清空
  })

  //press ENTER
  newTodo.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
      let inputBox = document.querySelector('#newTodo')
      let inputValue = inputBox.value
      addItem(inputValue)
      inputBox.value = ""  //輸入完清空
    }
  })


  //HTML結構改變：在mytodo 和 mydone外多包一層 #list
  //監聽器放在list，讓done也能刪掉
  // Delete
  list.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
      let li = event.target.parentElement
      li.remove()
    }
  })

  //check and to DONE
  mytodo.addEventListener('click', function (event) {
    if (event.target.tagName === 'LABEL') {
      event.target.classList.add('checked')
      let doneItem = event.target.parentElement //把target 存取下來
      mydone.append(doneItem)
    }
  })

  //recover and to TODO
  mydone.addEventListener('click', function (event) {
    if (event.target.matches('.checked')) {
      event.target.classList.remove('checked')
      let todoItem = event.target.parentElement //把target 存取下來
      mytodo.append(todoItem)
    }
  })

  let modifyBox = document.querySelector('.modifyBox')

  //點筆進入modify模式
  list.addEventListener('click', function (event) {
    if (event.target.matches('.pencil')) {
      let inputBox = event.target.parentElement.children[1]
      event.target.parentElement.classList.add('modify')  //換成修正模式
      inputBox.focus()

    }
  })



  //press ENTER 恢復 label模式
  list.addEventListener('keypress', function (event) {     //event.target為input
    if (event.keyCode == 13) {
      let label = event.target.parentElement.children[0]
      let changeItem = event.target.value                    //存取input裡修正過的文字
      label.innerHTML = changeItem                           //將label的文字換成input修正過的文字
      event.target.parentElement.classList.remove('modify')
    }
  })

  //點勾勾 恢復 label模式
  list.addEventListener('click', function (event) {
    if (event.target.matches('.check')) {
      let label = event.target.parentElement.children[0]
      let changeItem = event.target.parentElement.children[1].value     //存取input裡修正過的文字
      label.innerHTML = changeItem                           //將label的文字換成input修正過的文字
      event.target.parentElement.classList.remove('modify')
    }
  })



})()