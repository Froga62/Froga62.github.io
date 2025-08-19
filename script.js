// Partie du programme gérant la dynamique de la page d'acceuil
const light = document.querySelector(".spotlight");
const lightButton = document.querySelector(".spotlightButton");

let lastX = window.innerWidth / 2;
let lastY = window.innerHeight / 2;
function updatePosition(x, y) {
    lastX = x;
    lastY = y;
    light.style.background = `radial-gradient(200px at ${x}px ${y}px, rgba(0, 0, 0, 0),rgba(0,0,0,0.95))`
}

let refreshLightMouse = document.addEventListener("mousemove", (event) => {
    let posX = event.pageX;
    let posY = event.pageY;
    
    updatePosition(posX, posY);
})

document.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  updatePosition(touch.pageX, touch.pageY);
});

window.addEventListener('scroll', () => {
  // Recalcule la position du dégradé en ajoutant le scroll
  updatePosition(lastX, lastY);
});

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
    {type :"Scolaire", title : "Collège", subtitle : "Collège Léonard de vinci - Carvin (2015-2019)", text : "En 3ème je fus dans une 3ème spéciale. En effet les professeurs venaient de créer une classe spécial \"Découvertes des Métiers de l'informatique\". Ce fut une expérience enrichissante qui m\'a donné la certitude que je voulais travailler dans ce domaine."},
    {type :"Scolaire", title : "Lycée", subtitle : "Lycée Louis Pasteur - Hénin-Beaumont (2019-2022)",text : "Après avoir eu mon brevet je suis parti en bac général au Lycée Louis Pasteur à Henin Beaumont. Les spécialités que j'ai choisi étaient Sciences de l'Ingénieur, Mathématiques, et Numérique Sciences Informatique. En terminal j'ai gardé NSI, Mathématiques et j'ai rajouté l'option Math expertes."},
    {type :"Scolaire", title : "Faculté", subtitle : "Université d'Artois, Faculté Jean-Perrin - Lens (2022- Aujourd'hui)",text : "C'est à la fac que j'ai réellement appris de manière complète et diversifié l'informatique. En effet j'ai pu y découvrir pleins de notions algorithmiques, faire des projets, mais aussi apprendre plein de langages différents durant mes deux premières années de faculté. Je peux citer par exemple le HTML, CSS, JS, C, Python, SQL ...etc. Grâce à beaucoup de travail je peux dire avec fierté que j'ai validé mes deux premières années de faculté avec mention !"},
    {type :"Professionnel", title : "Animateur en ACM", subtitle : "Carvin - 2022-2024",text : "Après avoir eu mon BAFA (Brevet d'Aptitudes aux Fonctions d'Animateur) j'ai travaillé en tant qu'animateur en ACM à Carvin. Ce fut mon premier pas dans le monde du travail. C'était l'une des meilleurs expériences professionnel que j'ai eu. Etre animateur m'a permis de m'affirmer et de ne pas avoir peur du ridicule. Cela a aussi fait apparaître le fait que j'aimais prendre des initiatives tout en considérant l'opinion de mes collègues (lors de la préparation d'activités par exemple)."},
    {type :"Professionnel", title : "Aldi", subtitle : "Libercourt (12/2024-04/2025)",text : "J'ai voulu ensuite découvrir de nouveaux milieux, et je suis tombé sur celui du commerce. En commençant dans un premier temps chez ALDI à Libercourt. Cette expérience était comme un saut dans l'inconnu car je n'avais aucune idée de ce qu'est le monde du commerce. Mes missions là bas étaient surtout de faire de la caisse et la préparation du pain avant l'ouverture du magasin."},
    {type :"Professionnel", title : "Lidl", subtitle : "Annoeulin (05/2025-Aujourd'hui)",text : "Dû a une notion d'équipe qui n'était absolument pas présente dans chez ALDI, j'ai préféré laisser ma place à quelqu'un d'autre. Je suis donc arrivé chez LIDL. Même si le métier est le même sur le papier, l'expérience était tout autre. J'ai découvert une véritable équipe soudé qui m'a formé sur toutes les missions d'un équipier polyvalent. J'y ai fait toutes sortes de missions : nettoyage du magasin, tenir la caisse, mettre en rayon du frais, le sec, les surgelés, préparer la boulangerie pour le lendemain, la cuisson du pain. C'est un excellent travail étudiant qui m'a appris bien des choses, comme la notion de performance, mais aussi de respect et d'entraide entre collègues."}
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
    {
        projectName : "Pong",
        projectImageURL : "./images/projects/pong/pong.png",
        projectDescription : "L'objectif de ce projet était de découvrir Unity. J'ai donc opté pour une méthode simple, refaire des petits jeux. Et quoi de mieux pour s'initier que le jeux retro \"Pong\" ! J'ai donc refait ce jeu jouable à deux joueurs sur un même PC.",
        languages : "Unity (Rigidbody, UI, Sprites, New Input System Manager, BoxCollider), C#",
        screenShots : ["./images/projects/pong/menu.png","./images/projects/pong/game.png"],
        demo:"https://play.unity.com/en/games/447ca05c-46a5-4895-88c6-0591bca2a29c/pong"}
];

//Récupération des éléments du DOM
let popupProjectElement = document.getElementById("PopupProject");
let projectNameElement = document.getElementById("ProjectName");
let projectImageElement = document.getElementById("ProjectImage");
let projectDescriptionElement = document.getElementById("ProjectDescription");
let ProjectLangagesUsedElement = document.getElementById("Languages");
let ProjectScreenShotsElement = document.getElementById("Screenshots");
let projectContent = document.getElementById("ProjectContent");

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

    let demoLink = document.getElementById("DemoLink");
    if (project.demo != "") {
        demoLink.textContent = "Lien vers la démo du projet";
        demoLink.href = project.demo;
    } else {
        demoLink.textContent = "Malheureusement, avoir une démonstration de ce projet n'est pas possible..."
        demoLink.href = "#";
    }
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