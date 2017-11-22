'use strict';

var getRandom = function (number) {
  return Math.random() * number;
};
var sort = function (array) {
  array.sort(function (a, b) {
    return a[0] - b[0];
  });
};
var colorAlpha = function (r, g, b, a) {
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
};

window.renderStatistics = function (ctx, names, times) {
  var drawText = function (array, x, y, indent) {
    for (var i = 0; i < array.length; i++) {
      ctx.fillText(array[i], x, y + i * indent);
    }
  };

  var drawBar = function (barX, barY, barWidth, barHeight, color, time, name) {
    var bottomBarPadding = 265;
    if (name === ('Вы')) {
      ctx.fillStyle = heroColor;
    } else {
      ctx.fillStyle = colorAlpha(0, 0, 255, getRandom(1));
    }
    ctx.fillRect(barX, barY, barWidth, barHeight);
    ctx.fillStyle = colorAlpha(0, 0, 0, 1);
    ctx.textAlign = 'center';
    ctx.fillText(time, barX + barWidth / 2, barY - 10);
    ctx.fillText(name, barX + barWidth / 2, bottomBarPadding);
  };
  var results = [];
  var collectResults = function () {
    for (var i = 0; i <= names.length - 1; i++) {
      results.push([times[i], names[i]]);
    }
  };
  var drawDiagram = function () {
    var maxTime = results[results.length - 1][0];
    for (var i = 0; i <= names.length - 1; i++) {
      var name = results[i][1];
      var time = results[i][0];

      var barX = leftPadding + (barGap + barWidth) * i;
      var itemHeight = Math.floor(barHeight * time / maxTime);
      var barY = topBarPadding + (barHeight - itemHeight);
      var timeInSec = Math.floor(time) + 'мс';
      drawBar(barX, barY, barWidth, itemHeight, colorAlpha, timeInSec, name);
    }
  };
  var leftPadding = 120;
  var topPadding = 50;
  var indent = 20;
  var barHeight = 150;
  var barWidth = 40;
  var barGap = 50;
  var topBarPadding = 100;
  var heroColor = colorAlpha(255, 0, 0, 1);

  ctx.fillStyle = colorAlpha(0, 0, 0, 0.7);
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = colorAlpha(255, 255, 255, 1);
  ctx.fillRect(100, 10, 420, 270);
  ctx.font = '16px PT Mono';
  ctx.fillStyle = colorAlpha(0, 0, 0, 1);

  drawText(['Ура, вы победили!', 'Список результатов:'], leftPadding, topPadding, indent);
  collectResults();
  sort(results);
  drawDiagram(drawBar);
};
