var content = [
  
]

var openedNoteIndex = 0;
var sidebar = document.querySelector("#note-app-Sidebar");
var notesContent = document.querySelector("#note-app-Content");
var notesContentHeader = document.querySelector("#note-app-Content-header");

function setNotesContent(index) {
  notesContent.innerHTML = content[index].content;
  notesContentHeader.innerHTML = content[index].title;
}

function addToSideBar(index) {
  var note = content[index];
  var newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <p style="margin: 0px;">
      ${note.title}
    </p>
    <p style="font-size: 12px; margin: 0px;">
      ${note.date}
    </p>
  `;
  newDiv.addEventListener("click", function() {
    openNote(index);
  });
  sidebar.appendChild(newDiv);
}

function openNote(index){
  openedNoteIndex = index;
  setNotesContent(index);
}

function createNote(){
  var noteIndex = content.length;
  var currentDate = new Date().toLocaleString("en-US", {month: 'short', day: '2-digit', hour: "2-digit", minute: "2-digit", hourCycle: "h23"});
  var newNoteContent =   {
    title: "New Note " + noteIndex,
    date: currentDate,
    content: "Click this text to edit"
  };

  content.push(newNoteContent);

  openNote(noteIndex);
  addToSideBar(noteIndex);

  openedNoteIndex = noteIndex;
}

function saveNote(){
  var noteIndex = content.length;
  var currentDate = new Date().toLocaleString("en-US", {month: 'short', day: '2-digit', hour: "2-digit", minute: "2-digit", hourCycle: "h23"});
  
  var saveContent = {
    title: notesContentHeader.innerHTML,
    date: currentDate,
    content: notesContent.innerHTML
  };

  
  content.push(saveContent);
  
  if (sidebar.children[openedNoteIndex + 1]) {
    sidebar.children[openedNoteIndex + 1].style.display = "none";
  }

  openNote(noteIndex);
  addToSideBar(noteIndex);

  openedNoteIndex = noteIndex;
}

function deleteNote(){
  if (sidebar.children[openedNoteIndex + 1]) {
    sidebar.children[openedNoteIndex + 1].style.display = "none";
  }
  notesContent.innerHTML = "you just deleted this note";
  notesContentHeader.innerHTML = "Deleted Note";
}

function formatNote(){
  
}