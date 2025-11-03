import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const initialCards = [
  { name: 'Yosemite Valley', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg' },
  { name: 'Lake Louise', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg' },
  { name: 'Bald Mountains', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg' },
  { name: 'Latemar', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg' },
  { name: 'Vanoise National Park', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg' },
  { name: 'Lago di Braies', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg' }
];

function openModal(modal) {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', handleEscClose);
}
function closeModal(modal) {
  modal.classList.remove('modal_opened');
  document.removeEventListener('keydown', handleEscClose);
}
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const activeModal = document.querySelector('.modal_opened');
    if (activeModal) closeModal(activeModal);
  }
}
document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('modal')) closeModal(modal);
  });
});


const profileModal = document.querySelector('#profile-modal');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profileModal.querySelector('.modal__close-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileFormElement = document.querySelector('.modal__form[name="edit-profile"]');
const nameInput = profileFormElement.querySelector('#name-input');
const jobInput = profileFormElement.querySelector('#description-input');


const cardsList = document.querySelector('.cards__list');
const cardTemplateSelector = '#card-template';
const addCardButton = document.querySelector('#add-card-button');
const addCardModal = document.querySelector('#card-modal');
const addCardCloseButton = addCardModal.querySelector('#add-card-close');
const addCardForm = document.forms['add-card-form'];
const placeInput = addCardForm.elements['place'];
const linkInput = addCardForm.elements['link'];


const previewModal = document.querySelector('#preview-modal');
const previewImage = document.querySelector('#preview-image');
const previewCaption = document.querySelector('#preview-caption');
const previewCloseButton = document.querySelector('#preview-close');

function handleImageClick({ name, link }) {
  previewImage.src = link;
  previewImage.alt = name;
  previewCaption.textContent = name;
  openModal(previewModal);
}

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleImageClick);
  return card.generateCard();
}
function renderCard(data, method = 'prepend') {
  const cardEl = createCard(data);
  method === 'append' ? cardsList.append(cardEl) : cardsList.prepend(cardEl);
}

function openProfileModal() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileFormValidator.resetValidation(false);
  openModal(profileModal);
}
profileEditButton.addEventListener('click', openProfileModal);
profileCloseButton.addEventListener('click', () => closeModal(profileModal));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value.trim();
  profileJob.textContent = jobInput.value.trim();
  closeModal(profileModal);
  profileFormValidator.resetValidation(true);
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', () => openModal(addCardModal));
addCardCloseButton.addEventListener('click', () => closeModal(addCardModal));
previewCloseButton.addEventListener('click', () => closeModal(previewModal));

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeInput.value.trim(),
    link: linkInput.value.trim()
  };
  renderCard(newCardData, 'prepend');
  addCardForm.reset();
  closeModal(addCardModal);
  cardFormValidator.resetValidation(true);
}
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

initialCards.forEach((item) => renderCard(item, 'append'));

const validationSettings = {
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__save-button',
  inactiveButtonClass: 'modal__save-button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible'
};
const profileFormValidator = new FormValidator(validationSettings, profileFormElement);
const cardFormValidator = new FormValidator(validationSettings, addCardForm);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
