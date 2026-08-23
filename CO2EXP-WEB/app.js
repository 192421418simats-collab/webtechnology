const experiments=[
 {id:'profile',title:'Student Profile',desc:'Semantic layout, responsive image, and a personal identity.',tag:'HTML / CSS',icon:'01',type:'build'},
 {id:'register',title:'Registration Form',desc:'Validate inputs with events, DOM methods, and regex.',tag:'FORMS / JS',icon:'02',type:'logic'},
 {id:'calculator',title:'Scientific Calculator',desc:'Arithmetic, trigonometry, and the Math object in action.',tag:'MATH / JS',icon:'03',type:'logic'},
 {id:'results',title:'Result Analysis',desc:'Turn marks into totals, averages, and ranked outcomes.',tag:'ARRAYS / JS',icon:'04',type:'logic'},
 {id:'college',title:'College Layout',desc:'A responsive information architecture with Grid and Flexbox.',tag:'LAYOUT / CSS',icon:'05',type:'build'},
 {id:'todo',title:'To-Do List',desc:'Add, complete, and remove tasks from live DOM state.',tag:'DOM / JS',icon:'06',type:'logic'},
 {id:'quiz',title:'Auto-Scoring Quiz',desc:'Answer a question set and get your score instantly.',tag:'LOGIC / JS',icon:'07',type:'logic'},
 {id:'clock',title:'Clock + Countdown',desc:'A real-time Date object and an exam countdown.',tag:'TIME / JS',icon:'08',type:'build'},
 {id:'cart',title:'Shopping Cart',desc:'Quantities, discounts, tax, and a final bill.',tag:'STATE / JS',icon:'09',type:'logic'},
 {id:'debug',title:'Debug Lab',desc:'Find deliberate errors using the browser developer tools.',tag:'DEVTOOLS / JS',icon:'10',type:'debug'}
];

const nav=document.querySelector('#experiment-nav'),grid=document.querySelector('#experiment-grid'),workspace=document.querySelector('#workspace'),workspaceTitle=document.querySelector('#workspace-title');

nav.innerHTML=experiments.map((e,i)=>`<button class="nav-item ${i===0?'active':''}" data-open="${e.id}"><span class="nav-number">${e.icon}</span>${e.title}</button>`).join('');

grid.innerHTML=experiments.map(e=>`<article class="experiment-card" data-type="${e.type}" data-open="${e.id}"><div class="card-number"><span>${e.icon}</span><span>+</span></div><div class="card-icon">${e.icon}</div><h3>${e.title}</h3><p>${e.desc}</p><div class="card-tag">${e.tag}</div></article>`).join('');

