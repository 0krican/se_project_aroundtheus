const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg'
  },
  {
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg'
  },
  {
    name: 'Bald Mountains',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg'
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg'
  },
  {
    name: 'Vanoise National Park',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg'
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg'
  }
];

  console.log(initialCards);

const modal = document.querySelector(".modal");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".modal__close-button");

const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="description"]');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileFormElement = document.querySelector('.modal__form');

function openModal() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  modal.classList.add("modal_opened");
}

function closeModal() {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(); 
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

editButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

const cardTemplate = document.querySelector('#card-template');
const cardsList = document.querySelector('.cards__list');

function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

initialCards.forEach(function(cardData) {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});
