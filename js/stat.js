'use strict';

var getRandom = function (number) {
  return Math.random() * number;
};
var getSorted = function (array) {
  array.sort(function (a, b) {
    return a[0] - b[0];
  });
};

window.renderStatistics = function (ctx, names, times) {

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fillRect(100, 10, 420, 270);

  var leftPadding = 120;
  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillText('Ура, вы победили!', leftPadding, 50);
  ctx.fillText('Список результатов:', leftPadding, 70);

  var barHeight = 150;
  var barWidth = 40;
  var barGap = 50;
  var topBarPadding = 100;
  var heroColor = 'rgba(255, 0, 0, 1)';

  var results = [];
  for (var i = 0; i <= names.length - 1; i++) {
    results.push([times[i], names[i]]);
  }
  getSorted(results);
  var maxTime = results[results.length - 1][0];

  for (i = 0; i <= names.length - 1; i++) {

    if (results[i][1].includes('Вы')) {
      ctx.fillStyle = heroColor;
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandom(1) + ')';
    }
    var name = results[i][1];
    var time = results[i][0];
    var barX = leftPadding + (barGap + barWidth) * i;
    var itemHeight = Math.floor(barHeight * time / maxTime);
    var barY = topBarPadding + (barHeight - itemHeight);
    var timeInSec = Math.floor(time) + 'мс';
    var bottomBarPadding = 265;

    ctx.fillRect(barX, barY, barWidth, itemHeight);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(timeInSec, barX, barY - 10);
    ctx.fillText(name, barX, bottomBarPadding);
  }
  // console.log(names, times, results);
};
