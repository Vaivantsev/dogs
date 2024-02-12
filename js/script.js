let imageNames = [];
// let masiv = [];
let openCards = [];
let i = 0;
let game = document.getElementById("game");
let time = document.getElementById("time");
let attempts = document.getElementById("attempts");
let newGame = document.getElementById("newGame");
let a = 0;
let seconds = 0;
let amountCards = 0;
let isPlaying = false;
let dogs = 0;

newGame.onclick = function () {
  isPlaying = false;
  seconds = 0;
  time.innerHTML = "Time: " + seconds;
  a = 0;
  attempts.innerHTML = "Attempts: " + a;
  // перемешиваем картинки
  for (let m = imageNames.length - 1; m > 0; m--) {
    let randomNumber = Math.floor(Math.random() * (m + 1));
    let slot = imageNames[randomNumber];
    imageNames[randomNumber] = imageNames[m];
    imageNames[m] = slot;
  }
  let cards = game.children;
  for (let c of cards) {
    // можно нажимать на выбранные карты снова
    c.style.pointerEvents = "auto";
    c.src = "img/card.jpg";
  }
};

while (i < 16) {
  imageNames.push("dog  (" + i + ").jpg");
  imageNames.push("dog  (" + i + ").jpg");
  i = i + 1;
}
for (let m = imageNames.length - 1; m > 0; m--) {
  // выбирается рандомное число для перемешивания картинок
  let randomNumber = Math.floor(Math.random() * (m + 1));
  // создается слот держащий рандомный элемент массива
  let slot = imageNames[randomNumber];
  // на место рандомного элемента массива ставим другой элемент массива
  imageNames[randomNumber] = imageNames[m];
  // на место другого элемента массива ставим тот, что находится в слоте
  imageNames[m] = slot;
}
console.log(imageNames);
for (let c = 0; c < 32; c = c + 1) {
  let card = document.createElement("img");
  card.src = "img/card.jpg ";
  // добавляем карточки на сайт
  game.appendChild(card);
  setTimeout(function () {
    // делаем карточку квадратной. offsetWidth - ширина тега
    card.style.height = card.offsetWidth + "px";
    console.log(card.offsetWidth);
  }, 0);
  card.onclick = function () {
    // нельзя кликать на одну и туже карту дважды
    card.style.pointerEvents = "none";
    isPlaying = true;
    card.src = "img/" + imageNames[c];
    // добовляем переменную card
    openCards.push(card);
    //Проверяем, открыты ли 2 карточки
    if (openCards.length == 2) {
      // изменяем кол. попыток
      a = a + 1;
      attempts.innerHTML = "Attempts: " + a;
      // если мы выбрали две одинаковые карточки, то в переменную dogs прибовляется 2. Если переменная dogs будет иметь 32, то игра окончена
      if (openCards[0].src == openCards[1].src) {
        openCards = [];
        dogs = dogs + 2;
        if (dogs == 32) {
          // остановка времени 
          clearInterval(gameInterval);
        }
        console.log(" верно");
      }
      // иначе карточки принимают изначальный вид
       else {
        console.log("неверно");
        setTimeout(function () {
          openCards[0].src = "img/card.jpg";
          openCards[1].src = "img/card.jpg";
          openCards = [];
        // цикл разблокирует карточки 
          for (let c of cards) {
            // если на карточке облако 
            if (c.src.includes("card.jpg")) {
              // то разблокируем. Отгаданные карточки остаются заблокированными.
              c.style.pointerEvents = "auto";
            }
          }
        }, 1000);
        let cards = game.children;
        for (let c of cards) {
          c.style.pointerEvents = "none";
        }
      }
      console.log("Вы открыли 2 карточки");
    }
    console.log(openCards);
    // if (c%2==0) {
    //   masiv.push("нечетная")
    //   console.log("Функция нечетная");
    // }
    // else{
    //   masiv.push("четная")
    //   console.log("Функция четная");
    // }
    // console.log(masiv);
  };
}
gameInterval = setInterval(function () {
  console.log(1);
  if (isPlaying) {
    seconds = seconds + 1;
  }
  time.innerHTML = "Time: " + seconds;
}, 1000);
