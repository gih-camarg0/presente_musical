const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const icon = playBtn.querySelector("i");

playBtn.addEventListener("click", () => {
    if(audio.paused){
        audio.play();
        icon.classList.replace("fa-play", "fa-pause");
    } else {
        audio.pause();
        icon.classList.replace("fa-pause", "fa-play");
    }
});

audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent || 0;

    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60);
    if(seconds < 10) seconds = "0" + seconds;

    currentTime.textContent = `${minutes}:${seconds}`;
});

// clicar na barra
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// carrossel de memorias
const carouselRadios = document.querySelectorAll('input[name="radio-btn"]');
let currentSlide = 1;
let carouselTimer;

function showSlide(index){
    const selectedRadio = document.getElementById(`radio${index}`);

    if(selectedRadio){
        selectedRadio.checked = true;
        currentSlide = index;
    }
}

function startCarousel(){
    carouselTimer = setInterval(() => {
        currentSlide = currentSlide >= carouselRadios.length ? 1 : currentSlide + 1;
        showSlide(currentSlide);
    }, 4000);
}

carouselRadios.forEach((radio, index) => {
    radio.addEventListener("change", () => {
        clearInterval(carouselTimer);
        showSlide(index + 1);
        startCarousel();
    });
});

startCarousel();

const pythonLyric = document.getElementById("pythonLyric");
const pythonCurrentTime = document.getElementById("pythonCurrentTime");
const pythonProgressFill = document.getElementById("pythonProgressFill");
const pythonProgressDot = document.getElementById("pythonProgressDot");
const pythonFinalMessage = document.getElementById("pythonFinalMessage");

const pythonLyrics = "As hastes dos seus óculos estão na mesa|Os polegares neblinando as lentes|O nosso passado me olha das fotografias|Eu juro, já senti certeza|Os meus anseios tão inconsistentes|Um dia, o concreto, no outro, tudo é tão fugaz|Se eu puder ter um pedido a mais|Guarde o melhor que tivemos|As confidências, mesmo que banais|Eu deixo em segredo|Nem todo mundo tem a sorte que nós dois tivemos juntos|E é tão bom saber que alguém que me conhece assim tão bem existe|O banco do meu carro inclina|Mas nele você não se deita|Eu passo em frente à sua rua|Mas não ligo a seta|E os hábitos que desenhamos|Eu desaprendo todo dia|As faltas vão doendo menos, é o que você diria|Se eu puder ter um pedido a mais|Guarde o melhor que tivemos|As confidências, mesmo que banais|Eu deixo em segredo|Nem todo mundo tem a sorte que nós dois tivemos juntos|E é tão bom saber que alguém que me conhece assim tão bem existe".split("|");
//const pythonLyrics = "And I'd give up forever to touch you | 'Cause I know that you feel me somehow | You're the closest to Heaven that I'll ever be | And I don't wanna go home right now | And all I can taste is this moment | And all I can breathe is your life | And sooner or later, it's over | I just don't wanna miss you tonight | And I don't want the world to see me | 'Cause I don't think that they'd understand | When everything's made to be broken | I just want you to know who I am | And you can't fight the tears that ain't coming | Or the moment of truth in your lies | When everything feels like the movies | Yeah, you bleed just to know you're alive | And I don't want the world to see me | 'Cause I don't think that they'd understand | When everything's made to be broken | I just want you to know who I am | And I don't want the world to see me | 'Cause I don't think that they'd understand | When everything's made to be broken | I just want you to know who I am | And I don't want the world to see me | 'Cause I don't think that they'd understand | When everything's made to be broken | I just want you to know who I am | I just want you to know who I am | I just want you to know who I am | I just want you to know who I am".split("|");
const pythonDuration = 169;
//const pythonDuration = 216;
let pythonLineIndex = 0;
let pythonCharIndex = 0;

function formatPythonTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function updatePythonProgress(){
    const progress = Math.min(pythonLineIndex / (pythonLyrics.length - 1), 1);
    const elapsed = Math.round(progress * pythonDuration);
    const percent = `${progress * 100}%`;

    pythonCurrentTime.textContent = formatPythonTime(elapsed);
    pythonProgressFill.style.width = percent;
    pythonProgressDot.style.left = percent;
}

const pythonLyricsStartDelay = 12000;

const pythonSpecialPhraseDelay = 12000;


function typePythonExecution(){
    if(!pythonLyric) return;

    const currentLine = pythonLyrics[pythonLineIndex];

    if(pythonCharIndex <= currentLine.length){
        pythonLyric.textContent = currentLine.slice(0, pythonCharIndex);
        pythonCharIndex++;
        setTimeout(typePythonExecution, 78);
        return;
    }

    pythonLineIndex++;
    pythonCharIndex = 0;
    updatePythonProgress();

    if(pythonLineIndex >= pythonLyrics.length){
    pythonLineIndex = 0;

    pythonFinalMessage.textContent = "PARA VOCÊ LEMBRAR DOS NOSSOS MOMENTOS ESCUTANDO MUSICAS JUNTAS";
    pythonFinalMessage.style.color = "#7dd3fc"; // azul claro
    pythonFinalMessage.classList.add("is-visible");

    setTimeout(() => {
        pythonFinalMessage.classList.remove("is-visible");
        updatePythonProgress();
        typePythonExecution();
    }, 36000);

    return;
}


    const previousLine = pythonLyrics[pythonLineIndex - 1];

    if(previousLine === "E é tão bom saber que alguém que me conhece assim tão bem existe"){
        setTimeout(typePythonExecution, pythonSpecialPhraseDelay);
        return;
    }

    setTimeout(typePythonExecution, 1350);

}

updatePythonProgress();
setTimeout(typePythonExecution, pythonLyricsStartDelay);
