import {Settings} from "./settings.js";
import {Card} from "./card.js";
import {NumberGenerator} from "./numberGenerator.js";

class Bingo
{
    constructor(canvas, pNumbersLeft)
    {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        this.card = new Card();
        this.numberGenerator = new NumberGenerator();

        this.pNumbersLeft = pNumbersLeft;
        this.pNumbersLeft.textContent = "Number(s) left : " + this.numberGenerator.getRemaining();

        this.successSound = new Audio("./src/sound/success.mp3");

        this.successRows = [];
        this.successColumns = [];
        this.successDiagonals = [];
        this.successCorners = false;

        this.draw();
        this.setupEventListeners();
    }

    setupEventListeners()
    {
        document.addEventListener('keydown', (event) =>
        {
            if (event.key === ' ') {

                let rowsToVerify = this.sequence(0, Settings.Card.size-1);
                rowsToVerify = rowsToVerify.filter(element => !this.successRows.includes(element));

                let columnsToVerify = this.sequence(0, Settings.Card.size-1);
                columnsToVerify = columnsToVerify.filter(element => !this.successColumns.includes(element));

                let diagonalsToVerify = [0, 1];
                diagonalsToVerify = diagonalsToVerify.filter(element => !this.successDiagonals.includes(element));

                let victory = false;

                this.numberGenerator.next();
                this.pNumbersLeft.textContent = "Number(s) left : " + this.numberGenerator.getRemaining();

                this.draw();

                if(this.card.isPresent(this.numberGenerator.currentNumber))
                {
                    this.card.setFind(this.numberGenerator.currentNumber);

                    // Check all the rows
                    for(let i of rowsToVerify)
                    {
                        if(this.card.checkRow(i))
                        {
                            this.successRows.push(i);
                            victory = true;
                        }
                    }

                    // Check all the columns
                    for(let j of columnsToVerify)
                    {
                        if(this.card.checkColumn(j))
                        {
                            this.successColumns.push(j);
                            victory = true;
                        }
                    }

                    // Check all the diagonals
                    for(let k of diagonalsToVerify)
                    {
                        if(this.card.checkDiagonal(k))
                        {
                            this.successDiagonals.push(k);
                            victory = true;
                        }
                    }

                    // Check the 4 corners
                    if(!this.successCorners)
                    {
                        if(this.card.checkCorners())
                        {
                            this.successCorners = true;
                            victory = true;
                        }
                    }

                    if(victory)
                    {
                        this.successSound.play().then(() => {
                            this.successSound.currentTime = 0;
                        });
                    }
                }
            }

            else if (event.key === 'Enter')
            {
               this.reset();
               this.draw();
                this.pNumbersLeft.textContent = "Number(s) left : " + this.numberGenerator.getRemaining();
            }
        });
    }

    reset()
    {
        this.card = new Card();
        this.numberGenerator = new NumberGenerator();
        this.successRows = [];
        this.successColumns = [];
        this.successDiagonals = [];
        this.successCorners = false;
    }

    draw()
    {
        let cellSize = Math.min(window.innerWidth / 2, window.innerHeight) / Settings.Card.size;
        this.context.canvas.width = window.innerWidth;
        this.context.canvas.height = window.innerHeight;
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.card.drawGrid(this.context, cellSize);
        this.numberGenerator.drawNumber(this.context, cellSize);
    }

    sequence(n, m)
    {
        let result = [];
        for (let i = n; i <= m; i++)
        {
            result.push(i);
        }
        return result;
    }
}

export {Bingo};