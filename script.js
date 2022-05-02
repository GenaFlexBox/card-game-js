const wrapper = document.querySelector('.wrapper')
const container = document.querySelector('.container')

let matchedCard = 0;
let cardOne, cardTwo;
let disableCard = false;

//Создаем массив с объектами с картинками для генерации поля 4 на 4
const imgArray = () => [
  {imgSrc: "./images/img-1.png", name: "img1"},
  {imgSrc: "./images/img-2.png", name: "img2"},
  {imgSrc: "./images/img-3.png", name: "img3"},
  {imgSrc: "./images/img-4.png", name: "img4"},
  {imgSrc: "./images/img-5.png", name: "img5"},
  {imgSrc: "./images/img-6.png", name: "img6"},
  {imgSrc: "./images/img-7.png", name: "img7"},
  {imgSrc: "./images/img-8.png", name: "img8"},
  {imgSrc: "./images/img-1.png", name: "img1"},
  {imgSrc: "./images/img-2.png", name: "img2"},
  {imgSrc: "./images/img-3.png", name: "img3"},
  {imgSrc: "./images/img-4.png", name: "img4"},
  {imgSrc: "./images/img-5.png", name: "img5"},
  {imgSrc: "./images/img-6.png", name: "img6"},
  {imgSrc: "./images/img-7.png", name: "img7"},
  {imgSrc: "./images/img-8.png", name: "img8"}
];
//Перемешиваем массив с картинками для начальной генерации поля
const shuflesImg = () => {
  const cardDate =  imgArray();
  cardDate.sort(() => Math.random() - 0.5);
  return cardDate;
};
//Создаем ul и выводим
function createList() {
  const list = document.createElement('ul');
  list.classList.add('cards');
  wrapper.append(list);
  return list;
}
//Генерируем поле для игры 4 на 4
const cardGenerator = () => {
  const cardDate = shuflesImg();
  const addList  = createList();

  cardDate.forEach(item =>{
    
    const card = document.createElement('li');
    const frontView = document.createElement('div')
    const backView = document.createElement('div');
    const span = document.createElement('span');
    const imgFront = document.createElement('img');
    const imgBack = document.createElement('img');

  
    card.classList.add('card');
    frontView.classList.add('view', 'front-view');
    backView.classList.add('view', 'back-view');
   

    imgBack.src = item.imgSrc;
    imgFront.src = "./images/back-card.png"

    
    addList.append(card);
    card.append(frontView);
    card.append(backView);
    frontView.append(span);
    span.append(imgFront)
    backView.append(imgBack);
    

  
    return {
      card,
      frontView,
      backView,
      span,
      imgFront,
      imgBack
    }
  })
};
cardGenerator();
//Ход игры
function flipCard(e) {
  let clickedCard = e.target;

  if (clickedCard !== cardOne && !disableCard) {
    clickedCard.classList.add('flip')
    if (!cardOne) {
      return  cardOne = clickedCard;
    }
    cardTwo = clickedCard;
    disableCard = true;
    let cardOneImg = cardOne.querySelector('.back-view > img').src;
    cardTwoImg = cardTwo.querySelector('.back-view > img').src;
    matchCards(cardOneImg,cardTwoImg);
  }
};
//Сравнение карточек 
function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == 8) {
      return result();
    }
    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
    cardOne = cardTwo = "";
    return disableCard = false;
  } 
  //Если карты не равны
  setTimeout (() => {
    cardOne.classList.add('shake');
    cardTwo.classList.add('shake');
  }, 400);

  setTimeout (() => {
    cardOne.classList.remove('shake', 'flip');
    cardTwo.classList.remove('shake', 'flip');
    cardOne = cardTwo = "";
    disableCard = false;
  }, 1200);
};
//Выводим результат игры 
function result() {
  const textResult = document.createElement('h1');
  const button = document.createElement('button');

  textResult.classList.add('result')
  button.classList.add('btn')

  textResult.textContent = 'Ты победил!'
  button.innerHTML = 'Сыграть ещё раз'

  container.prepend(textResult)
  container.append(button)

  const startOver = () => {
    //При клике на кнопку "Сыграть ещё раз" карточки переворачиваются и перемешивается
    button.addEventListener('click', function () {

      let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; 
      arr.sort(() => Math.random() - 0.5);
      
      let cards = document.querySelectorAll('.card') 

      cards.forEach((card, index) => {
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
          imgTag.src = `images/img-${arr[index]}.png`;
        }, 300);
        textResult.remove();
        button.remove();
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
        })
      })
  }
  startOver();

  return {
    textResult,
    button
  };

};


//Взаимодействия с элементами игры
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', flipCard);
  });
});


