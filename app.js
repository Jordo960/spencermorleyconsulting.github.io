'use strict';
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
function closeMenu(restore=false){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');if(restore)menu.focus();}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
const form = document.querySelector('form[data-kind]');
function previewForm(values){
 if(!form)return {ok:false,message:'This page has no request form.'};
 if(values){for(const [key,value] of Object.entries(values)){const input=form.elements.namedItem(key);if(input && typeof value==='string') input.value=value;}}
 if(!form.reportValidity())return {ok:false,message:'Complete the required fields with a valid email address and, for a Check, a full website URL.'};
 const status=form.querySelector('.form-status');
 status.textContent=form.dataset.kind==='check'?'Preview complete. Your Discoverability Check request has not been sent. This mockup stores nothing. Use Book a 15-minute call to talk with SMC.':'Preview complete. Your call request has not been sent and no time is booked. This mockup stores nothing. Use Book a 15-minute call to choose a time on Calendly.';
 status.focus();
 return {ok:true,message:status.textContent,bookingUrl:'https://calendly.com/jordan-spencermorleyconsulting/15min'};
}
if(form)form.addEventListener('submit',event=>{event.preventDefault();previewForm();});
// Progressive enhancement. Current API plus the navigator API requested in the brief.
// Reference: https://developer.chrome.com/docs/ai/webmcp/imperative-api
const modelContext=document.modelContext||navigator.modelContext;
const common={name:{type:'string',description:'Your name'},email:{type:'string',format:'email',description:'Email address'},organization:{type:'string',description:'Business or organization'},message:{type:'string',description:'Optional discussion topic'}};
const toolDefinitions=[
 {name:'book_call',description:'Preview the visible call request. This does not send data or book a time. The visible Book a 15-minute call link opens Calendly.',inputSchema:{type:'object',properties:common,required:['name','email','organization'],additionalProperties:false},execute:async args=>{
  if(form?.dataset.kind!=='call')return JSON.stringify({ok:false,message:'Use the call request form on the home page, or the visible Calendly link.',url:new URL('index.html#contact',document.baseURI).href});
  return JSON.stringify(previewForm(args));
 }},
 {name:'request_discoverability_check',description:'Preview the visible Discoverability Check request. Mockup only: no request is sent and no information is saved.',inputSchema:{type:'object',properties:{...common,website:{type:'string',format:'uri',description:'Full business website URL'}},required:['name','email','organization','website'],additionalProperties:false},execute:async args=>{
  if(form?.dataset.kind!=='check')return JSON.stringify({ok:false,message:'Open the small-business page to preview the visible Discoverability Check form.',url:new URL('small-business.html#contact',document.baseURI).href});
  return JSON.stringify(previewForm(args));
 }}
];
if(modelContext&&typeof modelContext.registerTool==='function'){
 for(const tool of toolDefinitions){try{Promise.resolve(modelContext.registerTool(tool)).catch(()=>{});}catch{/* The visible forms remain available if the experimental API rejects registration. */}}
}
/* Bearings: progressive, once-only presentation. No requests, storage or dependencies. */
(() => {
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  let dispose=()=>{},entered=false;
  function setup(){
    dispose();
    const root=document.documentElement,header=document.querySelector('.site-header');
    if(preference.matches||!Element.prototype.animate){root.dataset.motion='static';return;}
    root.dataset.motion='bearings';
    const active=new Set(),observers=[],sweep=document.querySelector('.signature-chapter');
    const fields=[...document.querySelectorAll('.page-hero .compass-field .smc-sym,.home-hero .hero-compass .compass-medium')];
    let frame=0,stopped=false;
    const easing='cubic-bezier(.22,1,.36,1)';
    function play(el,frames,options={},kind='reveal'){
      if(!el||stopped)return;
      try{const a=el.animate(frames,{duration:620,easing,...options});a.id='smc-'+kind;active.add(a);a.finished.then(()=>{active.delete(a);a.cancel()},()=>active.delete(a));return a;}catch{/* Static source remains complete. */}
    }
    function settle(){active.forEach(a=>a.cancel());sweep?.classList.remove('is-sweeping');}
    function focus(e){for(const a of active)if(a.effect?.target?.contains(e.target))a.cancel();}
    function keyboard(e){if(e.key==='Tab'||e.key==='Escape')settle();}
    function visibility(){if(document.hidden)settle();}
    function paint(){frame=0;if(stopped)return;header?.classList.toggle('is-condensed',scrollY>60);}
    function scroll(){if(!frame)frame=requestAnimationFrame(paint);}
    dispose=()=>{stopped=true;observers.forEach(o=>o.disconnect());settle();if(frame)cancelAnimationFrame(frame);fields.forEach(el=>el.style.removeProperty('transform'));header?.classList.remove('is-condensed');document.removeEventListener('focusin',focus);document.removeEventListener('keydown',keyboard);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('scroll',scroll);root.dataset.motion='static';};
    document.addEventListener('focusin',focus);document.addEventListener('keydown',keyboard);document.addEventListener('visibilitychange',visibility);window.addEventListener('scroll',scroll,{passive:true});paint();
    if(!entered&&!location.hash&&scrollY<10){
      entered=true;
      const lines=document.querySelectorAll('.home-intro h1>span');
      if(lines.length)lines.forEach((el,i)=>play(el,[{transform:'translateY(24px)'},{transform:'none'}],{duration:700,delay:i*60,fill:'backwards'},'type'));
      else play(document.querySelector('.page-hero h1'),[{transform:'translateY(24px)'},{transform:'none'}],{duration:700},'type');
      document.querySelectorAll('.hero-compass .compass-stroke').forEach((el,i)=>play(el,[{opacity:0,transform:'scale(.96)'},{opacity:1,transform:'none'}],{duration:580,delay:i*60,fill:'backwards'},'compass-draw'));
      /* Bearing: the compass starts a few degrees off and settles to true north. Reversed 2026-09-18; it previously tilted away from north on scroll. */
      play(document.querySelector('.hero-compass .compass-medium'),[{transform:'rotate(-9deg)'},{transform:'rotate(0deg)'}],{duration:1400,fill:'backwards'},'bearing');
      play(document.querySelector('.hero-bottom'),[{transform:'scaleX(.95)',opacity:.1},{transform:'none',opacity:1}],{duration:650,delay:120,fill:'backwards'},'horizon');
    }
    if(typeof IntersectionObserver!=='function')return;
    const reveal=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){reveal.unobserve(e.target);play(e.target,[{transform:'translateY(24px)',opacity:0},{transform:'none',opacity:1}],{duration:620},'reveal');}},{threshold:0,rootMargin:'0px 0px -35px'});observers.push(reveal);
    const targets=[...document.querySelectorAll('main>section:not(.bearing-hero):not(.trust)>.wrap,.profile-copy,.reading-section,.definition-inner')];
    targets.filter(el=>el.getBoundingClientRect().top>=innerHeight).forEach(el=>reveal.observe(el));
    const rules=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){rules.unobserve(e.target);play(e.target,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:650,pseudoElement:'::before'},'ladder-rule');}},{threshold:.1});observers.push(rules);document.querySelectorAll('.offer-list li').forEach(el=>rules.observe(el));
    if(sweep){const light=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting))return;light.disconnect();sweep.classList.add('is-sweeping');play(sweep.querySelector('h2'),[{transform:'translateY(24px)'},{transform:'none'}],{duration:1000},'signature');sweep.addEventListener('animationend',()=>sweep.classList.remove('is-sweeping'),{once:true});},{threshold:.15});light.observe(sweep);observers.push(light);}
  }
  preference.addEventListener('change',setup);setup();
})();

