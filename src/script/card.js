import {Settings} from './settings.js';

class Card
{
    constructor()
    {
        this.grid = [];
        this.fillGrid();
    }

    fillGrid()
    {
        for(let i = 0; i < Settings.Card.size; i++)
        {
            this.grid[i] = [];
            for(let j = 0; j < Settings.Card.size; j++)
            {
                let randomNumber = Math.floor(Math.random() * (Settings.Card.numberMax - Settings.Card.numberMin + 1)) + Settings.Card.numberMin;
                while(this.isPresent(randomNumber))
                {
                    randomNumber = Math.floor(Math.random() * (Settings.Card.numberMax - Settings.Card.numberMin + 1)) + Settings.Card.numberMin;
                }

                this.grid[i][j] = [];
                this.grid[i][j][0] = randomNumber;
                this.grid[i][j][1] = 0;
            }
        }
    }

    isPresent(number)
    {
        for (let i = 0; i < this.grid.length; i++)
        {
            for (let j = 0; j < this.grid[i].length; j++)
            {
                if (number === this.grid[i][j][0])
                {
                    return true;
                }
            }
        }
        return false;
    }

    setFind(number)
    {
        for (let i = 0; i < Settings.Card.size; i++)
        {
            for (let j = 0; j < this.grid[i].length; j++)
            {
                if (number === this.grid[i][j][0])
                {
                    this.grid[i][j][1] = 1;
                    return true;
                }
            }
        }
        return false;
    }

    checkRow(number)
    {
        if(number < 0 || number >= Settings.Card.size)
        {
            return false;
        }

        for(let j = 0; j < Settings.Card.size; j++)
        {
            if(this.grid[number][j][1] === 0)
            {
                return false;
            }
        }

        for(let j = 0; j < Settings.Card.size; j++)
        {
            this.grid[number][j][1] = 2;
        }

        return true;
    }

    checkColumn(number)
    {
        if(number < 0 || number >= Settings.Card.size)
        {
            return false;
        }

        for(let i = 0; i < Settings.Card.size; i++)
        {
            if(this.grid[i][number][1] === 0)
            {
                return false;
            }
        }

        for(let i = 0; i < Settings.Card.size; i++)
        {
            this.grid[i][number][1] = 2;
        }

        return true;
    }

    checkDiagonal(number)
    {
        if(number === 0)
        {
            for(let k = 0; k < Settings.Card.size; k++)
            {
                if(this.grid[k][k][1] === 0)
                {
                    return false;
                }
            }

            for(let k = 0; k < Settings.Card.size; k++)
            {
                this.grid[k][k][1] = 2;
            }

            return true;
        }
        else if(number === 1)
        {
            let i = 0;
            let j = Settings.Card.size-1;

            for(let k = 0; k < Settings.Card.size; k++)
            {
                if(this.grid[i][j][1] === 0)
                {
                    return false;
                }
                i++;
                j--;
            }

            i = 0;
            j = Settings.Card.size-1;

            for(let k = 0; k < Settings.Card.size; k++)
            {
                this.grid[i][j][1] = 2;
                i++;
                j--;
            }

            return true;
        }

        return false;
    }

    checkCorners()
    {
        const corners = [
            [0, 0],
            [0, Settings.Card.size - 1],
            [Settings.Card.size - 1, 0],
            [Settings.Card.size - 1, Settings.Card.size - 1]
        ];

        for (let [i, j] of corners)
        {
            if (this.grid[i][j][1] === 0)
            {
                return false;
            }
        }

        for (let [i, j] of corners)
        {
            this.grid[i][j][1] = 2;
        }

        return true;
    }

    drawGrid(context, cellSize)
    {
        let fontSize = cellSize * 0.6;
        context.font = `${fontSize}px Arial`;
        context.textAlign = "center";
        context.textBaseline = "middle";

        for (let i = 0; i < Settings.Card.size; i++) {
            for (let j = 0; j < Settings.Card.size; j++) {
                let x = j * cellSize + cellSize / 2;
                let y = i * cellSize + cellSize / 2;

                if (this.grid[i][j][1] === 1)
                {
                    context.fillStyle = "#FFD1DC"; // Rose pâle
                    context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                }
                else if (this.grid[i][j][1] === 2)
                {
                    context.fillStyle = "#faaf20"; // Rose pâle
                    context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                }

                context.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
                context.fillStyle = "black";
                context.fillText(this.grid[i][j][0], x, y);
            }
        }
    }
}

export {Card};