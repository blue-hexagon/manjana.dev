"use strict";(self.webpackChunkgatsby_starter_hello_world=self.webpackChunkgatsby_starter_hello_world||[]).push([[221,216,452,80],{3584:function(e,t,r){r.d(t,{Z:function(){return c}});var n=r(2971),o=r(7078),a=r(6476),i=r(606);var l=(0,r(1588).Z)("MuiBox",["root"]);const s=(0,a.Z)();var c=(0,n.Z)({themeId:i.Z,defaultTheme:s,defaultClassName:l.root,generateClassName:o.Z.generate})},9077:function(e,t,r){r.d(t,{Z:function(){return N}});var n=r(7294),o=r(512),a=r(7317),i=r(4867),l=r(4780),s=r(9827),c=r(7333),d=r(5594),u=r(9707),m=r(2391);const p=(e,t,r)=>{const n=e.keys[0];if(Array.isArray(t))t.forEach(((t,n)=>{r(((t,r)=>{n<=e.keys.length-1&&(0===n?Object.assign(t,r):t[e.up(e.keys[n])]=r)}),t)}));else if(t&&"object"==typeof t){(Object.keys(t).length>e.keys.length?e.keys:(o=e.keys,a=Object.keys(t),o.filter((e=>a.includes(e))))).forEach((o=>{if(e.keys.includes(o)){const a=t[o];void 0!==a&&r(((t,r)=>{n===o?Object.assign(t,r):t[e.up(o)]=r}),a)}}))}else"number"!=typeof t&&"string"!=typeof t||r(((e,t)=>{Object.assign(e,t)}),t);var o,a};function f(e){return`--Grid-${e}Spacing`}function g(e){return`--Grid-parent-${e}Spacing`}const h="--Grid-columns",v="--Grid-parent-columns",b=({theme:e,ownerState:t})=>{const r={};return p(e.breakpoints,t.size,((e,t)=>{let n={};"grow"===t&&(n={flexBasis:0,flexGrow:1,maxWidth:"100%"}),"auto"===t&&(n={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"}),"number"==typeof t&&(n={flexGrow:0,flexBasis:"auto",width:`calc(100% * ${t} / var(${v}) - (var(${v}) - ${t}) * (var(${g("column")}) / var(${v})))`}),e(r,n)})),r},y=({theme:e,ownerState:t})=>{const r={};return p(e.breakpoints,t.offset,((e,t)=>{let n={};"auto"===t&&(n={marginLeft:"auto"}),"number"==typeof t&&(n={marginLeft:0===t?"0px":`calc(100% * ${t} / var(${v}) + var(${g("column")}) * ${t} / var(${v}))`}),e(r,n)})),r},x=({theme:e,ownerState:t})=>{if(!t.container)return{};const r={[h]:12};return p(e.breakpoints,t.columns,((e,t)=>{const n=t??12;e(r,{[h]:n,"> *":{[v]:n}})})),r},S=({theme:e,ownerState:t})=>{if(!t.container)return{};const r={};return p(e.breakpoints,t.rowSpacing,((t,n)=>{const o="string"==typeof n?n:e.spacing?.(n);t(r,{[f("row")]:o,"> *":{[g("row")]:o}})})),r},Z=({theme:e,ownerState:t})=>{if(!t.container)return{};const r={};return p(e.breakpoints,t.columnSpacing,((t,n)=>{const o="string"==typeof n?n:e.spacing?.(n);t(r,{[f("column")]:o,"> *":{[g("column")]:o}})})),r},w=({theme:e,ownerState:t})=>{if(!t.container)return{};const r={};return p(e.breakpoints,t.direction,((e,t)=>{e(r,{flexDirection:t})})),r},k=({ownerState:e})=>({minWidth:0,boxSizing:"border-box",...e.container&&{display:"flex",flexWrap:"wrap",...e.wrap&&"wrap"!==e.wrap&&{flexWrap:e.wrap},gap:`var(${f("row")}) var(${f("column")})`}}),E=e=>{const t=[];return Object.entries(e).forEach((([e,r])=>{!1!==r&&void 0!==r&&t.push(`grid-${e}-${String(r)}`)})),t},$=(e,t="xs")=>{function r(e){return void 0!==e&&("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e&&e>0)}if(r(e))return[`spacing-${t}-${String(e)}`];if("object"==typeof e&&!Array.isArray(e)){const t=[];return Object.entries(e).forEach((([e,n])=>{r(n)&&t.push(`spacing-${e}-${String(n)}`)})),t}return[]},C=e=>void 0===e?[]:"object"==typeof e?Object.entries(e).map((([e,t])=>`direction-${e}-${t}`)):[`direction-xs-${String(e)}`];var j=r(5893);const A=(0,m.Z)(),M=(0,s.Z)("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>t.root});function P(e){return(0,c.Z)({props:e,name:"MuiGrid",defaultTheme:A})}var z=r(948),O=r(8628);const R=function(e={}){const{createStyledComponent:t=M,useThemeProps:r=P,componentName:s="MuiGrid"}=e;function c(e,t,r=(()=>!0)){const n={};return null===e||(Array.isArray(e)?e.forEach(((e,o)=>{null!==e&&r(e)&&t.keys[o]&&(n[t.keys[o]]=e)})):"object"==typeof e?Object.keys(e).forEach((t=>{const o=e[t];null!=o&&r(o)&&(n[t]=o)})):n[t.keys[0]]=e),n}const m=t(x,Z,S,b,w,k,y),p=n.forwardRef((function(e,t){const p=(0,d.Z)(),f=r(e),g=(0,u.Z)(f),{className:h,children:v,columns:b=12,container:y=!1,component:x="div",direction:S="row",wrap:Z="wrap",size:w={},offset:k={},spacing:A=0,rowSpacing:M=A,columnSpacing:P=A,unstable_level:z=0,...O}=g,R=c(w,p.breakpoints,(e=>!1!==e)),N=c(k,p.breakpoints),I=e.columns??(z?void 0:b),G=e.spacing??(z?void 0:A),L=e.rowSpacing??e.spacing??(z?void 0:M),W=e.columnSpacing??e.spacing??(z?void 0:P),T={...g,level:z,columns:I,container:y,direction:S,wrap:Z,spacing:G,rowSpacing:L,columnSpacing:W,size:R,offset:N},B=((e,t)=>{const{container:r,direction:n,spacing:o,wrap:a,size:c}=e,d={root:["root",r&&"container","wrap"!==a&&`wrap-xs-${String(a)}`,...C(n),...E(c),...r?$(o,t.breakpoints.keys[0]):[]]};return(0,l.Z)(d,(e=>(0,i.ZP)(s,e)),{})})(T,p);return(0,j.jsx)(m,{ref:t,as:x,ownerState:T,className:(0,o.Z)(B.root,h),...O,children:n.Children.map(v,(e=>n.isValidElement(e)&&(0,a.Z)(e,["Grid"])&&y&&e.props.container?n.cloneElement(e,{unstable_level:e.props?.unstable_level??z+1}):e))})}));return p.muiName="Grid",p}({createStyledComponent:(0,z.ZP)("div",{name:"MuiGrid2",slot:"Root",overridesResolver:(e,t)=>t.root}),componentName:"MuiGrid2",useThemeProps:e=>(0,O.i)({props:e,name:"MuiGrid2"})});var N=R},9486:function(e,t,r){r.r(t);var n=r(3972),o=r(9077),a=r(2574),i=r(7845),l=r(7294);const s=["React","JavaScript","CSS","Web Development","Performance"];t.default=()=>l.createElement(l.Fragment,null,l.createElement(n.Z,{variant:"h6",gutterBottom:!0,sx:{marginTop:2}},"Filter"),l.createElement(o.Z,{container:!0,spacing:2},s.map(((e,t)=>l.createElement(o.Z,{item:!0,key:t},l.createElement(a.Z,{variant:"outlined"},e)))),l.createElement(i.Z,{label:"Search Articles",variant:"standard",fullWidth:!0,size:"medium",sx:{marginBottom:2}})))},8974:function(e,t,r){r.r(t);var n=r(7294),o=r(2574),a=r(5725),i=r(3972);t.default=()=>{const{0:e,1:t}=(0,n.useState)(!1);return n.createElement("div",null,n.createElement(o.Z,{variant:"contained",onClick:()=>t(!e)},e?"Hide":"Show"," Details"),n.createElement(a.ZP,{container:!0,spacing:2,style:{marginTop:"16px"}},n.createElement(a.ZP,{item:!0,xs:12},n.createElement("div",{style:{overflow:"hidden",height:e?"auto":"0",transition:"height 0.3s ease"}},n.createElement(i.Z,{variant:"body1"},"This is the hidden content that unfolds when you click the button. You can include any content here that you want to show or hide.")))))}},2765:function(e,t,r){r.r(t),r.d(t,{PostsComponent:function(){return D},default:function(){return V}});var n=r(7294),o=(r(7896),r(4102)),a=r(3972),i=r(3584),l=r(7845),s=r(9077),c=r(4160),d=r(9486),u=r(8105),m=(r(8974),r(2574)),p=r(512),f=r(4780),g=r(9652),h=r(948),v=r(3065),b=r(8628),y=r(560),x=r(8216),S=r(902),Z=r(6501),w=r(1588),k=r(4867);function E(e){return(0,k.ZP)("MuiAlert",e)}var $=(0,w.Z)("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),C=r(6867),j=r(5949),A=r(5893),M=(0,j.Z)((0,A.jsx)("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),P=(0,j.Z)((0,A.jsx)("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),z=(0,j.Z)((0,A.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),O=(0,j.Z)((0,A.jsx)("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),R=(0,j.Z)((0,A.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");const N=(0,h.ZP)(Z.Z,{name:"MuiAlert",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],t[`${r.variant}${(0,x.Z)(r.color||r.severity)}`]]}})((0,v.Z)((({theme:e})=>{const t="light"===e.palette.mode?g._j:g.$n,r="light"===e.palette.mode?g.$n:g._j;return{...e.typography.body2,backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(e.palette).filter((0,S.Z)(["light"])).map((([n])=>({props:{colorSeverity:n,variant:"standard"},style:{color:e.vars?e.vars.palette.Alert[`${n}Color`]:t(e.palette[n].light,.6),backgroundColor:e.vars?e.vars.palette.Alert[`${n}StandardBg`]:r(e.palette[n].light,.9),[`& .${$.icon}`]:e.vars?{color:e.vars.palette.Alert[`${n}IconColor`]}:{color:e.palette[n].main}}}))),...Object.entries(e.palette).filter((0,S.Z)(["light"])).map((([r])=>({props:{colorSeverity:r,variant:"outlined"},style:{color:e.vars?e.vars.palette.Alert[`${r}Color`]:t(e.palette[r].light,.6),border:`1px solid ${(e.vars||e).palette[r].light}`,[`& .${$.icon}`]:e.vars?{color:e.vars.palette.Alert[`${r}IconColor`]}:{color:e.palette[r].main}}}))),...Object.entries(e.palette).filter((0,S.Z)(["dark"])).map((([t])=>({props:{colorSeverity:t,variant:"filled"},style:{fontWeight:e.typography.fontWeightMedium,...e.vars?{color:e.vars.palette.Alert[`${t}FilledColor`],backgroundColor:e.vars.palette.Alert[`${t}FilledBg`]}:{backgroundColor:"dark"===e.palette.mode?e.palette[t].dark:e.palette[t].main,color:e.palette.getContrastText(e.palette[t].main)}}})))]}}))),I=(0,h.ZP)("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,t)=>t.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),G=(0,h.ZP)("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),L=(0,h.ZP)("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),W={success:(0,A.jsx)(M,{fontSize:"inherit"}),warning:(0,A.jsx)(P,{fontSize:"inherit"}),error:(0,A.jsx)(z,{fontSize:"inherit"}),info:(0,A.jsx)(O,{fontSize:"inherit"})};var T=n.forwardRef((function(e,t){const r=(0,b.i)({props:e,name:"MuiAlert"}),{action:n,children:o,className:a,closeText:i="Close",color:l,components:s={},componentsProps:c={},icon:d,iconMapping:u=W,onClose:m,role:g="alert",severity:h="success",slotProps:v={},slots:S={},variant:Z="standard",...w}=r,k={...r,color:l,severity:h,variant:Z,colorSeverity:l||h},$=(e=>{const{variant:t,color:r,severity:n,classes:o}=e,a={root:["root",`color${(0,x.Z)(r||n)}`,`${t}${(0,x.Z)(r||n)}`,`${t}`],icon:["icon"],message:["message"],action:["action"]};return(0,f.Z)(a,E,o)})(k),j={slots:{closeButton:s.CloseButton,closeIcon:s.CloseIcon,...S},slotProps:{...c,...v}},[M,P]=(0,y.Z)("closeButton",{elementType:C.Z,externalForwardedProps:j,ownerState:k}),[z,O]=(0,y.Z)("closeIcon",{elementType:R,externalForwardedProps:j,ownerState:k});return(0,A.jsxs)(N,{role:g,elevation:0,ownerState:k,className:(0,p.Z)($.root,a),ref:t,...w,children:[!1!==d?(0,A.jsx)(I,{ownerState:k,className:$.icon,children:d||u[h]||W[h]}):null,(0,A.jsx)(G,{ownerState:k,className:$.message,children:o}),null!=n?(0,A.jsx)(L,{ownerState:k,className:$.action,children:n}):null,null==n&&m?(0,A.jsx)(L,{ownerState:k,className:$.action,children:(0,A.jsx)(M,{size:"small","aria-label":i,title:i,color:"inherit",onClick:m,...P,children:(0,A.jsx)(z,{fontSize:"small",...O})})}):null]})})),B=r(9827);const _=(0,B.Z)(o.Z)((e=>{let{theme:t}=e;return{display:"flex",flexDirection:"column",alignItems:"center",padding:"2rem",borderRadius:"8px",backgroundColor:"#1c1c1c",boxShadow:"0px 4px 12px rgba(0, 0, 0, 0.2)",[t.breakpoints.up("sm")]:{width:"100%"}}})),F=(0,B.Z)(m.Z)((e=>{let{theme:t}=e;return{marginTop:"1rem",backgroundColor:"#8ab4f8",color:"#ffffff","&:hover":{backgroundColor:"#6a93d7"}}})),H=()=>{const{0:e,1:t}=(0,n.useState)(""),{0:r,1:o}=(0,n.useState)(""),{0:s,1:c}=(0,n.useState)("");return n.createElement(_,null,n.createElement(a.Z,{variant:"h5",color:"#ffffff",gutterBottom:!0},"Subscribe to New Articles"),n.createElement(a.Z,{variant:"body2",color:"#bdbdbd",gutterBottom:!0},"Get the latest articles directly to your inbox."),n.createElement(i.Z,{component:"form",onSubmit:r=>{if(r.preventDefault(),o(""),c(""),!e)return void o("Email is required.");/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)?(c("Thank you for subscribing!"),t("")):o("Please enter a valid email address.")},sx:{width:"100%",mt:2}},n.createElement(l.Z,{variant:"outlined",label:"Your Email",fullWidth:!0,value:e,onChange:e=>t(e.target.value),error:!!r,helperText:r,InputProps:{style:{color:"#ffffff"}},InputLabelProps:{style:{color:"#bdbdbd"}},sx:{"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:"#8ab4f8"},"&:hover fieldset":{borderColor:"#6a93d7"},"&.Mui-focused fieldset":{borderColor:"#8ab4f8"}}}}),n.createElement(F,{type:"submit",variant:"contained",fullWidth:!0},"Subscribe"),s&&n.createElement(T,{severity:"success",sx:{mt:2}},s)))},D=e=>{let{heading:t,featuredOnly:r}=e;const o=(0,c.K2)("1708891727");console.log(o);const i=r||!1;return n.createElement(n.Fragment,null,n.createElement(a.Z,{variant:"h4",gutterBottom:!0,sx:{marginTop:4}},t),n.createElement(s.Z,{container:!0,rowSpacing:1.5,columnSpacing:{xs:1,sm:2,md:1.5}},i&&o.allMarkdownRemark.edges.filter((e=>{let{node:t}=e;return!0===t.frontmatter.featured})).map((e=>{let{node:t}=e;return n.createElement(s.Z,{item:!0,size:4,xs:12,sm:6,lg:2,key:t.id},n.createElement(u.default,{data:t.frontmatter}))})),!i&&o.allMarkdownRemark.edges.map((e=>{let{node:t}=e;return n.createElement(s.Z,{size:4,item:!0,xs:12,sm:6,lg:2,key:t.id},n.createElement(u.default,{data:t.frontmatter}))}))))};var V=()=>n.createElement(o.Z,null,n.createElement(d.default,null),n.createElement(i.Z,{my:4},n.createElement(D,{heading:"Recent Posts",featuredOnly:!1}),n.createElement(D,{heading:"Featured Posts",featuredOnly:!0})),n.createElement(i.Z,null,n.createElement(H,null)))}}]);
//# sourceMappingURL=201357152ed81617c3e9e05287d7708d2b19c5b6-87f889f9943284bc7cd2.js.map