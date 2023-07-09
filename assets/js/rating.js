const ratingDiv = document.getElementById('rating');
ratingDiv.innerHTML = "        <div id='stars-container'> <div id='stars-progress'></div> </div> <div class='emoji' id='emoji1'></div> <div class='emoji'id='emoji2'></div> <div class='emoji' id='emoji3'></div> <div class='emoji' id='emoji4'></div> <div class='emoji' id='emoji5'></div> <div id='parsing'></div>"

const stars = document.getElementById('stars-progress');
const clickable = document.getElementById('stars-container');
const em1 = document.getElementById('emoji1');
const em2 = document.getElementById('emoji2');
const em3 = document.getElementById('emoji3');
const em4 = document.getElementById('emoji4');
const em5 = document.getElementById('emoji5');
let parsing = document.getElementById('parsing');
const emojis = [em1, em2, em3, em4, em5];
const emojiNames = ["loved this post", "found this post hilarious", "found this post sad", "got mad at this post", "alien-vibed with this post" ]
let currentEmoji = 0;

const maxWidth = 100; // Maximum width
const duration = 30; // Number of frames for animation
let starsAmount = 0;
parsing = document.getElementById('parsing');
let isAnimationRunning = false;
let frameCount = 0;
let trueFrameCount = 0;
  
clickable.addEventListener('mouseenter', startAnimation);
clickable.addEventListener('mouseleave', stopAnimation);
clickable.addEventListener('click', function(){
    if (isAnimationRunning) {
        stopAnimation();
    }
    else{
        startAnimation();
    }
});

function startAnimation() {
  frameCount = 0;
  trueFrameCount = 0;
  isAnimationRunning = true;
  requestAnimationFrame(updateWidth);
}

function stopAnimation() {
    // frameCount = 0;
    isAnimationRunning = false;
    console.log("You " + emojiNames[currentEmoji] + " and rated it " + starsAmount + "/5 stars.");
    parsing.outerHTML = "<div id='parsing'>You " + emojiNames[currentEmoji] + " and rated it " + starsAmount + "/5 stars.<input type='text' id='comment' placeholder='Mind telling us why?' onkeydown='clearInput(event)'></input></div>";
    parsing = document.getElementById('parsing');
}

function updateWidth() {
  if (isAnimationRunning) {
    if (frameCount < duration) {
      frameCount++;
    }
    else {
      frameCount = 0;
    }

  const targetWidth = (frameCount / duration) * maxWidth;
  
  stars.style.width = targetWidth + '%';
  starsAmount =  (5 * targetWidth/100).toFixed(2);

  // console.log(targetWidth);



///emojis
if (trueFrameCount % 5 == 0) {
 if (currentEmoji < emojis.length-1) {
  currentEmoji++;
 }
 else{
  currentEmoji= 0;
 }
  for (var i = 0; i < emojis.length; i++) {
    if (i==currentEmoji) {
        emojis[i].style.opacity = 1;
    }
    else{
        emojis[i].style.opacity = 0;
    }        
  }
}
    trueFrameCount++
    console.log(currentEmoji);
    requestAnimationFrame(updateWidth);
  }
}

function clearInput(event) {
  if (event.keyCode === 13) { // Check if Enter key is pressed
    event.preventDefault(); // Prevent form submission
    document.getElementById("comment").value = ""; // Clear the input value
  }
}