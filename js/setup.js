'use strict';

var ESC_KEY = 27;
var ENTER_KEY = 13;
var COAT_COLOR = [
  'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
];
var EYES_COLOR = [
  'black', 'red', 'blue',
  'yellow', 'green'
];
var FIREBALL_COLOR = [
  '#ee4830', '#30a8ee',
  '#5ce6c0', '#e848d5',
  '#e6e848'
];

var setupWindow = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupWindow.querySelector('.setup-close');
var heroNameInput = setupWindow.querySelector('.setup-user-name');
var setupWizard = document.querySelector('.setup-wizard');
var setupCoat = setupWizard.querySelector('.wizard-coat');
var setupEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = document.querySelector('.setup-fireball-wrap');

var onWindowEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    closeWindow();
  }
};

var openWindow = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onWindowEscPress);
};

var closeWindow = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onWindowEscPress);
};

setupOpen.addEventListener('click', function () {
  openWindow();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    openWindow();
  }
});
setupClose.addEventListener('click', function () {
  closeWindow();
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    closeWindow();
  }
});

heroNameInput.addEventListener('invalid', function () {
  if (heroNameInput.validity.tooShort) {
    heroNameInput.setCustomValidity('Имя персонажа должно состоять как минимум из 2 символов');
  } else if (heroNameInput.validity.tooLong) {
    heroNameInput.setCustomValidity('Имя персонажа не должно быть длиннее 25 символов');
  } else if (heroNameInput.validity.valueMissing) {
    heroNameInput.setCustomValidity('Обязательное поле');
  } else {
    heroNameInput.setCustomValidity('');
  }
});

heroNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя персонажа должно состоять как минимум из 2 символов');
  } else {
    target.setCustomValidity('');
  }
});

heroNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onWindowEscPress);
});
heroNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onWindowEscPress);
});

// Меняем цвета магу

var newCoatColor = function () {
  setupCoat.style.fill = getRandomElement(COAT_COLOR);
};
var newEyesColor = function () {
  setupEyes.style.fill = getRandomElement(EYES_COLOR);
};
var newFireballColor = function () {
  setupFireball.style.backgroundColor = getRandomElement(FIREBALL_COLOR);
};
setupCoat.addEventListener('click', function () {
  newCoatColor();
});
setupEyes.addEventListener('click', function () {
  newEyesColor();
});
setupFireball.addEventListener('click', function () {
  newFireballColor();
});

// Показываем похожих магов

var similarList = setupWindow.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var wizardsCount = 4;

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var Wizard = function () {
  var NAMES = [
    'Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
    'Виктор', 'Юлия', 'Люпита', 'Вашингтон'
  ];
  var SURNAMES = [
    'да Марья', 'Верон', 'Мирабелла', 'Вальц',
    'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'
  ];

  this.name = getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES);
  this.coatColor = getRandomElement(COAT_COLOR);
  this.eyesColor = getRandomElement(EYES_COLOR);
};

var placeWizard = function (wizard) {
  var wizardNode = wizardTemplate.cloneNode(true);

  wizardNode.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardNode.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardNode.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardNode;
};

for (var i = 0; i < wizardsCount; i++) {
  var wizard = new Wizard(i);
  fragment.appendChild(placeWizard(wizard));
}

similarList.appendChild(fragment);
setupWindow.querySelector('.setup-similar').classList.remove('hidden');