const templates={
 profile:`<div class="tool-grid"><div class="tool-panel"><h3>Profile preview</h3><img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&q=80" alt="Student profile portrait" style="width:100%;
max-width:230px;
aspect-ratio:1;
object-fit:cover;
filter:grayscale(1)"></div><div class="tool-panel"><p class="eyebrow">ABOUT THE STUDENT</p><h3>Alex Morgan</h3><p>Computer science student, interface tinkerer, and curious builder. This profile uses semantic HTML and adapts from a two-column desktop layout to a focused mobile stack.</p><div class="result-box"><strong>Interests</strong><br>Frontend systems / Photography / Open source</div></div></div>`,
 register:`<div class="tool-grid"><form class="tool-panel" id="register-form"><h3>Create student account</h3><div class="field-grid"><label><span class="tool-label">Full name</span><input class="field" name="name" placeholder="Alex Morgan"></label><label><span class="tool-label">Email</span><input class="field" name="email" placeholder="alex@college.edu"></label><label><span class="tool-label">Password</span><input class="field" type="password" name="password" placeholder="8+ characters"></label><label><span class="tool-label">Student ID</span><input class="field" name="studentId" placeholder="STU-2026"></label></div><button class="tool-button">Validate registration</button></form><div class="tool-panel"><h3>Validation output</h3><div class="result-box" id="register-output">Submit the form to run four checks.</div></div></div>`,
 calculator:`<div class="tool-grid"><div class="tool-panel calc"><h3>Scientific calculator</h3><input class="calc-display" id="calc-display" value="0" readonly><div class="calc-keys">${['sin','cos','sqrt','C','7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(k=>`<button data-calc="${k}">${k}</button>`).join('')}</div></div><div class="tool-panel"><h3>Math functions</h3><p>Try an expression such as <span class="mono">sin(30)</span>, <span class="mono">sqrt(81)</span>, or combine operators.</p><div class="result-box">Trigonometry uses degrees for friendlier classroom experiments.</div></div></div>`,
 results:`<div class="tool-grid"><div class="tool-panel"><h3>Enter marks</h3><input class="field" id="marks-input" value="84, 72, 91, 68, 88" placeholder="84, 72, 91"><button class="tool-button" id="analyze-marks">Analyze marks</button></div><div class="tool-panel"><h3>Analysis table</h3><div id="marks-output"></div></div></div>`,
 college:`<div class="tool-grid"><div class="tool-panel"><p class="eyebrow">NORTHSTAR COLLEGE</p><h3>Learn with momentum.</h3><p>Explore a semantic college homepage structure: header, navigation, main content, aside, and footer. Resize the window to see the layout reorganize.</p><button class="tool-button">Explore admissions</button></div><div class="tool-panel"><div class="result-box"><strong>SPRING 2026</strong><br><br>Open day · 24 Apr<br>Design systems · 09:00<br>New student orientation · 14:30</div></div></div>`,
 todo:`<div class="tool-grid"><div class="tool-panel"><h3>Today's tasks</h3><form id="todo-form"><input class="field" id="todo-input" placeholder="Add a task"><button class="tool-button">Add task</button></form></div><div class="tool-panel"><h3>Live list</h3><ul class="todo-list" id="todo-list"><li>Review CSS Grid <button data-remove="0">Remove</button></li><li>Ship the experiment <button data-remove="1">Remove</button></li></ul></div></div>`,
 quiz:`<div class="tool-grid"><div class="tool-panel"><p class="eyebrow">QUESTION 01 / 03</p><h3>Which method selects one element by ID?</h3><div id="quiz-options"><button class="quiz-option" data-answer="false">querySelectorAll()</button><button class="quiz-option" data-answer="true">getElementById()</button><button class="quiz-option" data-answer="false">getElementsByClassName()</button></div></div><div class="tool-panel"><h3>Score</h3><div class="result-box" id="quiz-output">Choose an answer to begin.</div></div></div>`,
 clock:`<div class="tool-grid"><div class="tool-panel"><p class="eyebrow">CURRENT TIME</p><div class="clock-large" id="live-clock">--:--:--</div><p>Updated every second with <span class="mono">setInterval()</span>.</p></div><div class="tool-panel"><p class="eyebrow">NEXT EXAM / 31 AUG 2026</p><div class="clock-large" id="countdown">--d --h --m --s</div><p>Countdown to the next frontend assessment.</p></div></div>`,
 cart:`<div class="tool-grid"><div class="tool-panel"><h3>Cart</h3><div class="cart-item"><span>Notebook</span><span>$12</span><input data-price="12" value="1" type="number" min="0"></div><div class="cart-item"><span>USB drive</span><span>$18</span><input data-price="18" value="1" type="number" min="0"></div><div class="cart-item"><span>Desk planner</span><span>$9</span><input data-price="9" value="2" type="number" min="0"></div></div><div class="tool-panel"><h3>Billing summary</h3><div class="result-box" id="cart-output"></div></div></div>`,
 debug:`<div class="tool-grid"><div class="tool-panel"><p class="eyebrow">INTENTIONAL BUGS</p><h3>Debug the enrollment widget</h3><p>There are two errors below. Use the console and Sources panel to inspect them, then correct the logic in your copy.</p><button class="tool-button" id="bug-button">Run broken code</button><div class="result-box" id="debug-output">Waiting for a breakpoint.</div></div><div class="tool-panel"><pre class="result-box mono">const student = null;

student.name = 'Alex';


const marks = [80, 90, 70];

const average = marks.reduce(sum) / marks.length;

// Where does this fail?</pre></div></div>`
};

