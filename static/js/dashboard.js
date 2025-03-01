function renderContacts(){
    const contacts = JSON.parse(sessionStorage.getItem('pert'))['Social']
    // console.log(contacts)
    const contactsSection = document.getElementById("contacts").querySelector("div");
    const inputItems = document.createElement('div')
    inputItems.classList.add('input-grid')
    Object.keys(contacts).forEach((key) => {
        const inputItem = document.createElement('div');
        inputItem.classList.add('input-item');

        const icon = document.createElement('img');
        icon.src = contacts[key];
        icon.alt = key;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = key;
        input.id = key

        inputItem.appendChild(icon);
        inputItem.appendChild(input);

        inputItems.appendChild(inputItem);
    });
    contactsSection.append(inputItems)
}
function renderPers() {
    const SkillsSec = document.getElementById('skills');
    const SkillsCont = SkillsSec.querySelector("div");
    const pert = JSON.parse(sessionStorage.getItem('pert'));
    
    for (let category in pert) {
        if (category != "Social") {
            const h3 = document.createElement('h3');
            h3.textContent = category;
            const gridDiv = document.createElement('div');
            gridDiv.style.display = 'grid';
            gridDiv.style.gridTemplateColumns = 'repeat(auto-fill, minmax(100px, 1fr))';
            gridDiv.style.gap = '10px';
    
            pert[category].forEach(item => {
                const itemDiv = document.createElement('div');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.style.display = 'none';
                checkbox.id=item.name
                checkbox.setAttribute('data-category', category);
                itemDiv.appendChild(checkbox);

                const img = document.createElement('img');
                img.src = item.image_url;
                img.alt = item.name;
                img.style.width = '75%';
                img.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
                itemDiv.appendChild(img);
      
                // const name = document.createElement('p');
                // name.textContent = item.name;
                // name.style.fontFamily="sans-serif"
                // itemDiv.appendChild(name);
    
                // Toggle the checkbox when the image is clicked
                img.addEventListener('click', () => {
                    checkbox.checked = !checkbox.checked;  // Toggle checkbox state
                    if (checkbox.checked) {
                        img.style.transform = 'scale(1.05)';
                        // img.style.boxShadow = '0px 8px 30px rgba(0, 0, 0, 0.4), 0px 8px 45px rgba(0, 0, 0, 0.3)';
                        img.style.boxShadow = '0 0 45px rgba(220, 220, 228, 0.7)';
                    } else {
                        img.style.transform = 'scale(1)';
                        img.style.boxShadow = 'none';
                    }
                });
                gridDiv.appendChild(itemDiv);
            });

            SkillsCont.appendChild(h3);
            SkillsCont.appendChild(gridDiv);
        }
    }
}

function postUserSkills(){
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const checkedIds = Array.from(checkedCheckboxes).map(checkbox => {
        return {
            key:checkbox.getAttribute("data-category"),
            val: checkbox.id
        };
    });
    fetch('/updateSkills',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkedIds)
    }).then(res=>res.json()).then(d=>{
        if(!d.error){
            showAlert("Skills saved","success",3000)
        }else{
            showAlert("Failed saving data","caution",3000)
        }
    }).catch(error=>{
        showAlert("Error uploading data","error",3000)
    })
}
function postUserContacts(){
    const contacts = Array.from(document.querySelectorAll("input[type='text']")).filter(input=>input.value.trim()!='').map(item=>{return {id:item.id,val:item.value}})
    
    fetch('/updateContacts',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contacts)
    }).then(res=>res.json()).then(d=>{
        if(!d.error){
            showAlert("Contacts saved","success",3000)
        }else{
            showAlert("failed saving data","caution",3000)
        }
    }).catch(error=>{
        showAlert("Error uploading data","error",3000)
    })
    console.log(contacts)
}
const getArrays = (obj) => {
    let arrays = [];
    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            arrays=arrays.concat(obj[key]);
        }
    }
    return arrays;
};

function setPers(){
    // var pert=JSON.parse(sessionStorage.getItem('pert'))
    var user = getArrays(JSON.parse(sessionStorage.getItem('user')))
    console.log(user)
    user.map(lang=>{
        img = document.querySelector(`img[alt="${lang}"]`)
        img.click()
    })
    
}