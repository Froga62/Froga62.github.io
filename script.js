// Partie du programme gérant la dynamique de la page d'acceuil
const light = document.querySelector(".spotlight");
const lightButton = document.querySelector(".spotlightButton");


let refreshLightMouse = document.addEventListener("mousemove", (event) => {
    let posX = event.pageX;
    let posY = event.pageY;
    
    light.style.background = `radial-gradient(200px at ${posX}px ${posY}px, rgba(0, 0, 0, 0),rgba(0,0,0,0.95))`
})

let refreshLightTouch = document.addEventListener("touchmove", (event) => {
    let posX = event.pageX;
    let posY = event.pageY;
    
    light.style.background = `radial-gradient(200px at ${posX}px ${posY}px, rgba(0, 0, 0, 0),rgba(0,0,0,0.95))`
})

let switchLight = lightButton.addEventListener("click", (event) => {
    if (lightButton.src.endsWith("/images/icons8-ampoule-globe-100-off.png")){
        lightButton.src = "/images/icons8-ampoule-globe-100-on.png";
        lightButton.classList.remove("spotlightButtonOff");
        lightButton.style.opacity = '90%';
        
        light.style.display = "none";
    } else {
        lightButton.src = "/images/icons8-ampoule-globe-100-off.png";
        lightButton.style.opacity = '';
        lightButton.classList.add('spotlightButtonOff');
        
        light.style.display = "block";
    }
})

//Partie du programme affichant le menu pour la version mobile
const menuButton = document.querySelector(".burger");
const menu = document.querySelector(".menu");
let menuShow = false;
let showMenu = menuButton.addEventListener("click", (event) => {
    if (menuShow) {
        menu.classList.remove("show");
        menuShow = false;
    } else {
        menu.classList.add("show");
        menuShow = true;
    }
})

// Données a afficher dans le caroussel
let currentIndex = 0;
let experiences = [
    {type :"Scolaire", title : "Collège", subtitle : "Collège Léonard de vinci - Carvin (2015-2019)", text : "En 3ème je fus dans une 3ème spécial, en effet les professeurs venait de créer une classe spécial \"Découvertes des Métiers de l'informatique\". Ce fut une expérience enrichissante qui m\'a donné la certitude que je voulais travailler dans ce domaine."},
    {type :"Scolaire", title : "Lycée", subtitle : "Lycée Louis Pasteur - Hénin-Beaumont (2019-2022)",text : "Après avoir eu mon brevet je suis parti en bac général au Lycée Louis Pasteur à Henin Beaumont. Les spécialités que j'ai choisi étaient Sciences de l'Ingénieur, Mathématiques, et Numérique Sciences Informatique. En terminal j'ai gardé NSI, Mathématiques et j'ai rajouté l'option Math expertes."},
    {type :"Scolaire", title : "Faculté", subtitle : "Université d'Artois, Faculté Jean-Perrin - Lens (2022- Aujourd'hui)",text : "C'est à la fac que j'ai réellement appris de manière complète et diversifié l'informatique. En effet j'ai pu y découvrir pleins de notions algorithmique, faire des projets, mais aussi apprendre plein de langages différents durant mes deux premières années de faculté. Je peux citer par exemple le HTML, CSS, JS, C, Python, SQL ...etc. Grâce à beaucoup de travail j'ai peux dire avec fierté que j'ai validé mes deux premières années de faculté avec mention !"},
    {type :"Professionnel", title : "Annimateur en ACM", subtitle : "Carvin - 2022-2024",text : "Après avoir eu mon BAFA (Brevet d'Aptitudes aux Fonctions d'Animateur) je travaillais en tant qu'animateur en ACM à Carvin. Ce fut mon premier pas dans le monde du travail. Mais c'était l'une des meilleurs expériences professionnel que j'ai eu. Etre animateur m'a permis de m'affirmer et de ne pas avoir peur du ridicule. Cela a aussi fait apparaître le fait que j'aimais prendre des initiatives tout en considérant l'opinion de mes collègues (lors de la préparation d'activités par exemple)."},
    {type :"Professionnel", title : "Aldi", subtitle : "Libercourt (12/2024-04/2025)",text : "J'ai voulu ensuite découvrir de nouveau milieu, et je suis tombé dans celui du commerce. En commençant dans un premier temps chez ALDI à Libercourt. Cette expérience était comme le premier saut dans l'inconnu. Mes missions là bas étaient surtout de faire de la caisse et la préparation du pain avant l'ouverture du magasin."},
    {type :"Professionnel", title : "Lidl", subtitle : "Annoeulin (05/2025-Aujourd'hui)",text : "Dû a une notion d'équipe qui n'était absolument pas présente dans chez ALDI, j'ai préféré laisser ma place à quelqu'un d'autre. Je suis donc arrivé chez LIDL. Même si le métier est le même sur le papier, l'expérience était tout autre. J'ai découvert une véritable équipe soudé qui m'a formé sur toutes les missions d'un équipier polyvalent. J'y ai fait toutes sortes de missions : du nettoyage du magasin, à la caisse, la mise en rayon du frais, du sec, des surgelés, de la préparation de la boulangerie pour le lendemain à la cuisson du pain au matin. C'est un excellent travail étudiant qui m'a appris bien des choses, comme la notion de performance, mais aussi de respect et d'entraide entre collègues."}
];

