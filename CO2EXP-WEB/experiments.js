const page=document.body.dataset.experiment;
const output=document.querySelector('#output');

function result(text,good=false){if(output)output.innerHTML=`<span class="${good?'success':'error'}">${text}</span>`}
if(page==='profile'){const form=document.querySelector('#profile-form');
form?.addEventListener('submit',e=>{e.preventDefault();
document.querySelector('#profile-name').textContent=new FormData(form).get('name')||'Alex Morgan';
result('Profile updated in the preview.',true)})}
if(page==='register'){document.querySelector('#register-form')?.addEventListener('submit',e=>{e.preventDefault();
const data=new FormData(e.target);
const valid=data.get('name').trim().length>2&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get('email'))&&data.get('password').length>=8&&/^STU-\d{4}$/.test(data.get('id'));
result(valid?'Registration valid. All four checks passed.':'Check name, email, password length, and Student ID format (STU-2026).',valid)})}
if(page==='calculator'){let expression='';
const display=document.querySelector('#display');
document.querySelectorAll('[data-key]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.key;
if(key==='C')expression='';
else if(key==='='){try{expression=String(Function(`return ${expression}`)())}catch{expression='Error'}}else if(['sin','cos','sqrt'].includes(key)){const value=Number(expression)||0;
expression=String(key==='sqrt'?Math.sqrt(value):key==='sin'?Math.sin(value*Math.PI/180):Math.cos(value*Math.PI/180))}else expression+=key;
display.value=expression||'0'}))}
if(page==='results'){document.querySelector('#marks-form')?.addEventListener('submit',e=>{e.preventDefault();
const values=new FormData(e.target).get('marks').split(',').map(Number).filter(Number.isFinite);
const total=values.reduce((a,b)=>a+b,0);
document.querySelector('#output').innerHTML=`<table><tr><th>COUNT</th><th>TOTAL</th><th>AVERAGE</th><th>HIGHEST</th><th>LOWEST</th></tr><tr><td>${values.length}</td><td>${total}</td><td>${(total/values.length).toFixed(1)}</td><td>${Math.max(...values)}</td><td>${Math.min(...values)}</td></tr></table>`})}
if(page==='todo'){const list=document.querySelector('#todo-list');
document.querySelector('#todo-form')?.addEventListener('submit',e=>{e.preventDefault();
const input=document.querySelector('#task');
if(input.value.trim()){const item=document.createElement('li');
item.innerHTML=`${input.value.trim()} <button>Remove</button>`;
item.querySelector('button').onclick=()=>item.remove();
list.append(item);
input.value=''}});
document.querySelectorAll('.todo-list button').forEach(button=>button.onclick=()=>button.parentElement.remove())}
if(page==='quiz'){document.querySelectorAll('[data-answer]').forEach(button=>button.onclick=()=>result(button.dataset.answer==='true'?'Correct. Score: 1 / 1':'Not quite. Score: 0 / 1',button.dataset.answer==='true'))}
function tick(){const now=new Date();
const time=now.toLocaleTimeString([],{hour12:false});
document.querySelector('#live-time')?.replaceChildren(time);
const target=new Date('2026-08-31T09:00:00');
const diff=Math.max(0,target-now);
const parts=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];
document.querySelector('#countdown')?.replaceChildren(`${parts[0]}d ${parts[1]}h ${parts[2]}m ${parts[3]}s`)}if(page==='clock'){tick();
setInterval(tick,1000)}
if(page==='cart'){function update(){let subtotal=0;
document.querySelectorAll('[data-price]').forEach(input=>subtotal+=Number(input.dataset.price)*Number(input.value||0));
const discount=subtotal>=35?subtotal*.1:0;
const tax=(subtotal-discount)*.08;
document.querySelector('#output').innerHTML=`Subtotal: $${subtotal.toFixed(2)}<br>Discount: -$${discount.toFixed(2)}<br>Tax: $${tax.toFixed(2)}<hr><strong>Total: $${(subtotal-discount+tax).toFixed(2)}</strong>`}document.querySelectorAll('[data-price]').forEach(input=>input.oninput=update);
update()}
if(page==='debug')document.querySelector('#bug-button')?.addEventListener('click',()=>{try{const student=null;
student.name='Alex'}catch(error){result(`Caught: ${error.message}. Inspect the null value in Sources.`)}});

