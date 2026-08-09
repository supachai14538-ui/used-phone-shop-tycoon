/* =========================================================================
   DATA LAYER (data-driven configuration — no gameplay values hardcoded
   inside logic functions; everything reads from these tables)
   ========================================================================= *//

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
        ['รุ่นเครื่อง', item.brand+' '+item.mode
