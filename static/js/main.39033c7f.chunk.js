(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{13:function(e,t,n){},7:function(e,t,n){e.exports=n(8)},8:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n(2),s=n(3),i=n(4),u=n(0),o=n.n(u),l=n(6),c=n.n(l),h=(n(13),function(e){Object(i.a)(n,e);var t=Object(s.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){var e=this;return o.a.createElement("button",{className:"square "+(this.props.isWin?"squareWin":null),onClick:function(){return e.props.onClick()}},this.props.value)}}]),n}(o.a.Component)),p=function(e){Object(i.a)(n,e);var t=Object(s.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(a.a)(n,[{key:"renderSquare",value:function(e){for(var t=this,n=!1,r=0;r<this.props.winningSquares.length;r++)this.props.winningSquares[r]===e&&(n=!0);return o.a.createElement(h,{value:this.props.squares[e],isWin:n,onClick:function(){return t.props.onClick(e)}})}},{key:"render",value:function(){for(var e=[],t=0;t<20;t++){for(var n=[],r=20*t;r<20*(t+1);r++)n.push(this.renderSquare(r));e.push(o.a.createElement("div",{className:"board-row"},n))}return o.a.createElement("div",null,e)}}]),n}(o.a.Component),m=function(e){Object(i.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).state={history:[{squares:Array(400).fill(null)}],xIsNext:!0,stepNumber:0,indexClick:0,isHistorySort:!0,indexHistoryClick:-1},a}return Object(a.a)(n,[{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),n=t[t.length-1].squares.slice();f(n,this.state.indexClick)||n[e]||(n[e]=this.state.xIsNext?"X":"O",this.setState({history:t.concat([{squares:n}]),stepNumber:t.length,xIsNext:!this.state.xIsNext,indexClick:e}))}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0,indexHistoryClick:e})}},{key:"sortHistory",value:function(){this.setState({isHistorySort:!this.state.isHistorySort})}},{key:"render",value:function(){var e,t=this,n=this.state.history,r=n[this.state.stepNumber],a=f(r.squares,this.state.indexClick),s=[],i=n.map((function(e,n){var r=n?"Go to move #"+n:"Go to game start";return n===t.state.indexHistoryClick?o.a.createElement("li",null,o.a.createElement("button",{onClick:function(){return t.jumpTo(n)},style:{background:"red"}},r)):o.a.createElement("li",null,o.a.createElement("button",{onClick:function(){return t.jumpTo(n)}},r))}));return this.state.isHistorySort||i.reverse(),a?(e="Winner: "+a.winner,s=a.winningSquares,console.log(s)):null===a&&(e=-1===r.squares.indexOf(null)?"Being a draw":"Next player: "+(this.state.xIsNext?"X":"O")),o.a.createElement("div",{className:"game"},o.a.createElement("div",{className:"game-board"},o.a.createElement(p,{squares:r.squares,onClick:function(e){return t.handleClick(e)},winningSquares:s})),o.a.createElement("div",{className:"game-info"},o.a.createElement("div",null,e),o.a.createElement("button",{onClick:function(){return t.sortHistory()}},this.state.isHistorySort?"T\u0103ng d\u1ea7n":"Gi\u1ea3m d\u1ea7n"),o.a.createElement("ol",null,i)))}}]),n}(o.a.Component);function f(e,t){var n=t%20,r=Math.floor(t/20),a=[];a.push(t);for(var s=0,i=n-1,u=t-1;i>=0&&e[t]===e[u];)++s,a.push(u),i--,u--;var o=20*(r+1)-1;for(u=t+1;u<=o&&e[t]===e[u];)++s,a.push(u),u++;if(4===s)return{winner:e[t],winningSquares:a};var l=0;(a=[]).push(t);for(var c=t-20;c>=0&&e[c]===e[t];)l++,a.push(c),c-=20;for(var h=t+20;h<=399&&e[h]===e[t];)l++,a.push(h),h+=20;if(4===l)return{winner:e[t],winningSquares:a};var p=0;(a=[]).push(t);for(var m=t-20-1;m>=0&&e[m]===e[t];)p++,a.push(m),m=m-20-1;for(var f=t+20+1;f<=399&&e[f]===e[t];)p++,a.push(f),f=f+20+1;if(4===p)return{winner:e[t],winningSquares:a};var v=0;(a=[]).push(t);for(var d=t-20+1;d>0&&e[d]===e[t];)v++,a.push(d),d=d-20+1;for(var y=t+20-1;y<399&&e[y]===e[t];)v++,a.push(y),y=y+20-1;return 4===v?{winner:e[t],winningSquares:a}:null}c.a.render(o.a.createElement(m,null),document.getElementById("root"))}},[[7,1,2]]]);
//# sourceMappingURL=main.39033c7f.chunk.js.map