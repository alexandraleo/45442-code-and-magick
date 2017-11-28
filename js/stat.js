'use strict';
var leftPadding = 155;
var topPadding = 50;
var indent = 20;
var barHeight = 150;
var barWidth = 40;
var barGap = 50;
var topBarPadding = 100;
var bottomBarPadding = 265;
var shadowBlockColor = 'rgba(0, 0, 0, 0.7)';
var cloudBlockColor = 'rgba(255, 255, 255, 1)';
var textFont = '16px PT Mono';
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
var drawBlock = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};
var drawText = function (ctx, x, y, array) {
  ctx.font = textFont;
  ctx.fillStyle = textColor;
  for (var i = 0; i < array.length; i++) {
    ctx.fillText(array[i], x, y + i * indent);
  }
};
var drawBar = function (ctx, barX, barY, itemHeight, barColor, time, name) {
  ctx.fillStyle = barColor;
  ctx.fillRect(barX, barY, barWidth, itemHeight);
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.fillText(time, barX + barWidth / 2, barY - 10);
  ctx.fillText(name, barX + barWidth / 2, bottomBarPadding);
};
var drawDiagram = function (ctx, names, times) {
  var results = names.map(function (name, i) {
    return [times[i], name];
  });
  sort(results);
  var maxTime = results[results.length - 1][0];
  for (var i = 0; i <= names.length - 1; i++) {
    var name = results[i][1];
    var time = results[i][0];
    var barX = leftPadding + (barGap + barWidth) * i;
    var itemHeight = Math.floor(barHeight * time / maxTime);
    var barY = topBarPadding + (barHeight - itemHeight);
    var timeInSec = Math.floor(time) + 'мс';
    var barColor;

    if (name === 'Вы') {
      barColor = heroColor;
    } else {
      barColor = colorAlpha(0, 0, 255, getRandom(1));
    }

    drawBar(ctx, barX, barY, itemHeight, barColor, timeInSec, name);
  }
};

window.renderStatistics = function (ctx, names, times) {
  drawBlock(ctx, 110, 20, 420, 270, shadowBlockColor);
  drawBlock(ctx, 100, 10, 420, 270, cloudBlockColor);
  drawText(ctx, leftPadding, topPadding, [
    'Ура, вы победили!',
    'Список результатов:'
  ]);
  drawDiagram(ctx, names, times);
};
