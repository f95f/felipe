let r_modo = document.getElementById("r_modo");
let r_total = document.getElementById("r_total");
let r_acertos = document.getElementById("r_acertos");
let r_erros = document.getElementById("r_erros");
let r_score = document.getElementById("r_score");
let r_diffMax = document.getElementById("r_diff");
let diff = sessionStorage.getItem("f_score");
let dificuldade = ''; 

let setValores = function(){

    r_modo.innerText = "Modo: " + sessionStorage.getItem("f_modo");
    r_score.innerText = diff;
    r_acertos.innerText = sessionStorage.getItem("f_acertos");
    r_total.innerText = sessionStorage.getItem("f_total");

   
    if(diff < 25){ dificuldade = '*'}
    else if(diff < 50){ dificuldade = '**'}
    else if(diff < 100){ dificuldade = '***'}
    else if(diff < 200){ dificuldade = '****'}    
    else if(diff < 500){ dificuldade = '*****'}
    else if(diff < 1000){ dificuldade = '!'}
    else if(diff < 10000){ dificuldade = '!!'}
    else{ dificuldade = '☠️'}

    r_diffMax.innerText = dificuldade;
}