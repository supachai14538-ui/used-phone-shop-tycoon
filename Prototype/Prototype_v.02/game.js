/* =========================================================================
   DATA LAYER (data-driven configuration — no gameplay values hardcoded
   inside logic functions; everything reads from these tables)
   ========================================================================= */

const PHONE_MODELS = [
  {brand:"iPear",   model:"iPear 8",      base:4500,  tier:1},
  {brand:"iPear",   model:"iPear 11",     base:9500,  tier:2},
  {brand:"iPear",   model:"iPear 13",     base:16000, tier:3},
  {brand:"iPear",   model:"iPear 15",     base:24000, tier:4},
  {brand:"Sansung", model:"Sansung A32",  base:3800,  tier:1},
  {brand:"Sansung", model:"Sansung S21",  base:11500, tier:2},
  {brand:"Sansung", model:"Sansung S23 Ultra", base:19500, tier:3},
  {brand:"Oddo",    model:"Oddo Reno 6",  base:5200,  tier:1},
  {brand:"Vovi",    model:"Vovi V23",     base:6300,  tier:1},
  {brand:"Kiaoni",  model:"Kiaoni 12",    base:8200,  tier:2},
  {brand:"Kiaoni",  model:"Kiaoni 14 Pro",base:14500, tier:3},
  {brand:"Buanei",  model:"Buanei Nova 3",base:7200,  tier:1},
];

// Personalities per CHARACTER_BIBLE / NEGOTIATION_SYSTEM
const PERSONALITIES = [
  {id:'friendly',   name:'ใจดี',      patience:4, flexibility:0.55, trustBonus:10, budgetMult:1.00, icon:'😊'},
  {id:'neutral',    name:'เฉยๆ',      patience:3, flexibility:0.40, trustBonus:0,  budgetMult:1.00, icon:'😐'},
  {id:'aggressive', name:'ดุดัน',     patience:2, flexibility:0.20, trustBonus:-10,budgetMult:0.90, icon:'😠'},
  {id:'patient',    name:'ใจเย็น',    patience:5, flexibility:0.60, trustBonus:5,  budgetMult:1.00, icon:'🙂'},
  {id:'impatient',  name:'ใจร้อน',    patience:2, flexibility:0.30, trustBonus:-5, budgetMult:0.95, icon:'😤'},
  {id:'greedy',     name:'ขี้เหนียว', patience:3, flexibility:0.22, trustBonus:-5, budgetMult:0.85, icon:'🤨'},
  {id:'easygoing',  name:'สบายๆ',     patience:4, flexibility:0.55, trustBonus:5,  budgetMult:1.05, icon:'😌'},
  {id:'expert',     name:'มืออาชีพ',  patience:3, flexibility:0.35, trustBonus:0,  budgetMult:1.10, icon:'🧐'},
];

const OCCUPATIONS = ["นักศึกษา","พนักงานออฟฟิศ","ครู","เกษตรกร","เจ้าของกิจการ","ข้าราชการ","ฟรีแลนซ์","ไรเดอร์","ช่างซ่อม","เกษียณอายุ"];
const CUSTOMER_FACES_SELL = ["🙍","🧔","👩","🧑‍🦱","👨‍🦳","👩‍🦰"];
const CUSTOMER_FACES_BUY  = ["🧑","👩‍💼","👨‍💼","🧕","👴","👵"];
const NAMES = ["คุณสมชาย","คุณมาลี","น้องเอิร์ธ","พี่ต้อม","คุณยายสมศรี","คุณเบนซ์","น้องมิ้นท์","ลุงประเสริฐ","พี่แนน","คุณวิชัย","น้องพลอย","คุณอารีย์"];

// Repair catalogue per REPAIR_SYSTEM / DEVICE_BIBLE (visual damage states)
const REPAIR_TYPES = [
  {id:'clean',          label:'ทำความสะอาดเครื่อง', defectKey:'dirty',            costPct:0.010, conditionGain:3,  hidden:false},
  {id:'battery',        label:'เปลี่ยนแบตเตอรี่',    defectKey:'batteryWeak',      costPct:0.050, conditionGain:9,  hidden:true},
  {id:'screen',         label:'เปลี่ยนหน้าจอ',       defectKey:'screenCracked',    costPct:0.080, conditionGain:16, hidden:false},
  {id:'camera',         label:'เปลี่ยนกล้อง',        defectKey:'cameraScratched',  costPct:0.040, conditionGain:6,  hidden:true},
  {id:'backCover',      label:'เปลี่ยนฝาหลัง',       defectKey:'backCoverDamaged', costPct:0.030, conditionGain:6,  hidden:false},
  {id:'motherboard',    label:'ซ่อมเมนบอร์ด',        defectKey:'motherboardIssue', costPct:0.130, conditionGain:22, hidden:true},
  {id:'chargingPort',   label:'ซ่อมพอร์ตชาร์จ',      defectKey:'chargingPortIssue',costPct:0.035, conditionGain:6,  hidden:true},
];

// Upgrade catalogue per FURNITURE_BIBLE functional bonuses
const UPGRADE_DEFS = {
  size: {
    label:'ขยายพื้นที่ร้าน', desc:'เพิ่มความจุสต็อกมือถือ',
    maxLevel:5, baseCost:1500, costGrowth:1.7,
    effectText:(lvl)=> `ความจุสต็อก +${lvl*3} เครื่อง`,
  },
  repairDesk: {
    label:'โต๊ะซ่อมมืออาชีพ', desc:'ลดต้นทุนค่าซ่อมทุกประเภท',
    maxLevel:5, baseCost:1200, costGrowth:1.65,
    effectText:(lvl)=> `ค่าซ่อมลดลง ${lvl*6}%`,
  },
  storage: {
    label:'ชั้นวางสต็อกเพิ่มเติม', desc:'เพิ่มความจุสต็อกมือถือเพิ่มเติมจากขนาดร้าน',
    maxLevel:5, baseCost:900, costGrowth:1.6,
    effectText:(lvl)=> `ความจุสต็อก +${lvl*2} เครื่อง`,
  },
  decoration: {
    label:'ตกแต่งร้าน', desc:'เพิ่ม Trust ลูกค้า',
    maxLevel:5, baseCost:800, costGrowth:1.55,
    effectText:(lvl)=> `Trust ลูกค้า +${lvl*2}, ค่าไฟ +${lvl*15}บ./วัน`,
  },
};

