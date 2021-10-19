let cardClick = null;
let clickPrevention = false;
let cardsMatched = 0;

const cardColors = [
  'red',
  'green',
  'blue',
  'orange',
  'yellow',
  'violet'
];

const cards = [...document.querySelectorAll('.card-appearance')];
for (let color of cardColors){
  const card1Index = parseInt(Math.random() * cards.length);
  const card1 = cards[card1Index];
  cards.splice(card1Index, 1);
  card1.className += ` ${color}`
  card1.setAttribute('data-color', color);

  const card2Index = parseInt(Math.random() * cards.length);
  const card2 = cards[card2Index];
  cards.splice(card2Index, 1);
  card2.className += ` ${color}`
  card2.setAttribute('data-color', color);

}

function onCardClicked(e){
  const targetCard = e.currentTarget;
  if (
    clickPrevention ||
    targetCard === cardClick ||
    targetCard.className.includes('done')
    ) {
    return;
  }
  targetCard.className = targetCard.className
    .replace('before-flip', '')
    .trim();
    targetCard.className += ' done';

  if (!cardClick) { /*this if statement keeps track of the 
    initial clicked card if another card has not been clicked. */
    cardClick = targetCard;
  } else if (cardClick){ /* this else if statement checks
    to see if another card was clicked. If another card is
    clicked it then checks to see if the new card matches
    the initial card*/
    if (
      cardClick.getAttribute('data-color') !== 
      targetCard.getAttribute('data-color')
      ) {
        clickPrevention = true;
        setTimeout(() => {
          cardClick.className = 
          cardClick.className.replace('done', '').trim() +
           ' before-flip';
          targetCard.className = 
          targetCard.className.replace('done', '').trim() +
           ' before-flip';
          cardClick = null;
          clickPrevention = false;
        }, 1000);
    } else {
      cardsMatched++;
      cardClick = null;
      if (cardsMatched === 6) {
        alert('All Cards Matched');
      }
    }
  }
}
