//  random position
function getRandomPosition() {
  const areaTop = 80;
  const areaLeft = 600;
  const areaWidth = 300;
  const areaHeight = 100;

  const randomTop = areaTop + Math.floor(Math.random() * areaHeight);
  const randomLeft = areaLeft + Math.floor(Math.random() * areaWidth);

  return { top: randomTop, left: randomLeft };
}

function updateIconPosition() {
  const researchIcon = document.querySelector(".search-icon");
  const randomPosition = getRandomPosition();
  researchIcon.style.top = randomPosition.top + "px";
  researchIcon.style.left = randomPosition.left + "px";
}
updateIconPosition();
setInterval(updateIconPosition, 3500);
