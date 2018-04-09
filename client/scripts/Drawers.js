export function circle(ctx, circle) {
    ctx.strokeStyle = (circle.color ? circle.color : '#000000');
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.width, 0, 2*Math.PI);
    ctx.stroke();
}

export function rectangle(ctx, rectangle) {
    ctx.strokeStyle = (rectangle.color ? rectangle.color : '#000000');
    ctx.beginPath();
    ctx.rect(rectangle.x - rectangle.width / 2, rectangle.y - rectangle.height / 2, rectangle.width, rectangle.height);
    ctx.stroke();
}