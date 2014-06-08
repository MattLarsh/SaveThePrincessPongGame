var field = document.getElementById('field');
var inputX = 0;
var wrapPaddle = function(name){
  var e = document.getElementById(name);
  var r = {};
  r.width = e.width.baseVal.value;
  r.height = e.height.baseVal.value;
  function update(){
    r.right = r.x + r.width;
    r.left = r.x;
    r.top = r.y;
    r.bottom = r.y + r.height;
  }
  Object.defineProperty(r,'x',{
    get: function(){return e.x.baseVal.value},
    set: function(val){e.x.baseVal.value = val; update();}
  });
  Object.defineProperty(r,'y',{
    get: function(){return e.y.baseVal.value},
    set: function(val){e.y.baseVal.value = val; update();}
  });
  Object.defineProperty(r,'cx',{
    get: function(){return r.x + r.width / 2;},
    set: function(val){r.x = val - r.width / 2;}
  });
  Object.defineProperty(r,'cy',{
    get: function(){return r.y + r.height / 2;},
    set: function(val){r.y = val - r.height / 2;}
  });
  update();
  return r;
};

var player = wrapPaddle('paddle');
var comp1 = wrapPaddle('comp1');
var comp2 = wrapPaddle('comp2');
var comp3 = wrapPaddle('comp3');

function boundPaddle(paddle){
  if(paddle.right > boxWidth){
    paddle.x = boxWidth - paddle.width;
  }
  else if(paddle.left < 0){
    paddle.x = 0;
  }
}

var ball = function(id){
  var e = document.getElementById(id);
  var r = {};
  r.dx = 0;
  r.dy = 0;
  function update(){
  	r.right = r.cx + r.r;
  	r.left = r.cx - r.r;
  	r.top = r.cy - r.r;
  	r.bottom = r.cy + r.r;
  }
  Object.defineProperty(r, 'cx', {
    get: function(){return e.cx.baseVal.value},
    set: function(val){e.cx.baseVal.value = val; update();}
  });
  Object.defineProperty(r, 'cy', {
    get: function(){return e.cy.baseVal.value},
    set: function(val){e.cy.baseVal.value = val; update();}
  });
  Object.defineProperty(r, 'r', {
    get: function(){return e.r.baseVal.value},
    set: function(val){e.r.baseVal.value = val; update();}
  });

  update();

  return r;
};

var ball1 = ball('ball1');
var ball2 = ball('ball2');
var ball3 = ball('ball3');
var ball4 = ball('ball4');
var clock = function(){
  var last = Date.now();
  return{
    reset: function(){
      var now = Date.now();
      var result = now - last;
      last = now;
      return result;
    }
  }
}();

var animSpeed = 0.1;
var deflectFactor = 0.1;
var boxWidth = field.viewBox.baseVal.width;
var boxHeight = field.viewBox.baseVal.height;

function collideBallWith(ball,what) {
  if(ball.bottom < what.top || ball.top > what.bottom) {
    return;
  }
  var voff = ball.cx - what.cx;
  if(ball.dx > 0) {
    if (ball.right >= what.left && ball.left < what.right) {  
      ball.dx += voff * deflectFactor * 0.5;
      ball.dy *= -1;
      }
  } else {
      if(ball.left <= what.right && ball.right > what.left) {
          ball.dx += voff * deflectFactor * 0.5;
          ball.dy *= -1;
      }
  }
}
function collideBallWithComp(ball,what) {
  if (ball.bottom < what.top || ball.top > what.bottom) {
      // No collision
      return;
  }
  var voff = ball.cy - what.cy;
  if (ball.dx > 0) {
      // Collide with left border

      if (ball.right >= what.left && ball.left < what.right) {
          // Collision
          ball.cx -= ball.right - what.left;
          ball.dx *= -1;
          ball.dy += voff * deflectFactor;
      }
  } else {
      // Collide with right border
      if (ball.left <= what.right && ball.right > what.left) {
          // Collision
          ball.cx += what.right - ball.left;
          ball.dx *= -1;
          ball.dy += voff * deflectFactor;
      }
  }
}


