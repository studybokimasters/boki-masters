const questions = [

  // ===== 基礎 =====
  {
    id: "boki3_basic_001",
    examLevel: "3級",
    category: "基礎",
    subcategory: "勘定科目分類",
    level: "easy",
    type: "choice",
    question: "借入金100,000円はどのグループか？",
    choices: ["資産", "負債", "純資産", "費用"],
    answer: 1,
    explanation: "借入金は将来返済する義務があるため負債に分類される。",
    tags: ["借入金", "負債"],
    status: "active"
  },
  {
    id: "boki3_basic_002",
    examLevel: "3級",
    category: "基礎",
    subcategory: "純資産",
    level: "easy",
    type: "choice",
    question: "資産800,000円、負債500,000円のとき純資産はいくらか？",
    choices: ["1,300,000円", "800,000円", "500,000円", "300,000円"],
    answer: 3,
    explanation: "純資産＝資産−負債。800,000−500,000＝300,000円。",
    tags: ["純資産"],
    status: "active"
  },
  {
    id: "boki3_basic_003",
    examLevel: "3級",
    category: "基礎",
    subcategory: "仕訳",
    level: "easy",
    type: "choice",
    question: "現金10,000円で消耗品を購入したときの仕訳は？",
    choices: [
      "消耗品費10,000 / 現金10,000",
      "現金10,000 / 消耗品費10,000",
      "消耗品費10,000 / 未払金10,000",
      "資産10,000 / 費用10,000"
    ],
    answer: 0,
    explanation: "消耗品費は費用なので借方、現金は減少するので貸方。",
    tags: ["仕訳"],
    status: "active"
  },

  // ===== 商品売買 =====
  {
    id: "boki3_trade_001",
    examLevel: "3級",
    category: "商品売買",
    subcategory: "売上",
    level: "normal",
    type: "choice",
    question: "商品5,000円を掛けで販売したときの仕訳は？",
    choices: [
      "売掛金5,000 / 売上5,000",
      "売上5,000 / 売掛金5,000",
      "現金5,000 / 売上5,000",
      "売掛金5,000 / 現金5,000"
    ],
    answer: 0,
    explanation: "掛け販売は後で代金を受け取るため、売掛金が増加する。",
    tags: ["売掛金"],
    status: "active"
  },
  {
    id: "boki3_trade_002",
    examLevel: "3級",
    category: "商品売買",
    subcategory: "仕入",
    level: "normal",
    type: "choice",
    question: "商品8,000円を掛けで仕入れたときの仕訳は？",
    choices: [
      "仕入8,000 / 買掛金8,000",
      "買掛金8,000 / 仕入8,000",
      "現金8,000 / 仕入8,000",
      "仕入8,000 / 現金8,000"
    ],
    answer: 0,
    explanation: "掛け仕入は後払いなので買掛金が増える。",
    tags: ["買掛金"],
    status: "active"
  },
  {
    id: "boki3_trade_003",
    examLevel: "3級",
    category: "商品売買",
    subcategory: "回収",
    level: "normal",
    type: "choice",
    question: "売掛金5,000円を現金で回収したときの仕訳は？",
    choices: [
      "現金5,000 / 売掛金5,000",
      "売掛金5,000 / 現金5,000",
      "売上5,000 / 現金5,000",
      "現金5,000 / 売上5,000"
    ],
    answer: 0,
    explanation: "売掛金が減少し、現金が増加する。",
    tags: ["回収"],
    status: "active"
  },
  {
    id: "boki3_trade_004",
    examLevel: "3級",
    category: "商品売買",
    subcategory: "支払",
    level: "normal",
    type: "choice",
    question: "買掛金4,000円を現金で支払ったときの仕訳は？",
    choices: [
      "買掛金4,000 / 現金4,000",
      "現金4,000 / 買掛金4,000",
      "仕入4,000 / 現金4,000",
      "現金4,000 / 仕入4,000"
    ],
    answer: 0,
    explanation: "買掛金が減少し、現金が減少する。",
    tags: ["支払"],
    status: "active"
  },

  // ===== 決算 =====
  {
    id: "boki3_closing_001",
    examLevel: "3級",
    category: "決算",
    subcategory: "売上原価",
    level: "hard",
    type: "choice",
    question: "売上原価は？（期首50,000＋仕入400,000−期末30,000）",
    choices: ["450,000", "420,000", "380,000", "480,000"],
    answer: 1,
    explanation: "期首＋仕入−期末＝50,000＋400,000−30,000＝420,000。",
    tags: ["売上原価"],
    status: "active"
  },
  {
    id: "boki3_closing_002",
    examLevel: "3級",
    category: "決算",
    subcategory: "減価償却",
    level: "hard",
    type: "choice",
    question: "減価償却の仕訳は？",
    choices: [
      "減価償却費 / 備品",
      "減価償却費 / 減価償却累計額",
      "備品 / 減価償却費",
      "累計額 / 費用"
    ],
    answer: 1,
    explanation: "間接法では累計額を使う。",
    tags: ["減価償却"],
    status: "active"
  },
  {
    id: "boki3_closing_003",
    examLevel: "3級",
    category: "決算",
    subcategory: "前払費用",
    level: "hard",
    type: "choice",
    question: "前払保険料の決算整理仕訳は？",
    choices: [
      "前払保険料 / 保険料",
      "保険料 / 前払保険料",
      "未払保険料 / 保険料",
      "保険料 / 未払保険料"
    ],
    answer: 0,
    explanation: "翌期分は資産に振り替える。",
    tags: ["前払費用"],
    status: "active"
  },
  // ===== 2級 基礎 =====
  {
    id: "boki2_basic_001",
    examLevel: "2級",
    category: "基礎",
    subcategory: "勘定科目分類",
    level: "easy",
    type: "choice",
    question: "貸倒引当金はどの性質をもつ勘定科目か？",
    choices: ["資産", "負債", "純資産", "評価勘定"],
    answer: 3,
    explanation: "貸倒引当金は売掛金や受取手形などの回収不能見込額を見積もるための評価勘定である。",
    tags: ["貸倒引当金", "評価勘定"],
    status: "active"
  },
  {
    id: "boki2_basic_002",
    examLevel: "2級",
    category: "基礎",
    subcategory: "収益認識",
    level: "easy",
    type: "choice",
    question: "商品を販売し、代金は月末に受け取る契約で引き渡しが完了した。このとき計上するのはどれか？",
    choices: ["前受金", "売掛金", "未払金", "仮払金"],
    answer: 1,
    explanation: "引渡しが完了していれば収益を認識し、まだ代金未回収なので売掛金を計上する。",
    tags: ["売掛金", "収益認識"],
    status: "active"
  },

  // ===== 2級 商品売買 =====
  {
    id: "boki2_trade_001",
    examLevel: "2級",
    category: "商品売買",
    subcategory: "返品",
    level: "normal",
    type: "choice",
    question: "掛けで仕入れた商品10,000円分を返品したときの仕訳は？",
    choices: [
      "買掛金10,000 / 仕入10,000",
      "仕入10,000 / 買掛金10,000",
      "現金10,000 / 仕入10,000",
      "買掛金10,000 / 現金10,000"
    ],
    answer: 0,
    explanation: "仕入を取り消すため仕入を減少させ、未払い分である買掛金も減少させる。",
    tags: ["返品", "買掛金", "仕入"],
    status: "active"
  },
  {
    id: "boki2_trade_002",
    examLevel: "2級",
    category: "商品売買",
    subcategory: "値引",
    level: "normal",
    type: "choice",
    question: "掛けで販売した商品について、得意先に2,000円の売上値引きを認めたときの仕訳は？",
    choices: [
      "売掛金2,000 / 売上2,000",
      "売上2,000 / 売掛金2,000",
      "現金2,000 / 売上2,000",
      "売上2,000 / 現金2,000"
    ],
    answer: 1,
    explanation: "売上値引きは売上の減少として処理し、同時に回収予定額である売掛金も減少する。",
    tags: ["売上値引", "売掛金"],
    status: "active"
  },

  // ===== 2級 固定資産 =====
  {
    id: "boki2_asset_001",
    examLevel: "2級",
    category: "固定資産",
    subcategory: "減価償却",
    level: "normal",
    type: "choice",
    question: "備品600,000円、残存価額0円、耐用年数5年を定額法で減価償却する。当期の減価償却費はいくらか？",
    choices: ["60,000円", "100,000円", "120,000円", "150,000円"],
    answer: 2,
    explanation: "定額法では取得原価を耐用年数で割る。600,000 ÷ 5 = 120,000円。",
    tags: ["固定資産", "減価償却", "定額法"],
    status: "active"
  },
  {
    id: "boki2_asset_002",
    examLevel: "2級",
    category: "固定資産",
    subcategory: "固定資産売却",
    level: "hard",
    type: "choice",
    question: "帳簿価額80,000円の備品を100,000円で現金売却した。このとき生じるものはどれか？",
    choices: ["固定資産売却損20,000円", "固定資産売却益20,000円", "雑益100,000円", "減価償却費20,000円"],
    answer: 1,
    explanation: "売却額100,000円が帳簿価額80,000円を上回るため、差額20,000円は固定資産売却益となる。",
    tags: ["固定資産売却益", "固定資産"],
    status: "active"
  },

  // ===== 2級 引当金・決算 =====
  {
    id: "boki2_closing_001",
    examLevel: "2級",
    category: "決算",
    subcategory: "貸倒引当金",
    level: "hard",
    type: "choice",
    question: "売掛金残高500,000円に対して2%の貸倒引当金を設定する。決算前の貸倒引当金残高が6,000円あるとき、追加計上額はいくらか？",
    choices: ["4,000円", "6,000円", "10,000円", "16,000円"],
    answer: 0,
    explanation: "必要額は500,000×2%=10,000円。すでに6,000円あるので追加は4,000円。",
    tags: ["貸倒引当金", "決算整理"],
    status: "active"
  },
  {
    id: "boki2_closing_002",
    examLevel: "2級",
    category: "決算",
    subcategory: "未収収益",
    level: "hard",
    type: "choice",
    question: "当期に属する受取利息3,000円が未受取である場合の決算整理仕訳は？",
    choices: [
      "受取利息3,000 / 未収収益3,000",
      "未収収益3,000 / 受取利息3,000",
      "現金3,000 / 受取利息3,000",
      "未払費用3,000 / 受取利息3,000"
    ],
    answer: 1,
    explanation: "当期の収益を計上するため資産である未収収益を借方、受取利息を貸方にする。",
    tags: ["未収収益", "受取利息"],
    status: "active"
  },

  // ===== 2級 財務諸表 =====
  {
    id: "boki2_fs_001",
    examLevel: "2級",
    category: "財務諸表",
    subcategory: "損益計算書",
    level: "normal",
    type: "choice",
    question: "売上総利益は何を表すか？",
    choices: [
      "売上高から営業外費用を差し引いた利益",
      "売上高から売上原価を差し引いた利益",
      "売上高から販売費及び一般管理費を差し引いた利益",
      "税引前当期純利益から法人税等を差し引いた利益"
    ],
    answer: 1,
    explanation: "売上総利益は売上高－売上原価で求める。商品の販売そのものから生じた利益を表す。",
    tags: ["損益計算書", "売上総利益"],
    status: "active"
  },
  {
    id: "boki2_fs_002",
    examLevel: "2級",
    category: "財務諸表",
    subcategory: "貸借対照表",
    level: "normal",
    type: "choice",
    question: "貸借対照表で流動資産に分類されるものはどれか？",
    choices: ["建物", "売掛金", "社債", "資本金"],
    answer: 1,
    explanation: "売掛金は通常1年以内に現金化されるため流動資産に分類される。",
    tags: ["貸借対照表", "流動資産"],
    status: "active"
  },
 // ===== 3級 商品売買（高品質10問） =====
{
  id: "boki3_trade_005",
  examLevel: "3級",
  category: "商品売買",
  subcategory: "仕入",
  level: "easy",
  type: "choice",
  question: "商品を現金3,000円で仕入れたときの仕訳は？",
  choices: [
    "仕入3,000 / 現金3,000",
    "現金3,000 / 仕入3,000",
    "商品3,000 / 現金3,000",
    "現金3,000 / 商品3,000"
  ],
  answer: 0,
  explanation: "商品を仕入れたときは、3級では「仕入」勘定を使う。現金で支払っているので現金は減少する。",
  status: "active"
},
{
  id: "boki3_trade_006",
  examLevel: "3級",
  category: "商品売買",
  subcategory: "売上",
  level: "easy",
  type: "choice",
  question: "商品を現金5,000円で販売したときの仕訳は？",
  choices: [
    "売上5,000 / 現金5,000",
    "現金5,000 / 売上5,000",
    "現金5,000 / 仕入5,000",
    "売掛金5,000 / 売上5,000"
  ],
  answer: 1,
  explanation: "商品を販売して現金を受け取ったので、現金が増える。販売による収益は「売上」で表す。",
  status: "active"
},
{
  id: "boki3_trade_007",
  examLevel: "3級",
  category: "商品売買",
  subcategory: "掛け仕入",
  level: "easy",
  type: "choice",
  question: "商品を掛けで8,000円仕入れたときの仕訳は？",
  choices: [
    "仕入8,000 / 買掛金8,000",
    "買掛金8,000 / 仕入8,000",
    "仕入8,000 / 売掛金8,000",
    "商品8,000 / 買掛金8,000"
  ],
  answer: 0,
  explanation: "掛けで仕入れるとは、代金を後で支払うということ。したがって負債である買掛金が増える。",
  status: "active"
},
{
  id: "boki3_trade_008",
  examLevel: "3級",
  category: "商品売買",
  subcategory: "掛け売上",
  level: "easy",
  type: "choice",
  question: "商品を掛けで10,000円販売したときの仕訳は？",
  choices: [
    "売上10,000 / 売掛金10,000",
    "売掛金10,000 / 売上10,000",
    "現金10,000 / 売上10,000",
    "売掛金10,000 / 現金10,000"
  ],
  answer: 1,
  explanation: "掛けで販売すると、代金を後で受け取る権利が生じる。この権利は売掛金で表す。",
  status: "active"
},
{
  id: "boki3_trade_009",
  examLevel: "3級",
  category: "商品売買",
  subcategory: "売掛金回収",
  level: "normal",
  type: "choice",
  question: "以前に掛けで販売した商品の代金6,000円を現金で受け取ったときの仕訳は？",
  choices: [
    "現金6,000 / 売上6,000",
    "売掛金6,000 / 現金6,000",
    "現金6,000 / 売掛金6,000",
    "買掛金6,000 / 現金6,000"
  ],
  answer: 2,
  explanation: "すでに売上は販売時に計上済み。今回は売掛金を回収しただけなので、現金増加と売掛金減少を記録する。",
  status: "active"
},
{
  id: "boki3_trade_010",
  examLevel: "3級",
  category: "商品売買",
  subcategory: "買掛金支払",
  level: "normal",
  type: "choice",
  question: "以前に掛けで仕入れた商品の代金4,000円を現金で支払ったときの仕訳は？",
  choices: [
    "買掛金4,000 / 現金4,000",
    "現金4,000 / 買掛金4,000",
    "仕入4,000 / 現金4,000",
    "買掛金4,000 / 仕入4,000"
  ],
  answer: 0,
  explanation: "すでに仕入は計上済み。今回は買掛金を支払っただけなので、負債の買掛金が減り、現金も減る。",
  status: "active"
},
{
  id: "boki3_trade_011",
  examLevel: "3級",
  category: "商品売買",
  subcategory: "返品",
  level: "normal",
  type: "choice",
  question: "掛けで仕入れた商品2,000円分を返品したときの仕訳は？",
  choices: [
    "買掛金2,000 / 仕入2,000",
    "仕入2,000 / 買掛金2,000",
    "現金2,000 / 仕入2,000",
    "買掛金2,000 / 現金2,000"
  ],
  answer: 0,
  explanation: "返品は、もとの仕入を取り消す処理。仕入を減らし、まだ未払いなら買掛金も減少する。",
  status: "active"
},
{
  id: "boki3_trade_012",
  examLevel: "3級",
  category: "商品売買",
  subcategory: "返品",
  level: "normal",
  type: "choice",
  question: "掛けで販売した商品3,000円分について返品を受けたときの仕訳は？",
  choices: [
    "売掛金3,000 / 売上3,000",
    "売上3,000 / 売掛金3,000",
    "現金3,000 / 売上3,000",
    "売上3,000 / 現金3,000"
  ],
  answer: 1,
  explanation: "返品は、もとの売上を取り消す処理。売上を減らし、まだ未回収なら売掛金も減少する。",
  status: "active"
},
{
  id: "boki3_trade_013",
  examLevel: "3級",
  category: "商品売買",
  subcategory: "値引き",
  level: "hard",
  type: "choice",
  question: "掛けで販売した商品について、得意先に1,000円の売上値引きを認めたときの仕訳は？",
  choices: [
    "売掛金1,000 / 売上1,000",
    "売上1,000 / 売掛金1,000",
    "現金1,000 / 売上1,000",
    "売上1,000 / 現金1,000"
  ],
  answer: 1,
  explanation: "売上値引きは売上の減少として処理する。掛け代金を減らすので売掛金も減少する。",
  status: "active"
},
{
  id: "boki3_trade_014",
  examLevel: "3級",
  category: "商品売買",
  subcategory: "送料",
  level: "hard",
  type: "choice",
  question: "商品を仕入れた際、引取運賃500円を現金で支払った。この運賃を仕入原価に含める場合の仕訳は？",
  choices: [
    "仕入500 / 現金500",
    "発送費500 / 現金500",
    "運送費500 / 現金500",
    "現金500 / 仕入500"
  ],
  answer: 0,
  explanation: "商品の購入に直接かかった引取運賃は、仕入に含めて処理する。したがって仕入が増加する。",
  status: "active"
},
// ===== 3級 決算（高品質10問） =====
{
  id: "boki3_closing_004",
  examLevel: "3級",
  category: "決算",
  subcategory: "消耗品",
  level: "easy",
  type: "choice",
  question: "期首の消耗品が2,000円、当期に追加購入した消耗品が5,000円、期末の未使用分が1,500円であった。決算で計上する消耗品費はいくらか？",
  choices: ["1,500円", "5,500円", "6,500円", "7,000円"],
  answer: 1,
  explanation: "当期に使った金額は、期首残高2,000円＋当期購入5,000円－期末残高1,500円＝5,500円。未使用分は費用にしない。",
  status: "active"
},
{
  id: "boki3_closing_005",
  examLevel: "3級",
  category: "決算",
  subcategory: "前払費用",
  level: "easy",
  type: "choice",
  question: "保険料12,000円を1年分前払いしていたが、決算日において翌期分3,000円が含まれていた。決算整理仕訳は？",
  choices: [
    "前払費用3,000 / 保険料3,000",
    "保険料3,000 / 前払費用3,000",
    "前払費用12,000 / 保険料12,000",
    "保険料12,000 / 前払費用12,000"
  ],
  answer: 0,
  explanation: "翌期分は当期の費用ではないため、資産である前払費用に振り替える。費用を減らすため貸方は保険料。",
  status: "active"
},
{
  id: "boki3_closing_006",
  examLevel: "3級",
  category: "決算",
  subcategory: "未払費用",
  level: "easy",
  type: "choice",
  question: "当期分の水道光熱費2,500円が未払いである場合の決算整理仕訳は？",
  choices: [
    "未払費用2,500 / 水道光熱費2,500",
    "水道光熱費2,500 / 未払費用2,500",
    "未収収益2,500 / 水道光熱費2,500",
    "水道光熱費2,500 / 前払費用2,500"
  ],
  answer: 1,
  explanation: "当期に発生した費用なので水道光熱費を計上する。まだ支払っていないため、負債である未払費用を貸方にする。",
  status: "active"
},
{
  id: "boki3_closing_007",
  examLevel: "3級",
  category: "決算",
  subcategory: "未収収益",
  level: "normal",
  type: "choice",
  question: "当期分の受取家賃4,000円が未受取である場合の決算整理仕訳は？",
  choices: [
    "受取家賃4,000 / 未収収益4,000",
    "未収収益4,000 / 受取家賃4,000",
    "現金4,000 / 受取家賃4,000",
    "受取家賃4,000 / 前受収益4,000"
  ],
  answer: 1,
  explanation: "当期に属する収益なので受取家賃を計上する。まだ受け取っていない分は資産の未収収益として処理する。",
  status: "active"
},
{
  id: "boki3_closing_008",
  examLevel: "3級",
  category: "決算",
  subcategory: "前受収益",
  level: "normal",
  type: "choice",
  question: "受取家賃12,000円を前受けしていたが、そのうち翌期分が5,000円含まれていた。決算整理仕訳は？",
  choices: [
    "受取家賃5,000 / 前受収益5,000",
    "前受収益5,000 / 受取家賃5,000",
    "前払費用5,000 / 受取家賃5,000",
    "受取家賃12,000 / 前受収益12,000"
  ],
  answer: 0,
  explanation: "翌期分は当期の収益ではないので、受取家賃を減らして負債の前受収益に振り替える。",
  status: "active"
},
{
  id: "boki3_closing_009",
  examLevel: "3級",
  category: "決算",
  subcategory: "減価償却",
  level: "normal",
  type: "choice",
  question: "備品120,000円、耐用年数4年、残存価額0円を定額法で減価償却する。当期の減価償却費はいくらか？",
  choices: ["20,000円", "25,000円", "30,000円", "40,000円"],
  answer: 2,
  explanation: "定額法では、取得原価を耐用年数で割る。120,000 ÷ 4 = 30,000円。",
  status: "active"
},
{
  id: "boki3_closing_010",
  examLevel: "3級",
  category: "決算",
  subcategory: "貸倒引当金",
  level: "hard",
  type: "choice",
  question: "売掛金残高100,000円に対して2%の貸倒れを見積もる。決算前の貸倒引当金残高が1,200円あるとき、追加計上額はいくらか？",
  choices: ["200円", "800円", "1,200円", "2,000円"],
  answer: 1,
  explanation: "必要額は100,000×2%=2,000円。すでに1,200円あるので、追加で必要なのは800円。",
  status: "active"
},
{
  id: "boki3_closing_011",
  examLevel: "3級",
  category: "決算",
  subcategory: "再振替仕訳",
  level: "hard",
  type: "choice",
  question: "未払費用を決算で計上した項目について、翌期首に行う再振替仕訳として正しいものはどれか？",
  choices: [
    "未払費用 / 費用",
    "費用 / 未払費用",
    "未収収益 / 収益",
    "収益 / 未収収益"
  ],
  answer: 0,
  explanation: "決算で『費用 / 未払費用』としたなら、翌期首にはそれを打ち消すため『未払費用 / 費用』とする。",
  status: "active"
},
{
  id: "boki3_closing_012",
  examLevel: "3級",
  category: "決算",
  subcategory: "損益振替",
  level: "normal",
  type: "choice",
  question: "収益と費用を損益勘定に振り替える目的として最も適切なものはどれか？",
  choices: [
    "資産の増減を記録するため",
    "負債の残高を確認するため",
    "当期の利益または損失を計算するため",
    "現金残高を確定するため"
  ],
  answer: 2,
  explanation: "収益と費用を損益勘定に集めることで、当期の利益または損失を求めることができる。",
  status: "active"
},
{
  id: "boki3_closing_013",
  examLevel: "3級",
  category: "決算",
  subcategory: "仕訳の意味",
  level: "hard",
  type: "choice",
  question: "『前払費用 / 支払保険料』という決算整理仕訳が意味する内容として正しいものはどれか？",
  choices: [
    "翌期分の保険料を当期の費用として追加計上した",
    "当期分の保険料を翌期へ繰り延べた",
    "保険料を未払いとして計上した",
    "保険料の入金を記録した"
  ],
  answer: 1,
  explanation: "支払保険料のうち翌期分は当期の費用ではないため、資産の前払費用に振り替えて翌期に回す。",
  status: "active"
},
// ===== 3級 基礎（高品質10問） =====
{
  id: "boki3_basic_004",
  examLevel: "3級",
  category: "基礎",
  subcategory: "勘定科目",
  level: "easy",
  type: "choice",
  question: "売掛金はどの分類に属するか？",
  choices: ["資産", "負債", "純資産", "費用"],
  answer: 0,
  explanation: "売掛金は将来お金を受け取る権利なので資産に分類される。",
  status: "active"
},
{
  id: "boki3_basic_005",
  examLevel: "3級",
  category: "基礎",
  subcategory: "勘定科目",
  level: "easy",
  type: "choice",
  question: "買掛金はどの分類に属するか？",
  choices: ["資産", "負債", "収益", "費用"],
  answer: 1,
  explanation: "買掛金は将来支払う義務なので負債に分類される。",
  status: "active"
},
{
  id: "boki3_basic_006",
  examLevel: "3級",
  category: "基礎",
  subcategory: "仕訳",
  level: "easy",
  type: "choice",
  question: "費用が発生したときはどちらに記入するか？",
  choices: ["借方", "貸方", "どちらでもよい", "記入しない"],
  answer: 0,
  explanation: "費用は増加すると借方に記入するというルールがある。",
  status: "active"
},
{
  id: "boki3_basic_007",
  examLevel: "3級",
  category: "基礎",
  subcategory: "仕訳",
  level: "easy",
  type: "choice",
  question: "収益が発生したときはどちらに記入するか？",
  choices: ["借方", "貸方", "どちらでもよい", "記入しない"],
  answer: 1,
  explanation: "収益は増加すると貸方に記入する。",
  status: "active"
},
{
  id: "boki3_basic_008",
  examLevel: "3級",
  category: "基礎",
  subcategory: "仕訳",
  level: "normal",
  type: "choice",
  question: "現金が増加した場合、どちらに記入するか？",
  choices: ["借方", "貸方", "どちらでもよい", "記入しない"],
  answer: 0,
  explanation: "現金は資産なので、増加したときは借方に記入する。",
  status: "active"
},
{
  id: "boki3_basic_009",
  examLevel: "3級",
  category: "基礎",
  subcategory: "仕訳",
  level: "normal",
  type: "choice",
  question: "資産が減少した場合の記入場所はどれか？",
  choices: ["借方", "貸方", "どちらでもよい", "収益として記録"],
  answer: 1,
  explanation: "資産は増加で借方、減少で貸方に記入する。",
  status: "active"
},
{
  id: "boki3_basic_010",
  examLevel: "3級",
  category: "基礎",
  subcategory: "5要素",
  level: "normal",
  type: "choice",
  question: "費用が増加した場合の処理として正しいものはどれか？",
  choices: [
    "貸方に記入する",
    "借方に記入する",
    "負債として記録する",
    "収益として記録する"
  ],
  answer: 1,
  explanation: "費用は増加すると借方に記入する。",
  status: "active"
},
{
  id: "boki3_basic_011",
  examLevel: "3級",
  category: "基礎",
  subcategory: "5要素",
  level: "normal",
  type: "choice",
  question: "収益が増加した場合の処理として正しいものはどれか？",
  choices: [
    "借方に記入する",
    "貸方に記入する",
    "資産として記録する",
    "費用として記録する"
  ],
  answer: 1,
  explanation: "収益は増加すると貸方に記入する。",
  status: "active"
},
{
  id: "boki3_basic_012",
  examLevel: "3級",
  category: "基礎",
  subcategory: "仕訳",
  level: "hard",
  type: "choice",
  question: "『現金10,000円を借り入れた』場合の仕訳として正しいものはどれか？",
  choices: [
    "現金10,000 / 借入金10,000",
    "借入金10,000 / 現金10,000",
    "現金10,000 / 売上10,000",
    "費用10,000 / 現金10,000"
  ],
  answer: 0,
  explanation: "現金（資産）が増え、借入金（負債）も増えるためこの仕訳になる。",
  status: "active"
},
{
  id: "boki3_basic_013",
  examLevel: "3級",
  category: "基礎",
  subcategory: "仕訳理解",
  level: "hard",
  type: "choice",
  question: "『借方と貸方の合計は必ず一致する』理由として最も適切なものはどれか？",
  choices: [
    "偶然一致するから",
    "記帳ルールだから",
    "複式簿記では必ず2つ以上の勘定を同時に動かすから",
    "税務上の決まりだから"
  ],
  answer: 2,
  explanation: "複式簿記では、1つの取引を必ず複数の勘定で表すため、借方と貸方の金額は必ず一致する。",
  status: "active"
}
];