
const hero = document.getElementById('hero');
const sprite = document.getElementById('sprite');
const body = document.querySelector('body');
const walls = document.querySelectorAll('.wall');
const bodyWidth = body.getBoundingClientRect().width;
//walls 
let wallLeft1 = bodyWidth - (bodyWidth /4) ;
let wallLeft2 = bodyWidth;
let wallLeft3 = bodyWidth;
let wallMove = false;
let allwalls = ['1','2','3','4','5','6'];
let heroWallColision = false;
//hero 
let heroOnSpace =false;
let heroRightmove = false;
let heroLeftMove = false;
let heroLeft =0;
let heroBottom =0;
let jump = false;
let jumpHighOver =false;
// sprite
let columncount= 0;
let columnsIndex =1;
let rowIndex =25;
//global loop variable
let loop=0;
function gameloop(){
    requestAnimationFrame(gameloop);
    loop++; 
//hero and walls collision detection
  if(heroLeft + hero.offsetWidth > wallLeft1  &&
      heroLeft < wallLeft1 + walls[0].getBoundingClientRect().width  &&
      heroBottom < walls[0].getBoundingClientRect().height 
  ){
    wallMove = false;
    heroWallColision = true;
  //  console.log(wallMove);
  }else{
    heroWallColision = false;
  }
  if(heroLeft + hero.offsetWidth > walls[1].getBoundingClientRect().left &&
  heroLeft < walls[1].getBoundingClientRect().left + walls[1].getBoundingClientRect().width &&
     heroBottom < walls[1].getBoundingClientRect().height 
){
    wallMove = false;
    heroWallColision = true;
}
if(heroLeft + hero.offsetWidth > walls[2].getBoundingClientRect().left &&
heroLeft < walls[2].getBoundingClientRect().left + walls[2].getBoundingClientRect().width &&
heroBottom < walls[2].getBoundingClientRect().height 
) {
wallMove = false;
heroWallColision = true;
}


  //console.log(heroBottom ,'---', walls[0].getBoundingClientRect().height);
//end hero and walls collision
// hero stand on walls 
 if(heroLeft + hero.offsetWidth > wallLeft1 &&
    heroLeft < wallLeft1 + walls[0].getBoundingClientRect().width && 
    heroBottom  < walls[0].getBoundingClientRect().height +10  &&
    heroBottom > walls[0].getBoundingClientRect().height 
 ){
 
    jump = false;
    jumpHighOver = false;
    heroOnSpace = false;
    heroBottom = walls[0].getBoundingClientRect().height +10;
 }else{
    heroOnSpace = true;
 }
 if(heroLeft + hero.offsetWidth > wallLeft2 &&
    heroLeft < wallLeft2 + walls[1].getBoundingClientRect().width && 
    heroBottom  < walls[1].getBoundingClientRect().height +10 &&
    heroBottom > walls[1].getBoundingClientRect().height
 ){

    jump = false;
    jumpHighOver = false;
    heroOnSpace = false;
    heroBottom = walls[1].getBoundingClientRect().height +10 ;
 }
 if(heroLeft + hero.offsetWidth > wallLeft3 &&
    heroLeft < wallLeft3 + walls[2].getBoundingClientRect().width && 
    heroBottom  < walls[2].getBoundingClientRect().height +10 &&
    heroBottom > walls[2].getBoundingClientRect().height 
 ){
   
    jump = false;
    jumpHighOver = false;
    heroOnSpace = false;
    heroBottom = walls[2].getBoundingClientRect().height +10 ;
 }
 if(heroBottom > 0 && heroOnSpace && !jump) {
    heroBottom -=2;
 }
// end hero stand on walls
    // walls 
if(wallMove && heroLeft > (bodyWidth /4)){
    let randomIndex = Math.floor(Math.random() * allwalls.length + 1);
    if(wallLeft1 < - walls[0].getBoundingClientRect().width){
        wallLeft1 = bodyWidth;
        walls[0].src = './'+ randomIndex +'.png';
    }
    if(wallLeft1 < bodyWidth || wallLeft3+ walls[2].getBoundingClientRect().width < (bodyWidth /4) *3){
        wallLeft1 -=2;
    }
    if(wallLeft2 < - walls[1].getBoundingClientRect().width){
        wallLeft2 = bodyWidth;
        walls[1].src = './'+ randomIndex +'.png';
    }
    if(wallLeft2 < bodyWidth || wallLeft1 + walls[0].getBoundingClientRect().width < (bodyWidth /4) *3){
        wallLeft2 -=2;
    }
    if(wallLeft3 < - walls[2].getBoundingClientRect().width){
        wallLeft3 = bodyWidth;
        walls[2].src = './'+ randomIndex +'.png';
    }
    if(wallLeft3 < bodyWidth || wallLeft2 + walls[1].getBoundingClientRect().width < (bodyWidth /4) *3){
        wallLeft3 -=2;
    }        
}
    walls[0].style.left = wallLeft1 + "px";
    walls[1].style.left = wallLeft2 + "px";
    walls[2].style.left = wallLeft3 + "px";
    //end walls 
    //hero
     if(heroRightmove && heroLeft < (bodyWidth /4)){
        heroLeft +=2;
     }
     if(heroLeftMove && heroLeft > 0){
        heroLeft -=2;
     }
     if(jump){
        if(heroBottom < 150){
        heroBottom +=2;}
        if(heroBottom > 149){
            jumpHighOver =true;
            jump =false;
        }
        if(loop % 8 ==0){
            if(columncount < 4){
                columncount++;
                sprite.style.left = '-'+ 64* columncount + 'px';
                sprite.style.top = '-'+ 64* rowIndex + 'px';
            }
        }
     }
     if(jumpHighOver){
        if(heroBottom > 0){
            heroBottom -=2;
        }
        if(heroBottom < 1){
            jumpHighOver =false;
            jumpHighOver = false;
            if(rowIndex == 29){
                rowIndex = 25;
                columnsIndex =1;
            }
            if(rowIndex == 27){
                rowIndex = 23;
                columnsIndex =1;
            }
        }
     }
     hero.style.left = heroLeft + "px";
     hero.style.bottom = heroBottom + "px";
   //sprites 
    if(loop % 5 ==0 && !jump && !jumpHighOver){
        
        columncount++;
     if(columncount > columnsIndex) columncount =0;
    sprite.style.left = '-'+ 64 * columncount+'px';
    sprite.style.top = '-'+ 64 * rowIndex+'px';
    }
    console.log(jump, jumpHighOver );
}
gameloop();

document.addEventListener('keydown',(e)=>{
    if(e.code == 'ArrowUp'){
        jump = true;
        if(rowIndex == 37 || rowIndex == 25){
            rowIndex = 29;
            columnsIndex=4;
        }
        if(rowIndex == 35 || rowIndex == 23){
            rowIndex = 27;
            columnsIndex=4;
        }
    }
    if(e.code == 'ArrowLeft'){
        columnsIndex = 7;
        rowIndex = 35;
        heroLeftMove = true;
    }
    if(e.code == 'ArrowRight'){
        columnsIndex = 7;
        rowIndex = 37;
        heroRightmove =true;
        wallMove = true;
    }
});
document.addEventListener('keyup',(e)=>{
    if(e.code == 'ArrowUp'){}
    if(e.code == 'ArrowLeft'){
        columnsIndex = 1;
        rowIndex = 23;
        heroLeftMove =false;
    }
    if(e.code == 'ArrowRight'){
        columnsIndex = 1;
        rowIndex = 25;
        heroRightmove =false;
        wallMove = false;
    }
});