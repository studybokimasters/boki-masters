// =====================
// レベル・データ管理
// =====================

function getLevel() {
  return localStorage.getItem("level") || "3級";
}

function getLevelKey(key) {
  return `${getLevel()}_${key}`;
}

function getData(key) {
  return Number(localStorage.getItem(getLevelKey(key))) || 0;
}

function setData(key, value) {
  localStorage.setItem(getLevelKey(key), value);
}

function syncLevelButtons() {
  const level = getLevel();
  const btn3 = document.getElementById("level3Btn");
  const btn2 = document.getElementById("level2Btn");

  if (btn3) btn3.classList.toggle("active", level === "3級");
  if (btn2) btn2.classList.toggle("active", level === "2級");
}

function setLevel(level) {
  localStorage.setItem("level", level);
  syncLevelButtons();

  checkDateReset();
  checkWeekReset();

  if (typeof updateHome === "function") updateHome();
  if (typeof updateCountdown === "function") updateCountdown();
  if (typeof updateTimerDisplay === "function") updateTimerDisplay();
  if (typeof updateStreak === "function") updateStreak();
  if (typeof updateWeeklyGoalDisplay === "function") updateWeeklyGoalDisplay();
  if (typeof renderTodos === "function") renderTodos();
  if (typeof renderTasks === "function") renderTasks();
  if (typeof renderCategorySelect === "function") renderCategorySelect();
}

// =====================
// 日付・週間リセット
// =====================

function checkDateReset() {
  const today = new Date().toDateString();
  const saved = localStorage.getItem(getLevelKey("lastStudyDate"));

  if (saved !== today) {
    setData("todayStudyTime", 0);
    setData("elapsedTime", 0);
    localStorage.setItem(getLevelKey("lastStudyDate"), today);
  }
}

function getWeekStart() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day;
  const start = new Date(now);
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  return start.toDateString();
}

function checkWeekReset() {
  const now = getWeekStart();
  const saved = localStorage.getItem(getLevelKey("weekStart"));

  if (saved !== now) {
    setData("weeklyStudyTime", 0);
    localStorage.setItem(getLevelKey("weekStart"), now);
  }
}

// =====================
// 表示用
// =====================

function formatMinutes(min) {
  return `${Math.floor(min / 60)}時間${min % 60}分`;
}

// =====================
// 週目標
// =====================

function getWeeklyGoal() {
  return Number(localStorage.getItem(getLevelKey("weeklyGoal"))) || 10;
}

function saveWeeklyGoal() {
  const input = document.getElementById("weeklyGoalInput");
  if (!input || !input.value) return;

  const goal = Number(input.value);
  if (goal <= 0) return;

  localStorage.setItem(getLevelKey("weeklyGoal"), goal);
  updateWeeklyGoalDisplay();
  updateHome();
}

function updateWeeklyGoalDisplay() {
  const input = document.getElementById("weeklyGoalInput");
  const display = document.getElementById("weeklyGoalDisplay");
  const goal = getWeeklyGoal();

  if (input) input.value = goal;
  if (display) display.textContent = `今週の目標: ${goal}時間`;
}

// =====================
// ホーム・記録
// =====================

