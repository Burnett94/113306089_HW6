// 生成 4 位不重複的隨機數字
function generateSecretNumber() {
    let numbers = Array.from({ length: 10 }, (_, i) => i); // [0, 1, 2, 3, ..., 9]
    let secret = [];
    for (let i = 0; i < 4; i++) {
      let randomIndex = Math.floor(Math.random() * numbers.length);
      secret.push(numbers[randomIndex]);
      numbers.splice(randomIndex, 1);
    }
    return secret.join('');
  }
  
  let secretNumber = generateSecretNumber();
  let attempts = 0;
  
  console.log(`Secret Number (for debugging): ${secretNumber}`); // 可在控制台查看謎底
  
  // 檢查猜測結果
  function checkGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.trim();
  
    // 檢查是否為 4 位數字，且不重複
    if (!/^\d{4}$/.test(guess)) {
      alert("請輸入 4 位不重複的數字！");
      return;
    }
    if (new Set(guess).size !== 4) {
      alert("數字不能重複！");
      return;
    }
  
    attempts++;
    document.getElementById("attempts").innerText = `猜測次數: ${attempts}`;
  
    let result = getResult(guess, secretNumber);
  
    // 顯示猜測結果
    let guessHistory = document.getElementById("guessHistory");
    let listItem = document.createElement("li");
    listItem.innerText = `${guess} => ${result}`;
    guessHistory.appendChild(listItem);
  
    if (result === "4A0B") {
      alert(`恭喜你猜對了！總共猜了 ${attempts} 次！`);
      guessInput.disabled = true;
    }
  
    // 清空輸入欄位
    guessInput.value = "";
  }
  
  // 比較猜測與謎底，回傳 XAYB 格式
  function getResult(guess, secret) {
    let A = 0;
    let B = 0;
    for (let i = 0; i < 4; i++) {
      if (guess[i] === secret[i]) {
        A++;
      } else if (secret.includes(guess[i])) {
        B++;
      }
    }
    return `${A}A${B}B`;
}