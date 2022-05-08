const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchageIcon = document.querySelector(".exchange"),
selectTag = document.querySelectorAll("select"),
icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button"),
selectTag.forEach((tag,id) => {
    for (let country_code in countries) {
        // selecting English by default as from language and Turkish as to language
        
        /* let selected;
        if(id == 0 && country_code== "en-GB") {
            selected = "selected";
        } else if(id == 1 && country_code== "tr-TR") {
            selected = "selected";
        }*/

        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "tr-TR" ? "selected" : "";

        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); // adding options tag inside select tag 
    }

});

exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

fromText.addEventListener("keyup", () => {
    if(!fromText.value) {
        toText.value = "";
    }
});

translateBtn.addEventListener("click",() => {
    let text = fromText.value.trim(), 
    translateFrom = selectTag[0].value, // getting fromSelect tag value
    translateTo = selectTag[1].value; // getting toSelect tag value
    if(!text) return;
    toText.setAttribute("placeholder","Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    
    // fetching api responseand returning it with parsing into js obj 
    // and in another then method receiving that obj
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value =  data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation;
            }
        });

        toText.setAttribute("placeholder","Translation");
    });
});


icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(!fromText.value || !toText.value) return;
        if(target.classList.contains("fa-copy")) {
            // if clicked icon has from id, copy the fromTextarea value else copy the toTextarea
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            // if clicked icon has from id, copy the fromTextarea value else copy the toTextarea
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value; // setting utterance language to fromSelect tag value 
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value; // setting utterance language to fromSelect tag value 
            }
        speechSynthesis.speak(utterance); // speak the passed utterance
        }
    });
});