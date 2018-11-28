// ---------
// Constants
// ---------

const NAV_PRE = 'nav-';
const COLOR_PRE = 'color-';
const SECTION_PRE = 'section-';
const INACTIVE = 'inactive';
const TEXT_POST = '-text';
const BG_ABOUT = 'background-about';
const BG_GENERAL = 'background-general';
const NO_HOVER = 'no-hover';

const SECTIONS = {
    0: 'about',
    1: 'needfinding',
    2: 'experience',
    3: 'concept',
    4: 'lowfi',
    5: 'mediumfi',
    6: 'heuristic',
    7: 'hifi',
    8: 'poster',
}

let REVERSE_SECTIONS = {}
for (let key in SECTIONS) {
    REVERSE_SECTIONS[SECTIONS[key]] = key;
}

const NUM_SECTIONS = Object.keys(SECTIONS).length

// -------------------
// Globals (sorry)
// -------------------

let currSectionId = 0;


// ---------
// Functions
// ---------

function chooseSection(sectionName) {
    // So `sectionName` will always be one of:
    // about, needfinding, experience, concept, lowfi, mediumfi, heuristic, hifi, poster.
    // This function does the following:

    // 1. Set accent color for the correct `.nav-circle`; set other `.nav-circle`s to be gray.
    const navCircles = document.getElementsByClassName('nav-circle');
    for (let i = 0; i < navCircles.length; i++) {
        if (navCircles[i].id === NAV_PRE + sectionName) {
            navCircles[i].classList.remove(COLOR_PRE + INACTIVE);
            navCircles[i].classList.add(COLOR_PRE + sectionName);
        } else {
            navCircles[i].classList.remove(COLOR_PRE + navCircles[i].id.substring(NAV_PRE.length)); // This is hacky (sorry)
            navCircles[i].classList.remove(COLOR_PRE + SECTIONS[currSectionId]);
            navCircles[i].classList.add(COLOR_PRE + INACTIVE);
        }
    }

    // 2. Set visible for the correct `.nav-text`, set other `.nav-text`s to be hidden.
    const navText = document.getElementsByClassName('nav-text');
    for (let i = 0; i < navText.length; i++) {
        if (navText[i].id === NAV_PRE + sectionName + TEXT_POST) {
            navText[i].classList.remove(INACTIVE);
        } else {
            navText[i].classList.add(INACTIVE);
        }
    }


    // 3. Set visible for the correct `section`; set other `section`s to be hidden.
    const sections = document.getElementsByTagName('section');
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].id === SECTION_PRE + sectionName) {
            sections[i].classList.remove(INACTIVE);
        } else {
            sections[i].classList.add(INACTIVE);
        }
    }

    // 4. Set correct background image
    const body = document.body;
    if (sectionName == 'about') {
        body.classList.remove(BG_GENERAL);
        body.classList.add(BG_ABOUT);
    } else {
        body.classList.remove(BG_ABOUT);
        body.classList.add(BG_GENERAL);
    }

    // 5. Turn off hover effects for:
    //    - leftPage of first page ('about')
    //    - rightPage of last page ('poster')
    const leftPage = document.getElementById('leftpage');
    const rightPage = document.getElementById('rightpage');
    if (sectionName == 'about') {
        leftPage.classList.add(NO_HOVER);
        rightPage.classList.remove(NO_HOVER);
    } else if (sectionName == 'poster') {
        leftPage.classList.remove(NO_HOVER);
        rightPage.classList.add(NO_HOVER);
    } else {
        leftPage.classList.remove(NO_HOVER);
        rightPage.classList.remove(NO_HOVER);
    }

    // 6. Update `SECTIONS[currSectionId]` global variable
    currSectionId = REVERSE_SECTIONS[sectionName];
}

function onClickNavCircle(event) {
    // This function should be called when a `.nav-circle` is clicked. It should do the following:

    // 0. Set `.nav-circle`s to not call onClickLeftPage
    event.stopPropagation()

    // 1. Figure out the sectionId of the circle that was clicked on
    const currDOM = event.currentTarget;
    const sectionId = currDOM.id.substring(NAV_PRE.length);

    // 2. Call `chooseSection()` on that sectionId
    chooseSection(sectionId);
}

function onClickRightPage(event) {
    // This function should be called when a `#rightpage` is clicked. It should do the following:

    // 0. Don't allow click left on 1st page
    if (currSectionId == NUM_SECTIONS - 1) {
        return;
    }

    // 1. Calculate new sectionId
    const sectionId = (currSectionId + 1) % NUM_SECTIONS;

    // 2. Call `chooseSection()` on that sectionId
    chooseSection(SECTIONS[sectionId]);
}

function onClickLeftPage(event) {
    // This function should be called when a `#leftpage` is clicked. It should do the following:

    // 0. Don't allow click left on 1st page
    if (currSectionId == 0) {
        return;
    }

    // 1. Calculate new sectionId
    const sectionId = (currSectionId - 1) % NUM_SECTIONS;

    // 2. Call `chooseSection()` on that sectionId
    chooseSection(SECTIONS[sectionId]);
}

function onEnterNavCircle(event) {
    // This function should be called when a `.nav-circle` has been hovered on.
    // It should do the following:

    // 1. Figure out the sectionName of the circle that was clicked on
    const currDOM = event.currentTarget;
    const fullId = currDOM.id;
    const sectionName = fullId.substring(NAV_PRE.length);

    // 2. Color the circle
    currDOM.classList.remove(COLOR_PRE + INACTIVE);
    currDOM.classList.add(COLOR_PRE + sectionName);

    // 3. Show the text
    const textDOM = document.getElementById(fullId + TEXT_POST);
    textDOM.classList.remove(INACTIVE);
}

function onLeaveNavCircle(event) {
    // This function should be called when a `.nav-circle` has stopped being hovered on.
    // It cheats by calling `chooseSection()`, hehe.
    chooseSection(SECTIONS[currSectionId]);
}


// ---------------------------
// Runs at the very beginning:
// ---------------------------

// 1. Choose the default section
chooseSection(SECTIONS[currSectionId]);

// 2. Set `.nav-circle`s so that:
const navCircles = document.getElementsByClassName('nav-circle');
for (let i = 0; i < navCircles.length; i++) {
    // a. When you click on them, they call `onClickNavCircle()`
    navCircles[i].addEventListener('click', onClickNavCircle);

    // b. When you hover on them, they call `onEnterNavCircle()`
    navCircles[i].addEventListener('mouseenter', onEnterNavCircle);

    // c. When you stop hovering on them, they call `onLeaveNavCircle()`
    navCircles[i].addEventListener('mouseleave', onLeaveNavCircle);
}

// 3. Set `#rightpage` and `#leftpage` to have respective listeners
const rightPage = document.getElementById('rightpage');
rightPage.addEventListener('click', onClickRightPage);
const leftPage = document.getElementById('leftpage');
leftPage.addEventListener('click', onClickLeftPage);

// 4. Set links to not call onClickRightPage
const links = document.getElementsByTagName('a');
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', (event) => {
        event.stopPropagation();
    });
}