// Random Event System — expandable table. Each event: id, name, desc, weight,
// condition(state)=>bool (eligibility), effect(state)=>string (log message)
const EVENT_DEFS = [
  {
    id:'supplier_discount', name:'ซัพพลายเออร์ลดราคา', icon:'📦', weight:10,
    condition:(s)=>true,
    effect:(s)=>{ s.todayMods.buyDiscount = 0.10; return 'วันนี้ซัพพลายเออร์ลดราคา — ประเมินมูลค่ารับซื้อได้ถูกลง 10%'; }
  },
  {
    id:'phone_shortage', name:'มือถือขาดตลาด', icon:'📉', weight:8,
    condition:(s)=>true,
    effect:(s)=>{ s.todayMods.sellInChance = -0.15; return 'มือถือขาดตลาด — ลูกค้าที่จะมาขายเครื่องมีน้อยลงวันนี้'; }
  },
  {
    id:'economic_crisis', name:'เศรษฐกิจฝืดเคือง', icon:'📉', weight:6,
    condition:(s)=>true,
    effect:(s)=>{ s.todayMods.buyerBudget = -0.15; return 'เศรษฐกิจฝืดเคือง — งบประมาณของลูกค้าที่จะซื้อลดลงวันนี้'; }
  },
  {
    id:'holiday_promo', name:'เทศกาลโปรโมชั่น', icon:'🎉', weight:8,
    condition:(s)=>true,
    effect:(s)=>{ s.todayMods.buyerBudget = 0.15; return 'เทศกาลโปรโมชั่น — ลูกค้าพร้อมจ่ายมากขึ้นวันนี้'; }
  },
  {
    id:'police_inspection', name:'ตำรวจตรวจร้าน', icon:'🚓', weight:4,
    condition:(s)=> s.reputation < 40,
    effect:(s)=>{ const fine = Math.round(300 + Math.random()*400); s.todayExpenses += fine; return `ตำรวจเข้าตรวจร้าน (ชื่อเสียงต่ำ) — โดนปรับ ${fine.toLocaleString()} บาท`; }
  },
  {
    id:'customer_complaint', name:'ลูกค้าร้องเรียน', icon:'😡', weight:5,
    condition:(s)=> s.reputation < 55,
    effect:(s)=>{ s.reputation = Math.max(0, s.reputation - 3); return 'มีลูกค้าร้องเรียนคุณภาพร้าน — ชื่อเสียงลดลง 3'; }
  },
  {
    id:'good_review', name:'รีวิวดีบนโซเชียล', icon:'⭐', weight:7,
    condition:(s)=> s.reputation >= 55,
    effect:(s)=>{ s.reputation = Math.min(100, s.reputation + 4); return 'มีคนรีวิวร้านในแง่ดี — ชื่อเสียงเพิ่มขึ้น 4'; }
  },
  {
    id:'bad_review', name:'รีวิวแย่บนโซเชียล', icon:'💢', weight:4,
    condition:(s)=> s.reputation < 45,
    effect:(s)=>{ s.reputation = Math.max(0, s.reputation - 4); return 'มีคนรีวิวร้านในแง่ลบ — ชื่อเสียงลดลง 4'; }
  },
  {
    id:'battery_recall', name:'แบตเตอรี่เสื่อมจากการเก็บ', icon:'🔋', weight:5,
    condition:(s)=> s.inventory.some(p=>p.status==='stock' && !p.defects.batteryWeak),
    effect:(s)=>{
      const cands = s.inventory.filter(p=>p.status==='stock' && !p.defects.batteryWeak);
      const item = cands[Math.floor(Math.random()*cands.length)];
      item.defects.batteryWeak = true;
      item.condition = Math.max(10, item.condition - 8);
      return `แบตเตอรี่ของเครื่อง ${item.brand} ${item.model} ในสต็อกเสื่อมสภาพ — ต้องซ่อมใหม่`;
    }
  },
  {
    id:'tax_audit', name:'ตรวจสอบภาษีย้อนหลัง', icon:'🧾', weight:3,
    condition:(s)=> s.day > 3,
    effect:(s)=>{ const extra = Math.round(200 + Math.random()*300); s.todayExpenses += extra; return `สรรพากรตรวจสอบภาษีย้อนหลัง — เสียค่าปรับเพิ่ม ${extra.toLocaleString()} บาท`; }
  },
];

/* =========================================================================
   STATE
   ========================================================================= */

const SAVE_KEY = 'usedPhoneShopTycoon_save_v1';
const SAVE_VERSION = 1;

function createDefaultState(){
  return {
    saveVersion: SAVE_VERSION,
    cash: 2000,
    day: 1,
    reputation: 50,
    dayRevenue: 0,
    dayExpenses: 0,
    dayProfit: 0,
    todayExpenses: 0, // accumulator for one-off event expenses within the day
    inventory: [],      // phone objects
    nextId: 1,
    customer: null,      // current customer object
    upgrades: { size:0, repairDesk:0, storage:0, decoration:0 },
    employees: [],       // {id, name, salary}
    nextEmployeeId: 1,
    history: [],         // array of daily report objects
    eventLog: [],         // array of {day, text, icon}
    todayMods: {},         // active modifiers rolled for the current day
    stats: {
      totalPurchased:0, totalSold:0, totalRepairs:0,
      totalRevenue:0, totalExpensesLifetime:0, lifetimeProfit:0,
      negotiationSuccess:0, negotiationFail:0, customersLeft:0,
    },
    activeTab: 'shop',
  };
}

let state = createDefaultState();

