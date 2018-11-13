// ---------
// Constants
// ---------

const NAV_PRE = 'nav-';
const COLOR_PRE = 'color-';
const SECTION_PRE = 'section-';
const INACTIVE = 'inactive';
const TEXT_POST = '-text';


// -------------------
// Globals (i'm sorry)
// -------------------

let currSectionId = 'about';


// ---------
// Functions
// ---------

function chooseSection(sectionId) {
    // So `sectionId` will always be one of:
    // about, needfinding, experience, concept, lowfi, mediumfi, heuristic, hifi, poster.
    // This function does the following:

    // 1. Set accent color for the correct `.nav-circle`; set other `.nav-circle`s to be gray.
    const navCircles = document.getElementsByClassName('nav-circle');
    for (let i = 0; i < navCircles.length; i++) {
        if (navCircles[i].id === NAV_PRE + sectionId) {
            navCircles[i].classList.remove(COLOR_PRE + INACTIVE);
            navCircles[i].classList.add(COLOR_PRE + sectionId);
        } else {
            navCircles[i].classList.remove(COLOR_PRE + currSectionId);
            navCircles[i].classList.add(COLOR_PRE + INACTIVE);
        }
    }

    // 2. Set visible for the correct `.nav-text`, set other `.nav-text`s to be hidden.
    const navText = document.getElementsByClassName('nav-text');
    for (let i = 0; i < navText.length; i++) {
        if (navText[i].id === NAV_PRE + sectionId + TEXT_POST) {
            navText[i].classList.remove(INACTIVE);
        } else {
            navText[i].classList.add(INACTIVE);
        }
    }


    // 3. Set visible for the correct `section`; set other `section`s to be hidden.
    const sections = document.getElementsByTagName('section');
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].id === SECTION_PRE + sectionId) {
            sections[i].classList.remove(INACTIVE);
        } else {
            sections[i].classList.add(INACTIVE);
        }
    }

    // 4. Update `currSectionId` global variable
    currSectionId = sectionId;
}

function onClickNavCircle(event) {
    // This function should be called when a `.nav-circle` is clicked. It should do the following:

    // 1. Figure out the sectionId of the circle that was clicked on
    const currDOM = event.currentTarget;
    const sectionId = currDOM.id.substring(NAV_PRE.length)

    // 2. Call `chooseSection()` on that sectionId
    chooseSection(sectionId);
}


// ---------------------------
// Runs at the very beginning:
// ---------------------------

// 1. Choose the default section
chooseSection(currSectionId);

// 2. Set `.nav-circle`s so that when you click on them, they call `onClickNavCircle()`
const navCircles = document.getElementsByClassName('nav-circle');
for (let i = 0; i < navCircles.length; i++) {
    navCircles[i].addEventListener('click', onClickNavCircle);
}

