let currentQuestion = 0;
let score = 0;
let selectedOption = -1; // -1 表示尚未選擇
let showNextBtn = false;
let bounceOffset = 0; // 用於正確選項跳動動畫的偏移量

// 測驗題目資料庫（5題高中簡易英文測驗）
const quizData = [
  {
    question: "1. The weather is so nice today; let's go for a ____ in the park.",
    options: ["A. walk", "B. sleep", "C. flight", "D. dynamic"],
    answer: 0
  },
  {
    question: "2. She was very ____ when she won the first prize in the speech contest.",
    options: ["A. bored", "B. excited", "C. terrible", "D. angry"],
    answer: 1
  },
  {
    question: "3. You must wear a helmet to protect your head while ____ a motorcycle.",
    options: ["A. driving", "B. riding", "C. flying", "D. running"],
    answer: 1
  },
  {
    question: "4. The museum displays a wide ____ of ancient historical artifacts.",
    options: ["A. choice", "B. range", "C. group", "D. number"],
    answer: 1
  },
  {
    question: "5. It is important to maintain a balanced ____ for good health.",
    options: ["A. habit", "B. exercise", "C. diet", "D. weight"],
    answer: 2
  }
];

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 設定文字對齊與樣式
  textAlign(LEFT, CENTER);
}

function draw() {
  // 設定背景顏色為深灰藍色
  background(240, 244, 248);

  // 如果題目還沒做完
  if (currentQuestion < quizData.length) {
    drawQuizScreen();
  } else {
    // 顯示最終結算畫面
    drawResultScreen();
  }
}

// 繪製測驗畫面
function drawQuizScreen() {
  let q = quizData[currentQuestion];

  // 計算核心面板區域（置中，寬度上限 800px）
  let cardWidth = min(width * 0.9, 800);
  let startX = (width - cardWidth) / 2;
  let startY = 80;

  // 畫題目卡片背景
  fill(255);
  noStroke();
  rect(startX - 20, startY - 20, cardWidth + 40, height - startY - 40, 16);

  // 顯示當前進度與題目文字
  fill(50);
  textSize(22);
  textStyle(BOLD);
  text(`Question ${currentQuestion + 1} / ${quizData.length}`, startX, startY);

  textSize(18);
  textStyle(NORMAL);
  text(q.question, startX, startY + 40, cardWidth, 60);

  // 更新跳動動畫的偏移量
  bounceOffset = sin(frameCount * 0.1) * 8;

  // 選項尺寸與間距設定
  let optionY = startY + 120;
  let optionHeight = 55;
  let gap = 15;

  for (let i = 0; i < q.options.length; i++) {
    let currentY = optionY + i * (optionHeight + gap);
    let isCorrectOption = (i === q.answer);
    let isSelectedOption = (i === selectedOption);

    // 判斷該選項背景色與跳動效果
    let boxY = currentY;
    let bgColor = color(245, 247, 250); // 預設選項背景色

    if (selectedOption !== -1) {
      if (isCorrectOption) {
        // 若選錯，正確選項套用指定的 #caf0f8 背景色
        bgColor = color("#caf0f8");
        // 若選錯，正確選項上下跳動；若選對則固定顯示
        if (selectedOption !== q.answer) {
          boxY += bounceOffset;
        }
      } else if (isSelectedOption) {
        // 選錯的選項標示紅灰色
        bgColor = color(255, 205, 210);
      }
    } else {
      // 懸停變色效果
      if (mouseX > startX && mouseX < startX + cardWidth && mouseY > currentY && mouseY < currentY + optionHeight) {
        bgColor = color(230, 238, 248);
      }
    }

    // 繪製選項框
    fill(bgColor);
    stroke(220);
    strokeWeight(1);
    rect(startX, boxY, cardWidth, optionHeight, 10);

    // 顯示選項文字
    fill(40);
    noStroke();
    textSize(16);
    text(q.options[i], startX + 20, boxY + optionHeight / 2);
  }

  // 若已完成作答，顯示「下一題」按鈕
  if (showNextBtn) {
    let btnX = startX + cardWidth - 140;
    let btnY = optionY + 4 * (optionHeight + gap) + 20;

    // 按鈕懸停效果
    if (mouseX > btnX && mouseX < btnX + 140 && mouseY > btnY && mouseY < btnY + 45) {
      fill(52, 120, 246);
    } else {
      fill(37, 99, 235);
    }

    rect(btnX, btnY, 140, 45, 8);

    fill(255);
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    let btnText = (currentQuestion === quizData.length - 1) ? "觀看結果" : "下一題 ➔";
    text(btnText, btnX + 70, btnY + 22);

    // 恢復文字對齊模式
    textAlign(LEFT, CENTER);
    textStyle(NORMAL);
  }
}

// 繪製結算畫面
function drawResultScreen() {
  textAlign(CENTER, CENTER);
  
  // 顯示標題與最終成績
  fill(30);
  textSize(36);
  textStyle(BOLD);
  text("測驗結束！", width / 2, height / 2 - 60);

  textSize(24);
  textStyle(NORMAL);
  fill(70);
  text(`你的總得分為：${score} / ${quizData.length} 題`, width / 2, height / 2);

  // 重新開始按鈕
  let btnX = width / 2 - 80;
  let btnY = height / 2 + 60;
  
  if (mouseX > btnX && mouseX < btnX + 160 && mouseY > btnY && mouseY < btnY + 45) {
    fill(34, 197, 94);
  } else {
    fill(22, 163, 74);
  }
  rect(btnX, btnY, 160, 45, 8);

  fill(255);
  textSize(16);
  textStyle(BOLD);
  text("再試一次", width / 2, btnY + 22);

  // 恢復文字對齊設定
  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
}

// 滑鼠點擊事件處理
function mousePressed() {
  // 如果在測驗中
  if (currentQuestion < quizData.length) {
    let cardWidth = min(width * 0.9, 800);
    let startX = (width - cardWidth) / 2;
    let optionY = 80 + 120;
    let optionHeight = 55;
    let gap = 15;

    // 處理選項點擊（尚未點選選項時）
    if (selectedOption === -1) {
      for (let i = 0; i < 4; i++) {
        let currentY = optionY + i * (optionHeight + gap);
        if (mouseX > startX && mouseX < startX + cardWidth && mouseY > currentY && mouseY < currentY + optionHeight) {
          selectedOption = i;
          showNextBtn = true;

          // 答對加分
          if (i === quizData[currentQuestion].answer) {
            score++;
          }
          break;
        }
      }
    }

    // 處理「下一題」按鈕點擊
    if (showNextBtn) {
      let btnX = startX + cardWidth - 140;
      let btnY = optionY + 4 * (optionHeight + gap) + 20;

      if (mouseX > btnX && mouseX < btnX + 140 && mouseY > btnY && mouseY < btnY + 45) {
        // 重置選項狀態並切換至下一題
        currentQuestion++;
        selectedOption = -1;
        showNextBtn = false;
      }
    }
  } else {
    // 結算畫面：點擊「再試一次」重置測驗
    let btnX = width / 2 - 80;
    let btnY = height / 2 + 60;
    if (mouseX > btnX && mouseX < btnX + 160 && mouseY > btnY && mouseY < btnY + 45) {
      currentQuestion = 0;
      score = 0;
      selectedOption = -1;
      showNextBtn = false;
    }
  }
}

// 支援視窗大小動態調整（適應全螢幕）
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}