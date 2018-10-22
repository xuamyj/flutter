// Run at the very beginning

// globals (i'm sorry)
let currSectionId = 'about';

const header = document.getElementsByTagName('header')[0];
header.classList.add('inactive');

const sections = document.getElementsByTagName('section');
for (let i = 1; i < sections.length; i++) {
    sections[i].classList.add('inactive');
}

const navDivs = document.getElementsByTagName('nav')[0].children;
for (let i = 0; i < navDivs.length; i++) {
    navDivs[i].textContent = '';
    navDivs[i].addEventListener('click', onClickCircle);
}
chooseSection(currSectionId);

// Other functions
function chooseSection(sectionId) {
    // update sections
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].id === sectionId) {
            sections[i].classList.remove('inactive');
        } else {
            sections[i].classList.add('inactive');
        }
    }

    // update navigation bar
    for (let i = 0; i < navDivs.length; i++) {
        if (navDivs[i].id === sectionId) {
            navDivs[i].classList.remove('color-inactive');
            navDivs[i].classList.add('color-' + sectionId);
        } else {
            navDivs[i].classList.remove('color-' + currSectionId);
            navDivs[i].classList.add('color-inactive');
        }
    }

    // update global
    currSectionId = sectionId;
}

function onClickCircle(event) {
    const selected = event.currentTarget;
    chooseSection(selected.id);
}

function onClickNext(event) {


}

function onClickBack(event) {

}

