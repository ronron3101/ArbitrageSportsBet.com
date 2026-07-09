function implied(o){return 1/Number(o)}
function num(id){const el=document.getElementById(id);return el?Number(el.value):NaN}
function put(id,html){const el=document.getElementById(id);if(el)el.innerHTML=html}

function calcArb(){
 if(!document.getElementById('calcResult'))return;
 const total=num('stake')||0;
 const odds=[num('oddsA')||0,num('oddsB')||0,num('oddsC')||0].filter(x=>x>1);
 if(total<=0||odds.length<2){put('calcResult','Enter total stake and at least two decimal odds above 1.00.');return}
 const inv=odds.map(implied); const sum=inv.reduce((a,b)=>a+b,0); const arb=(1-sum)*100;
 const stakes=odds.map(o=>total*(1/o)/sum); const returns=stakes.map((s,i)=>s*odds[i]); const profit=returns[0]-total;
 let html=`<strong>${arb>0?'Arbitrage found':'No arbitrage'}</strong><br>Book percentage: ${(sum*100).toFixed(2)}%<br>Expected profit: ${profit>=0?'+':''}$${profit.toFixed(2)} (${(profit/total*100).toFixed(2)}%)<br><br>`;
 html+=stakes.map((s,i)=>`Outcome ${i+1}: stake $${s.toFixed(2)} at ${odds[i].toFixed(2)}`).join('<br>');
 put('calcResult',html);
}

function calcImplied(){
 if(!document.getElementById('ipResult'))return;
 const o=num('ipOdds'),p=num('ipProb');
 let html='';
 if(o>1)html+=`Decimal odds ${o.toFixed(2)} imply a probability of <strong>${(100/o).toFixed(2)}%</strong>.<br>`;
 if(p>0&&p<100)html+=`A ${p.toFixed(2)}% probability implies fair decimal odds of <strong>${(100/p).toFixed(2)}</strong>.`;
 put('ipResult',html||'Enter decimal odds above 1.00 or a probability between 0 and 100.');
}

function calcHedge(){
 if(!document.getElementById('hedgeResult'))return;
 const s=num('hbStake'),bo=num('hbOdds'),ho=num('hOdds');
 if(!(s>0&&bo>1&&ho>1)){put('hedgeResult','Enter your original stake, original decimal odds, and the current hedge odds.');return}
 const hs=s*bo/ho;
 const winA=s*bo-s-hs, winB=hs*ho-hs-s;
 put('hedgeResult',`Hedge stake: <strong>$${hs.toFixed(2)}</strong> at ${ho.toFixed(2)}<br>Locked outcome if original bet wins: ${winA>=0?'+':''}$${winA.toFixed(2)}<br>Locked outcome if hedge wins: ${winB>=0?'+':''}$${winB.toFixed(2)}<br><span class="note">${winA<0?'This locks in a loss — hedging only guarantees a profit when the odds have moved in your favour.':'The odds moved in your favour, so both outcomes are locked positive.'}</span>`);
}

function calcEV(){
 if(!document.getElementById('evResult'))return;
 const o=num('evOdds'),p=num('evProb'),s=num('evStake');
 if(!(o>1&&p>0&&p<100&&s>0)){put('evResult','Enter decimal odds above 1.00, your estimated win probability, and a stake.');return}
 const edge=(p/100)*o-1, ev=s*edge;
 put('evResult',`Edge: <strong>${(edge*100).toFixed(2)}%</strong><br>Expected value: <strong>${ev>=0?'+':''}$${ev.toFixed(2)}</strong> per $${s.toFixed(2)} staked<br><span class="note">${edge>0?'Positive EV on paper. The result still depends entirely on how accurate the probability estimate is.':'Negative EV: the odds are shorter than your estimated probability justifies.'}</span>`);
}

function calcKelly(){
 if(!document.getElementById('skResult'))return;
 const b=num('skBankroll'),o=num('skOdds'),p=num('skProb'),f=num('skFraction')||25;
 if(!(b>0&&o>1&&p>0&&p<100)){put('skResult','Enter bankroll, decimal odds above 1.00, and your estimated win probability.');return}
 const kelly=((o*(p/100))-1)/(o-1);
 if(kelly<=0){put('skResult','<strong>No stake recommended.</strong> At these odds and probability the bet has no positive edge.');return}
 const stake=b*kelly*(f/100);
 put('skResult',`Full Kelly fraction: <strong>${(kelly*100).toFixed(2)}%</strong> of bankroll<br>Suggested stake at ${f.toFixed(0)}% of Kelly: <strong>$${stake.toFixed(2)}</strong><br><span class="note">Full Kelly is aggressive and assumes your probability estimate is exactly right. Most disciplined bettors stake a fraction of Kelly to reduce variance and estimation error.</span>`);
}

function runCalcs(){[calcArb,calcImplied,calcHedge,calcEV,calcKelly].forEach(f=>{try{f()}catch(e){}})}
document.addEventListener('click',e=>{const a=e.target.closest('a[data-partner]');if(a&&typeof gtag==='function')gtag('event','partner_click',{partner:a.dataset.partner,page_path:location.pathname})});
document.addEventListener('input',e=>{if(e.target.closest('.calc'))runCalcs()});
document.addEventListener('DOMContentLoaded',runCalcs);
