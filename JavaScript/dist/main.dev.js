"use strict";

function showContent() {
  var credits = document.querySelectorAll("#nav__userName, #nav__Password");
  var formStyle = document.getElementById("nav__Form").style;
  var menuStyle = document.getElementById("nav__Menu").style;
  var welcomeStyle = document.getElementById("body__Header--Text").style;

  if (credits[0].value === "" && credits[1].value === "") {
    menuStyle.display = "flex";
    formStyle.display = "none";
    welcomeStyle.display = "none";
  }
} // Changed: function and variable names now describe cases instead of the old ticket term.


function showCreateCase() {
  var createCaseStyle = document.getElementById("createCase").style;
  var createCaseBtn = document.getElementById("nav__Btn--createCase");
  var menuItems = document.querySelectorAll("#nav__Dropbox .btn__Menu");
  var isOpening = createCaseBtn.textContent === "Create New Case";
  createCaseStyle.display = createCaseStyle.display === "none" || createCaseStyle.display === "" ? "flex" : "none";
  createCaseBtn.textContent = isOpening ? "Cancel" : "Create New Case";
  menuItems.forEach(function (menu) {
    if (!menu.contains(createCaseBtn)) {
      menu.style.display = isOpening ? "none" : "flex";
    }
  });
}

function addTroubleshootingLog() {
  var textBox = document.getElementById("troubleshooting__Text");
  var logBox = document.getElementById("troubleshooting__List");
  var text = textBox.value.trim();
  var date = new Date().toLocaleString();
  var div = document.createElement("div");
  var agent = document.createElement("h5");
  agent.textContent = "Updated by Agent";
  if (!text) return;
  var newDate = document.createElement("h5");
  newDate.textContent = date;
  var newLog = document.createElement("li");
  newLog.textContent = text;
  newLog.classList.add("logs");
  div.appendChild(agent);
  div.appendChild(newDate);
  div.appendChild(newLog);
  logBox.appendChild(div);
  textBox.value = "";
}

function showUrgencyList() {
  // Changed: lookup ids use the readable case prefix used in the HTML.
  var btn = document.getElementById("caseUrgency__Select--Btn");
  var options = document.getElementById("caseUrgency__States");
  btn.style.display = "none";
  options.style.display = "flex";
  options.style.flexDirection = "row";
  options.style.justifyContent = "right";
}

function selectUrgency(_ref) {
  var target = _ref.target;
  // Changed: selection logic now reads from case urgency controls.
  var btn = document.getElementById("caseUrgency__Select--Btn");
  var options = document.getElementById("caseUrgency__States");
  btn.textContent = target.textContent;
  btn.style.display = "";
  options.style.display = "none";
  updatePriority();
}

function showOptions(buttonId, listId) {
  document.getElementById(buttonId).style.display = "none";
  document.getElementById(listId).style.display = "flex";
}

function showImpactList() {
  // Changed: lookup ids use the readable case prefix used in the HTML.
  var btn = document.getElementById("caseImpact__Select--Btn");
  var options = document.getElementById("caseImpact__States");
  btn.style.display = "none";
  options.style.display = "flex";
  options.style.flexDirection = "row";
  options.style.justifyContent = "right";
}

function selectImpact(_ref2) {
  var target = _ref2.target;
  // Changed: selection logic now reads from case impact controls.
  var btn = document.getElementById("caseImpact__Select--Btn");
  var options = document.getElementById("caseImpact__States");
  btn.textContent = target.textContent;
  btn.style.display = "";
  options.style.display = "none";
  updatePriority();
}

function updatePriority() {
  // Changed: priority calculation now uses case field ids instead of old short ids.
  var priority = document.getElementById("casePriority__Value");
  var urgency = document.getElementById("caseUrgency__Options").value;
  var impact = document.getElementById("caseImpact__Options").value;
  var priorities = {
    Low: {
      Low: "P5",
      Medium: "P4",
      High: "P3"
    },
    Medium: {
      Low: "P4",
      Medium: "P3",
      High: "P2"
    },
    High: {
      Low: "P3",
      Medium: "P2",
      High: "P1"
    }
  };

  if (priorities[urgency] && priorities[urgency][impact]) {
    priority.textContent = priorities[urgency][impact];
  }
}

function submitInteraction() {
  var workNote = document.getElementById("interaction__workNotes");
  var message = document.getElementById("interaction__Messages");
  var workLogs = document.getElementById("workNotes__Logs");
  var messageLogs = document.getElementById("messages__Logs");
  var workContent = workNote.value.trim();
  var msgContent = message.value.trim();
  if (!workContent && !msgContent) return;

  if (workContent && !msgContent) {
    alert("Comment cannot be submitted without a message. Please add a message or clear the work note.");
    return;
  }

  if (msgContent && !workContent) {
    var date = new Date().toLocaleString();
    var logHeader = document.createElement("li");
    var newLog = document.createElement("li");
    var agent = document.createElement("h5");
    var div = document.createElement("div");
    agent.textContent = "Updated by Agent";
    newLog.classList.add("comments");
    logHeader.textContent = "Message sent at: ".concat(date);
    newLog.textContent = msgContent;
    div.appendChild(agent);
    div.appendChild(logHeader);
    div.appendChild(newLog);
    messageLogs.appendChild(div);
    message.value = "";
  }

  if (workContent && msgContent) {
    var _date = new Date().toLocaleString();

    var _logHeader = document.createElement("li");

    var newComment = document.createElement("li");

    var _agent = document.createElement("h5");

    var _div = document.createElement("div");

    _agent.textContent = "Updated by Agent";
    newComment.classList.add("logs");
    newComment.textContent = workContent;
    var msgHeader = document.createElement("h4");
    msgHeader.textContent = "Message has been sent:";

    var _newLog = document.createElement("li");

    _newLog.classList.add("comments");

    var commentMsg = document.createElement("li");
    commentMsg.textContent = "Message sent at ".concat(_date);
    _logHeader.textContent = "Comment:";
    _newLog.textContent = msgContent;

    _div.appendChild(_agent);

    _div.appendChild(_logHeader);

    _div.appendChild(newComment);

    _div.appendChild(commentMsg);

    _div.appendChild(_newLog);

    messageLogs.appendChild(_div);
    message.value = "";
    workNote.value = "";
  }

  function searchElement() {
    var search = document.getElementById("searchBar__Input").value.toLowerCase().trim();
    var inter = document.getElementById("interaction");
    if (!search) return;

    if ("interaction".startsWith(search) || "work note".startsWith(search) || "message".startsWith(search)) {
      inter.style.display = "flex";
    }
  }
}