function updateHome() {
  const total = getData("studyTime");
  const today = getData("todayStudyTime");
  const weekly = getData("weeklyStudyTime");
  const weeklyGoalHours = getWeeklyGoal();
  const weeklyGoalMin = weeklyGoalHours * 60;

  const totalEl = document.getElementById("totalTime");
  const todayEl = document.getElementById("todayTime");
  const weeklyTextEl = document.getElementById("weeklyText");
  const weeklyProgressTextEl = document.getElementById("weeklyProgressText");
  const progressFillEl = document.getElementById("progressFill");
  const todayGoalTextEl = document.getElementById("todayGoalText");
  const todayGoalFillEl = document.getElementById("todayGoalFill");

  if (totalEl) totalEl.textContent = formatMinutes(total);
  if (todayEl) todayEl.textContent = formatMinutes(today);

  const weeklyPercent = weeklyGoalMin > 0
    ? Math.min((weekly / weeklyGoalMin) * 100, 100)
    : 0;

  const weeklyText = `${formatMinutes(weekly)} / ${weeklyGoalHours}時間（${Math.floor(weeklyPercent)}%）`;

  if (weeklyTextEl) weeklyTextEl.textContent = weeklyText;
  if (weeklyProgressTextEl) weeklyProgressTextEl.textContent = weeklyText;

  if (progressFillEl) {
    progressFillEl.style.width = `${weeklyPercent}%`;
  }

  const todayGoal = 120;
  const todayPercent = Math.min((today / todayGoal) * 100, 100);

  if (todayGoalTextEl) {
    todayGoalTextEl.textContent = `${today} / ${todayGoal}分`;
  }

  if (todayGoalFillEl) {
    todayGoalFillEl.style.width = `${todayPercent}%`;
  }
}

function updateStreak() {
  const todayMinutes = getData("todayStudyTime");
  const el = document.getElementById("streak");
  let streak = Number(localStorage.getItem(getLevelKey("streak"))) || 0;

  if (todayMinutes > 0) {
    const today = new Date().toDateString();
    const last = localStorage.getItem(getLevelKey("lastStudyDateForStreak"));

    if (!last) {
      streak = 1;
    } else if (last !== today) {
      const y = new Date();
      y.setDate(y.getDate() - 1);

      if (last === y.toDateString()) {
        streak++;
      } else {
        streak = 1;
      }
    }

    localStorage.setItem(getLevelKey("streak"), streak);
    localStorage.setItem(getLevelKey("lastStudyDateForStreak"), today);
  }

  if (el) el.textContent = `${streak}日連続`;
}

// =====================
// 試験日
// =====================

function saveExamDate() {
  const input = document.getElementById("examDate");
  if (!input || !input.value) return;

  localStorage.setItem("examDate", input.value);
  updateCountdown();
}

function updateCountdown() {
  const el = document.getElementById("countdown");
  const input = document.getElementById("examDate");
  if (!el) return;

  const saved = localStorage.getItem("examDate");
  if (!saved) {
    el.textContent = "未設定";
    return;
  }

  if (input) input.value = saved;

  const [y, m, d] = saved.split("-");
  const exam = new Date(y, m - 1, d);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = Math.ceil((exam - today) / 86400000);
  el.textContent = days < 0 ? "試験終了" : `あと${days}日`;
}

// =====================
// タイマー
// =====================

let timer = null;

function startTimer() {
  if (timer) return;

  const saved = getData("elapsedTime");
  const start = Date.now() - saved * 1000;

  localStorage.setItem(getLevelKey("startTime"), start);
  timer = setInterval(updateTimerDisplay, 1000);
}

function updateTimerDisplay() {
  let sec = 0;

  const startTime = Number(localStorage.getItem(getLevelKey("startTime")));
  const saved = getData("elapsedTime");

  if (startTime) {
    sec = Math.floor((Date.now() - startTime) / 1000);
  } else {
    sec = saved;
  }

  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");

  const el = document.getElementById("timer");
  if (el) el.textContent = `${h}:${m}:${s}`;
}

function stopTimer() {
  clearInterval(timer);
  timer = null;

  const startTime = Number(localStorage.getItem(getLevelKey("startTime")));
  if (!startTime) return;

  const sec = Math.floor((Date.now() - startTime) / 1000);
  const min = Math.floor(sec / 60);

  setData("elapsedTime", sec);
  setData("studyTime", getData("studyTime") + min);
  setData("todayStudyTime", getData("todayStudyTime") + min);
  setData("weeklyStudyTime", getData("weeklyStudyTime") + min);

  localStorage.removeItem(getLevelKey("startTime"));

  updateHome();
  updateStreak();
}

