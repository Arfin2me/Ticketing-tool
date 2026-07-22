function addClickListener(id, handler) {
    const element = document.getElementById(id);

    if (element) {
        element.addEventListener("click", handler);
    }
}

function stopReload(formId, callback) {
    const form = document.getElementById(formId);

    if (form) {
        form.addEventListener("submit", event => {
            event.preventDefault();
            callback();
        });
    }
}

function addChangeListener(id, handler) {
    const element = document.getElementById(id);

    if (element) {
        element.addEventListener("change", handler);
    }
}

addClickListener("login__Btn", showContent);
// Changed: event listeners now target the clearer case-based ids used in the HTML.
addClickListener("nav__Btn--createCase", showCreateCase);
addClickListener("troubleshooting__Btn", addTroubleshootingLog);

addClickListener("interaction__Submit--Btn", submitInteraction);
addChangeListener("caseUrgency__Options", updatePriority);
addChangeListener("caseImpact__Options", updatePriority);
updatePriority();