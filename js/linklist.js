const linklistName = document.getElementById("linklistName");
const linklistUrl = document.getElementById("linklistURL");
const linklistAdd = document.getElementById("linklistAdd");
const linklist = document.getElementById("linklist");
const linklistInsertHTTPS = document.getElementById("linklistInsertHTTPS");
const linklistClear = document.getElementById("linklistClear");


const linklistArray = JSON.parse(localStorage.getItem("linklist")) || [];

function chargeLocalStorage() {
    const linklistArrayString = JSON.stringify(linklistArray);
    if (linklistArrayString) {
        linklistArray.forEach(link => {
            linklist.innerHTML += linklistElementTemplate(link);
        });
    }
}

function resetInputs(){
    linklistName.value = "";
    linklistUrl.value = "";
}

function removeValue(value, index, arr) {
    if (value === 2) {
        arr.splice(index, 1);
        return true;
    }
    return false;
}

function removeLinkFromArray(id,arr) {
    const index = arr.findIndex(link => link.id === id);
    if (index !== -1) {
        arr.splice(index, 1);
        localStorage.setItem("linklist", JSON.stringify(arr));
        return true;
    }
    return false;
}

function addLinkToLinkList(){
    const name = linklistName.value;
    let url = linklistUrl.value;
    const lastIndexLink = localStorage.getItem("lastIndexLink") || 0;
    const id = parseInt(lastIndexLink) + 1;
    
    if(!name || !url){
        alert("Por favor, completa todos los campos.");
        return;
    }
    if(linklistInsertHTTPS.checked){
        url= `https://${url}`;
    }
    const newLink = { name, url, id };
    linklistArray.push(newLink);
    localStorage.setItem("linklist", JSON.stringify(linklistArray));
    localStorage.setItem("lastIndexLink", id);
    linklist.innerHTML += linklistElementTemplate(newLink);

    resetInputs();

}

function linklistElementTemplate(link){
    return `<li class="linklist-item" data-id="${link.id}">
        <a href="${link.url}" target="_blank">${link.name}</a>
        <button class="delete-btn" data-url="${link.url}" onclick=removeElement(${link.id})>❌</button>
        </li>`;
}

function removeElement(id) {
    const linklistItem = document.querySelector(`[data-id="${id}"]`);
    removeLinkFromArray(id, linklistArray);
    linklistItem.remove();
}

function clear(){
    localStorage.removeItem("linklist");
    localStorage.removeItem("lastIndexLink");
    linklist.innerHTML = "";
}

linklistAdd.addEventListener("click", function () {
    addLinkToLinkList();
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addLinkToLinkList();
    }
});

if(linklistClear){
    linklistClear.addEventListener("click", function () {
        clear();
    });
}


chargeLocalStorage();