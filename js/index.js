// 워들
//자바에 CSS 직접 입력하는 건 지양하는게 좋지만 일단 알려주기 위해 넣음
const 정답 = "APPLE";
let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:43vw; background-color:white; width:200px; height:100px; transition: all 2s ease-in-out;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 5) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B456";
      else block.style.background = "#787C7E";

      block.style.color = "white";
    }
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      //index가 0이면 -1블럭이되니까 그런 블럭은 없으니 에러나기때문에 0보다 크다
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  //이너텍스트는 아무것도 안나오게 없애주고, 인덱스가 0일때 -1 만들어 줘라라는 의미

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  //타이머
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timerdiv = document.querySelector(".timer-time");
      timerdiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
    // setInterval의 아이디가 나옴, 몇번째 인터벌이 돌고 있는지에 대한 내용이 들어있어 컨트롤 가능
    // 얘를 저장했다가 게임이 오버되면 종료해준다.
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
