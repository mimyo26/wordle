const 시작_시간 = new Date();

function setTime() {
  const 현재_시간 = new Date();
  const 흐른_시간 = new Date(현재_시간 - 시작_시간);
  const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
  const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
  const timer = document.querySelector(".timer-time");
  timer.innerText = `${분}:${초}`;
}

setInterval(setTime, 1000);