function resetTimer() {
  clearInterval(timer);
  timer = null;

  localStorage.removeItem(getLevelKey("startTime"));
  setData("elapsedTime", 0);

  const el = document.getElementById("timer");
  if (el) el.textContent = "00:00:00";
}

// =====================
// Todo（旧ホーム用）
// =====================

function getTodos() {
  return JSON.parse(localStorage.getItem(getLevelKey("todos")) || "[]");
}

function saveTodos(todos) {
  localStorage.setItem(getLevelKey("todos"), JSON.stringify(todos));
}

function addTodo() {
  const input = document.getElementById("todoInput");
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  const todos = getTodos();
  todos.push({
    id: Date.now(),
    text,
    done: false
  });

  saveTodos(todos);
  input.value = "";
  renderTodos();
}

function toggleTodo(id) {
  const todos = getTodos().map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  saveTodos(todos);
  renderTodos();
}

function deleteTodo(id) {
  const todos = getTodos().filter(todo => todo.id !== id);
  saveTodos(todos);
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById("todoList");
  if (!list) return;

  const todos = getTodos();
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="todo-left">
        <input type="checkbox" ${todo.done ? "checked" : ""}>
        <span class="${todo.done ? "todo-done" : ""}">${todo.text}</span>
      </div>
      <button class="todo-delete">削除</button>
    `;

    const checkbox = li.querySelector("input");
    const deleteBtn = li.querySelector(".todo-delete");

    checkbox.addEventListener("change", () => toggleTodo(todo.id));
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    list.appendChild(li);
  });
}

// =====================
// クイズ
// =====================

let currentQuestions = [];
let currentIndex = 0;
let currentMode = "category";
let currentCategory = "";
let currentLevel = "easy";
let quizCorrectCount = 0;
let lastPlayedSet = [];
let answeredResults = [];

const categoryDescriptions = {
  "基礎": "土台を固める基本問題",
  "商品売買": "仕入・売上・掛け取引を強化",
  "決算": "決算整理仕訳を重点演習"
};

function getWrongQuestions() {
  return JSON.parse(localStorage.getItem(getLevelKey("wrongQuestions")) || "[]");
}

function saveWrongQuestions(data) {
  localStorage.setItem(getLevelKey("wrongQuestions"), JSON.stringify(data));
}

function getAllCategories() {
  const examLevel = getLevel();
  return [...new Set(
    questions
      .filter(q => q.examLevel === examLevel)
      .map(q => q.category)
  )];
}

function getCategoryStats(category) {
  const examLevel = getLevel();
  const categoryQuestions = questions.filter(
    q => q.examLevel === examLevel && q.category === category
  );
  const total = categoryQuestions.length;

  const key = getLevelKey("categorySolvedSet");
  const solvedSet = JSON.parse(localStorage.getItem(key) || "{}");

  const solvedIds = solvedSet[category] || [];

  const validSolved = solvedIds.filter(id =>
    categoryQuestions.some(q => q.id === id)
  );

  const correct = validSolved.length;

  const percent = total > 0
    ? Math.min(Math.round((correct / total) * 100), 100)
    : 0;

  return { total, correct, percent };
}

function saveCategoryProgress(questionId, category, isCorrect) {
  if (!isCorrect) return;

  const key = getLevelKey("categorySolvedSet");
  let solvedSet = JSON.parse(localStorage.getItem(key) || "{}");

  if (!solvedSet[category]) {
    solvedSet[category] = [];
  }

  if (!solvedSet[category].includes(questionId)) {
    solvedSet[category].push(questionId);
  }

  localStorage.setItem(key, JSON.stringify(solvedSet));
}

function renderCategorySelect() {
  const wrap = document.getElementById("categoryCards");
  if (!wrap) return;

  wrap.innerHTML = "";

  getAllCategories().forEach(category => {
    const stats = getCategoryStats(category);

    const card = document.createElement("div");
    card.className = "category-progress-card";
    card.onclick = () => startCategoryQuiz(category);

    card.innerHTML = `
      <div class="category-progress-title">${category}</div>
      <div class="category-progress-sub">${categoryDescriptions[category] || "この分野を集中的に演習"}</div>
      <div class="category-progress-meta">
        <span>進捗</span>
        <span>${stats.correct} / ${stats.total}</span>
      </div>
      <div class="progress-bar large">
        <div style="width:${stats.percent}%; height:100%; background:linear-gradient(90deg,#2563eb,#60a5fa); border-radius:999px;"></div>
      </div>
    `;

    wrap.appendChild(card);
  });
}

function startMode(mode, level = "easy") {
  currentMode = mode;
  currentLevel = level;

  const modeSelect = document.getElementById("modeSelect");
  const categorySelect = document.getElementById("categorySelect");
  const quizArea = document.getElementById("quizArea");
  const resultScreen = document.getElementById("resultScreen");

  if (modeSelect) modeSelect.style.display = "none";
  if (categorySelect) categorySelect.style.display = "none";
  if (quizArea) quizArea.style.display = "none";
  if (resultScreen) resultScreen.style.display = "none";

  if (mode === "category") {
    if (categorySelect) categorySelect.style.display = "block";
    renderCategorySelect();
    return;
  }

  prepareQuestions();
  startQuizFlow();
}

function startCategoryQuiz(category) {
  currentCategory = category;
  prepareQuestions();
  startQuizFlow();
}

function startQuizFlow() {
  const quizArea = document.getElementById("quizArea");
  const resultScreen = document.getElementById("resultScreen");

  quizCorrectCount = 0;
  currentIndex = 0;
  answeredResults = [];

  if (quizArea) quizArea.style.display = "block";
  if (resultScreen) resultScreen.style.display = "none";

  loadQuestion();
}

function prepareQuestions() {
  const examLevel = getLevel();
  const filtered = questions.filter(q => q.examLevel === examLevel);

  if (currentMode === "random") {
    currentQuestions = [...filtered].sort(() => Math.random() - 0.5);
  } else if (currentMode === "category") {
    currentQuestions = filtered.filter(q => q.category === currentCategory);
  } else if (currentMode === "mistake") {
    currentQuestions = getWrongQuestions().filter(q => q.examLevel === examLevel);
  } else if (currentMode === "test") {
    currentQuestions = [...filtered]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  } else {
    currentQuestions = [...filtered];
  }

  lastPlayedSet = [...currentQuestions];
}

function updateQuizHeader() {
  const countEl = document.getElementById("quizCount");
  const modeEl = document.getElementById("quizModeLabel");
  const categoryEl = document.getElementById("quizCategoryLabel");
  const progressEl = document.getElementById("quizProgressFill");

  if (countEl) countEl.textContent = `${currentIndex + 1} / ${currentQuestions.length}`;

  let modeText = "演習";
  if (currentMode === "category") modeText = "分野別";
  if (currentMode === "random") modeText = "ランダム";
  if (currentMode === "mistake") modeText = "間違い復習";
  if (currentMode === "test") modeText = "テスト";

  if (modeEl) modeEl.textContent = modeText;

  if (categoryEl) {
    if (currentMode === "category") {
      categoryEl.textContent = currentCategory;
    } else if (currentMode === "mistake") {
      categoryEl.textContent = "復習セット";
    } else {
      categoryEl.textContent = "全範囲";
    }
  }

  const progress = currentQuestions.length > 0
    ? Math.round((currentIndex / currentQuestions.length) * 100)
    : 0;

  if (progressEl) progressEl.style.width = `${progress}%`;
}

function loadQuestion() {
  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const resultEl = document.getElementById("result");

  if (!questionEl || !choicesEl) return;

  if (currentQuestions.length === 0) {
    questionEl.textContent = "問題がありません";
    choicesEl.innerHTML = "";
    if (resultEl) resultEl.textContent = "";
    return;
  }

  updateQuizHeader();

  const q = currentQuestions[currentIndex];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(index, btn);
    choicesEl.appendChild(btn);
  });

  if (resultEl) resultEl.textContent = "";
}

function checkAnswer(selectedIndex, clickedBtn) {
  const q = currentQuestions[currentIndex];
  const resultEl = document.getElementById("result");
  const buttons = document.querySelectorAll("#choices button");

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.answer) {
      btn.classList.add("correct");
    }
  });

  const selectedChoiceText = q.choices[selectedIndex] || "未回答";
  const correctChoiceText = q.choices[q.answer];
  const isCorrect = selectedIndex === q.answer;

  if (isCorrect) {
    quizCorrectCount++;
    saveCategoryProgress(q.id, q.category, true);

    if (resultEl) {
      resultEl.textContent = `正解！ ${q.explanation}`;
    }
    clickedBtn.classList.add("correct");
  } else {
    if (resultEl) {
      resultEl.textContent = `不正解… ${q.explanation}`;
    }
    clickedBtn.classList.add("wrong");

    const wrong = getWrongQuestions();
    wrong.push(q);
    saveWrongQuestions(wrong);
  }

  answeredResults.push({
    question: q.question,
    selectedChoice: selectedChoiceText,
    correctChoice: correctChoiceText,
    explanation: q.explanation,
    isCorrect: isCorrect,
    category: q.category
  });
}

function renderReviewList() {
  const reviewList = document.getElementById("reviewList");
  if (!reviewList) return;

  reviewList.innerHTML = "";

  answeredResults.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = `review-card ${item.isCorrect ? "correct-review" : "wrong-review"}`;

    card.innerHTML = `
      <div class="review-top">
        <div class="review-question">Q${index + 1}. ${item.question}</div>
        <div class="review-badge ${item.isCorrect ? "correct-badge" : "wrong-badge"}">
          ${item.isCorrect ? "正解" : "不正解"}
        </div>
      </div>

      <div class="review-answer-block">
        <div class="review-answer-row review-user-answer">
          <strong>あなたの回答</strong>
          <span>${item.selectedChoice}</span>
        </div>

        <div class="review-answer-row review-correct-answer">
          <strong>正解</strong>
          <span>${item.correctChoice}</span>
        </div>

        <div class="review-answer-row review-explanation">
          <strong>理由</strong>
          <span class="review-explanation-text">${item.explanation}</span>
        </div>
      </div>
    `;

    reviewList.appendChild(card);
  });
}

function showResultScreen() {
  const quizArea = document.getElementById("quizArea");
  const resultScreen = document.getElementById("resultScreen");

  if (quizArea) quizArea.style.display = "none";
  if (resultScreen) resultScreen.style.display = "block";

  const total = currentQuestions.length;
  const accuracy = total > 0 ? Math.round((quizCorrectCount / total) * 100) : 0;

  const resultAccuracy = document.getElementById("resultAccuracy");
  const correctCountText = document.getElementById("correctCountText");
  const resultCategoryText = document.getElementById("resultCategoryText");
  const resultAccuracyText = document.getElementById("resultAccuracyText");
  const resultSummaryText = document.getElementById("resultSummaryText");
  const resultProgressFill = document.getElementById("resultProgressFill");
  const scoreCircle = document.querySelector(".result-score-circle");

  if (resultAccuracy) resultAccuracy.textContent = `${accuracy}%`;
  if (correctCountText) correctCountText.textContent = `${quizCorrectCount} / ${total}`;

  if (resultCategoryText) {
    if (currentMode === "category") {
      resultCategoryText.textContent = currentCategory;
    } else if (currentMode === "mistake") {
      resultCategoryText.textContent = "間違い復習";
    } else if (currentMode === "test") {
      resultCategoryText.textContent = "テスト";
    } else {
      resultCategoryText.textContent = "ランダム";
    }
  }

  if (resultAccuracyText) resultAccuracyText.textContent = `${quizCorrectCount} / ${total}`;

  if (resultSummaryText) {
    resultSummaryText.textContent =
      accuracy >= 80 ? "かなり良いペースです" :
      accuracy >= 60 ? "この調子で復習すれば伸びます" :
      "復習モードで苦手を埋めるのがおすすめです";
  }

  if (resultProgressFill) resultProgressFill.style.width = `${accuracy}%`;
  if (scoreCircle) scoreCircle.style.setProperty("--score-angle", `${accuracy}%`);

  renderReviewList();

  if (currentMode === "category") {
    renderCategorySelect();
  }
}

function nextQuestion() {
  currentIndex++;

  if (currentIndex >= currentQuestions.length) {
    showResultScreen();
    return;
  }

  loadQuestion();
}

function retryCurrentSet() {
  currentQuestions = [...lastPlayedSet];
  currentIndex = 0;
  quizCorrectCount = 0;
  answeredResults = [];

  const resultScreen = document.getElementById("resultScreen");
  const quizArea = document.getElementById("quizArea");

  if (resultScreen) resultScreen.style.display = "none";
  if (quizArea) quizArea.style.display = "block";

  loadQuestion();
}

function backToMenu() {
  const modeSelect = document.getElementById("modeSelect");
  const categorySelect = document.getElementById("categorySelect");
  const quizArea = document.getElementById("quizArea");
  const resultScreen = document.getElementById("resultScreen");

  if (modeSelect) modeSelect.style.display = "grid";
  if (categorySelect) categorySelect.style.display = "none";
  if (quizArea) quizArea.style.display = "none";
  if (resultScreen) resultScreen.style.display = "none";
}

// =====================
// タスク（日付付き）
// =====================

let currentTaskDate = new Date().toISOString().split("T")[0];

function getTaskKey(date) {
  return `${getLevel()}_tasks_${date}`;
}

function changeTaskDate() {
  const input = document.getElementById("taskDate");
  if (!input) return;
  currentTaskDate = input.value;
  renderTasks();
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (!input || !input.value.trim()) return;

  let tasks = JSON.parse(localStorage.getItem(getTaskKey(currentTaskDate)) || "[]");

  tasks.push({
    text: input.value.trim(),
    done: false
  });

  localStorage.setItem(getTaskKey(currentTaskDate), JSON.stringify(tasks));

  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  let tasks = JSON.parse(localStorage.getItem(getTaskKey(currentTaskDate)) || "[]");

  tasks[index].done = !tasks[index].done;

  localStorage.setItem(getTaskKey(currentTaskDate), JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem(getTaskKey(currentTaskDate)) || "[]");

  tasks.splice(index, 1);

  localStorage.setItem(getTaskKey(currentTaskDate), JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const title = document.getElementById("taskTitle");
  const input = document.getElementById("taskDate");

  if (!list) return;

  if (input) input.value = currentTaskDate;
  if (title) title.textContent = `${currentTaskDate} のやること`;

  let tasks = JSON.parse(localStorage.getItem(getTaskKey(currentTaskDate)) || "[]");

  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = `
      <li class="empty-task-item">
        <div class="todo-left">
          <span>まだやることがありません</span>
        </div>
      </li>
    `;
    return;
  }

  tasks.forEach((task, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="todo-left">
        <input type="checkbox" ${task.done ? "checked" : ""}>
        <span class="${task.done ? "todo-done" : ""}">${task.text}</span>
      </div>
      <button class="todo-delete">削除</button>
    `;

    li.querySelector("input").onclick = () => toggleTask(i);
    li.querySelector(".todo-delete").onclick = () => deleteTask(i);

    list.appendChild(li);
  });
}

// =====================
// 初期化
// =====================

function initApp() {
  checkDateReset();
  checkWeekReset();
  syncLevelButtons();
  updateHome();
  updateCountdown();
  updateStreak();
  updateWeeklyGoalDisplay();
  renderTodos();
  renderTasks();

  if (document.getElementById("timer")) {
    updateTimerDisplay();
    if (!window.__timerDisplayInterval) {
      window.__timerDisplayInterval = setInterval(updateTimerDisplay, 1000);
    }
  }
}

window.onload = initApp;