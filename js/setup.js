'use strict';

// Показываем окно
var setupWindow = document.querySelector('.setup');
setupWindow.classList.remove('hidden');
// Все похожие волшебники
var similarWizardBlock = setupWindow.querySelector('.setup-similar-list');
// Шаблон для волшебника
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var similarWizardsQuantity = 4;

var getRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var SimilarWizard = function (index) {
  var NAMES = [
    'Иван',  'Хуан Себастьян',  'Мария',  'Кристоф',
    'Виктор',  'Юлия',  'Люпита',  'Вашингтон'
  ];
  var SURNAMES = [
    'да Марья',  'Верон',  'Мирабелла',  'Вальц',
    'Онопко',  'Топольницкая',  'Нионго',  'Ирвинг'
  ];
  var COAT_COLOR = [
    'rgb(101, 137, 164)',  'rgb(241, 43, 107)',  'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',  'rgb(215, 210, 55)',  'rgb(0, 0, 0)'
  ];
  var EYES_COLOR = [
    'black',  'red',  'blue',
    'yellow',  'green'
  ];
  var fullNames = NAMES.map(function () {
    return getRandom(NAMES) + ' ' + getRandom(SURNAMES);
  });

  this.name = fullNames[index];
  this.coatColor = getRandom(COAT_COLOR);
  this.eyesColor = getRandom(EYES_COLOR);
};
var placeSimilarWizard = function (wizard) {

  var oneSimilarWizard = wizardTemplate.cloneNode(true);

  oneSimilarWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  oneSimilarWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  oneSimilarWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return oneSimilarWizard;
};

for (var i = 0; i < similarWizardsQuantity; i++) {
  var wizard = new SimilarWizard(i);
  fragment.appendChild(placeSimilarWizard(wizard));
}

similarWizardBlock.appendChild(fragment);
setupWindow.querySelector('.setup-similar').classList.remove('hidden');