// Partie du programme gérant la dynamique du carousselle

// On récupère les éléments du DOM
const rArrow = document.getElementById("rightArrow");
const lArrow = document.getElementById("leftArrow");
const parcoursTypeText = document.getElementById("ParcoursType");

function getSlide(className) {
    let mainElt = document.querySelector(className);
    if (mainElt != null){
        let titleElt = mainElt.querySelector("h3");
        let subtitleElt = mainElt.querySelector("h4");
        let textElt = mainElt.querySelector("p");
        if (titleElt != null && subtitleElt != null && textElt != null) {
            return {mainElement : mainElt, titleElement : titleElt, subtitleElement : subtitleElt, textElement : textElt};
        }
    } else {
        console.error("No div with the className \"" + className+"\"");
        return null
    }
}

let visibleSlide = getSlide(".visible");
let beforeSlide = getSlide(".before");
let afterSlide = getSlide(".after");
// On ajoute les actions engendrées par les flèches gauche et droite
canClick = true;
rArrow.addEventListener("click",() => switchSlide(1));
lArrow.addEventListener("click",() => switchSlide(-1));

function updateParcoursType(){
    let newTextContent = experiences[currentIndex].type;
    if (parcoursTypeText.textContent == ''){
        parcoursTypeText.textContent = newTextContent;
    }
    else if (newTextContent != parcoursTypeText.textContent){
        parcoursTypeText.classList.add("hide");
        setTimeout(() => {
            parcoursTypeText.textContent = newTextContent;
            parcoursTypeText.classList.remove("hide");
        }, 300);
    }
}

function switchSlide(direction) {
    if (canClick) {
        canClick = false;
        lArrow.style.cursor = "default";
        rArrow.style.cursor = "default";
        if (direction == 1) {
            currentIndex = (currentIndex + 1 + experiences.length) % experiences.length;
            visibleSlide.mainElement.classList.replace("visible", "after");
            beforeSlide.mainElement.classList.replace("before", "visible");
            afterSlide.mainElement.classList.replace("after", "before");
            [beforeSlide, visibleSlide, afterSlide] = [afterSlide, beforeSlide, visibleSlide];
        } else {
            currentIndex = (currentIndex - 1 + experiences.length) % experiences.length;
            visibleSlide.mainElement.classList.replace("visible", "before");
            beforeSlide.mainElement.classList.replace("before","after");
            afterSlide.mainElement.classList.replace("after", "visible");    
            [beforeSlide, visibleSlide, afterSlide] = [visibleSlide, afterSlide, beforeSlide];
        }
        heightObserver.disconnect()
        heightObserver.observe(visibleSlide.mainElement);
        updateParcoursType();
        setTimeout(() => {
            updateContent(direction);
            canClick = true;
            lArrow.style.cursor = "pointer";
            rArrow.style.cursor = "pointer";
        }, 1000);
    }
}

