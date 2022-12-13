const cano1 = document.getElementById('cano1')
const cano2 = document.getElementById('cano2')
const obj = document.getElementById('obj')
const most = document.getElementById('most')
const gameOver = document.getElementById('gameOver')
const restart = document.getElementById('restart')
var run = true
var cano1Px 
var cano2Px
var pxObj
var vel = 10
var loop1
var loop2
var loop3
var loop4
var int1
var int2
var loopSort
var pulando = true
var cont = 0

function pula(){
    tecla = event.key
    switch(tecla){
        case 'ArrowUp': if(pulando){
                obj.style.animation='pula 800ms ease-out'
                pulando = false
                setTimeout(function(){obj.style.animation='none';pulando=true},800)
            }break
        case 'ArrowDown': if(pulando){
                obj.style.animation='pulabaixo 300ms ease-out'
                pulando = false
                setTimeout(function(){obj.style.animation='none';pulando=true},300)
            }break
        case 'ArrowLeft': if(pulando){
                obj.style.animation='pulacurto 500ms ease-out'
                pulando = false
                setTimeout(function(){obj.style.animation='none';pulando=true},500)
            }
    }

}

function verifica(){
    pyCano1 = cano1.offsetTop
    pxCano1 = cano1.offsetLeft
    wdCano1 = cano1.offsetWidth
    heCano1 = cano1.offsetHeight

    pyCano2 = cano2.offsetTop
    pxCano2 = cano2.offsetLeft
    wiCano2 = cano2.offsetWidth
    heCano2 = cano2.offsetHeight

    pyObj = obj.offsetTop
    pxObj = obj.offsetLeft
    wdObj = obj.offsetWidth
    heObj = obj.offsetHeight

    colisao1X = (pxObj+wdObj>=pxCano1&&pxCano1+wdCano1>=pxObj)
    colisao1Y = (pyObj+heObj>=pyCano1&&pyCano1+heCano1>=pyObj)
    colisao2X = (pxObj+wdObj>=pxCano2&&pxCano2+wiCano2>=pxObj)
    colisao2Y = (pyObj+heObj>=pyCano2)

    if(colisao1X&&colisao1Y||colisao2X&&colisao2Y){
        gameOver.style.display='flex'
        restart.style.display='block'
        cancelAnimationFrame(loop1)
        cancelAnimationFrame(loop2)
        cancelAnimationFrame(loop3)
        cancelAnimationFrame(loop4)
        clearInterval(int1)
        clearInterval(int2)
        run=false
    }
    loop3 = requestAnimationFrame(verifica)
}

function contador(){
    if(cano1Px<152&&cano1Px>130){
        cont++
        most.value=cont 
        cancelAnimationFrame(loop4)
        setTimeout(contador,500)
    }else{
        loop4 = requestAnimationFrame(contador)
    }
}

function sortC1(){
    sortCano1 = Math.floor(Math.random()*500)
    setTimeout(moveCano1,sortCano1)
}

function sortC2(){
    sortCano2 = Math.floor(Math.random()*1000)
    setTimeout(moveCano2,sortCano2)
}

function moveCano1(){
    cano1Px = cano1.offsetLeft
    cano1Px += -1*vel
    cano1.style.left=cano1Px+'px'
    if(cano1Px<=-25){
        cano1.style.left='100%'
        cancelAnimationFrame(loop1)
    }else{
        loop1 = requestAnimationFrame(moveCano1)
    }    
}
function moveCano2(){
    cano2Px = cano2.offsetLeft
    cano2Px += -1*vel
    cano2.style.left=cano2Px+'px'
    if(cano2Px<=-25){
        cano2.style.left='100%'
        cancelAnimationFrame(loop2)
    }else{
        loop2 = requestAnimationFrame(moveCano2)
    }
}
restart.addEventListener('click',()=>{
    location.reload()
})
window.addEventListener('load',()=>{
    contador();verifica()
    document.addEventListener('keydown',pula)
    int1 = setInterval(sortC1,2000)
    int2 = setInterval(sortC2,2500)
})