function startBall1(){
  ball1.dx = 0;
  ball1.dy = 0;
  ball1.cx = 50;
  ball1.cy = 180;
  
  setTimeout(function(){
    ball1.dx = 5;
    ball1.dy = 5;
  },4000);
}
function startBall2(){
  ball2.dx = 0;
  ball2.dy = 0;
  ball2.cx = 50;
  ball2.cy = 410;
  
  setTimeout(function(){
    ball2.dx = 5.5;
    ball2.dy = -5;
  },1000);
}
function startBall3(){
  ball3.dx = 0;
  ball3.dy = 0;
  ball3.cx = 750;
  ball3.cy = 180;
  
  setTimeout(function(){
    ball3.dy = -4.5;
    ball3.dx = -5.2;
  },3000);
}
function startBall4(){
  ball4.dx = 0;
  ball4.dy = 0;
  ball4.cx = 750
  ball4.cy = 410;
  
  setTimeout(function(){
    ball4.dy = 4.25;
    ball4.dx = -5.15;
  },2000);
}
startBall1();
startBall2();
startBall3();
startBall4();
var dir1 = 'down';
var dir2 = 'down';
var dir3 = 'right';
console.log(comp1);
var animate = function(ball){
  player.cx = inputX;
  var anim_factor = clock.reset() * animSpeed;
  ball1.cx += ball1.dx * anim_factor * 0.44;
  ball1.cy += ball1.dy * anim_factor * 0.44;
  ball2.cx += ball2.dx * anim_factor * 0.51;
  ball2.cy += ball2.dy * anim_factor * 0.49;
  ball3.cx += ball3.dx * anim_factor * 0.43;
  ball3.cy += ball3.dy * anim_factor * 0.43;
  ball4.cx += ball4.dx * anim_factor * 0.46;
  ball4.cy += ball4.dy * anim_factor * 0.70;
  if(ball1.cy > 600){
    ball1.cy = 600;
    ball1.dy *= -1;
  }
  if(ball2.cy > 600){
    ball2.cy = 600;
    ball2.dy *= -1;
  }
  if(ball1.cy < 0){
    ball1.cy = 0;
    ball1.dy *= -1;
  }
  if(ball2.cy < 0){
    ball2.cy = 0;
    ball2.dy *= -1;
  }
  if(ball1.cx > 800){
    ball1.cx = 800;
    ball1.dx *= -1;
  }
  if(ball2.cx > 800){
    ball2.cx = 800;
    ball2.dx *= -1;
  }
  if(ball1.cx < 0){
    ball1.cx = 0;
    ball1.dx *= -1;
  }
  if(ball2.cx < 0){
    ball2.cx = 0;
    ball2.dx *= -1;
  }
  if(ball3.cy > 600){
    ball3.cy = 600;
    ball3.dy *= -1;
  }
  if(ball4.cy > 600){
    ball4.cy = 600;
    ball4.dy *= -1;
  }
  if(ball3.cy < 0){
    ball3.cy = 0;
    ball3.dy *= -1;
  }
  if(ball4.cy < 0){
    ball4.cy = 0;
    ball4.dy *= -1;
  }
  if(ball3.cx > 800){
    ball3.cx = 800;
    ball3.dx *= -1;
  }
  if(ball4.cx > 800){
    ball4.cx = 800;
    ball4.dx *= -1;
  }
  if(ball3.cx < 0){
    ball3.cx = 0;
    ball3.dx *= -1;
  }
  if(ball4.cx < 0){
    ball4.cx = 0;
    ball4.dx *= -1;
  }
  if(ball1.cx >= 365 && ball1.cx < 415 && ball1.cy > 17 && ball1.cy < 34){
    // alert('hi');
  }
  if(ball2.cx >= 365 && ball2.cx < 415 && ball2.cy > 17 && ball2.cy < 34){
    // alert('hi');
  }
  if(ball3.cx >= 365 && ball3.cx < 415 && ball3.cy > 17 && ball3.cy < 34){
    // alert('hi');
  }
  if(ball4.cx >= 365 && ball4.cx < 415 && ball4.cy > 17 && ball4.cy < 34){
    // alert('hi');
  }
  if(dir1 === 'down'){
    comp1.y += 2.75;
  }
  if(comp1.y > 40){
    dir1 = 'up';
  }
  if(dir1 === 'up'){
    comp1.y -= 2.75;
  }
  if(comp1.y < 0){
    dir1 = 'down';
  }
  if(dir2 === 'down'){
    comp2.y += 3.1;
  }
  if(comp2.y > 40){
    dir2 = 'up';
  }
  if(dir2 === 'up'){
    comp2.y -= 3.1;
  }
  if(comp2.y < 0){
    dir2 = 'down';
  }
  if(dir3 === 'right'){
    comp3.x += 3;
  }
  if(comp3.x > 340){
    dir3 = 'left';
  }
  if(dir3 === 'left'){
    comp3.x -= 3;
  }
  if(comp3.x < 300){
    dir3 = 'right';
  }


  
  boundPaddle(player);
  collideBallWith(ball1,comp3);
  collideBallWith(ball2,comp3);
  collideBallWith(ball3,comp3);
  collideBallWith(ball4,comp3);
  collideBallWithComp(ball1,comp1);
  collideBallWithComp(ball1,comp2);
  collideBallWithComp(ball2,comp2);
  collideBallWithComp(ball3,comp2);
  collideBallWithComp(ball4,comp2);
  collideBallWithComp(ball1,comp1);
  collideBallWithComp(ball2,comp1);
  collideBallWithComp(ball3,comp1);
  collideBallWithComp(ball4,comp1);
  collideBallWith(ball1,ball2);
  collideBallWith(ball1,ball3);
  collideBallWith(ball1,ball4);
  collideBallWith(ball2,ball1);
  collideBallWith(ball2,ball3);
  collideBallWith(ball2,ball4);
  collideBallWith(ball3,ball1);
  collideBallWith(ball3,ball2);
  collideBallWith(ball3,ball4);
  collideBallWith(ball4,ball1);
  collideBallWith(ball4,ball2);
  collideBallWith(ball4,ball3);
  collideBallWith(ball1,player);
  collideBallWith(ball2,player);
  collideBallWith(ball3,player);
  collideBallWith(ball4,player);
  requestAnimationFrame(animate);
};
var matrix = field.getScreenCTM().inverse();

field.addEventListener('mousemove', function (event){
  event.preventDefault();
  var p = field.createSVGPoint();
  p.x = event.clientX;
  var insvg = p.matrixTransform(matrix);
  inputX = insvg.x;
});



requestAnimationFrame(animate);








