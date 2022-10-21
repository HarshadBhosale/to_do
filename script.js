function GetLocalStorage(){
    let alreadyArray = window.localStorage.getItem("todoArray");
    if (alreadyArray){
        return JSON.parse(alreadyArray);
    }
    else{
        return [];
    }
}
function SetLocalStorage(x){
    window.localStorage.setItem("todoArray", x);
}

function ShowList(){
    let ShowArray = GetLocalStorage();
    let listDiv = document.getElementById("list");
    html = ""
    if (ShowArray){
        ShowArray.map((item, index)=>{
            item.taskStatus?
            (html = html + `<div id =${index} >
            <input type="checkbox" id="status${item.ind}" onclick="taskDone(this.id);" checked>
            <button type="submit" onclick="deleteItem(this.parentNode.id)">
        Delete</button>
        <button type="submit" onclick="editItem(this.parentNode.id)">
        Edit</button> <s> ${item["val"]}</s></div>`):
            (html = html + `<div id =${index} >
            <input type="checkbox" id="status${item.ind}" onclick="taskDone(this.id);">
            <button type="submit" onclick="deleteItem(this.parentNode.id)">
        Delete</button>
        <button type="submit" onclick="editItem(this.parentNode.id)">
        Edit</button>${item["val"]}</div>`);});
        if(listDiv){
            listDiv.innerHTML = html;
        }
    }
}

ShowList();

function taskDone(im){
    im.substr(6)
    let ShowArr = window.localStorage.getItem("todoArray");
    if (ShowArr){
        let ShowArray = JSON.parse(ShowArr);
        html = ""
        if (ShowArray){
            ShowArray.map((item, index)=>{
                if (item.ind == im.substr(6)){
                    item.taskStatus = !item.taskStatus;
                }
            });
        }
        let x = JSON.stringify(ShowArray);
        window.localStorage.setItem("todoArray", x);
        ShowList();
    }
}

function AddInput(){
    let todoArray = GetLocalStorage();
    let inp_value = document.getElementById("todoInput").value;
    if (inp_value!=""){
        let x = new Date().valueOf();
        todoArray.push({ind: x, val: inp_value, taskStatus: 0});
        let y = JSON.stringify(todoArray);
        SetLocalStorage(y);
        ShowList();
        document.getElementById("todoInput").value = "";
    }
}

function deleteItem(elementDivID){
    let ShowArr = window.localStorage.getItem("todoArray");
    if (ShowArr){
        let ShowArray = JSON.parse(ShowArr);
        ShowArray.splice(elementDivID, 1);
        let x = JSON.stringify(ShowArray);
        window.localStorage.setItem("todoArray", x);
        ShowList();
    }
}

function DoneEdit(elementDivID){
    let ShowArray = GetLocalStorage();
    let editText = document.getElementById("editedText").value;
    ShowArray[elementDivID]["val"] = editText;
    let y = JSON.stringify(ShowArray);
    SetLocalStorage(y);
    ShowList();
}

function editItem(elementDivID){
    let ShowArr = window.localStorage.getItem("todoArray");
    if (ShowArr){
        let ShowArray = JSON.parse(ShowArr);
        let listDiv = document.getElementById("list");
        html = ""
        if (ShowArray){
            ShowArray.map((item, index)=>{
                if(index == elementDivID){
                    html = html + `<div id =${index} >
                    <input type="checkbox">
                <button type="submit" onclick="deleteItem(this.parentNode.id)">
            Delete</button>
            <button type="submit" onclick="DoneEdit(${elementDivID})">Done</button>
            <input type="text" id="editedText" value="${item["val"]}"></div>`;
                }
                else {
                    html = html + `<div id =${index} >
                    <input type="checkbox">
                <button type="submit" onclick="deleteItem(this.parentNode.id)">
            Delete</button>
            <button type="submit" onclick="editItem(this.id, this.parentNode.id)">
            Edit</button>  ${item["val"]}</div>`;
                }
                });
            
            if(listDiv){
                listDiv.innerHTML = html;
            }
        }
    }
}