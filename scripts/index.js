const initialCards = [
  { name: 'Yosemite Valley', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg' },
  { name: 'Lake Louise', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg' },
  { name: 'Bald Mountains', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg' },
  { name: 'Latemar', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg' },
  { name: 'Vanoise National Park', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg' },
  { name: 'Lago di Braies', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg' }
];

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) closeModal(openModal);
  }
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

const profileModal = document.querySelector('.modal');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = profileModal.querySelector('.modal__close-button');
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="description"]');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileFormElement = document.querySelector('.modal__form');

function openProfileModal() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(profileModal);
}

editButton.addEventListener("click", openProfileModal);
closeButton.addEventListener("click", () => closeModal(profileModal));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profileModal);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

const addCardButton = document.querySelector('#add-card-button');
const addCardModal = document.querySelector('#add-card-modal');
const addCardCloseButton = document.querySelector('#add-card-close');
const addCardForm = document.forms['add-card-form'];
const placeInput = addCardForm.elements['place'];
const linkInput = addCardForm.elements['link'];

addCardButton.addEventListener('click', () => openModal(addCardModal));
addCardCloseButton.addEventListener('click', () => closeModal(addCardModal));

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeInput.value,
    link: linkInput.value
  };
  const newCard = getCardElement(newCardData);
  cardsList.prepend(newCard);
  addCardForm.reset();
  closeModal(addCardModal);
}

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

const previewModal = document.querySelector('#preview-modal');
const previewImage = document.querySelector('#preview-image');
const previewCaption = document.querySelector('#preview-caption');
const previewCloseButton = document.querySelector('#preview-close');

function openPreviewModal(name, link) {
  previewImage.src = link;
  previewImage.alt = name;
  previewCaption.textContent = name;
  openModal(previewModal);
}

previewCloseButton.addEventListener('click', () => closeModal(previewModal));

const cardTemplate = document.querySelector('#card-template');
const cardsList = document.querySelector('.cards__list');

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true).querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_active');
  });

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    openPreviewModal(data.name, data.link);
  });

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});

enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
});
