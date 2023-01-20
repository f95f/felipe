// getting relevant DOM elements 

let v1 = document.getElementById("txt_v1");
let v2 = document.getElementById("txt_v2");
let d_resp = document.getElementById("txt_resp");
let d_pontos = document.getElementById("score"); 
let d_index = document.getElementById("index");
let info = document.getElementById("foot");
let nivel = document.getElementById("dificuldade");
let d_liquid = document.getElementById("liquid");
let lifebar = document.getElementById("lifebar");
let d_pontosGanhos = document.getElementById("pontosGanhos");

let interval = null;

let total = 0; //total de questões mostradas
let vidas = 10;
let tempo = 60;// *Math.pow(10, 8);
let liquid_size = 100;
let index = 1;
let diff = 1; //dificuldade
let diffMax = [0, 0, 0, 0, 0, 0];
let resultado = 0;
let score = 0, erros = 0, acertos = 0;
let valePontos = 0; //multiplicador de pontos

let f_score, f_erros, f_index;// Placares finais
let f_diffMax;

let iniciar = function(){
    gerarConta();   
    montarVidas();
    reset_time_count();
}

let gerarConta = function(){
    v1.value = Math.floor(Math.random() * (10 * Math.floor(diff)) + 2);
    v2.value = Math.floor(Math.random() * (10 * Math.floor(diff)) + 2); 
    total++;
    setDiff();

}

let reset_time_count = function(){

    d_liquid.style.backgroundColor = "var(--A1)";
    liquid_size = 100;
    clearInterval(interval);
    temporizar();

    if((total % 5)){
        d_liquid.style.backgroundColor = "var(--A2)";
        interval = setInterval("temporizar()", tempo);

    }
}

let temporizar = function(){

    liquid_size--;
    d_liquid.style.width = liquid_size + "%";
    
    if(liquid_size < 1){
        verificar();
    }   

}
let restore_liquid_size = function(){
    liquid_size = 100;
}

let verificar = function(){

    resultado = v1.value * v2.value;

    if(Number(d_resp.value) == resultado){
       score += valePontos;
        ganharPontos();

       diff += .1;
       tempo -= 1;
       acertos++;
       //index++;
       //d_index.innerText = index;
       d_pontos.innerText = score;
       info.innerText = "Correto!";	
       info.setAttribute("class", "correto");
    }
    else{ 
        info.innerText = "Incorreto.";
        info.setAttribute("class", "errado");
        tempo += 6; 
        erros++;
        reduzVida();
    }
    
    d_resp.value = 0;

    //restore_liquid_size(); *
    reset_time_count();
    gerarConta();
    focar();
}

let focar = function(){
    d_resp.focus();
}

let ganharPontos = function(){
    d_pontosGanhos.style.transition = "all .1s";
    d_pontosGanhos.style.opacity = 1;
     d_pontosGanhos.innerText = "+" + valePontos;
    setTimeout("fadePontos()", 500);
    
}

let fadePontos = function(){
    d_pontosGanhos.style.transition = "all 2s";
    d_pontosGanhos.style.opacity = 0;
}

let montarVidas = function(){
    
    for(let i = 0; i < vidas; i++){

        let d_vida = document.createElement("div");
        d_vida.setAttribute("class", "vida");

        lifebar.appendChild(d_vida);
    }

}

let preencherVidas = function(){

    let vidasPreenchidas = document.getElementsByClassName("vida");
      vidasPreenchidas[vidas].setAttribute("class", "vidaVazio");

}

let reduzVida = function(){

    vidas--;
    preencherVidas();
    if(vidas == 0){endGame();}
} 

let endGame = function(){

    sessionStorage.setItem("f_total", total);
    sessionStorage.setItem("f_score", score);
    sessionStorage.setItem("f_acertos", acertos);
    sessionStorage.setItem("f_diffMax", diffMax);
    
    //go to results page
    time = 0;
    d_liquid.style.width = 0 + "px";
    v1.value = "-";
    v2.value = "-";
    window.location.replace('results.html');
}

let setDiff = function(){
   
    let a = v1.value;
    let b = v2.value;
    let stars = '!';
    nivel.style.color = "var(--A1)"

    if( (a <= 11 && b <= 11) && 
        ((a == 2 || a == 10 || a == 11) || 
         (b == 2 || b == 10 || b == 11)))
    {
        stars = 'X';
        valePontos = 1;
        diffMax[0] = 1;
    }
    else if((a <= 12 && b <= 12) ||
            (( !(a % 10) && !(b % 10)) && 
                (a <= 100 && b <= 100)))
    {

        stars = 'XX';	
        valePontos = 3;
        diffMax = [1, 1];

    }
    else if(((a <= 10 || b <= 10) &&
             (a <= 50 && b <= 50)) || 
            (a == 1000 || b == 1000))
    {
        stars = 'XXX';
        valePontos = 5;
        diffMax = [1, 1, 1];
    }
    else if((a <= 50 && b <= 50) ||
            (!(a % 10) && !(b % 10)))
    {
        stars = 'XXXX';
        valePontos = 10;
        diffMax = [1, 1, 1, 1];
    }
    else if((a <= 100 && b <= 100) || (a <= 10 || b <= 10)){
        stars = 'XXXXX';
        valePontos = 25;
        diffMax = [1, 1, 1, 1, 1];
    }
    else if(a < 500 && b < 500){
        stars = '!';
        valePontos = 100;
        diffMax = [1, 1, 1, 1, 1, 1];
        nivel.style.color = "var(--A2)"
    }
    else if(a < 1000 || b < 1000){
        stars = '!!';
        valePontos = 250;
        diffMax = [1, 1, 1, 1, 1, 1, 1];
        nivel.style.color = "var(--A2)"
    }
    else if(a > 1000 && b > 1000){
        stars = '!!!';
        valePontos = 500;
        diffMax = [1, 1, 1, 1, 1, 1, 1, 1];
        nivel.style.color = "var(--A2)"
    }
   
    nivel.innerText = stars;

}
