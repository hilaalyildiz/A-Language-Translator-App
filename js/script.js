const selectTag = document.querySelectorAll("select");

selectTag.forEach((tag,id) => {
    for (const country_code in countries) {
        // seelcting English by default as from language and Turkish as to language
        let selected;
        if(id == 0 && country_code== "en-GB") {
            selected = "selected";
        } else if(id == 1 && country_code== "tr-TR") {
            selected = "selected";
        }

        let option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); // adding options tag inside select tag 
    }

});