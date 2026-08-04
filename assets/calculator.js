// Accepts decimal (2.10), fractional (11/10) and American (+110 / -120) odds.
// Returns decimal odds above 1, or NaN if the input isn't usable.
function parseOdds(raw){
 const s=String(raw==null?'':raw).trim();
 if(!s)return NaN;
 let d=NaN;
 if(/^[+-]\d+(\.\d+)?$/.test(s)){
  const n=Number(s);
  if(n>0)d=n/100+1; else if(n<0)d=100/Math.abs(n)+1;
 }else if(/^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/.test(s)){
  const [a,b]=s.split('/').map(Number);
  if(b>0)d=a/b+1;
 }else{
  d=Number(s);
 }
 return d>1?d:NaN;
}

// Exchange commission is charged on net winnings, so it only reduces the profit
// part of the odds: 3.00 at 5% pays 1 + 2.00*0.95 = 2.90.
function afterCommission(dec,pct){
 const c=Number(pct);
 if(!(c>0&&c<100))return dec;
 return 1+(dec-1)*(1-c/100);
}

function fmtOdds(d){return d.toFixed(2)}
// Keeps the sign outside the currency symbol: -$7.57, not $-7.57.
function money(n){return `${n<0?'-':'+'}$${Math.abs(n).toFixed(2)}`}
function num(id){const el=document.getElementById(id);return el?Number(el.value):NaN}
function odds(id){const el=document.getElementById(id);return el?parseOdds(el.value):NaN}
function put(id,html){const el=document.getElementById(id);if(el)el.innerHTML=html}

function calcArb(){
 if(!document.getElementById('calcResult'))return;
 const total=num('stake')||0;
 const raw=[['oddsA','commA'],['oddsB','commB'],['oddsC','commC']]
  .map(([o,c])=>({dec:odds(o),comm:num(c)}))
  .filter(x=>x.dec>1);
 if(total<=0||raw.length<2){
  put('calcResult','Enter a total stake and at least two sets of odds. Decimal (2.10), fractional (11/10) and American (+110) formats all work.');
  return;
 }
 const legs=raw.map(x=>({...x,eff:afterCommission(x.dec,x.comm)}));
 const sum=legs.reduce((a,l)=>a+1/l.eff,0);
 const stakes=legs.map(l=>total*(1/l.eff)/sum);
 const returns=legs.map((l,i)=>stakes[i]*l.eff);
 const worst=Math.min(...returns);
 const profit=worst-total;
 const anyComm=legs.some(l=>l.eff!==l.dec);

 let html=`<strong>${profit>0?'Arbitrage found':'No arbitrage'}</strong><br>`;
 html+=`Book percentage${anyComm?' (after commission)':''}: ${(sum*100).toFixed(2)}%<br>`;
 html+=`${profit>0?'Theoretical profit':'Theoretical loss'}: ${money(profit)} (${(profit/total*100).toFixed(2)}%)<br><br>`;
 html+=legs.map((l,i)=>{
  const shown=l.eff!==l.dec?`${fmtOdds(l.dec)} → ${fmtOdds(l.eff)} after ${Number(l.comm).toFixed(2)}% commission`:fmtOdds(l.dec);
  return `Outcome ${i+1}: stake $${stakes[i].toFixed(2)} at ${shown} — returns $${returns[i].toFixed(2)}`;
 }).join('<br>');
 html+=`<br><span class="note">${profit>0
  ?'Stakes are unrounded. Rounding to the nearest dollar, minimum bet sizes, and any odds movement between placing the two legs will all reduce this figure.'
  :'The combined book is 100% or higher, so there is no profit to lock in at these prices.'}</span>`;
 put('calcResult',html);
}

