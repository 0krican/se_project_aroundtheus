export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;
    this._inputs = Array.from(this._form.querySelectorAll(settings.inputSelector));
    this._submitButton = this._form.querySelector(settings.submitButtonSelector);
  }

  enableValidation() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  resetValidation(disableButton = true) {
    this._inputs.forEach((input) => this._hideInputError(input));
    disableButton ? this._disableButton() : this._toggleButtonState();
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input, message) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._settings.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add(this._settings.errorClass);
    }
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._settings.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove(this._settings.errorClass);
    }
  }

  _toggleButtonState() {
    this._hasInvalidInput() ? this._disableButton() : this._enableButton();
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  }

  _disableButton() {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    this._submitButton.disabled = false;
  }
}