/* Compass ownership is static visibility, independent of the motion preference. */
(()=>{
 const root=document.documentElement,header=document.querySelector('.site-header'),hero=document.querySelector('.bearing-hero');
 const primary=hero?.querySelector('.home-hero .hero-compass,.page-hero .compass-field');
 const markers=[...document.querySelectorAll('.section>.wrap,.definition-inner')].filter(el=>getComputedStyle(el,'::before').maskImage.includes('compass.svg'));
 const others=[...document.querySelectorAll('.document-top .smc-sym,.footer-logo')];
 let current=null,frame=0;
 function paint(){
  frame=0;const floor=header.getBoundingClientRect().bottom;
  const visible=(r)=>r.bottom>floor&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;
  let next=null;
  if(primary&&visible(hero.getBoundingClientRect())&&visible(primary.getBoundingClientRect()))next=primary;
  if(!next)next=markers.find(el=>{const r=el.getBoundingClientRect(),size=parseFloat(getComputedStyle(el,'::before').height);return visible({top:r.top,bottom:r.top+size,left:r.left,right:r.right});})||others.find(el=>visible(el.getBoundingClientRect()));
  if(next!==current){current?.removeAttribute('data-compass-visible');next?.setAttribute('data-compass-visible','');current=next;}
  root.toggleAttribute('data-content-compass',!!next);
 }
 function update(){if(!frame)frame=requestAnimationFrame(paint);}
 addEventListener('scroll',update,{passive:true});addEventListener('resize',update);document.addEventListener('toggle',update,true);document.addEventListener('click',update);document.fonts.ready.then(update);paint();
})();
