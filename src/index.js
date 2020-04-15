import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button
                className={"square " + (this.props.isWin ? "squareWin" : null)}
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        let winning = false; 
        for(let j = 0; j < this.props.winningSquares.length; j++){
            if(this.props.winningSquares[j] === i){
                winning = true; 
            }
        }
        return (
            <Square
                value={this.props.squares[i]}
                isWin={winning}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        let width = 20;
        let height = 20;
        let rows = [];
        for (let i = 0; i < height; i++) {
            let cloumns = [];
            for (let j = i * width; j < width * (i + 1); j++) {
                cloumns.push(
                    this.renderSquare(j)
                );
            }
            rows.push(
                <div className="board-row">
                    {cloumns}
                </div>
            )
        }
        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(400).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
            indexClick: 0,
            isHistorySort : true,
            indexHistoryClick : -1,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares, this.state.indexClick) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            indexClick: i,
        });

    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            indexHistoryClick : step,
        });
    }

    sortHistory(){
        this.setState({isHistorySort : !this.state.isHistorySort});
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares, this.state.indexClick);
        let WinningSqures = []; 
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start' + move + "(" + getIndex(move).cloumnIndex + "," + getIndex(move).rowIndex + ")";
            if(move === this.state.indexHistoryClick){
                return (
                    <li>
                        <button onClick={() => this.jumpTo(move)}
                        style={{background : "red"}}
                        >{desc}</button>
                    </li>
                );
            }else{
                return (
                    <li>
                        <button onClick={() => this.jumpTo(move)}
                        >{desc}</button>
                    </li>
                );
            }
        });

        if(!this.state.isHistorySort){
            moves.reverse(); 
        }

        let status;
        if (winner) {
            status = 'Winner: ' + winner.winner;
            WinningSqures = winner.winningSquares;
            console.log(WinningSqures);  
        } else {
            if(winner === null){
                if(current.squares.indexOf(null) === -1){
                    status = 'Being a draw';
                }else{
                    status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
                }
            }
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winningSquares={WinningSqures}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick = {() => this.sortHistory()}>{this.state.isHistorySort ? "Tăng dần" : "Giảm dần"}</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares, index) {
    //Vi tri cua click
    let cloumnIndex = index % 20;
    let rowIndex = Math.floor(index / 20);
    let listIndexWin = [];
    listIndexWin.push(index);
    //Ngang ben trai
    let count = 0;
    let left = cloumnIndex - 1;
    let currentIndex = index - 1;
    while (left >= 0) {
        if (squares[index] === squares[currentIndex]) {
            ++count;
            listIndexWin.push(currentIndex);
        }
        else {
            break;
        }
        left--;
        currentIndex--;
    }
    let right = (rowIndex + 1) * 20 - 1;
    //Ngang ben phai
    currentIndex = index + 1;
    while (currentIndex <= right) {
        if (squares[index] === squares[currentIndex]) {
            ++count;
            listIndexWin.push(currentIndex);
        } else {
            break;
        }
        currentIndex++;
    }

    if (count === 4) {
        return {
            winner: squares[index],
            winningSquares: listIndexWin
        }
    }


    let count2 = 0;
    listIndexWin = [];
    listIndexWin.push(index); 
    //Doc ben tren 
    let above = index - 20;
    while (above >= 0) {
        if (squares[above] === squares[index]) {
            count2++;
            listIndexWin.push(above);
        } else {
            break;
        }
        above = above - 20;
    }
    //Doc ben duoi
    let bellow = index + 20;
    while (bellow <= 399) {
        if (squares[bellow] === squares[index]) {
            count2++;
            listIndexWin.push(bellow);
        } else {
            break;
        }
        bellow = bellow + 20;
    }

    if (count2 === 4) {
        return {
            winner: squares[index],
            winningSquares: listIndexWin
        }
    }


    let count3 = 0;
    listIndexWin = []; 
    listIndexWin.push(index); 
    //Cheo 1 ben tren 
    let diagonalline1Above = (index - 20) - 1;
    while (diagonalline1Above >= 0) {
        if (squares[diagonalline1Above] === squares[index]) {
            count3++;
            listIndexWin.push(diagonalline1Above);
        } else {
            break;
        }
        diagonalline1Above = (diagonalline1Above - 20) - 1;
    }
    //Cheo 1 ben duoi
    let diagonalline1Bellow = (index + 20) + 1;
    while (diagonalline1Bellow <= 399) {
        if (squares[diagonalline1Bellow] === squares[index]) {
            count3++;
            listIndexWin.push(diagonalline1Bellow); 
        } else {
            break;
        }
        diagonalline1Bellow = (diagonalline1Bellow + 20) + 1;
    }

    if (count3 === 4) {
        return {
            winner: squares[index],
            winningSquares: listIndexWin
        }
    }


    let count4 = 0;
    listIndexWin = []; 
    listIndexWin.push(index); 
    //Cheo 2 ben tren 
    let diagonalline2Above = (index - 20) + 1;
    while (diagonalline2Above > 0) {
        if (squares[diagonalline2Above] === squares[index]) {
            count4++;
            listIndexWin.push(diagonalline2Above);
        } else {
            break;
        }
        diagonalline2Above = (diagonalline2Above - 20) + 1;
    }

    //Cheo 2 ben duoi 
    let diagonalline2Bellow = (index + 20) - 1;
    while (diagonalline2Bellow < 399) {
        if (squares[diagonalline2Bellow] === squares[index]) {
            count4++;
            listIndexWin.push(diagonalline2Bellow); 
        } else {
            break;
        }
        diagonalline2Bellow = (diagonalline2Bellow + 20) - 1;
    }


    if (count4 === 4) {
        return {
            winner: squares[index],
            winningSquares: listIndexWin
        }
    }


    return null;
}

function getIndex(index){
    let cloumnIndex = index % 20;
    let rowIndex = Math.floor(index / 20);
    return {
        cloumnIndex,
        rowIndex
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
