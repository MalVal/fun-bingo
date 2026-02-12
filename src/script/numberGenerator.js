import {Settings} from "./settings.js";

class NumberGenerator
{
    constructor()
    {
        this.generatedNumbers = [];
        this.currentNumber = undefined;
        this.number = 0;
    }

    next()
    {
        if(this.number < Settings.NumberGenerator.numberOfNumbers)
        {
            this.number++;
            if (this.currentNumber !== undefined) {
                this.generatedNumbers.push(this.currentNumber);
            }
            this.currentNumber = Math.floor(Math.random() * (Settings.NumberGenerator.numberMax - Settings.NumberGenerator.numberMin + 1)) + Settings.NumberGenerator.numberMin;
            while (this.isPresent(this.currentNumber)) {
                this.currentNumber = Math.floor(Math.random() * (Settings.NumberGenerator.numberMax - Settings.NumberGenerator.numberMin + 1)) + Settings.NumberGenerator.numberMin;
            }
        }
        else
        {
            this.currentNumber = "Finish";
        }
    }

    isPresent(number)
    {
        for (let i = 0; i < this.generatedNumbers.length; i++)
        {
            if (number === this.generatedNumbers[i])
            {
                return true;
            }
        }
        return false;
    }

    getRemaining()
    {
        return Settings.NumberGenerator.numberOfNumbers - this.number;
    }

    drawNumber(context, cellSize)
    {
        let totalWidth = context.canvas.width;
        let gridWidth = Settings.Card.size * cellSize;
        let remainingWidth = totalWidth - gridWidth;
        let x = gridWidth + remainingWidth / 2;
        let y = context.canvas.height / 2;
        let text = this.currentNumber === undefined ? "" : this.currentNumber;

        context.font = `${cellSize * 1.1}px Arial`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(text, x, y);
    }
}

export {NumberGenerator};