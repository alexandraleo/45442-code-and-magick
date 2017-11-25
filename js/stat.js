'use strict';
var leftPadding = 120;
var topPadding = 50;
var indent = 20;
var barHeight = 150;
var barWidth = 40;
var barGap = 50;
var topBarPadding = 100;
var bottomBarPadding = 265;
var barX = leftPadding;
var barY = topBarPadding;
var shadowBlockColor = 'rgba(0, 0, 0, 0.7)';
var cloudBlockColor = 'rgba(255, 255, 255, 1)';
var textColor = 'rgba(0, 0, 0, 1)';
var heroColor = 'rgba(255, 0, 0, 1)';

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
var drawText = function (ctx, x, y, array) {
  for (var i = 0; i < array.length; i++) {
    ctx.fillText(array[i], x, y + i * indent);
  }
};

window.renderStatistics = function (ctx, names, times) {
  var results = [];
  var drawBar = function (itemHeight, time, name) {
    if (name === 'Вы') {
      ctx.fillStyle = heroColor;
    } else {
      ctx.fillStyle = colorAlpha(0, 0, 255, getRandom(1));
    }
    ctx.fillRect(barX, barY, barWidth, itemHeight);
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.fillText(time, barX + barWidth / 2, barY - 10);
    ctx.fillText(name, barX + barWidth / 2, bottomBarPadding);
  };

  var collectResults = function () {
    for (var i = 0; i <= names.length - 1; i++) {
      results.push([times[i], names[i]]);
    }
    sort(results);
  };

  var drawDiagram = function () {
    var name;
    var time;
    var itemHeight;
    var timeInSec;
    collectResults();
    var maxTime = results[results.length - 1][0];
    for (var i = 0; i <= names.length - 1; i++) {
      name = results[i][1];
      time = results[i][0];
      barX = leftPadding + (barGap + barWidth) * i;
      itemHeight = Math.floor(barHeight * time / maxTime);
      barY = topBarPadding + (barHeight - itemHeight);
      timeInSec = Math.floor(time) + 'мс';
      drawBar(itemHeight, timeInSec, name);
    }
  };

  ctx.fillStyle = shadowBlockColor;
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = cloudBlockColor;
  ctx.fillRect(100, 10, 420, 270);
  ctx.font = '16px PT Mono';
  ctx.fillStyle = textColor;

  drawText(ctx, leftPadding, topPadding, [
    'Ура, вы победили!',
    'Список результатов:'
  ]);

  drawDiagram();
};
