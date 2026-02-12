import {Bingo} from "./bingo.js";

let canvas = document.getElementById("bingo");
let pNumbersLeft = document.getElementById("pNumbersLeft");

let bingo = new Bingo(canvas, pNumbersLeft);

resizeCanvas();

function resizeCanvas()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bingo.draw();
}

window.addEventListener("resize", () => resizeCanvas());