document.addEventListener('DOMContentLoaded', () => {
    const phonebookContainer = document.getElementById('phonebook-container');
    const numberForm = document.getElementById('number-form');
    let phonenumbers = [];
    let alreadyExists = false;
    const phonebookUrl = 'http://localhost:3000/persons';

    //get json data using fetch
    fetch(`${phonebookUrl}`)
        .then(response =>  response.json())
        .then(data => data.forEach((person) => {
            
            phonenumbers = data;
            const personDiv = document.createElement('div');
            personDiv.setAttribute('id', person.id);
        
            // Create the name heading
            const nameHeading = document.createElement('h2');
            nameHeading.textContent = person.name;
        
            // Create the number heading
            const numberHeading = document.createElement('p');
            numberHeading.textContent = person.number;
        
            // Create the edit button
            const editButton = document.createElement('button');
            editButton.setAttribute('data-id', person.id);
            editButton.setAttribute('data-action', 'edit');
            editButton.setAttribute('id', `edit-${person.id}`);
            editButton.textContent = 'Edit';
        
            // Create the delete button
            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('data-id', person.id);
            deleteButton.setAttribute('data-action', 'delete');
            deleteButton.setAttribute('id', `delete-${person.id}`);
            deleteButton.textContent = 'Delete';
    
        
            // Append all elements to the personDiv
            personDiv.appendChild(nameHeading);
            personDiv.appendChild(numberHeading);
            personDiv.appendChild(editButton);
            personDiv.appendChild(deleteButton);
        
            // Append the personDiv to the phonebookContainer
            phonebookContainer.appendChild(personDiv);
              
          }
          ));
    
    
    //create new user
    numberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = numberForm.querySelector('#name').value;
        const numberInput = numberForm.querySelector('#number').value;
       
        let numbers = phonenumbers.map(number => number.number);
        for(let i = 0; i<numbers.length; i++) {
            if (numberInput == numbers[i]) {
                alert('Number already exists');
                alreadyExists = true;
                break;
            }
        }


        if (alreadyExists === false) {

        fetch(`${phonebookUrl}`, {
            method: 'POST',
            body: JSON.stringify({
              name: nameInput,
              number: numberInput,   
            }),
            headers: {
                'Content-Type': 'application/json'
            }
           
          })
          .then( response => response.json())
          .then( person => {
            const personDiv = document.createElement('div');
    personDiv.setAttribute('id', person.id);

    // Create the name heading
    const nameHeading = document.createElement('h2');
    nameHeading.textContent = person.name;

    // Create the number heading
    const numberHeading = document.createElement('p');
    numberHeading.textContent = person.number;

    // Create the edit button
    const editButton = document.createElement('button');
    editButton.setAttribute('data-id', person.id);
    editButton.setAttribute('data-action', 'edit');
    editButton.setAttribute('id', `edit-${person.id}`);
    editButton.textContent = 'Edit';

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-id', person.id);
    deleteButton.setAttribute('data-action', 'delete');
    deleteButton.setAttribute('id', `delete-${person.id}`);
    deleteButton.textContent = 'Delete';

    // Append all elements to the personDiv
    personDiv.appendChild(nameHeading);
    personDiv.appendChild(numberHeading);
    personDiv.appendChild(editButton);
    personDiv.appendChild(deleteButton);

    // Append the personDiv to the phonebookContainer
    phonebookContainer.appendChild(personDiv);
          }); } else {
            alreadyExists = false;
          }
    })
    


    //for edit and delete
    phonebookContainer.addEventListener('click', (e) => {

        //edit
        if (e.target.dataset.action === 'edit') {
            
            const editButton = document.querySelector(`#${e.target.id}`);
            editButton.disabled = true;
            const data = phonenumbers.find((person) => {
                console.log(person.id)
                return person.id == e.target.dataset.id
            })
            const editPhonebook = document.createElement('div');
            editPhonebook.id = 'edit-info';

            const editForm = document.createElement('form');
            editForm.id = 'editform';

            const nameInput = document.createElement('input');
            nameInput.setAttribute('required','');
            nameInput.id = 'edit-name';
            nameInput.placeholder = data.name;

            const numberInput = document.createElement('input');
            numberInput.setAttribute('required','');
            numberInput.id = 'edit-number';
            numberInput.placeholder = data.number;

            const submitButton = document.createElement('input');
            submitButton.type = 'submit';
            submitButton.value = 'Confirm edit';

            editForm.appendChild(nameInput);
            editForm.appendChild(numberInput);
            editForm.appendChild(submitButton);
            editPhonebook.appendChild(editForm);

            e.target.parentElement.appendChild(editPhonebook);


            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const nameInput = document.querySelector("#edit-name").value
          const numberInput = document.querySelector("#edit-number").value
          let numbers = phonenumbers.map(number => number.number);
        for(let i = 0; i<numbers.length; i++) {
            if (numberInput == numbers[i]) {
                alert('Number already exists');
                alreadyExists = true;
                break;
            }
        }

        if (alreadyExists === false) {
          fetch(`${phonebookUrl}/${data.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              name: nameInput,
              number : numberInput,
             
              
            }),
            headers: {
                'Content-Type': 'application/json'
            }
           
          })
     
        } else {
            while (editForm.firstChild) {
                editForm.removeChild(editForm.firstChild);
            }
            editButton.disabled = false;
        }
            })







      // delete
        }   else if (e.target.dataset.action === 'delete') {
            console.log(e.target.id);
            document.querySelector(`#${e.target.id}`).remove();
              fetch(`${phonebookUrl}/${e.target.dataset.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
               
              }).then( response => response.json())
             } else {
                alreadyExists = false;
            }
      
        

    })






        
})