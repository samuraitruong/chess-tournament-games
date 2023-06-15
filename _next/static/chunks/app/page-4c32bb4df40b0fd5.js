(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{553:function(e,l,a){Promise.resolve().then(a.bind(a,4300))},4300:function(e,l,a){"use strict";a.r(l),a.d(l,{default:function(){return v}});var t=a(9268),s=a(2805),r=a(6006);let n=e=>{let{index:l,move:a,onChange:s,onTabPress:r}=e,n=(e,a)=>{s(l,e.target.value,a)},o=e=>{"Tab"===e.key&&r(l)};return(0,t.jsxs)("div",{className:"flex",children:[(0,t.jsxs)("div",{className:"w-32px pr-1",children:[l+1,"."]}),(0,t.jsx)("input",{type:"text",className:"border border-gray-300 rounded-md p-1 flex-grow w-full",value:a.w,onChange:e=>n(e,"w")}),(0,t.jsx)("input",{type:"text",className:"border border-gray-300 rounded-md p-1 flex-grow w-full",value:a.b,onChange:e=>n(e,"b"),onKeyUp:e=>o(e)})]})};var o=a(8945);function c(){let e=(0,s._)(["\n  grid-template-rows: repeat(2, 32px);\n"]);return c=function(){return e},e}let d=o.ZP.div(c()),u=e=>{let{onMoveChange:l}=e,a=(0,r.useRef)(null),[s,o]=(0,r.useState)([{label:"Event",value:"",lock:!0},{label:"Site",value:"",lock:!0},{label:"Date",value:"",lock:!0},{label:"Board",value:"",lock:!0},{label:"Round",value:"",lock:!0},{label:"White",value:"",lock:!0},{label:"Black",value:"",lock:!0},{label:"Result",value:"",lock:!0},{label:"TimeControl",value:"",lock:!0}]),[c,u]=(0,r.useState)(Array(20).fill({w:"",b:""})),[i,x]=(0,r.useState)(!0),b=(e,l)=>{let a=[...s];a[e].value=l.target.value,o(a)},v=(e,l)=>{let a=[...s];a[e].label=l.target.value,o(a)},h=(e,a,t)=>{u(s=>{let r=[...s];if(r[e]={...r[e],[t]:a},l){let e=[];for(let l of r){if(!l.w||(e.push(l.w),!l.b))break;e.push(l.b)}l(e)}return r})},m=e=>{e===c.length&&u([...c,{w:"",b:""}])};return(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{children:"PGN Attributes"}),(0,t.jsxs)("div",{className:"space-y-2",children:[s.map((e,l)=>(0,t.jsxs)("div",{className:"flex",children:[(0,t.jsx)("input",{type:"text",className:"border border-gray-300 rounded-md p-1 w-48 ".concat(e.lock?"disabled":""),disabled:e.lock,value:e.label,onChange:e=>v(l,e)}),(0,t.jsx)("input",{type:"text",className:"border border-gray-300 rounded-md p-1 flex-1",value:e.value,onChange:e=>b(l,e)})]},l)),(0,t.jsx)("button",{onClick:()=>{o([...s,{label:"",value:"",lock:!1}])},className:"mt-2",children:"Add Attribute"})]}),(0,t.jsx)("h2",{children:"PGN Moves"}),(0,t.jsxs)("div",{className:"mt-2",children:[(0,t.jsx)("button",{onClick:()=>{x(!i)},className:"mb-2",children:i?"Switch to Raw Mode":"Switch to Grid Mode"}),i?(0,t.jsx)(d,{className:"grid grid-cols-2 gap-1 h-500px overflow-y-auto",ref:a,children:c.map((e,l)=>(0,t.jsx)(n,{onTabPress:m,index:l,move:e,onChange:h},l))}):(0,t.jsx)("textarea",{className:"border border-gray-300 rounded-md p-2 w-full h-500px resize-none",rows:c.length,value:"",onChange:e=>{let l=e.target.value.split(" ").map((e,l)=>({moveIndex:l+1,fen:e}));u(l)}}),(0,t.jsxs)("div",{className:"flex space-x-4 mt-3",children:[(0,t.jsx)("button",{className:"px-4 py-2 bg-blue-500 text-white rounded",onClick:()=>{let e=[...c];for(let l=0;l<10;l++)e.push({w:"",b:""});u(e)},children:"+ Row"}),(0,t.jsx)("button",{className:"px-4 py-2 bg-red-500 text-white rounded",onClick:()=>{console.log(s),console.log(c)},children:"Save"})]})]})]})};var i=a(6702),x=a(8057);let b=e=>{let[l,a]=(0,r.useState)(new x.qQ);return(0,r.useEffect)(()=>{console.log("moves",e.moves);let l=new x.qQ;e.moves.forEach(e=>{try{l.move(e)}catch(e){}}),a(l)},[e.moves]),(0,t.jsxs)("div",{className:"w-full ",children:[(0,t.jsx)(i.r,{id:"BasicBoard",boardWidth:900,position:l.fen()}),";"]})};function v(){let[e,l]=(0,r.useState)([]);return(0,t.jsxs)("main",{className:"flex w-full  min-h-screen flex-row justify-between p-12",children:[(0,t.jsx)("div",{className:"w-9/12 p-4  items-center justify-center",children:(0,t.jsx)(b,{moves:e})}),(0,t.jsx)("div",{className:"w-3/12 p-4",children:(0,t.jsx)("div",{className:"bg-gray-300 p-4",children:(0,t.jsx)(u,{onMoveChange:e=>{l([...e])}})})})]})}}},function(e){e.O(0,[943,727,253,488,744],function(){return e(e.s=553)}),_N_E=e.O()}]);