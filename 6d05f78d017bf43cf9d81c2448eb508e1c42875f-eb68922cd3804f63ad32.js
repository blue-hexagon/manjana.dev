"use strict";(self.webpackChunkgatsby_starter_hello_world=self.webpackChunkgatsby_starter_hello_world||[]).push([[60],{97:function(e,t,r){r.r(t),r.d(t,{default:function(){return A}});var o=r(7294),n=r(5295),i=r(3584),a=r(512),s=r(4780),l=r(8216),c=r(948),p=r(3065),m=r(902),u=r(8628),d=r(1588),f=r(4867);function b(e){return(0,f.ZP)("MuiIcon",e)}(0,d.Z)("MuiIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var g=r(5893);const y=(0,c.ZP)("span",{name:"MuiIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,"inherit"!==r.color&&t[`color${(0,l.Z)(r.color)}`],t[`fontSize${(0,l.Z)(r.fontSize)}`]]}})((0,p.Z)((({theme:e})=>({userSelect:"none",width:"1em",height:"1em",overflow:"hidden",display:"inline-block",textAlign:"center",flexShrink:0,variants:[{props:{fontSize:"inherit"},style:{fontSize:"inherit"}},{props:{fontSize:"small"},style:{fontSize:e.typography.pxToRem(20)}},{props:{fontSize:"medium"},style:{fontSize:e.typography.pxToRem(24)}},{props:{fontSize:"large"},style:{fontSize:e.typography.pxToRem(36)}},{props:{color:"action"},style:{color:(e.vars||e).palette.action.active}},{props:{color:"disabled"},style:{color:(e.vars||e).palette.action.disabled}},{props:{color:"inherit"},style:{color:void 0}},...Object.entries(e.palette).filter((0,m.Z)()).map((([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}})))]})))),h=o.forwardRef((function(e,t){const r=(0,u.i)({props:e,name:"MuiIcon"}),{baseClassName:o="material-icons",className:n,color:i="inherit",component:c="span",fontSize:p="medium",...m}=r,d={...r,baseClassName:o,color:i,component:c,fontSize:p},f=(e=>{const{color:t,fontSize:r,classes:o}=e,n={root:["root","inherit"!==t&&`color${(0,l.Z)(t)}`,`fontSize${(0,l.Z)(r)}`]};return(0,s.Z)(n,b,o)})(d);return(0,g.jsx)(y,{as:c,className:(0,a.Z)(o,"notranslate",f.root,n),ownerState:d,"aria-hidden":!0,ref:t,...m})}));h&&(h.muiName="Icon");var v=h,w=r(4102),S=r(3972),k=r(5725);function O(e){return(0,f.ZP)("MuiCardMedia",e)}(0,d.Z)("MuiCardMedia",["root","media","img"]);const Z=(0,c.ZP)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e,{isMediaComponent:o,isImageComponent:n}=r;return[t.root,o&&t.media,n&&t.img]}})({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center",variants:[{props:{isMediaComponent:!0},style:{width:"100%"}},{props:{isImageComponent:!0},style:{objectFit:"cover"}}]}),j=["video","audio","picture","iframe","img"],C=["picture","img"];var E=o.forwardRef((function(e,t){const r=(0,u.i)({props:e,name:"MuiCardMedia"}),{children:o,className:n,component:i="div",image:l,src:c,style:p,...m}=r,d=j.includes(i),f=!d&&l?{backgroundImage:`url("${l}")`,...p}:p,b={...r,component:i,isMediaComponent:d,isImageComponent:C.includes(i)},y=(e=>{const{classes:t,isMediaComponent:r,isImageComponent:o}=e,n={root:["root",r&&"media",o&&"img"]};return(0,s.Z)(n,O,t)})(b);return(0,g.jsx)(Z,{className:(0,a.Z)(y.root,n),as:i,role:!d&&l?"img":void 0,ref:t,style:f,ownerState:b,src:d?l||c:void 0,...m,children:o})})),z=r(2643),P=r(461),x=r(9827),M=r(2091);r(2114);const N=[{title:"Armada",description:"Distributed systems pentesting tool with decentralized C2 infrastructure.",image:"https://picsum.photos/id/232/600/400",link:"/projects/armada",tags:["Cybersecurity","P2P","C2"],packageAvailable:"pip"},{title:"HyperSnitch",description:"Website monitoring tool that alerts when specific content is added or removed.",image:"https://picsum.photos/id/231/600/400",link:"/projects/hypersnitch",tags:["Monitoring","Automation","Web Scraping"],packageAvailable:"npm"},{title:"Password Cracker",description:"Distributed password hash cracker built with scalability in mind.",image:"https://picsum.photos/id/2/600/400",link:"/projects/password-cracker",tags:["Security","Distributed Computing"],packageAvailable:null}],I=(0,x.Z)(n.Z)((e=>{let{theme:t}=e;return{position:"relative",transition:"transform 0.3s, box-shadow 0.3s","&:hover":{transform:"scale(1.05)",boxShadow:"0px 8px 16px rgba(0, 0, 0, 0.3)"},backgroundColor:"#1c1c1c"}})),R=((0,x.Z)("span")((e=>{let{theme:t}=e;return{backgroundColor:"#8ab4f8",color:"#ffffff",padding:"0.2rem 0.5rem",borderRadius:"4px",marginRight:"0.3rem",fontSize:"0.75rem"}})),e=>{let{type:t}=e;return o.createElement(i.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center",width:48,height:48,backgroundColor:"rgba(0, 0, 0, 0.4)",borderRadius:"50%",color:"white"}},o.createElement(v,{size:"large",sx:{color:"white",fontSize:"2rem",mb:"4px"}},"pip"===t&&o.createElement(M.osz,null)," ","npm"===t&&o.createElement(M.yQA,null)," "))});var A=()=>o.createElement(w.Z,{sx:{py:5}},o.createElement(S.Z,{variant:"h3",color:"#ffffff",gutterBottom:!0},"My Projects"),o.createElement(S.Z,{variant:"subtitle1",color:"#bdbdbd",paragraph:!0},"A selection of my work across distributed systems, cybersecurity, and automation."),o.createElement(k.ZP,{container:!0,spacing:4},N.map(((e,t)=>o.createElement(k.ZP,{item:!0,key:t,xs:12,sm:6,md:4},o.createElement(I,null,o.createElement(i.Z,{position:"relative"},o.createElement(E,{component:"img",height:"180",image:e.image,alt:e.title,sx:{filter:"brightness(0.75)","&:hover":{filter:"brightness(1)"}}}),e.packageAvailable&&o.createElement(i.Z,{position:"absolute",top:8,right:8},o.createElement(R,{type:e.packageAvailable}))),o.createElement(z.Z,null,o.createElement(S.Z,{gutterBottom:!0,variant:"h5",color:"#ffffff"},e.title),o.createElement(S.Z,{variant:"body2",color:"#bdbdbd"},e.description),o.createElement(i.Z,{mt:2},e.tags.map(((e,t)=>o.createElement(P.Z,{key:t,label:e,variant:"outlined"})))))))))))},3621:function(e,t,r){r.d(t,{w_:function(){return d}});var o=r(7294),n={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=o.createContext&&o.createContext(n),a=["attr","size","title"];function s(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r={};for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){if(t.indexOf(o)>=0)continue;r[o]=e[o]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},l.apply(this,arguments)}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){m(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function m(e,t,r){var o;return(t="symbol"==typeof(o=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!=typeof o)return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?o:o+"")in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e){return e&&e.map(((e,t)=>o.createElement(e.tag,p({key:t},e.attr),u(e.child))))}function d(e){return t=>o.createElement(f,l({attr:p({},e.attr)},t),u(e.child))}function f(e){var t=t=>{var r,{attr:n,size:i,title:c}=e,m=s(e,a),u=i||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),o.createElement("svg",l({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,n,m,{className:r,style:p(p({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),c&&o.createElement("title",null,c),e.children)};return void 0!==i?o.createElement(i.Consumer,null,(e=>t(e))):t(n)}}}]);
//# sourceMappingURL=6d05f78d017bf43cf9d81c2448eb508e1c42875f-eb68922cd3804f63ad32.js.map