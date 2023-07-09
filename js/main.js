const slideContainer = document.getElementById("slide-container");
const prevBtn = document.getElementById("slide-btn-prev");
const nextBtn = document.getElementById("slide-btn-next");
let slideContent;
const sizeControl = document.getElementById('size-control');
const letterControl = document.getElementById('letter-control');
const heightControl = document.getElementById('height-control');
const sizeValue = document.getElementById('size-control-value');
const letterValue = document.getElementById('letter-control-value');
const heightValue = document.getElementById('height-control-value');
const alignLeftControl = document.getElementById('align-left-control');
const alignCenterControl = document.getElementById('align-center-control');
const alignRightControl = document.getElementById('align-right-control');
const sampleText = document.getElementById('sample-text');
const fontLink = document.getElementById('font-link');

// ---- Add to Font Lists ---- //

const addToFontList = () => {

    const fontDetails = (data) => {
        const fontCard = document.createElement('li');
        fontCard.classList.add("fontlist-card");
    
        const fontSample = document.createElement('div');
        fontSample.classList.add('card-aa', `font--${data.id}`);
        fontSample.innerText = "Aa"; 
    
        const fontTitle = document.createElement('p');
        fontTitle.classList.add('card-title', `font--${data.id}`);
        fontTitle.innerText = data.title;
        
        const fontType = document.createElement('p');
        fontType.innerText = data.type;

        const fontStyleSheet = document.createElement('style');
        fontStyleSheet.innerText = `
        @import url(${data.font_url});
        .font--${data.id} { font-family: ${data.font_family}; };
        `;

        fontCard.appendChild(fontSample);
        fontCard.appendChild(fontTitle);
        fontCard.appendChild(fontType);

        slideContainer.appendChild(fontCard);
        slideContent = document.querySelector('.fontlist-card');

        fontCard.addEventListener("click", () => {
            const computedStyle = getComputedStyle(fontTitle);
            let fontFamily = computedStyle.fontFamily;
            sampleText.style.fontFamily = fontFamily;

            fontLink.setAttribute('href', `${data.link}`);
            fontLink.classList.add('active');
        })

        document.head.appendChild(fontStyleSheet);
    }

    fontData.forEach(data => {
        fontDetails(data)
    });

}

addToFontList();


// ---- FONT LIST SLIDER ---- //

nextBtn.addEventListener("click", () => {
    const slideWidth = slideContent.clientWidth;
    slideContainer.scrollLeft += slideWidth + 24;
});

prevBtn.addEventListener("click", () => {
    const slideWidth = slideContent.clientWidth;
    slideContainer.scrollLeft -= (slideWidth + 24);
});


// ---- FONT CONTROLLER ---- //

sizeControl.addEventListener('input', (e) => {
    let inputValue = e.target.value;
    sampleText.style.fontSize = inputValue + 'px';
    sizeValue.textContent = inputValue + 'px';
});

letterControl.addEventListener('input', (e) => {
    let inputValue = e.target.value;
    sampleText.style.letterSpacing = inputValue + 'px';
    letterValue.textContent = inputValue + 'px';
});

heightControl.addEventListener('input', (e) => {
    let inputValue = parseFloat(e.target.value) / 10;
    let formatValue = inputValue.toFixed(1);
    sampleText.style.lineHeight = formatValue;
    heightValue.textContent = formatValue;
});

alignLeftControl.addEventListener('click', () => {
    sampleText.style.textAlign = "left";
});

alignCenterControl.addEventListener('click', () => {
    sampleText.style.textAlign = "center";
});

alignRightControl.addEventListener('click', () => {
    sampleText.style.textAlign = "right";
})


// ---- FIT CONTENT TEXTAREA ---- //

sampleText.addEventListener("input", (e) => {

    console.log(e.target.style.height)
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
})