// ---------- UTILITIES ----------
function rand(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function money(n){ return Math.round(n).toLocaleString('en-US'); }
function clamp(n,min,max){ return Math.max(min, Math.min(max, n)); }
function weightedPick(list, weightFn){
  const total = list.reduce((sum,item)=>sum+weightFn(item),0);
  let r = Math.random()*total;
  for(const item of list){
    r -= weightFn(item);
    if(r<=0) return item;
  }
  return list[list.length-1];
}

function getInventoryCapacity(){
  return 8 + (state.upgrades.size*3) + (state.upgrades.storage*2);
}
function getRepairCostMultiplier(){
  return 1 - Math.min(0.30, state.upgrades.repairDesk*0.06) - Math.min(0.15, state.employees.length*0.03);
}
function getReputationLevel(rep){
  if(rep < 20) return {label:'แย่มาก', id:'very_poor'};
  if(rep < 40) return {label:'แย่', id:'poor'};
  if(rep < 60) return {label:'ปานกลาง', id:'average'};
  if(rep < 80) return {label:'น่าเชื่อถือ', id:'trusted'};
  return {label:'ยอดเยี่ยม', id:'excellent'};
}
function getDailyRent(){
  return 100 + state.upgrades.size*60;
}
function getDailyElectricity(){
  return 30 + state.upgrades.decoration*15 + state.employees.length*5;
}
function getDailySalary(){
  return state.employees.reduce((sum,e)=>sum+e.salary,0);
}

// ---------- SAVE SYSTEM ----------
function saveGame(showToast){
  try{
    const payload = JSON.stringify(state);
    localStorage.setItem(SAVE_KEY, payload);
    if(showToast) showDayToast('💾 บันทึกเกมเรียบร้อย');
    return true;
  }catch(e){
    console.error('Save failed', e);
    if(showToast) showDayToast('⚠️ บันทึกเกมไม่สำเร็จ');
    return false;
  }
}
function hasSaveGame(){
  return !!localStorage.getItem(SAVE_KEY);
}
function loadGame(showToast){
  try{
    const raw = localStorage.getItem(SAVE_KEY);
    if(!raw) return false;
    const loaded = JSON.parse(raw);
    if(!loaded || typeof loaded !== 'object'){ return false; }
    // Version-safe merge: fill any missing fields from default state so
    // older saves keep working after new fields are added.
    const merged = Object.assign(createDefaultState(), loaded);
    merged.upgrades = Object.assign({size:0,repairDesk:0,storage:0,decoration:0}, loaded.upgrades||{});
    merged.stats = Object.assign(createDefaultState().stats, loaded.stats||{});
    merged.inventory = Array.isArray(loaded.inventory) ? loaded.inventory : [];
    merged.employees = Array.isArray(loaded.employees) ? loaded.employees : [];
    merged.history = Array.isArray(loaded.history) ? loaded.history : [];
    merged.eventLog = Array.isArray(loaded.eventLog) ? loaded.eventLog : [];
    merged.customer = null; // never resume mid-negotiation across a load
    state = merged;
    if(showToast) showDayToast('📂 โหลดเกมเรียบร้อย');
    return true;
  }catch(e){
    console.error('Load failed', e);
    if(showToast) showDayToast('⚠️ ไฟล์เซฟเสียหาย — ไม่สามารถโหลดได้');
    return false;
  }
}
function resetGame(){
  localStorage.removeItem(SAVE_KEY);
  state = createDefaultState();
  closeModal();
  setTab('shop');
  render();
  showDayToast('🔄 เริ่มเกมใหม่แล้ว');
}

/* =========================================================================
   PHONE / DEFECT GENERATION (Device Bible: visible vs hidden defects)
   ========================================================================= */

function generateIncomingPhone(model){
  const condition = rand(30, 95);
  const defects = {
    dirty: true, // always needs at least a clean
    screenCracked: condition < 75 && Math.random() < 0.35,
    backCoverDamaged: condition < 80 && Math.random() < 0.30,
    batteryWeak: condition < 65 && Math.random() < 0.45,      // hidden
    cameraScratched: condition < 70 && Math.random() < 0.25,   // hidden
    chargingPortIssue: condition < 55 && Math.random() < 0.20, // hidden
    motherboardIssue: condition < 40 && Math.random() < 0.15,  // hidden
  };
  return {
    id: null, // assigned at purchase
    brand: model.brand,
    model: model.model,
    base: model.base,
    condition,
    defects,
    defectsRevealed: false, // hidden defects revealed after purchase
    buyPrice: 0,
    purchaseDate: null,
    status: 'stock', // stock | listed | sold
    sellPrice: null,
    soldDate: null,
  };
}

function visibleDefectSummary(phone){
  // What an inspecting player can see BEFORE buying
  const list = [];
  if(phone.defects.screenCracked) list.push('จอแตก');
  if(phone.defects.backCoverDamaged) list.push('ฝาหลังเสียหาย');
  if(phone.defects.dirty) list.push('เครื่องสกปรก');
  return list;
}
function hiddenDefectSummary(phone){
  const list = [];
  if(phone.defects.batteryWeak) list.push('แบตเตอรี่เสื่อม');
  if(phone.defects.cameraScratched) list.push('กล้องเป็นรอย');
  if(phone.defects.chargingPortIssue) list.push('พอร์ตชาร์จมีปัญหา');
  if(phone.defects.motherboardIssue) list.push('เมนบอร์ดมีปัญหา');
  return list;
}
function allDefectSummary(phone){
  return [...visibleDefectSummary(phone), ...(phone.defectsRevealed?hiddenDefectSummary(phone):[])];
}
function remainingDefectCount(phone){
  return Object.values(phone.defects).filter(Boolean).length;
}
function isFullyRepaired(phone){
  return remainingDefectCount(phone) === 0;
}
// "Customer confidence" — how convinced a buyer is about quality; used by Sales negotiation.
function computeConfidence(phone){
  const defectPenalty = remainingDefectCount(phone) * 8;
  return clamp(phone.condition - defectPenalty, 5, 100);
}

/* =========================================================================
   CUSTOMER SYSTEM
   ========================================================================= */

function rollPersonality(){ return pick(PERSONALITIES); }

function computeTrust(personality){
  const repFactor = (state.reputation - 50) * 0.3;
  const decorationBonus = state.upgrades.decoration * 2;
  return clamp(50 + personality.trustBonus + repFactor + decorationBonus, 0, 100);
}

function spawnCustomer(mode){
  if(mode === 'buy' && !state.inventory.some(p=>p.status==='listed')){
    showDayToast('⚠️ ต้องมีเครื่องที่ตั้งขายในสต็อกก่อน ลูกค้าถึงจะมาซื้อได้');
    return;
  }
  if(mode === 'sell' && state.inventory.length >= getInventoryCapacity()){
    showDayToast('⚠️ สต็อกเต็มแล้ว! ต้องขายเครื่องออกหรืออัปเกรดพื้นที่ร้านก่อนรับซื้อเพิ่ม');
    return;
  }
  if(mode === 'sell'){
    const sellInChance = clamp(1 + (state.todayMods.sellInChance || 0), 0, 1);
    if(Math.random() > sellInChance){
      showDayToast('📉 วันนี้ลูกค้าที่จะนำเครื่องมาขายมีน้อย — ลองกดใหม่อีกครั้ง');
      return;
    }
    const model = pick(PHONE_MODELS);
    const phone = generateIncomingPhone(model);
    const personality = rollPersonality();
    const trust = computeTrust(personality);
    const discountMod = 1 - (state.todayMods.buyDiscount || 0);
    const trueValue = Math.round(model.base * (phone.condition/100) * 0.55 * discountMod);
    const greedFactor = personality.id==='greedy' ? 0.10 : (personality.id==='expert'? 0.05 : 0.20);
    const askPrice = Math.round(trueValue * (1 + rand(10,45)/100 * (1+greedFactor)));
    state.customer = {
      mode:'sell',
      name: pick(NAMES),
      occupation: pick(OCCUPATIONS),
      face: pick(CUSTOMER_FACES_SELL),
      personality,
      trust,
      mood:'neutral',
      phone,
      askPrice,
      trueValue,
      patience: personality.patience,
      maxPatience: personality.patience,
      minAccept: Math.round(trueValue * (1.02 + (1-personality.flexibility)*0.15)),
      rounds:0,
    };
  } else {
    const listed = state.inventory.filter(p=>p.status==='listed');
    const item = pick(listed);
    const personality = rollPersonality();
    const trust = computeTrust(personality);
    const confidence = computeConfidence(item);
    const budgetMod = 1 + (state.todayMods.buyerBudget || 0);
    const marketVal = Math.round(item.base * (confidence/100) * 0.95);
    const willingMax = Math.round(marketVal * personality.budgetMult * budgetMod * (1 + (trust-50)/400));
    state.customer = {
      mode:'buy',
      name: pick(NAMES),
      occupation: pick(OCCUPATIONS),
      face: pick(CUSTOMER_FACES_BUY),
      personality,
      trust,
      mood:'neutral',
      phone: item,
      marketVal,
      willingMax,
      patience: personality.patience,
      maxPatience: personality.patience,
      rounds:0,
    };
  }
  render();
}

function moodForRatio(ratio){
  // ratio: how close player's offer/price is to what the customer wants (1 = perfect)
  if(ratio >= 0.97) return 'happy';
  if(ratio >= 0.85) return 'neutral';
  if(ratio >= 0.70) return 'thinking';
  if(ratio >= 0.55) return 'disappointed';
  return 'angry';
}
const MOOD_ICON = {happy:'😄', neutral:'😐', thinking:'🤔', disappointed:'😞', angry:'😡'};
const MOOD_LABEL = {happy:'พอใจ', neutral:'เฉยๆ', thinking:'กำลังคิด', disappointed:'ผิดหวัง', angry:'โมโห'};

/* =========================================================================
   NEGOTIATION SYSTEM — Purchase (sell-in) side
   ========================================================================= */

function makeOffer(){
  const c = state.customer;
  if(!c || c.mode!=='sell' || c.leaving) return;
  const input = document.getElementById('offerInput');
  const offer = Number(input.value);
  if(!offer || offer<=0){ showDayToast('กรุณาใส่ราคาที่ต้องการเสนอ'); return; }

  c.rounds += 1;
  c.patience -= 1;

  if(offer >= c.minAccept){
    logHaggle(`${c.name} ${c.personality.icon} ตกลง! "โอเคค่ะ/ครับ ราคานี้โอเค"`);
    finalizeBuy(offer);
    return;
  }
  const ratio = offer / c.minAccept;
  c.mood = moodForRatio(ratio);

  if(offer < c.trueValue * 0.45){
    logHaggle(`${c.name} ทำหน้าเบ้ "ราคานี้ต่ำไปนะ" — ลูกค้าเดินออกจากร้าน`);
    state.stats.negotiationFail++;
    state.reputation = clamp(state.reputation - 1, 0, 100);
    c.leaving = true;
    setTimeout(()=>{ state.customer=null; render(); }, 1300);
    return;
  }
  if(c.patience <= 0){
    logHaggle(`${c.name} "งั้นไม่ขายดีกว่าค่ะ/ครับ" — ลูกค้าเดินออกจากร้าน`);
    state.stats.negotiationFail++;
    state.stats.customersLeft++;
    c.leaving = true;
    setTimeout(()=>{ state.customer=null; render(); }, 1300);
    return;
  }
  // counter-offer: minAccept moves toward the player's offer, scaled by personality flexibility
  c.minAccept = Math.round(c.minAccept - (c.minAccept - offer) * c.personality.flexibility);
  logHaggle(`${c.name} ${MOOD_ICON[c.mood]} ต่อรอง: "ขอสัก ${money(c.minAccept)} บาทได้ไหม?" (เหลือ ${c.patience} ครั้ง)`);
  render();
}

function finalizeBuy(price){
  const c = state.customer;
  if(price > state.cash){
    logHaggle('เงินสดไม่พอสำหรับราคานี้ — ไม่สามารถปิดการซื้อได้');
    return;
  }
  state.cash -= price;
  const item = c.phone;
  item.id = state.nextId++;
  item.buyPrice = price;
  item.purchaseDate = state.day;
  item.status = 'stock';
  item.defectsRevealed = true; // hidden defects revealed once owned
  state.inventory.push(item);
  state.dayRevenue += 0; // buying isn't revenue
  state.stats.totalPurchased++;
  state.stats.negotiationSuccess++;
  // honest-buy reputation bump if paid reasonably close to true value (not an aggressive lowball)
  const repGain = price >= c.trueValue*0.9 ? 2 : 1;
  state.reputation = clamp(state.reputation + repGain, 0, 100);
  state.customer = null;
  setTimeout(()=>{
    const hidden = hiddenDefectSummary(item);
    showReceipt({
      title:'ใบรับซื้อเครื่อง',
      rows:[
        ['รุ่นเครื่อง', item.brand+' '+item.model],
        ['สภาพตอนซื้อ', item.condition+'%'],
        ['ราคารับซื้อ', '-'+money(price)+' บ.'],
        ['ปัญหาที่ตรวจพบเพิ่ม', hidden.length? hidden.join(', ') : 'ไม่มี'],
      ],
      totalLabel:'เงินสดคงเหลือ',
      totalVal: money(state.cash)+' บ.',
    });
    render();
    saveGame(false); // auto-save after successful purchase
  }, 250);
}

/* =========================================================================
   NEGOTIATION SYSTEM — Sales (sell-out) side
   ========================================================================= */

function makeSellOffer(){
  const c = state.customer;
  if(!c || c.mode!=='buy' || c.leaving) return;
  const input = document.getElementById('offerInput');
  const price = Number(input.value);
  if(!price || price<=0){ showDayToast('กรุณาใส่ราคาที่ต้องการตั้งขาย'); return; }

  c.rounds += 1;
  c.patience -= 1;

  if(price <= c.willingMax){
    logHaggle(`${c.name} ${c.personality.icon} "ตกลงครับ/ค่ะ เอาเลย!"`);
    finalizeSell(price);
    return;
  }
  const ratio = c.willingMax / price;
  c.mood = moodForRatio(ratio);

  if(price > c.willingMax * 1.4 || c.patience <= 0){
    logHaggle(`${c.name} "แพงไปครับ/ค่ะ ขอคิดดูก่อน" — ลูกค้าเดินออกจากร้าน`);
    state.stats.negotiationFail++;
    state.stats.customersLeft++;
    c.leaving = true;
    setTimeout(()=>{ state.customer=null; render(); }, 1300);
    return;
  }
  c.willingMax = Math.round(c.willingMax + (price - c.willingMax) * c.personality.flexibility);
  logHaggle(`${c.name} ${MOOD_ICON[c.mood]} ต่อรอง: "ลดให้หน่อยได้ไหม สัก ${money(c.willingMax)} บาท?" (เหลือ ${c.patience} ครั้ง)`);
  render();
}

function finalizeSell(price){
  const c = state.customer;
  const item = c.phone;
  const repairSpent = item.repairSpent || 0;
  const profit = price - item.buyPrice - repairSpent;
  state.cash += price;
  state.dayRevenue += price;
  state.dayProfit += profit;
  item.status = 'sold';
  item.sellPrice = price;
  item.soldDate = state.day;
  state.inventory = state.inventory.filter(p=>p.id!==item.id);
  state.stats.totalSold++;
  state.stats.totalRevenue += price;
  state.stats.negotiationSuccess++;
  state.stats.lifetimeProfit += profit;

  // Reputation: honest pricing vs overpriced ("scam") per REPUTATION_SYSTEM
  const marketRatio = price / c.marketVal;
  let repChange = 0;
  let scamFlag = false;
  if(marketRatio <= 1.15){ repChange = 3; }
  else if(marketRatio <= 1.4){ repChange = 1; }
  else { repChange = -3; scamFlag = true; }
  state.reputation = clamp(state.reputation + repChange, 0, 100);

  state.customer = null;
  setTimeout(()=>{
    showReceipt({
      title:'ใบเสร็จการขาย',
      rows:[
        ['รุ่นเครื่อง', item.brand+' '+item.model],
        ['ราคารับซื้อเดิม', '-'+money(item.buyPrice)+' บ.'],
        ['ค่าซ่อมสะสม', '-'+money(repairSpent)+' บ.'],
        ['ราคาขายออก', '+'+money(price)+' บ.'],
        ...(scamFlag? [['หมายเหตุ','ราคาสูงเกินตลาดมาก — ลูกค้ารู้สึกถูกโก่งราคา']] : []),
      ],
      totalLabel: profit>=0 ? 'กำไรจากรายการนี้' : 'ขาดทุนจากรายการนี้',
      totalVal: (profit>=0?'+':'') + money(profit) + ' บ.',
      good: profit>=0,
    });
    render();
    saveGame(false); // auto-save after successful sale
  }, 250);
}

function rejectCustomer(){
  state.customer = null;
  state.reputation = clamp(state.reputation - 1, 0, 100);
  state.stats.customersLeft++;
  render();
}

function logHaggle(text){
  const log = document.getElementById('haggleLog');
  if(log) log.textContent = text;
}

/* =========================================================================
   REPAIR SYSTEM
   ========================================================================= */

function repairItem(id, repairId){
  const item = state.inventory.find(p=>p.id===id);
  const type = REPAIR_TYPES.find(r=>r.id===repairId);
  if(!item || !type) return;
  if(!item.defects[type.defectKey]){ return; } // nothing to repair for this slot
  const mult = getRepairCostMultiplier();
  const cost = Math.round(item.base * type.costPct * mult);
  if(state.cash < cost){ showDayToast('เงินสดไม่พอสำหรับค่าซ่อมนี้'); return; }
  state.cash -= cost;
  state.dayExpenses += cost;
  state.dayProfit -= cost;
  item.repairSpent = (item.repairSpent||0) + cost;
  item.defects[type.defectKey] = false;
  item.condition = clamp(item.condition + type.conditionGain, 0, 99);
  state.stats.totalRepairs++;
  state.reputation = clamp(state.reputation + 0.5, 0, 100);
  renderAll();
  saveGame(false); // auto-save after successful repair
}

/* =========================================================================
   INVENTORY SYSTEM
   ========================================================================= */

let invFilter = 'all';   // all | needsRepair | ready | listed
let invSort = 'dateDesc'; // dateDesc | conditionDesc | priceDesc

function getFilteredInventory(){
  let list = state.inventory.slice();
  if(invFilter==='needsRepair') list = list.filter(p=>!isFullyRepaired(p));
  else if(invFilter==='ready') list = list.filter(p=>isFullyRepaired(p) && p.status==='stock');
  else if(invFilter==='listed') list = list.filter(p=>p.status==='listed');

  if(invSort==='conditionDesc') list.sort((a,b)=>b.condition-a.condition);
  else if(invSort==='priceDesc') list.sort((a,b)=> (b.base) - (a.base));
  else list.sort((a,b)=> (b.purchaseDate||0) - (a.purchaseDate||0));
  return list;
}

function listForSale(id){
  const item = state.inventory.find(p=>p.id===id);
  if(!item) return;
  if(!isFullyRepaired(item)){
    showDayToast('ควรซ่อมให้ครบก่อนตั้งขาย เพื่อราคาที่ดีที่สุด');
  }
  const suggested = Math.round(item.base * (item.condition/100) * 0.95 * 1.15);
  openModal(`
    <button class="btn secondary small modal-close-x" onclick="closeModal()">ปิด ✕</button>
    <h3>ตั้งราคาขาย — ${item.brand} ${item.model}</h3>
    <p class="cust-line">สภาพปัจจุบัน: <b>${item.condition}%</b> ${isFullyRepaired(item)?'✅ ซ่อมครบแล้ว':'⚠️ ยังมีปัญหาค้าง'}</p>
    <p class="cust-line">ราคาตลาดโดยประมาณ: <b>${money(Math.round(item.base*(item.condition/100)*0.95))} บาท</b></p>
    <div class="offer-row" style="margin-top:10px;">
      <label>ราคาที่จะตั้งขาย:</label>
      <input type="number" id="listPriceInput" value="${suggested}" step="50">
    </div>
    <div class="btn-row" style="margin-top:14px;">
      <button class="btn mint" onclick="confirmListForSale(${id})">ยืนยันตั้งขาย</button>
      <button class="btn secondary" onclick="closeModal()">ยกเลิก</button>
    </div>
  `);
}
function confirmListForSale(id){
  const item = state.inventory.find(p=>p.id===id);
  const price = Number(document.getElementById('listPriceInput').value);
  if(!price || price<=0){ showDayToast('กรุณาใส่ราคาขาย'); return; }
  item.status = 'listed';
  item.sellPrice = price; // asking price shown in listing; actual negotiation still applies
  closeModal();
  renderAll();
  showDayToast(`ตั้งขาย ${item.brand} ${item.model} ที่ ${money(price)} บาทแล้ว`);
}
function unlistItem(id){
  const item = state.inventory.find(p=>p.id===id);
  if(!item) return;
  item.status = 'stock';
  renderAll();
}
function viewPhoneDetail(id){
  const item = state.inventory.find(p=>p.id===id);
  if(!item) return;
  const visDefects = visibleDefectSummary(item);
  const hidDefects = hiddenDefectSummary(item);
  const repairRowsHtml = REPAIR_TYPES.map(t=>{
    const broken = item.defects[t.defectKey];
    const mult = getRepairCostMultiplier();
    const cost = Math.round(item.base * t.costPct * mult);
    return `<div class="item-card" style="padding:8px 10px;">
      <div class="item-card-head" style="font-size:13px;">
        <span>${t.label} ${t.hidden?'<span class="tag">ซ่อนเร้น</span>':''}</span>
        <span>${broken? `<button class="btn small" onclick="repairItem(${item.id},'${t.id}')">ซ่อม (${money(cost)}บ.)</button>` : '<span style="color:var(--mint); font-weight:700;">✓ ปกติ</span>'}</span>
      </div>
    </div>`;
  }).join('');
  openModal(`
    <button class="btn secondary small modal-close-x" onclick="closeModal()">ปิด ✕</button>
    <h3>${item.brand} ${item.model}</h3>
    <p class="cust-line">สถานะ: <b>${item.status==='stock'?'ในสต็อก':item.status==='listed'?'ตั้งขายอยู่':'ขายแล้ว'}</b> · สภาพ: <b>${item.condition}%</b></p>
    <p class="cust-line">ราคารับซื้อ: ${money(item.buyPrice)} บ. · ค่าซ่อมสะสม: ${money(item.repairSpent||0)} บ.</p>
    <p class="cust-line">ตำหนิที่มองเห็นได้: ${visDefects.length?visDefects.join(', '):'ไม่มี'}</p>
    <p class="cust-line">ปัญหาซ่อนเร้นที่ตรวจพบ: ${hidDefects.length?hidDefects.join(', '):'ไม่มี'}</p>
    <h3 style="margin-top:14px; font-size:13px;">รายการซ่อม</h3>
    <div class="card-list">${repairRowsHtml}</div>
    <div class="btn-row" style="margin-top:14px;">
      ${item.status==='stock' ? `<button class="btn mint" onclick="closeModal(); listForSale(${item.id});">ตั้งขาย</button>` : ''}
      ${item.status==='listed' ? `<button class="btn secondary" onclick="unlistItem(${item.id}); closeModal();">เลิกตั้งขาย</button>` : ''}
    </div>
  `);
}

/* =========================================================================
   UPGRADE SYSTEM
   ========================================================================= */

function getUpgradeCost(key){
  const def = UPGRADE_DEFS[key];
  const lvl = state.upgrades[key];
  if(lvl >= def.maxLevel) return null;
  return Math.round(def.baseCost * Math.pow(def.costGrowth, lvl));
}
function purchaseUpgrade(key){
  const def = UPGRADE_DEFS[key];
  const cost = getUpgradeCost(key);
  if(cost===null){ showDayToast('อัปเกรดนี้ถึงระดับสูงสุดแล้ว'); return; }
  if(state.cash < cost){ showDayToast('เงินสดไม่พอสำหรับอัปเกรดนี้'); return; }
  state.cash -= cost;
  state.upgrades[key]++;
  showDayToast(`อัปเกรด "${def.label}" เป็นระดับ ${state.upgrades[key]} แล้ว!`);
  renderAll();
  saveGame(false); // auto-save after successful upgrade
}

/* =========================================================================
   STAFF SYSTEM
   ========================================================================= */

const STAFF_NAMES = ["น้องเก่ง","พี่หนึ่ง","น้องฝ้าย","พี่โอ๊ต","น้องบีม","พี่แก้ว"];
const HIRE_FEE = 500;
const BASE_SALARY = 150;

function hireEmployee(){
  if(state.employees.length >= 4){ showDayToast('ร้านมีพนักงานเต็มแล้ว (สูงสุด 4 คน)'); return; }
  if(state.cash < HIRE_FEE){ showDayToast('เงินสดไม่พอสำหรับค่าจ้างแรกเข้า'); return; }
  state.cash -= HIRE_FEE;
  const salary = BASE_SALARY + state.employees.length*30;
  state.employees.push({ id: state.nextEmployeeId++, name: pick(STAFF_NAMES), salary });
  renderAll();
  showDayToast('จ้างพนักงานใหม่เรียบร้อย');
}
function fireEmployee(id){
  state.employees = state.employees.filter(e=>e.id!==id);
  renderAll();
}

/* =========================================================================
   RANDOM EVENT SYSTEM
   ========================================================================= */

function rollDailyEvent(){
  state.todayMods = {};
  const eligible = EVENT_DEFS.filter(e=>e.condition(state));
  if(eligible.length===0) return null;
  if(Math.random() > 0.45) return null; // 45% chance an event fires each day
  const chosen = weightedPick(eligible, e=>e.weight);
  const text = chosen.effect(state);
  state.eventLog.unshift({day: state.day, text, icon: chosen.icon});
  state.eventLog = state.eventLog.slice(0, 30);
  return {icon: chosen.icon, text};
}

/* =========================================================================
   ECONOMY SYSTEM — end of day settlement
   ========================================================================= */

function endDay(){
  const rent = getDailyRent();
  const electricity = getDailyElectricity();
  const salary = getDailySalary();
  const fixedExpenses = rent + electricity + salary;

  const grossProfitToday = state.dayProfit; // net of COGS/repair already applied per-transaction
  const tax = grossProfitToday > 0 ? Math.round(grossProfitToday * 0.10) : 0;

  const totalExpensesToday = fixedExpenses + tax + state.todayExpenses;
  state.cash = Math.max(0, state.cash - totalExpensesToday);
  state.dayExpenses += totalExpensesToday;
  state.dayProfit -= (fixedExpenses + tax);
  state.stats.totalExpensesLifetime += totalExpensesToday;
  state.stats.lifetimeProfit -= (fixedExpenses + tax);

  const report = {
    day: state.day,
    revenue: state.dayRevenue,
    expenses: state.dayExpenses,
    profit: state.dayProfit,
    cashAfter: state.cash,
    reputation: state.reputation,
    rent, electricity, salary, tax,
  };
  state.history.unshift(report);
  state.history = state.history.slice(0, 60);

  // advance day
  state.day += 1;
  state.dayRevenue = 0;
  state.dayExpenses = 0;
  state.dayProfit = 0;
  state.todayExpenses = 0;
  state.customer = null;

  const toastMsg = `☀ เริ่มวันที่ ${state.day} · ค่าใช้จ่ายวันก่อน: เช่า ${money(rent)} + ไฟ ${money(electricity)} + เงินเดือน ${money(salary)} + ภาษี ${money(tax)}`;
  showDayToast(toastMsg);

  const evt = rollDailyEvent();
  if(evt){ setTimeout(()=> showEventToast(`${evt.icon} ${evt.text}`), 900); }

  saveGame(false); // auto-save at end of day
  renderAll();
}

/* =========================================================================
   UI — MODALS / TOASTS / RECEIPT
   ========================================================================= */

function openModal(innerHtml){
  const root = document.getElementById('modalRoot');
  root.innerHTML = `<div class="modal-overlay" onclick="if(event.target===this) closeModal()"><div class="modal-box">${innerHtml}</div></div>`;
}
function closeModal(){
  document.getElementById('modalRoot').innerHTML = '';
}
function showReceipt({title, rows, totalLabel, totalVal, good}){
  const root = document.getElementById('modalRoot');
  root.innerHTML = `
    <div class="receipt-overlay">
      <div class="receipt">
        <h3>${title}</h3>
        <div style="text-align:center; font-size:10px; color:#888;">ร้านมือถือป้าแดง · วันที่ ${state.day}</div>
        <hr>
        ${rows.map(r=>`<div class="receipt-row"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('')}
        <hr>
        <div class="receipt-row total ${good===undefined?'':(good?'profit':'loss')}">
          <span>${totalLabel}</span><span>${totalVal}</span>
        </div>
        <button class="btn mint receipt-close" onclick="closeModal()">เก็บใบเสร็จ</button>
      </div>
    </div>
  `;
}
function showDayToast(text){
  const toast = document.createElement('div');
  toast.className = 'day-toast';
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(), 2400);
}
function showEventToast(text){
  const toast = document.createElement('div');
  toast.className = 'event-toast';
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(), 3200);
}

/* =========================================================================
   UI — TAB NAVIGATION
   ========================================================================= */

const TABS = [
  {id:'shop', label:'🏪 ร้านค้า'},
  {id:'inventory', label:'📦 คลังสินค้า'},
  {id:'upgrades', label:'⬆️ อัปเกรด'},
  {id:'staff', label:'👥 พนักงาน'},
  {id:'reports', label:'📊 รายงาน'},
  {id:'settings', label:'⚙️ ตั้งค่า'},
];
function renderTabBar(){
  const bar = document.getElementById('tabBar');
  bar.innerHTML = TABS.map(t=>`<button class="tabbtn ${state.activeTab===t.id?'active':''}" onclick="setTab('${t.id}')">${t.label}</button>`).join('');
}
function setTab(id){
  state.activeTab = id;
  document.querySelectorAll('.screen').forEach(el=>el.classList.remove('active'));
  document.getElementById('screen-'+id).classList.add('active');
  document.getElementById('sidebarPanel').style.display = (id==='shop') ? '' : 'none';
  renderTabBar();
  renderScreenContent();
}

/* =========================================================================
   UI — TOP BAR + SIDEBAR (always visible stats)
   ========================================================================= */

function renderTopAndSidebar(){
  document.getElementById('tsDay').textContent = state.day;
  document.getElementById('tsCash').textContent = money(state.cash);
  document.getElementById('tsProfit').textContent = (state.dayProfit>=0?'+':'') + money(state.dayProfit);
  document.getElementById('tsRep').textContent = Math.round(state.reputation);

  document.getElementById('dayVal').textContent = state.day;
  document.getElementById('cashVal').textContent = money(state.cash);
  document.getElementById('revVal').textContent = money(state.dayRevenue);
  document.getElementById('expVal').textContent = money(state.dayExpenses);
  const profitEl = document.getElementById('profitVal');
  profitEl.textContent = (state.dayProfit>=0?'+':'') + money(state.dayProfit);
  profitEl.style.color = state.dayProfit >= 0 ? 'var(--mint)' : 'var(--coral)';

  const repClamped = clamp(state.reputation,0,100);
  document.getElementById('repBar').style.width = repClamped + '%';
  const lvl = getReputationLevel(state.reputation);
  document.getElementById('repLevelLabel').textContent = `${lvl.label} (${Math.round(repClamped)}/100)`;

  const cap = getInventoryCapacity();
  document.getElementById('invCap').textContent = cap;
  document.getElementById('invCount').textContent = state.inventory.length;
  const invList = document.getElementById('invList');
  if(state.inventory.length===0){
    invList.innerHTML = '<div class="empty-note">ยังไม่มีเครื่องในสต็อก</div>';
  } else {
    invList.innerHTML = state.inventory.slice(0,30).map(p=>{
      const condClass = p.condition >= 70 ? 'cond-ok' : (p.condition>=45?'cond-mid':'cond-low');
      const statusTxt = p.status==='listed' ? ' 🏷️' : (isFullyRepaired(p) ? ' ✓' : ' ⚠');
      return `<div class="inv-item"><span>${p.brand} ${p.model}</span><span class="${condClass}">${p.condition}%${statusTxt}</span></div>`;
    }).join('');
  }
}

/* =========================================================================
   UI — SHOP SCREEN (core loop: customer + negotiation)
   ========================================================================= */

function renderShopScreen(){
  const stageTitle = document.getElementById('stageTitle');
  const stageContent = document.getElementById('stageContent');

  if(!state.customer){
    stageTitle.textContent = 'ร้านว่าง';
    const cap = getInventoryCapacity();
    const canBuyIn = state.inventory.length < cap;
    const canSellOut = state.inventory.some(p=>p.status==='listed');
    stageContent.innerHTML = `
      <div class="no-customer">
        <div style="font-size:40px;">🏪</div>
        <p>ยังไม่มีลูกค้าเข้าร้าน</p>
        <div class="btn-row">
          <button class="btn mint" onclick="spawnCustomer('sell')" ${canBuyIn?'':'disabled'}>ลูกค้ามาขายเครื่อง</button>
          <button class="btn" onclick="spawnCustomer('buy')" ${canSellOut ? '' : 'disabled'}>ลูกค้ามาซื้อเครื่อง</button>
        </div>
        ${!canBuyIn ? '<p style="font-size:11px; color:var(--coral); margin-top:6px;">* สต็อกเต็ม ('+state.inventory.length+'/'+cap+') — ขายเครื่องออกหรืออัปเกรดพื้นที่ร้านก่อนรับซื้อเพิ่ม</p>' : ''}
        ${!canSellOut ? '<p style="font-size:11px; color:var(--steel); margin-top:6px;">* ต้องซ่อมและ "ตั้งขาย" เครื่องอย่างน้อย 1 เครื่องในแท็บคลังสินค้าก่อน ลูกค้าถึงจะมาซื้อได้</p>' : ''}
      </div>`;
    return;
  }

  const c = state.customer;
  const moodIcon = MOOD_ICON[c.mood];
  const moodLabel = MOOD_LABEL[c.mood];

  if(c.mode === 'sell'){
    const visDefects = visibleDefectSummary(c.phone);
    stageTitle.innerHTML = 'ลูกค้าต้องการขาย <span class="badge mode-sell">SELL-IN</span>';
    stageContent.innerHTML = `
      <div class="customer-card">
        <div class="avatar">${c.face}</div>
        <div class="cust-info">
          <p class="cust-name">${c.name} <span style="font-weight:400; font-size:12px; color:var(--steel);">(${c.occupation})</span></p>
          <p class="cust-line">"เอามือถือมาขายค่ะ/ครับ"</p>
          <div class="phone-tag">${c.phone.brand} ${c.phone.model} · สภาพ ${c.phone.condition}%</div>
          <div class="cust-tags">
            <span class="tag">${c.personality.icon} ${c.personality.name}</span>
            <span class="tag mood">${moodIcon} ${moodLabel}</span>
            <span class="tag">ความอดทน ${c.patience}/${c.maxPatience}</span>
          </div>
          <div class="defect-list">
            ${visDefects.length ? visDefects.map(d=>`<span class="defect-chip">${d}</span>`).join('') : '<span class="defect-chip ok">มองไม่เห็นตำหนิชัดเจน</span>'}
          </div>
        </div>
      </div>
      <div class="neg-zone">
        <div>
          <p class="cust-line">ลูกค้าตั้งราคาขอ: <b>${money(c.askPrice)} บาท</b></p>
          <p class="cust-line">คุณประเมินมูลค่าจริง (โดยประมาณ): <b>${money(c.trueValue)} บาท</b></p>
          <div class="offer-row">
            <label>เสนอราคาซื้อ:</label>
            <input type="number" id="offerInput" value="${Math.round(c.trueValue*0.85)}" step="50">
            <button class="btn secondary" onclick="makeOffer()">เสนอราคา</button>
          </div>
          <div class="haggle-log" id="haggleLog">รอการเสนอราคาของคุณ... (เหลือ ${c.patience} ครั้ง) — อาจมีปัญหาซ่อนเร้นที่ตรวจไม่พบจนกว่าจะซื้อ</div>
        </div>
        <div class="btn-row">
          <button class="btn danger" onclick="rejectCustomer()">ปฏิเสธ / ไล่ลูกค้า</button>
        </div>
      </div>
    `;
  } else {
    stageTitle.innerHTML = 'ลูกค้าสนใจซื้อ <span class="badge mode-buy">SELL-OUT</span>';
    stageContent.innerHTML = `
      <div class="customer-card">
        <div class="avatar">${c.face}</div>
        <div class="cust-info">
          <p class="cust-name">${c.name} <span style="font-weight:400; font-size:12px; color:var(--steel);">(${c.occupation})</span></p>
          <p class="cust-line">"สนใจเครื่อง ${c.phone.brand} ${c.phone.model} ในตู้ครับ/ค่ะ"</p>
          <div class="phone-tag">${c.phone.brand} ${c.phone.model} · สภาพ ${c.phone.condition}% · ตั้งราคาไว้ ${money(c.phone.sellPrice)} บ.</div>
          <div class="cust-tags">
            <span class="tag">${c.personality.icon} ${c.personality.name}</span>
            <span class="tag mood">${moodIcon} ${moodLabel}</span>
            <span class="tag">ความอดทน ${c.patience}/${c.maxPatience}</span>
          </div>
        </div>
      </div>
      <div class="neg-zone">
        <div>
          <p class="cust-line">ราคาตลาดโดยประมาณ: <b>${money(c.marketVal)} บาท</b></p>
          <div class="offer-row">
            <label>เสนอราคาขาย:</label>
            <input type="number" id="offerInput" value="${c.phone.sellPrice}" step="50">
            <button class="btn secondary" onclick="makeSellOffer()">เสนอราคานี้</button>
          </div>
          <div class="haggle-log" id="haggleLog">รอการตั้งราคาของคุณ... (เหลือ ${c.patience} ครั้ง)</div>
        </div>
        <div class="btn-row">
          <button class="btn danger" onclick="rejectCustomer()">ยกเลิก</button>
        </div>
      </div>
    `;
  }
}

/* =========================================================================
   UI — INVENTORY SCREEN
   ========================================================================= */

function renderInventoryScreen(){
  const el = document.getElementById('inventoryScreenContent');
  const list = getFilteredInventory();
  el.innerHTML = `
    <div class="filter-row">
      <select class="filter-select" onchange="invFilter=this.value; renderInventoryScreen();">
        <option value="all" ${invFilter==='all'?'selected':''}>ทั้งหมด</option>
        <option value="needsRepair" ${invFilter==='needsRepair'?'selected':''}>ต้องซ่อม</option>
        <option value="ready" ${invFilter==='ready'?'selected':''}>ซ่อมครบ พร้อมขาย</option>
        <option value="listed" ${invFilter==='listed'?'selected':''}>ตั้งขายอยู่</option>
      </select>
      <select class="filter-select" onchange="invSort=this.value; renderInventoryScreen();">
        <option value="dateDesc" ${invSort==='dateDesc'?'selected':''}>เรียง: ซื้อล่าสุด</option>
        <option value="conditionDesc" ${invSort==='conditionDesc'?'selected':''}>เรียง: สภาพมาก→น้อย</option>
        <option value="priceDesc" ${invSort==='priceDesc'?'selected':''}>เรียง: ราคาฐานมาก→น้อย</option>
      </select>
      <span style="font-size:12px; color:var(--steel); align-self:center;">ความจุ: ${state.inventory.length}/${getInventoryCapacity()}</span>
    </div>
    <div class="card-list">
      ${list.length===0 ? '<div class="empty-note">ไม่มีรายการตรงเงื่อนไข</div>' : list.map(p=>{
        const condClass = p.condition >= 70 ? 'cond-ok' : (p.condition>=45?'cond-mid':'cond-low');
        const defectCount = remainingDefectCount(p);
        return `<div class="item-card">
          <div class="item-card-head">
            <span>${p.brand} ${p.model} <span class="${condClass}">(${p.condition}%)</span></span>
            <span>${p.status==='listed'?'<span class="tag">🏷️ ตั้งขาย '+money(p.sellPrice)+' บ.</span>':(defectCount===0?'<span class="tag">✓ พร้อมขาย</span>':'<span class="tag">⚠ ต้องซ่อม '+defectCount+' จุด</span>')}</span>
          </div>
          <div class="btn-row">
            <button class="btn small secondary" onclick="viewPhoneDetail(${p.id})">ดูรายละเอียด / ซ่อม</button>
            ${p.status==='stock' ? `<button class="btn small mint" onclick="listForSale(${p.id})">ตั้งขาย</button>` : ''}
            ${p.status==='listed' ? `<button class="btn small secondary" onclick="unlistItem(${p.id})">เลิกตั้งขาย</button>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
}

/* =========================================================================
   UI — UPGRADES SCREEN
   ========================================================================= */

function renderUpgradesScreen(){
  const el = document.getElementById('upgradesScreenContent');
  el.innerHTML = `<div class="grid2">` + Object.keys(UPGRADE_DEFS).map(key=>{
    const def = UPGRADE_DEFS[key];
    const lvl = state.upgrades[key];
    const cost = getUpgradeCost(key);
    const pips = Array.from({length:def.maxLevel}).map((_,i)=>`<div class="lvl-pip ${i<lvl?'filled':''}"></div>`).join('');
    return `<div class="upgrade-card">
      <div class="item-card-head"><span>${def.label}</span><span style="font-size:12px; color:var(--steel);">Lv.${lvl}/${def.maxLevel}</span></div>
      <p class="cust-line">${def.desc}</p>
      <div class="upgrade-level-track">${pips}</div>
      <p class="cust-line">ผลปัจจุบัน: ${lvl>0? def.effectText(lvl) : 'ยังไม่อัปเกรด'}</p>
      ${cost!==null
        ? `<button class="btn mint" onclick="purchaseUpgrade('${key}')">อัปเกรดเป็น Lv.${lvl+1} (${money(cost)} บ.)</button>`
        : `<button class="btn secondary" disabled>ระดับสูงสุดแล้ว</button>`
      }
    </div>`;
  }).join('') + `</div>`;
}

/* =========================================================================
   UI — STAFF SCREEN
   ========================================================================= */

function renderStaffScreen(){
  const el = document.getElementById('staffScreenContent');
  el.innerHTML = `
    <p class="cust-line">พนักงานช่วยลดต้นทุนค่าซ่อม (คนละ 3%) แต่มีเงินเดือนต้องจ่ายทุกวัน และเพิ่มค่าไฟเล็กน้อย</p>
    <p class="cust-line">ค่าจ้างแรกเข้า: <b>${money(HIRE_FEE)} บาท</b> · เงินเดือนรวมต่อวัน: <b>${money(getDailySalary())} บาท</b></p>
    <div class="btn-row" style="margin-bottom:14px;">
      <button class="btn mint" onclick="hireEmployee()" ${state.employees.length>=4?'disabled':''}>จ้างพนักงานใหม่</button>
    </div>
    <div class="card-list">
      ${state.employees.length===0 ? '<div class="empty-note">ยังไม่มีพนักงาน</div>' : state.employees.map(e=>`
        <div class="employee-row">
          <span>👤 ${e.name} — เงินเดือน ${money(e.salary)} บ./วัน</span>
          <button class="btn small danger" onclick="fireEmployee(${e.id})">ให้ออก</button>
        </div>
      `).join('')}
    </div>
  `;
}

/* =========================================================================
   UI — REPORTS SCREEN
   ========================================================================= */

function renderReportsScreen(){
  const el = document.getElementById('reportsScreenContent');
  const s = state.stats;
  el.innerHTML = `
    <div class="grid2" style="margin-bottom:16px;">
      <div class="item-card">
        <div class="item-card-head"><span>สถิติสะสม</span></div>
        <p class="cust-line">ซื้อเข้าทั้งหมด: <b>${s.totalPurchased}</b> เครื่อง</p>
        <p class="cust-line">ขายออกทั้งหมด: <b>${s.totalSold}</b> เครื่อง</p>
        <p class="cust-line">ซ่อมทั้งหมด: <b>${s.totalRepairs}</b> ครั้ง</p>
        <p class="cust-line">รายรับสะสม: <b>${money(s.totalRevenue)}</b> บ.</p>
        <p class="cust-line">รายจ่ายสะสม (คงที่+ภาษี): <b>${money(s.totalExpensesLifetime)}</b> บ.</p>
        <p class="cust-line">กำไรสุทธิสะสม: <b style="color:${s.lifetimeProfit>=0?'var(--mint)':'var(--coral)'}">${money(s.lifetimeProfit)}</b> บ.</p>
        <p class="cust-line">เจรจาสำเร็จ: <b>${s.negotiationSuccess}</b> / ล้มเหลว: <b>${s.negotiationFail}</b></p>
        <p class="cust-line">ลูกค้าเดินหนี: <b>${s.customersLeft}</b> คน</p>
      </div>
      <div class="item-card">
        <div class="item-card-head"><span>เหตุการณ์ล่าสุด</span></div>
        <div style="max-height:220px; overflow-y:auto; display:flex; flex-direction:column; gap:6px;">
        ${state.eventLog.length===0 ? '<span class="empty-note">ยังไม่มีเหตุการณ์</span>' : state.eventLog.map(ev=>`<p class="cust-line">${ev.icon} <b>วัน ${ev.day}:</b> ${ev.text}</p>`).join('')}
        </div>
      </div>
    </div>
    <div class="item-card">
      <div class="item-card-head"><span>รายงานประจำวัน</span></div>
      <div style="overflow-x:auto;">
        <table class="report-table">
          <thead><tr><th>วัน</th><th>รายรับ</th><th>รายจ่าย</th><th>กำไร</th><th>ชื่อเสียง</th><th>เงินสดหลังจบวัน</th></tr></thead>
          <tbody>
            ${state.history.length===0 ? '<tr><td colspan="6" style="text-align:center;">ยังไม่มีข้อมูล — กด "จบวัน" เพื่อสร้างรายงาน</td></tr>' :
              state.history.map(r=>`<tr>
                <td>${r.day}</td><td>${money(r.revenue)}</td><td>${money(r.expenses)}</td>
                <td style="color:${r.profit>=0?'var(--mint)':'var(--coral)'}">${(r.profit>=0?'+':'')+money(r.profit)}</td>
                <td>${Math.round(r.reputation)}</td><td>${money(r.cashAfter)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/* =========================================================================
   UI — SETTINGS SCREEN
   ========================================================================= */

function renderSettingsScreen(){
  const el = document.getElementById('settingsScreenContent');
  el.innerHTML = `
    <div class="settings-row">
      <div><p>บันทึกเกม</p><small>บันทึกความคืบหน้าปัจจุบันลงเครื่อง (LocalStorage)</small></div>
      <button class="btn mint" onclick="saveGame(true)">บันทึกเกม</button>
    </div>
    <div class="settings-row">
      <div><p>โหลดเกม</p><small>${hasSaveGame() ? 'พบไฟล์เซฟ — โหลดเพื่อดำเนินเกมต่อ' : 'ยังไม่มีไฟล์เซฟในเครื่องนี้'}</small></div>
      <button class="btn secondary" onclick="loadGame(true); renderAll();" ${hasSaveGame()?'':'disabled'}>โหลดเกม</button>
    </div>
    <div class="settings-row">
      <div><p>เริ่มเกมใหม่</p><small>ลบไฟล์เซฟและเริ่มต้นใหม่ทั้งหมด (ไม่สามารถย้อนกลับได้)</small></div>
      <button class="btn danger" onclick="confirmReset()">รีเซ็ตเกม</button>
    </div>
    <div class="settings-row" style="border-bottom:none;">
      <div><p>เวอร์ชันเซฟ</p><small>Save Version ${SAVE_VERSION} · วันที่ปัจจุบันในเกม: วันที่ ${state.day}</small></div>
    </div>
  `;
}
function confirmReset(){
  openModal(`
    <h3>ยืนยันการรีเซ็ตเกม</h3>
    <p class="cust-line">การกระทำนี้จะลบไฟล์เซฟและความคืบหน้าทั้งหมดอย่างถาวร ต้องการดำเนินการต่อหรือไม่?</p>
    <div class="btn-row" style="margin-top:14px;">
      <button class="btn danger" onclick="resetGame()">ยืนยัน ลบทั้งหมด</button>
      <button class="btn secondary" onclick="closeModal()">ยกเลิก</button>
    </div>
  `);
}

/* =========================================================================
   UI — SCREEN DISPATCHER + MASTER RENDER
   ========================================================================= */

function renderScreenContent(){
  switch(state.activeTab){
    case 'shop': renderShopScreen(); break;
    case 'inventory': renderInventoryScreen(); break;
    case 'upgrades': renderUpgradesScreen(); break;
    case 'staff': renderStaffScreen(); break;
    case 'reports': renderReportsScreen(); break;
    case 'settings': renderSettingsScreen(); break;
  }
}
function renderAll(){
  renderTopAndSidebar();
  renderTabBar();
  renderScreenContent();
}
function render(){ renderAll(); } // alias kept for consistency across systems

/* =========================================================================
   INIT
   ========================================================================= */

document.getElementById('nextDayBtn').addEventListener('click', endDay);

// BUG-012 fix: guarantees the shop is never left in a permanent "no customer,
// no button rendered" state at startup. Calls the existing spawnCustomer()
// unchanged — this only decides WHEN it's called, not how it behaves.
function ensureInitialCustomer(){
  if(!state.customer){ spawnCustomer('sell'); }
}

function boot(){
  renderTabBar();
  document.getElementById('sidebarPanel').style.display = '';
  if(hasSaveGame()){
    openModal(`
      <h3>พบไฟล์เซฟ</h3>
      <p class="cust-line">ต้องการเล่นต่อจากเกมที่บันทึกไว้ หรือเริ่มเกมใหม่?</p>
      <div class="btn-row" style="margin-top:14px;">
        <button class="btn mint" onclick="loadGame(true); closeModal(); setTab('shop'); renderAll(); ensureInitialCustomer();">เล่นต่อ (Continue)</button>
        <button class="btn secondary" onclick="closeModal(); renderAll(); ensureInitialCustomer();">เริ่มเกมใหม่</button>
      </div>
    `);
  }
  renderAll();
  ensureInitialCustomer();
}
boot();