function updateSlide(slide, index){
    slide.titleElement.textContent = experiences[index].title;
    slide.textElement.textContent = experiences[index].text;
    slide.subtitleElement.textContent = experiences[index].subtitle;
}

function updateContent(direction) {
    // Si l'on va à droite il faut actualiser le .after, sinon le .before
    if (direction == -1) {
        let afterIndex = (currentIndex - 1 + experiences.length) % experiences.length;
        updateSlide(afterSlide, afterIndex);
    } else if (direction == 1) {
        let beforeIndex = (currentIndex + 1 + experiences.length) % experiences.length;
        updateSlide(beforeSlide, beforeIndex);
    } else {
        let afterIndex = (currentIndex - 1 + experiences.length) % experiences.length;
        let beforeIndex = (currentIndex + 1 + experiences.length) % experiences.length;
        updateParcoursType();
        updateSlide(beforeSlide, beforeIndex);
        updateSlide(visibleSlide, currentIndex);
        updateSlide(afterSlide, afterIndex);
    }

}

let heightObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        console.log("changment de taille");
        document.querySelector(".carrousel").style.height = entry.target.getBoundingClientRect().height+"px";
    };
})

//Partie du codes gérant les projets à afficher
let projects = [
    {projectName : "Test", projectImageURL : "./images/projects/test/me.jpg", projectDescription : "Les projets sont actuellement en cours de publications, pour les consulter, veuillez revenir ultérieurement", languages : "...", screenShots : []},
];

//Récupération des éléments du DOM
let popupProjectElement = document.getElementById("PopupProject");
let projectNameElement = document.getElementById("ProjectName");
let projectImageElement = document.getElementById("ProjectImage");
let projectDescriptionElement = document.getElementById("ProjectDescription");
let ProjectLangagesUsedElement = document.getElementById("Languages");
let ProjectScreenShotsElement = document.getElementById("Screenshots");

let closeProject = document.getElementById("Close").addEventListener("click", (event) => {
    popupProjectElement.style.display = "none";
})

function updateProjectContent(index) {
    console.log(index);
    let project = projects[index];
    console.log(project)
    projectNameElement.textContent = project.projectName;
    projectImageElement.src = project.projectImageURL;
    projectDescriptionElement.textContent = project.projectDescription;
    ProjectLangagesUsedElement.textContent = project.languages;
    
    while (ProjectScreenShotsElement.firstChild) {
        ProjectScreenShotsElement.removeChild(ProjectScreenShotsElement.firstChild);
    }
    project.screenShots.forEach(url => {
        let linkScreenElement = document.createElement("a");
        let screenShotElement = document.createElement("img");
        screenShotElement.src = url;
        linkScreenElement.href = url;
        linkScreenElement.target = "_blank";
        ProjectScreenShotsElement.appendChild(linkScreenElement);
        linkScreenElement.appendChild(screenShotElement);
    });
}


function addProjectsToMainPage() {
    let grid = document.querySelector(".grid");
    let index = 0;
    projects.forEach(project => {
        let projectIndex = index;
        index++;
        let projectCell = document.createElement("div");
        let projectImage = document.createElement("img");
        projectImage.src = project.projectImageURL;
        projectCell.appendChild(projectImage);

        projectCell.addEventListener("click", (event) => {
            updateProjectContent(projectIndex);
            popupProjectElement.style.display = "block";
        });
        
        projectCell.classList.add("project")
        grid.appendChild(projectCell);
    })    
}
//Initialisation
addProjectsToMainPage();
updateProjectContent(0);
heightObserver.observe(visibleSlide.mainElement);
updateContent(0);