function showContent() {
    const credits = document.querySelectorAll("#nav__userName, #nav__Password");
    const formStyle = document.getElementById("nav__Form").style;
    const menuStyle = document.getElementById("nav__Menu").style;
    const welcomeStyle = document.getElementById("body__Header--Text").style;

    if (credits[0].value === "" && credits[1].value === "") {
        menuStyle.display = "flex";
        formStyle.display = "none";
        welcomeStyle.display = "none";
    }
}

// Changed: function and variable names now describe cases instead of the old ticket term.
function showCreateCase() {
    const createCaseStyle = document.getElementById("createCase").style;
    const createCaseBtn = document.getElementById("nav__Btn--createCase");
    const menuItems = document.querySelectorAll("#nav__Dropbox .btn__Menu");
    const isOpening = createCaseBtn.textContent === "Create New Case";

    createCaseStyle.display = (
        createCaseStyle.display === "none" ||
        createCaseStyle.display === ""
    ) ? "flex" : "none";
    createCaseBtn.textContent = isOpening ? "Cancel" : "Create New Case";

    menuItems.forEach(menu => {
        if (!menu.contains(createCaseBtn)) {
            menu.style.display = isOpening ? "none" : "flex";
        }
    });
}

function addTroubleshootingLog() {
    const textBox = document.getElementById("troubleshooting__Text");
    const logBox = document.getElementById("troubleshooting__List");
    const text = textBox.value.trim();
    const date = new Date().toLocaleString();
    const div = document.createElement("div");
    const agent = document.createElement("h5");
    agent.textContent = `Updated by Agent`;
    if (!text) return;

    const newDate = document.createElement("h5");
    newDate.textContent = date;
    const newLog = document.createElement("li");
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
    const btn = document.getElementById("caseUrgency__Select--Btn");
    const options = document.getElementById("caseUrgency__States");

    btn.style.display = "none";
    options.style.display = "flex";
    options.style.flexDirection = "row";
    options.style.justifyContent = "right";
}

function selectUrgency({
    target
}) {
    // Changed: selection logic now reads from case urgency controls.
    const btn = document.getElementById("caseUrgency__Select--Btn");
    const options = document.getElementById("caseUrgency__States");

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
    const btn = document.getElementById("caseImpact__Select--Btn");
    const options = document.getElementById("caseImpact__States");

    btn.style.display = "none";
    options.style.display = "flex";
    options.style.flexDirection = "row";
    options.style.justifyContent = "right";
}

function selectImpact({
    target
}) {
    // Changed: selection logic now reads from case impact controls.
    const btn = document.getElementById("caseImpact__Select--Btn");
    const options = document.getElementById("caseImpact__States");

    btn.textContent = target.textContent;
    btn.style.display = "";
    options.style.display = "none";

    updatePriority();
}

function updatePriority() {
    // Changed: priority calculation now uses case field ids instead of old short ids.
    const priority = document.getElementById("casePriority__Value");
    const urgency = document.getElementById("caseUrgency__Options").value;
    const impact = document.getElementById("caseImpact__Options").value;

    const priorities = {
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
    const workNote = document.getElementById("interaction__workNotes");
    const message = document.getElementById("interaction__Messages");
    const workLogs = document.getElementById("workNotes__Logs");
    const messageLogs = document.getElementById("messages__Logs");

    const workContent = workNote.value.trim();
    const msgContent = message.value.trim();

    if (!workContent && !msgContent) return;

    if (workContent && !msgContent) {
        alert("Comment cannot be submitted without a message. Please add a message or clear the work note.");
        return;
    }

    if (msgContent && !workContent) {
        const date = new Date().toLocaleString();
        const logHeader = document.createElement("li");
        const newLog = document.createElement("li");
        const agent = document.createElement("h5");
        const div = document.createElement("div");
        agent.textContent = `Updated by Agent`;
        newLog.classList.add("comments");
        logHeader.textContent = `Message sent at: ${date}`;
        newLog.textContent = msgContent;
        div.appendChild(agent);
        div.appendChild(logHeader);
        div.appendChild(newLog);
        messageLogs.appendChild(div);
        message.value = "";
    }

    if (workContent && msgContent) {
            const date = new Date().toLocaleString();
            const logHeader = document.createElement("li");
            const newComment = document.createElement("li");
            const agent = document.createElement("h5");
            const div = document.createElement("div");
            agent.textContent = `Updated by Agent`;
            newComment.classList.add("logs");
            newComment.textContent = workContent;
            const msgHeader = document.createElement("h4");
            msgHeader.textContent = "Message has been sent:";
            const newLog = document.createElement("li");
            newLog.classList.add("comments");
            const commentMsg = document.createElement("li");
            commentMsg.textContent = `Message sent at ${date}`;
            logHeader.textContent = `Comment:`;
            newLog.textContent = msgContent;
            div.appendChild(agent);
            div.appendChild(logHeader);
            div.appendChild(newComment);
            div.appendChild(commentMsg);
            div.appendChild(newLog);
            messageLogs.appendChild(div);
            message.value = "";
            workNote.value = "";
    }

    function searchElement() {
        const search = document.getElementById("searchBar__Input").value.toLowerCase().trim();
        const inter = document.getElementById("interaction");

        if (!search) return;

        if ("interaction".startsWith(search) ||
            "work note".startsWith(search) ||
            "message".startsWith(search)) {
            inter.style.display = "flex";
        }
    }
}