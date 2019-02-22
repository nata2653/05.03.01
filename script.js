let retter = [];
let dest = document.querySelector("#liste");
let filter = "alle";


document.addEventListener("DOMContentLoaded", sidenVises);

function sidenVises() {

    async function getJson() {
        console.log("JSON hentes");
        let jsonData = await fetch("https://mandalskeawebspace.dk/claude_php/clean_up_spreadsheet.php?id=1J2tqzYKfEKhbMg2kiQo8AGat3q8g3LqA6Tb_rDFGg9Q");
        retter = await jsonData.json();
        retter.sort((a, b) => {
            return b.kategori.localeCompare(a.kategori);
        })

        visRetter();
    }

    function visRetter() {
        dest.innerHTML = "";
        retter.forEach(ret => {
            if (filter == "alle" || filter == ret.kategori) {
                let template = `
                    <div class="visteRetter">

              <h2>${ret.navn}</h2>
 <div> <img src="imgs/${ret.billede}.jpg"> </div>
                            <div class="price"><p><strong>Pris:</strong> ${ret.pris}</p></div>
                   </div>`;

                dest.insertAdjacentHTML("beforeend", template);
                dest.lastElementChild.addEventListener("click", åbn);

                function åbn() {
                    document.querySelector("#indhold").innerHTML = `

 <div class="navn"><h2>${ret.navn}</h2></div><div class="ret">
<div class="sectionwrapper">
                        <div class="lang"> <p>${ret.lang}</p></div>
                        <div class="sectionwrapper">      <img src="imgs/${ret.billede}.jpg">
                   </div>
<div class="pris"><p><strong> Pris: </strong> ${ret.pris}</p></div>
                        </div>
                </div>`;
                    document.querySelector("#popup").style.display = "block";
                }
            }
        })
    }
    document.querySelector("#luk button").addEventListener("click", () => {
        document.querySelector("#popup").style.display = "none";
    })


    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    })

    function filtrering() {
        filter = this.getAttribute("data-ret");
        document.querySelector("h1").textContent = this.textContent;

        document.querySelectorAll(".filter").forEach(elm => {
            elm.classList.remove("valgt");
        })
        this.classList.add("valgt");

        visRetter();
    }


    getJson();
    console.log("json");

    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}

function toggleMenu() {
    console.log("Toogle menu");
    document.querySelector("#menu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");


    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";
    } else {
        document.querySelector("#menuknap").textContent = "X";
    }
}
