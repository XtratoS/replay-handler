(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const r of c.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function l(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();function U(){}const Ie=e=>e;function Ge(e){return e()}function be(){return Object.create(null)}function P(e){e.forEach(Ge)}function he(e){return typeof e=="function"}function Oe(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function He(e){return Object.keys(e).length===0}function Ue(e,...t){if(e==null)return U;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function Ve(e,t,n){e.$$.on_destroy.push(Ue(t,n))}const Se=typeof window<"u";let Fe=Se?()=>window.performance.now():()=>Date.now(),_e=Se?e=>requestAnimationFrame(e):U;const Q=new Set;function je(e){Q.forEach(t=>{t.c(e)||(Q.delete(t),t.f())}),Q.size!==0&&_e(je)}function Je(e){let t;return Q.size===0&&_e(je),{promise:new Promise(n=>{Q.add(t={c:e,f:n})}),abort(){Q.delete(t)}}}function g(e,t){e.appendChild(t)}function Be(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function Ke(e){const t=y("style");return Ye(Be(e),t),t.sheet}function Ye(e,t){return g(e.head||e,t),t.sheet}function B(e,t,n){e.insertBefore(t,n||null)}function j(e){e.parentNode&&e.parentNode.removeChild(e)}function xe(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function y(e){return document.createElement(e)}function fe(e){return document.createTextNode(e)}function G(){return fe(" ")}function Qe(){return fe("")}function O(e,t,n,l){return e.addEventListener(t,n,l),()=>e.removeEventListener(t,n,l)}function b(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function We(e){return Array.from(e.childNodes)}function Pe(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function X(e,t){e.value=t??""}function me(e,t,n,l){n===null?e.style.removeProperty(t):e.style.setProperty(t,n,l?"important":"")}function Xe(e,t,{bubbles:n=!1,cancelable:l=!1}={}){const o=document.createEvent("CustomEvent");return o.initCustomEvent(e,n,l,t),o}const ue=new Map;let ce=0;function Ze(e){let t=5381,n=e.length;for(;n--;)t=(t<<5)-t^e.charCodeAt(n);return t>>>0}function et(e,t){const n={stylesheet:Ke(t),rules:{}};return ue.set(e,n),n}function we(e,t,n,l,o,c,r,a=0){const f=16.666/l;let s=`{
`;for(let A=0;A<=1;A+=f){const z=t+(n-t)*c(A);s+=A*100+`%{${r(z,1-z)}}
`}const h=s+`100% {${r(n,1-n)}}
}`,_=`__svelte_${Ze(h)}_${a}`,m=Be(e),{stylesheet:u,rules:p}=ue.get(m)||et(m,e);p[_]||(p[_]=!0,u.insertRule(`@keyframes ${_} ${h}`,u.cssRules.length));const C=e.style.animation||"";return e.style.animation=`${C?`${C}, `:""}${_} ${l}ms linear ${o}ms 1 both`,ce+=1,_}function tt(e,t){const n=(e.style.animation||"").split(", "),l=n.filter(t?c=>c.indexOf(t)<0:c=>c.indexOf("__svelte")===-1),o=n.length-l.length;o&&(e.style.animation=l.join(", "),ce-=o,ce||nt())}function nt(){_e(()=>{ce||(ue.forEach(e=>{const{ownerNode:t}=e.stylesheet;t&&j(t)}),ue.clear())})}let ge;function oe(e){ge=e}const x=[],ve=[];let W=[];const ye=[],lt=Promise.resolve();let pe=!1;function ot(){pe||(pe=!0,lt.then(De))}function V(e){W.push(e)}const ae=new Set;let J=0;function De(){if(J!==0)return;const e=ge;do{try{for(;J<x.length;){const t=x[J];J++,oe(t),rt(t.$$)}}catch(t){throw x.length=0,J=0,t}for(oe(null),x.length=0,J=0;ve.length;)ve.pop()();for(let t=0;t<W.length;t+=1){const n=W[t];ae.has(n)||(ae.add(n),n())}W.length=0}while(x.length);for(;ye.length;)ye.pop()();pe=!1,ae.clear(),oe(e)}function rt(e){if(e.fragment!==null){e.update(),P(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(V)}}function st(e){const t=[],n=[];W.forEach(l=>e.indexOf(l)===-1?t.push(l):n.push(l)),n.forEach(l=>l()),W=t}let te;function it(){return te||(te=Promise.resolve(),te.then(()=>{te=null})),te}function de(e,t,n){e.dispatchEvent(Xe(`${t?"intro":"outro"}${n}`))}const ie=new Set;let H;function ne(){H={r:0,c:[],p:H}}function le(){H.r||P(H.c),H=H.p}function S(e,t){e&&e.i&&(ie.delete(e),e.i(t))}function R(e,t,n,l){if(e&&e.o){if(ie.has(e))return;ie.add(e),H.c.push(()=>{ie.delete(e),l&&(n&&e.d(1),l())}),e.o(t)}else l&&l()}const ut={duration:0};function T(e,t,n,l){const o={direction:"both"};let c=t(e,n,o),r=l?0:1,a=null,f=null,s=null;function h(){s&&tt(e,s)}function _(u,p){const C=u.b-r;return p*=Math.abs(C),{a:r,b:u.b,d:C,duration:p,start:u.start,end:u.start+p,group:u.group}}function m(u){const{delay:p=0,duration:C=300,easing:A=Ie,tick:z=U,css:$}=c||ut,w={start:Fe()+p,b:u};u||(w.group=H,H.r+=1),a||f?f=w:($&&(h(),s=we(e,r,u,C,p,A,$)),u&&z(0,1),a=_(w,C),V(()=>de(e,u,"start")),Je(v=>{if(f&&v>f.start&&(a=_(f,C),f=null,de(e,a.b,"start"),$&&(h(),s=we(e,r,a.b,a.duration,0,A,c.css))),a){if(v>=a.end)z(r=a.b,1-r),de(e,a.b,"end"),f||(a.b?h():--a.group.r||P(a.group.c)),a=null;else if(v>=a.start){const M=v-a.start;r=a.a+a.d*A(M/a.duration),z(r,1-r)}}return!!(a||f)}))}return{run(u){he(c)?it().then(()=>{c=c(o),m(u)}):m(u)},end(){h(),a=f=null}}}function ct(e,t){R(e,1,1,()=>{t.delete(e.key)})}function ft(e,t,n,l,o,c,r,a,f,s,h,_){let m=e.length,u=c.length,p=m;const C={};for(;p--;)C[e[p].key]=p;const A=[],z=new Map,$=new Map,w=[];for(p=u;p--;){const i=_(o,c,p),d=n(i);let E=r.get(d);E?l&&w.push(()=>E.p(i,t)):(E=s(d,i),E.c()),z.set(d,A[p]=E),d in C&&$.set(d,Math.abs(p-C[d]))}const v=new Set,M=new Set;function L(i){S(i,1),i.m(a,h),r.set(i.key,i),h=i.first,u--}for(;m&&u;){const i=A[u-1],d=e[m-1],E=i.key,N=d.key;i===d?(h=i.first,m--,u--):z.has(N)?!r.has(E)||v.has(E)?L(i):M.has(N)?m--:$.get(E)>$.get(N)?(M.add(E),L(i)):(v.add(N),m--):(f(d,r),m--)}for(;m--;){const i=e[m];z.has(i.key)||f(i,r)}for(;u;)L(A[u-1]);return P(w),A}function at(e,t,n,l){const{fragment:o,after_update:c}=e.$$;o&&o.m(t,n),l||V(()=>{const r=e.$$.on_mount.map(Ge).filter(he);e.$$.on_destroy?e.$$.on_destroy.push(...r):P(r),e.$$.on_mount=[]}),c.forEach(V)}function dt(e,t){const n=e.$$;n.fragment!==null&&(st(n.after_update),P(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function pt(e,t){e.$$.dirty[0]===-1&&(x.push(e),ot(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ht(e,t,n,l,o,c,r,a=[-1]){const f=ge;oe(e);const s=e.$$={fragment:null,ctx:[],props:c,update:U,not_equal:o,bound:be(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(f?f.$$.context:[])),callbacks:be(),dirty:a,skip_bound:!1,root:t.target||f.$$.root};r&&r(s.root);let h=!1;if(s.ctx=n?n(e,t.props||{},(_,m,...u)=>{const p=u.length?u[0]:m;return s.ctx&&o(s.ctx[_],s.ctx[_]=p)&&(!s.skip_bound&&s.bound[_]&&s.bound[_](p),h&&pt(e,_)),m}):[],s.update(),h=!0,P(s.before_update),s.fragment=l?l(s.ctx):!1,t.target){if(t.hydrate){const _=We(t.target);s.fragment&&s.fragment.l(_),_.forEach(j)}else s.fragment&&s.fragment.c();t.intro&&S(e.$$.fragment),at(e,t.target,t.anchor,t.customElement),De()}oe(f)}class _t{$destroy(){dt(this,1),this.$destroy=U}$on(t,n){if(!he(n))return U;const l=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return l.push(n),()=>{const o=l.indexOf(n);o!==-1&&l.splice(o,1)}}$set(t){this.$$set&&!He(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function q(e,{delay:t=0,duration:n=400,easing:l=Ie}={}){const o=+getComputedStyle(e).opacity;return{delay:t,duration:n,easing:l,css:c=>`opacity: ${c*o}`}}const K=[];function mt(e,t=U){let n;const l=new Set;function o(a){if(Oe(e,a)&&(e=a,n)){const f=!K.length;for(const s of l)s[1](),K.push(s,e);if(f){for(let s=0;s<K.length;s+=2)K[s][0](K[s+1]);K.length=0}}}function c(a){o(a(e))}function r(a,f=U){const s=[a,f];return l.add(s),l.size===1&&(n=t(o)||U),a(e),()=>{l.delete(s),l.size===0&&n&&(n(),n=null)}}return{set:o,update:c,subscribe:r}}const gt=[{groupId:"quarterfinals-3nwt4jtfpz",matches:["A","B","C","D"]},{groupId:"semifinals-lb661h3ol6",matches:["E","F"]},{groupId:"final-dle1of2rmm",matches:["G"]},{groupId:"round-1-lkjy3wwzo5",matches:["A","B","C","D","E","F","G","H"]},{groupId:"round-2-11uzivgy87",matches:["I","J","K","L","M","N","O","P"]},{groupId:"round-3-odtpd92meu",matches:["Q","R","S","T","U","V","W","X"]},{groupId:"round-4-ryp2cvc3ne",matches:["Y","Z","AA","AB","AC","AD"]},{groupId:"round-5-vfxhdxq3ex",matches:["AE","AF","AG"]}],bt={matchGroups:gt},ke="MatchGroups____",Y=(()=>{const e=JSON.parse(localStorage.getItem(ke))||bt.matchGroups,t=mt(e),{update:n}=t;return{...t,update:o=>{n(c=>{const r=o(c);return localStorage.setItem(ke,JSON.stringify(r)),r})}}})();function ze(e,t,n){const l=e.slice();return l[30]=t[n],l}function Me(e,t,n){const l=e.slice();return l[33]=t[n],l[35]=n,l}function Le(e){let t,n=e[33]+"",l,o,c;function r(){return e[19](e[30],e[35])}return{c(){t=y("button"),l=fe(n),b(t,"class","group-match deletable svelte-1o2zy9f")},m(a,f){B(a,t,f),g(t,l),o||(c=O(t,"click",r),o=!0)},p(a,f){e=a,f[0]&32&&n!==(n=e[33]+"")&&Pe(l,n)},d(a){a&&j(t),o=!1,c()}}}function Ne(e,t){let n,l,o,c,r=t[30].groupId+"",a,f,s,h,_,m,u,p,C,A,z,$,w,v;function M(){return t[17](t[30])}function L(){return t[18](t[30])}let i=t[30].matches,d=[];for(let N=0;N<i.length;N+=1)d[N]=Le(Me(t,i,N));function E(){return t[20](t[30])}return{key:e,first:null,c(){n=y("div"),l=y("div"),o=y("div"),c=y("a"),a=fe(r),s=G(),h=y("button"),h.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="yellow" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path></svg>',_=G(),m=y("button"),m.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg>',u=G(),p=y("div");for(let N=0;N<d.length;N+=1)d[N].c();C=G(),A=y("button"),A.textContent="+",b(c,"href",f="https://ballchasing.com/group/"+t[30].groupId),b(c,"target","_blank"),b(c,"rel","noopener noreferrer"),b(o,"class","group-title"),b(h,"class","edit-group-name-btn svelte-1o2zy9f"),b(m,"class","remove-group-btn svelte-1o2zy9f"),b(l,"class","group-header svelte-1o2zy9f"),b(A,"class","group-match bg-dg c-p svelte-1o2zy9f"),b(p,"class","group-matches svelte-1o2zy9f"),b(n,"class","match-group svelte-1o2zy9f"),this.first=n},m(N,F){B(N,n,F),g(n,l),g(l,o),g(o,c),g(c,a),g(l,s),g(l,h),g(l,_),g(l,m),g(n,u),g(n,p);for(let I=0;I<d.length;I+=1)d[I]&&d[I].m(p,null);g(p,C),g(p,A),$=!0,w||(v=[O(h,"click",M),O(m,"click",L),O(A,"click",E)],w=!0)},p(N,F){if(t=N,(!$||F[0]&32)&&r!==(r=t[30].groupId+"")&&Pe(a,r),(!$||F[0]&32&&f!==(f="https://ballchasing.com/group/"+t[30].groupId))&&b(c,"href",f),F[0]&96){i=t[30].matches;let I;for(I=0;I<i.length;I+=1){const re=Me(t,i,I);d[I]?d[I].p(re,F):(d[I]=Le(re),d[I].c(),d[I].m(p,C))}for(;I<d.length;I+=1)d[I].d(1);d.length=i.length}},i(N){$||(V(()=>{$&&(z||(z=T(n,q,{duration:400},!0)),z.run(1))}),$=!0)},o(N){z||(z=T(n,q,{duration:400},!1)),z.run(0),$=!1},d(N){N&&j(n),xe(d,N),N&&z&&z.end(),w=!1,P(v)}}}function Ae(e){let t,n,l;return{c(){t=y("div"),b(t,"class","modal-backdrop svelte-1o2zy9f")},m(o,c){B(o,t,c),l=!0},i(o){l||(V(()=>{l&&(n||(n=T(t,q,{duration:200},!0)),n.run(1))}),l=!0)},o(o){n||(n=T(t,q,{duration:200},!1)),n.run(0),l=!1},d(o){o&&j(t),o&&n&&n.end()}}}function Ce(e){let t,n,l,o,c,r,a,f,s,h,_,m;return{c(){t=y("div"),n=y("button"),n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg>',l=G(),o=y("label"),o.textContent="New Match ID",c=G(),r=y("input"),a=G(),f=y("button"),f.textContent="Confirm",b(n,"class","void-container svelte-1o2zy9f"),b(o,"for","new-group-name"),me(o,"user-select","none"),b(r,"id","new-group-name"),r.autofocus=!0,b(r,"type","text"),b(r,"class","svelte-1o2zy9f"),b(f,"class","bg-dg svelte-1o2zy9f"),b(t,"class","modal svelte-1o2zy9f")},m(u,p){B(u,t,p),g(t,n),g(t,l),g(t,o),g(t,c),g(t,r),X(r,e[4]),g(t,a),g(t,f),h=!0,r.focus(),_||(m=[O(n,"click",e[23]),O(r,"input",e[24]),O(r,"input",e[13]),O(f,"click",e[11])],_=!0)},p(u,p){p[0]&16&&r.value!==u[4]&&X(r,u[4])},i(u){h||(V(()=>{h&&(s||(s=T(t,q,{duration:200},!0)),s.run(1))}),h=!0)},o(u){s||(s=T(t,q,{duration:200},!1)),s.run(0),h=!1},d(u){u&&j(t),u&&s&&s.end(),_=!1,P(m)}}}function Ee(e){let t,n,l,o,c,r,a,f,s,h,_,m;return{c(){t=y("div"),n=y("button"),n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg>',l=G(),o=y("label"),o.textContent="New Group Name",c=G(),r=y("input"),a=G(),f=y("button"),f.textContent="Confirm",b(n,"class","void-container svelte-1o2zy9f"),b(o,"for","new-group-name"),me(o,"user-select","none"),b(r,"id","new-group-name"),r.autofocus=!0,b(r,"type","text"),b(r,"class","svelte-1o2zy9f"),b(f,"class","bg-dg svelte-1o2zy9f"),b(t,"class","modal svelte-1o2zy9f")},m(u,p){B(u,t,p),g(t,n),g(t,l),g(t,o),g(t,c),g(t,r),X(r,e[3]),g(t,a),g(t,f),h=!0,r.focus(),_||(m=[O(n,"click",e[25]),O(r,"input",e[26]),O(f,"click",e[12])],_=!0)},p(u,p){p[0]&8&&r.value!==u[3]&&X(r,u[3])},i(u){h||(V(()=>{h&&(s||(s=T(t,q,{duration:200},!0)),s.run(1))}),h=!0)},o(u){s||(s=T(t,q,{duration:200},!1)),s.run(0),h=!1},d(u){u&&j(t),u&&s&&s.end(),_=!1,P(m)}}}function $e(e){let t,n,l,o,c,r,a,f,s,h,_,m;return{c(){t=y("div"),n=y("button"),n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg>',l=G(),o=y("label"),o.textContent="New Group Name",c=G(),r=y("input"),a=G(),f=y("button"),f.textContent="Confirm",b(n,"class","void-container svelte-1o2zy9f"),b(o,"for","new-group-name"),me(o,"user-select","none"),b(r,"id","new-group-name"),r.autofocus=!0,b(r,"type","text"),b(r,"class","svelte-1o2zy9f"),b(f,"class","bg-dg svelte-1o2zy9f"),b(t,"class","modal svelte-1o2zy9f")},m(u,p){B(u,t,p),g(t,n),g(t,l),g(t,o),g(t,c),g(t,r),X(r,e[3]),g(t,a),g(t,f),h=!0,r.focus(),_||(m=[O(n,"click",e[27]),O(r,"input",e[28]),O(f,"click",e[14])],_=!0)},p(u,p){p[0]&8&&r.value!==u[3]&&X(r,u[3])},i(u){h||(V(()=>{h&&(s||(s=T(t,q,{duration:200},!0)),s.run(1))}),h=!0)},o(u){s||(s=T(t,q,{duration:200},!1)),s.run(0),h=!1},d(u){u&&j(t),u&&s&&s.end(),_=!1,P(m)}}}function wt(e){let t,n=[],l=new Map,o,c,r,a,f,s,h,_,m,u,p,C,A,z=e[5];const $=i=>i[30];for(let i=0;i<z.length;i+=1){let d=ze(e,z,i),E=$(d);l.set(E,n[i]=Ne(E,d))}let w=(e[0]||e[1]||e[2])&&Ae(),v=e[1]&&Ce(e),M=e[0]&&Ee(e),L=e[2]&&$e(e);return{c(){t=y("div");for(let i=0;i<n.length;i+=1)n[i].c();o=G(),c=y("div"),r=y("button"),r.textContent="New Group",a=G(),f=y("button"),f.textContent="Download Config",s=G(),w&&w.c(),h=G(),v&&v.c(),_=G(),M&&M.c(),m=G(),L&&L.c(),u=Qe(),b(r,"class","match-group bg-dg c-p svelte-1o2zy9f"),b(f,"class","match-group bg-db c-p svelte-1o2zy9f"),b(c,"class","match-group flex-row-eq svelte-1o2zy9f"),b(t,"class","container svelte-1o2zy9f")},m(i,d){B(i,t,d);for(let E=0;E<n.length;E+=1)n[E]&&n[E].m(t,null);g(t,o),g(t,c),g(c,r),g(c,a),g(c,f),B(i,s,d),w&&w.m(i,d),B(i,h,d),v&&v.m(i,d),B(i,_,d),M&&M.m(i,d),B(i,m,d),L&&L.m(i,d),B(i,u,d),p=!0,C||(A=[O(r,"click",e[21]),O(f,"click",e[22])],C=!0)},p(i,d){d[0]&1504&&(z=i[5],ne(),n=ft(n,d,$,1,i,z,l,t,ct,Ne,o,ze),le()),i[0]||i[1]||i[2]?w?d[0]&7&&S(w,1):(w=Ae(),w.c(),S(w,1),w.m(h.parentNode,h)):w&&(ne(),R(w,1,1,()=>{w=null}),le()),i[1]?v?(v.p(i,d),d[0]&2&&S(v,1)):(v=Ce(i),v.c(),S(v,1),v.m(_.parentNode,_)):v&&(ne(),R(v,1,1,()=>{v=null}),le()),i[0]?M?(M.p(i,d),d[0]&1&&S(M,1)):(M=Ee(i),M.c(),S(M,1),M.m(m.parentNode,m)):M&&(ne(),R(M,1,1,()=>{M=null}),le()),i[2]?L?(L.p(i,d),d[0]&4&&S(L,1)):(L=$e(i),L.c(),S(L,1),L.m(u.parentNode,u)):L&&(ne(),R(L,1,1,()=>{L=null}),le())},i(i){if(!p){for(let d=0;d<z.length;d+=1)S(n[d]);S(w),S(v),S(M),S(L),p=!0}},o(i){for(let d=0;d<n.length;d+=1)R(n[d]);R(w),R(v),R(M),R(L),p=!1},d(i){i&&j(t);for(let d=0;d<n.length;d+=1)n[d].d();i&&j(s),w&&w.d(i),i&&j(h),v&&v.d(i),i&&j(_),M&&M.d(i),i&&j(m),L&&L.d(i),i&&j(u),C=!1,P(A)}}}function vt(e,t,n){let l;Ve(e,Y,k=>n(5,l=k));let o=!1,c=!1,r=!1,a,f="",s="";const h=(k,D)=>{Y.update(se=>(k.matches=k.matches.filter((Z,ee)=>ee!==D),[...se]))},_=k=>{Y.update(D=>D.filter(Z=>Z!==k))},m=k=>{n(1,c=!0),a=k},u=()=>{n(0,o=!0)},p=k=>{n(2,r=!0),a=k,n(3,f=a.groupId)},C=()=>{Y.update(k=>{const D=[...k];return a.matches.push(s),D}),w()},A=()=>{Y.update(k=>[...k,{groupId:f,matches:[]}]),w()},z=k=>{n(4,s=k.target.value.toUpperCase())},$=()=>{Y.update(k=>{const D=[...k];return a.groupId=f,D}),w()},w=()=>{n(3,f=""),a=null,n(1,c=!1),n(0,o=!1),n(2,r=!1)},v=k=>{const D=JSON.stringify({matchGroups:k},null,"	"),se=new Blob([D],{type:"application/json"}),Z=URL.createObjectURL(se),ee=document.createElement("a");ee.href=Z,ee.download="config.json",ee.click(),URL.revokeObjectURL(Z)},M=k=>p(k),L=k=>_(k),i=(k,D)=>h(k,D),d=k=>m(k),E=()=>u(),N=()=>v(l),F=()=>w();function I(){s=this.value,n(4,s)}const re=()=>w();function Re(){f=this.value,n(3,f)}const Te=()=>w();function qe(){f=this.value,n(3,f)}return[o,c,r,f,s,l,h,_,m,u,p,C,A,z,$,w,v,M,L,i,d,E,N,F,I,re,Re,Te,qe]}class yt extends _t{constructor(t){super(),ht(this,t,vt,wt,Oe,{},null,[-1,-1])}}new yt({target:document.getElementById("app")});
