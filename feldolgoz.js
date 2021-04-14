function $(nev) {
    return document.querySelectorAll(nev);
}
function ID(nev) {
    return document.getElementById(nev);
}
function recon(kiir) {
    return console.log(kiir);
}

var ingatlanok = [];
var kategoriak = [];
var kat = 0;

function beolvasIngatlan() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            ingatlanok = JSON.parse(xhttp.responseText).hazak;
            ingatlanFeltolt(ingatlanok);
        }
    };
    xhttp.open("GET", "ingatlanok.json", true);
    xhttp.send();
}

function beolvasKategoria() {
//    recon("aszinkron");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            kategoriak = JSON.parse(xhttp.responseText).kategoria;
//            recon(kategoriak);
            kategoriakFeltolt();
        }
    };
    xhttp.open("GET", "kategoriak.json", true);
    xhttp.send();
}
  
function ingatlanFeltolt(tomb) {
    var txt = "";
    for (var i = 0; i < tomb.length; i++) {
        txt = "<div class='ing'>";
        
        txt += "<div class='kep'><img src='" + tomb[i].kep + "'></div>";
        txt += "<div>"+tomb[i].nev+"<br>Ár:"+tomb[i].ar+"</div>";
        txt += "<div>Terület: "+tomb[i].terulet+"</div>";
        txt += "<div>Építés éve: "+tomb[i].epitesEve+"</div>";
        
        txt += "</div>";
        ID('tart').innerHTML += txt;
    }
}  

function kategoriakFeltolt() {
    for (var i = 0; i < kategoriak.length; i++) {
        recon(kategoriak[i]);
        ID('kategoria').innerHTML += '<option value="'+ i +'">'+ kategoriak[i] +'</option>';
    }
    
}

function szures() {
//    recon(this.value);
    kat = this.value;
    recon(kat);
}

function rendez() {
    recon(kat);
}

function init() {
    beolvasIngatlan();
    beolvasKategoria();
    
    ID('kategoria').addEventListener('change', szures, false);
    ID('rendez').addEventListener('click', rendez, false);
}


window.addEventListener('load', init, false);