function calcImplied(){
 if(!document.getElementById('ipResult'))return;
 const o=odds('ipOdds'),p=num('ipProb');
 let html='';
 if(o>1){
  const american=o>=2?`+${Math.round((o-1)*100)}`:`${Math.round(-100/(o-1))}`;
  html+=`Decimal <strong>${fmtOdds(o)}</strong> = American <strong>${american}</strong><br>`;
  html+=`Implied probability: <strong>${(100/o).toFixed(2)}%</strong><br>`;
 }
 if(p>0&&p<100){
  const fair=100/p;
  const fairAmerican=fair>=2?`+${Math.round((fair-1)*100)}`:`${Math.round(-100/(fair-1))}`;
  html+=`${o>1?'<br>':''}A ${p.toFixed(2)}% probability implies fair odds of <strong>${fair.toFixed(2)}</strong> decimal (${fairAmerican} American).`;
 }
 put('ipResult',html||'Enter odds in any format — decimal (2.10), fractional (11/10) or American (+110) — or a probability between 0 and 100.');
}

function calcHedge(){
 if(!document.getElementById('hedgeResult'))return;
 const s=num('hbStake'),bo=odds('hbOdds'),ho=odds('hOdds');
 if(!(s>0&&bo>1&&ho>1)){put('hedgeResult','Enter your original stake, your original odds, and the current hedge odds. Any odds format works.');return}
 const hs=s*bo/ho;
 const winA=s*bo-s-hs, winB=hs*ho-hs-s;
 put('hedgeResult',`Hedge stake: <strong>$${hs.toFixed(2)}</strong> at ${fmtOdds(ho)}<br>Locked outcome if original bet wins: ${money(winA)}<br>Locked outcome if hedge wins: ${money(winB)}<br><span class="note">${winA<0?'This locks in a loss — hedging only guarantees a profit when the odds have moved in your favour.':'The odds moved in your favour, so both outcomes are locked positive.'}</span>`);
}

function calcEV(){
 if(!document.getElementById('evResult'))return;
 const o=odds('evOdds'),p=num('evProb'),s=num('evStake');
 if(!(o>1&&p>0&&p<100&&s>0)){put('evResult','Enter odds in any format, your estimated win probability, and a stake.');return}
 const edge=(p/100)*o-1, ev=s*edge;
 put('evResult',`Edge: <strong>${(edge*100).toFixed(2)}%</strong><br>Expected value: <strong>${money(ev)}</strong> per $${s.toFixed(2)} staked<br><span class="note">${edge>0?'Positive EV on paper. The result still depends entirely on how accurate the probability estimate is.':'Negative EV: the odds are shorter than your estimated probability justifies.'}</span>`);
}

function calcKelly(){
 if(!document.getElementById('skResult'))return;
 const b=num('skBankroll'),o=odds('skOdds'),p=num('skProb'),f=num('skFraction')||25;
 if(!(b>0&&o>1&&p>0&&p<100)){put('skResult','Enter bankroll, odds in any format, and your estimated win probability.');return}
 const kelly=((o*(p/100))-1)/(o-1);
 if(kelly<=0){put('skResult','<strong>No stake recommended.</strong> At these odds and probability the bet has no positive edge.');return}
 const stake=b*kelly*(f/100);
 put('skResult',`Full Kelly fraction: <strong>${(kelly*100).toFixed(2)}%</strong> of bankroll<br>Suggested stake at ${f.toFixed(0)}% of Kelly: <strong>$${stake.toFixed(2)}</strong><br><span class="note">Full Kelly is aggressive and assumes your probability estimate is exactly right. Most disciplined bettors stake a fraction of Kelly to reduce variance and estimation error.</span>`);
}

function runCalcs(){[calcArb,calcImplied,calcHedge,calcEV,calcKelly].forEach(f=>{try{f()}catch(e){}})}
document.addEventListener('click',e=>{const a=e.target.closest('a[data-partner]');if(a&&typeof gtag==='function')gtag('event','partner_click',{partner:a.dataset.partner,page_path:location.pathname})});
document.addEventListener('input',e=>{if(e.target.closest('.calc'))runCalcs()});
document.addEventListener('DOMContentLoaded',runCalcs);