function openExperiment(id){const e=experiments.find(item=>item.id===id);
workspaceTitle.textContent=e.title;
workspace.innerHTML=templates[id];
document.querySelectorAll('.nav-item').forEach(item=>item.classList.toggle('active',item.dataset.open===id));
document.querySelector('#workspace-section').scrollIntoView({behavior:'smooth'});
bindTool(id)}
function bindTool(id){if(id==='register')document.querySelector('#register-form').addEventListener('submit',e=>{e.preventDefault();
const data=new FormData(e.target),valid=data.get('name').trim().length>2&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get('email'))&&data.get('password').length>=8&&/^STU-\d{4}$/.test(data.get('studentId'));
document.querySelector('#register-output').innerHTML=valid?'<span class="success">Registration valid. All four checks passed.</span>':'<span class="error">Please check name, email, password length, and Student ID format (STU-2026).</span>'});
if(id==='calculator')bindCalc();
if(id==='results')document.querySelector('#analyze-marks').addEventListener('click',()=>{const values=document.querySelector('#marks-input').value.split(',').map(Number).filter(n=>!Number.isNaN(n));
document.querySelector('#marks-output').innerHTML=`<table><tr><th>COUNT</th><th>TOTAL</th><th>AVERAGE</th><th>HIGHEST</th><th>LOWEST</th></tr><tr><td>${values.length}</td><td>${values.reduce((a,b)=>a+b,0)}</td><td>${(values.reduce((a,b)=>a+b,0)/values.length).toFixed(1)}</td><td>${Math.max(...values)}</td><td>${Math.min(...values)}</td></tr></table>`});
if(id==='todo')bindTodo();
if(id==='quiz')document.querySelectorAll('.quiz-option').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#quiz-output').innerHTML=button.dataset.answer==='true'?'<span class="success">Correct. Score: 1 / 1</span>':'<span class="error">Not quite. Score: 0 / 1</span>'}));
if(id==='clock')updateTime();
if(id==='cart'){document.querySelectorAll('[data-price]').forEach(input=>input.addEventListener('input',updateCart));
updateCart()}if(id==='debug')document.querySelector('#bug-button').addEventListener('click',()=>{try{const student=null;
student.name='Alex'}catch(error){document.querySelector('#debug-output').innerHTML=`<span class="error">Caught: ${error.message}</span><br>Set a breakpoint before the assignment to inspect the null value.`}})}
function bindCalc(){let expression='';
const display=document.querySelector('#calc-display');
document.querySelectorAll('[data-calc]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.calc;
if(key==='C')expression='';
else if(key==='='){try{expression=String(Function(`return ${expression}`)())}catch{expression='Error'}}else if(['sin','cos','sqrt'].includes(key)){const value=Number(expression)||0;
expression=String(key==='sqrt'?Math.sqrt(value):key==='sin'?Math.sin(value*Math.PI/180):Math.cos(value*Math.PI/180))}else expression+=key;
display.value=expression||'0'}))}
function bindTodo(){document.querySelector('#todo-form').addEventListener('submit',e=>{e.preventDefault();
const input=document.querySelector('#todo-input');
if(input.value.trim()){const li=document.createElement('li');
li.innerHTML=`${input.value.trim()} <button>Remove</button>`;
li.querySelector('button').addEventListener('click',()=>li.remove());
document.querySelector('#todo-list').append(li);
input.value=''}});
document.querySelectorAll('[data-remove]').forEach(button=>button.addEventListener('click',()=>button.parentElement.remove()))}
function updateTime(){const now=new Date();
const formatted=now.toLocaleTimeString([], {hour12:false});
document.querySelector('#header-clock').textContent=formatted;
const live=document.querySelector('#live-clock');
if(live)live.textContent=formatted;
const target=new Date('2026-08-31T09:00:00');
const diff=Math.max(0,target-now),days=Math.floor(diff/86400000),hours=Math.floor(diff/3600000)%24,minutes=Math.floor(diff/60000)%60,seconds=Math.floor(diff/1000)%60;
const countdown=document.querySelector('#countdown');
if(countdown)countdown.textContent=`${days}d ${hours}h ${minutes}m ${seconds}s`}
updateTime();
window.labTimer=setInterval(updateTime,1000);

function updateCart(){let subtotal=0;
document.querySelectorAll('[data-price]').forEach(input=>subtotal+=Number(input.dataset.price)*Number(input.value||0));
const discount=subtotal>=35?subtotal*.1:0,tax=(subtotal-discount)*.08,total=subtotal-discount+tax;
document.querySelector('#cart-output').innerHTML=`Subtotal: <strong>$${subtotal.toFixed(2)}</strong><br>Discount: -$${discount.toFixed(2)}<br>Tax (8%): $${tax.toFixed(2)}<br><hr><strong>Total: $${total.toFixed(2)}</strong>`}
document.addEventListener('click',e=>{const target=e.target.closest('[data-open]');
if(target){const pages={profile:'01-profile',register:'02-registration',calculator:'03-calculator',results:'04-results',college:'05-college',todo:'06-todo',quiz:'07-quiz',clock:'08-clock',cart:'09-cart',debug:'10-debug'};
window.location.href=`experiments/${pages[target.dataset.open]}.html`;
return}if(e.target.matches('[data-filter]')){document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
e.target.classList.add('active');
const filter=e.target.dataset.filter;
document.querySelectorAll('.experiment-card').forEach(card=>card.hidden=filter!=='all'&&card.dataset.type!==filter)}});
document.querySelector('#close-workspace').addEventListener('click',()=>document.querySelector('#workspace-section').scrollIntoView({behavior:'smooth'}));
openExperiment('profile');

