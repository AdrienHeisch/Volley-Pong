exports.outCircleRectangle = function(circleX, circleY, circleRadius, rectangleX, rectangleY, rectangleWidth, rectangleHeight) {
    return circleY - circleRadius < rectangleY + rectangleHeight / 2 && circleY + circleRadius > rectangleY - rectangleHeight / 2
        && circleX - circleRadius <= rectangleX + rectangleWidth / 2 && circleX + circleRadius >= rectangleX - rectangleWidth / 2;
}