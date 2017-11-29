'use strict';

// Показываем окно
var setupWindow = document.querySelector('.setup');
setupWindow.classList.remove('hidden');
// Все похожие волшебники
var similarList = setupWindow.querySelector('.setup-similar-list');
// Шаблон для волшебника
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var wizardsCount = 4;

var getRandom = function (array) {
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
  var COAT_COLOR = [
    'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
  ];
  var EYES_COLOR = [
    'black', 'red', 'blue',
    'yellow', 'green'
  ];

  this.name = getRandom(NAMES) + ' ' + getRandom(SURNAMES);
  this.coatColor = getRandom(COAT_COLOR);
  this.eyesColor = getRandom(EYES_COLOR);
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
