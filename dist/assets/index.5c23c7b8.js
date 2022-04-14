var z=Object.defineProperty,P=Object.defineProperties;var X=Object.getOwnPropertyDescriptors;var I=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var L=(e,n,r)=>n in e?z(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,b=(e,n)=>{for(var r in n||(n={}))N.call(n,r)&&L(e,r,n[r]);if(I)for(var r of I(n))T.call(n,r)&&L(e,r,n[r]);return e},k=(e,n)=>P(e,X(n));var $=(e,n)=>{var r={};for(var a in e)N.call(e,a)&&n.indexOf(a)<0&&(r[a]=e[a]);if(e!=null&&I)for(var a of I(e))n.indexOf(a)<0&&T.call(e,a)&&(r[a]=e[a]);return r};import"./modulepreload-polyfill.b7f2da20.js";import{R as t,m as U,a as B,d as j,s as H,o as K,N as W,b as V,p as G,e as O,t as J,r as R,c as _}from"./vendor.526a8a9f.js";import{R as w,u as S,a as f,b as Z,c as ee,d as te}from"./remesh-logger.c94c594f.js";import{L as ne}from"./list.c1c17912.js";const re=w.domain({name:"Counter",impl:e=>{const n=e.state({name:"CounterState",default:0}),r=e.command({name:"increCommand",impl:({get:a})=>{const l=a(n());return n().new(l+1)}});return{query:{CounterQuery:n.Query},command:{incre:r}}}}),ae=()=>{const e=S(re()),n=f(e.query.CounterQuery()),r=()=>{e.command.incre()};return t.createElement("div",{style:{width:400,border:"1px solid #eaeaea",boxSizing:"border-box",padding:10}},t.createElement("h2",null,"Counter"),t.createElement("input",{type:"number",readOnly:!0,value:n}),t.createElement("label",null,t.createElement("button",{onClick:r},"Count ")," "))},le=w.domain({name:"TemperatureConverter",impl:e=>{const n=e.state({name:"CelsiusState",default:""}),r=e.state({name:"FahrenheitState",default:""}),a=e.command({name:"resetBoth",impl:()=>[n().new(""),r().new("")]}),l=e.command({name:"updateCelsius",impl:({},d)=>{if(d==="")return a();const g=parseFloat(d);if(Number.isNaN(g))return n().new(d);const u=g*(9/5)+32;return[n().new(d),r().new(u.toString())]}}),p=e.command({name:"updateFahrenheit",impl:({},d)=>{if(d==="")return a();const g=parseFloat(d);if(Number.isNaN(g))return r().new(d);const u=(g-32)*(5/9);return[n().new(u.toString()),r().new(d)]}});return{query:{CelsiusQuery:n.Query,FahrenheitQuery:r.Query},command:{updateCelsius:l,updateFahrenheit:p}}}}),oe=()=>{const e=S(le()),n=f(e.query.CelsiusQuery()),r=f(e.query.FahrenheitQuery()),a=p=>{e.command.updateCelsius(p.target.value)},l=p=>{e.command.updateFahrenheit(p.target.value)};return t.createElement("div",{style:{border:"1px solid #eaeaea",boxSizing:"border-box",padding:10}},t.createElement("h2",null,"Temperature Converter"),t.createElement("div",null,t.createElement("input",{type:"text",value:n,onChange:a}),t.createElement("label",{htmlFor:""},"Celsius"),"=",t.createElement("input",{type:"text",value:r,onChange:l}),t.createElement("label",{htmlFor:""},"Fahrenheit")))},Y=e=>{const n=e.split(".");if(n.length!==3)return null;const r=new Date(`${n[2]}.${n[1]}.${n[0]}`);return r.toString()==="Invalid Date"?null:r},A=e=>{const n=e.toLocaleDateString().split("/");return`${n[2]}.${n[1]}.${n[0]}`},se=(e,n)=>e.getFullYear()!==n.getFullYear()?e.getFullYear()-n.getFullYear():e.getMonth()!==n.getMonth()?e.getMonth()-n.getMonth():e.getDate()-n.getDate(),ce=w.domain({name:"FlightBooker",impl:e=>{const n=e.state({name:"OptionState",default:"one-way"}),r=e.state({name:"StartDateInputState",default:A(new Date)}),a=e.state({name:"EndDateInputState",default:A(new Date)}),l=e.query({name:"StartDateQuery",impl:({get:s})=>{const E=s(r());return Y(E)}}),p=e.query({name:"EndDateQuery",impl:({get:s})=>{const E=s(a());return Y(E)}}),d=e.command({name:"updateOption",impl:({},s)=>n().new(s)}),g=e.command({name:"updateStartDate",impl:({},s)=>r().new(s)}),u=e.command({name:"updateEndDate",impl:({},s)=>a().new(s)});return{query:{StatusQuery:e.query({name:"StatusQuery",impl:({get:s})=>{const E=s(n()),y=s(l()),h=s(p()),c=y?"valid":"invalid",o=E==="return"?h?"valid":"invalid":"disabled",i=E==="one-way"?y?"enabled":"disabled":!!y&&!!h&&se(y,h)<=0?"enabled":"disabled";return{startDate:c,endDate:o,bookButton:i}}}),OptionQuery:n.Query,StartDateQuery:l,EndDateQuery:p,StartDateInput:r.Query,EndDateInput:a.Query},command:{updateOption:d,updateStartDate:g,updateEndDate:u}}}}),ie=()=>{const e=S(ce()),n=f(e.query.OptionQuery()),r=f(e.query.StatusQuery()),a=f(e.query.StartDateInput()),l=f(e.query.EndDateInput()),p=m=>{e.command.updateOption(m.target.value)},d=m=>{e.command.updateStartDate(m.target.value)},g=m=>{e.command.updateEndDate(m.target.value)},u=()=>{r.bookButton==="enabled"&&alert(n==="one-way"?`You have booked a one-way flight on ${a}`:`You have booked return flight from ${a} to ${l}`)};return t.createElement("div",{style:{width:400,border:"1px solid #eaeaea",boxSizing:"border-box",padding:10}},t.createElement("h2",null,"Flight Booker"),t.createElement("div",null,t.createElement("select",{value:n,onChange:p},t.createElement("option",{value:"one-way"},"One-way flight"),t.createElement("option",{value:"return"},"Return flight"))),t.createElement("div",null,t.createElement("input",{type:"text",style:{backgroundColor:r.startDate==="invalid"?"red":""},value:a,onChange:d})),t.createElement("div",null,t.createElement("input",{type:"text",style:{backgroundColor:r.endDate==="invalid"?"red":""},disabled:r.endDate==="disabled",value:l,onChange:g})),t.createElement("div",null,t.createElement("button",{disabled:r.bookButton==="disabled",onClick:u},"Book")))},ue=w.domain({name:"timer",inspectable:!1,impl:e=>{const n=e.state({name:"duration",default:15e3}),r=e.state({name:"elapsed",default:0}),a=e.event({name:"StartEvent"}),l=e.event({name:"StopEvent"}),p=e.command({name:"updateElapsed",impl:({get:u},m)=>{const s=u(n()),E=u(r());return E>s?l():r().new(E+m)}}),d=e.command({name:"updateDuration",impl:({get:u},m)=>{const s=u(r());return m>s?[n().new(m),a()]:n().new(m)}}),g=e.command({name:"resetElapsed",impl:({})=>[r().new(0),a()]});return e.command$({name:"updateElapsed$",impl:({fromEvent:u})=>{const s=U(u(a).pipe(B(1)),u(l).pipe(B(0))).pipe(j()).pipe(H(E=>E===0?W:V().pipe(G(),O(([y,h])=>h.elapsed-y.elapsed),O(y=>p(y)),J(u(l)))));return U(s,K(a()))}}),{query:{DurationQuery:n.Query,ElapsedQuery:r.Query},command:{resetElapsed:g,updateDuration:d}}}}),de=()=>{const e=S(ue()),n=f(e.query.ElapsedQuery()),r=f(e.query.DurationQuery()),a=p=>{const d=parseInt(p.target.value,10);isNaN(d)||e.command.updateDuration(d)},l=()=>{e.command.resetElapsed()};return t.createElement("div",{style:{width:400,border:"1px solid #eaeaea",boxSizing:"border-box",padding:10}},t.createElement("h2",null,"Timer"),t.createElement("div",{style:{display:"flex"}},t.createElement("label",{style:{marginRight:10,whiteSpace:"nowrap"}},"Elapsed Timer:"),t.createElement("div",{style:{width:"100%"}},t.createElement("span",{style:{display:"inline-block",height:10,background:"green",width:`${Math.min(n/r,1)*100}%`,verticalAlign:"middle",borderRadius:5}}))),t.createElement("div",null,n>r?(r/1e3).toFixed(1):(n/1e3).toFixed(1),"s"),t.createElement("div",{style:{display:"flex"}},t.createElement("label",{style:{width:100,marginRight:10}},"Duration:"),t.createElement("input",{style:{width:"100%"},type:"range",min:0,max:3e4,value:r,onChange:a})),t.createElement("div",null,t.createElement("button",{style:{width:"100% "},onClick:l},"Reset Timer")))},F=e=>{const l=e,{onOuterClick:n}=l,r=$(l,["onOuterClick"]),a=R.exports.useRef(null);return R.exports.useEffect(()=>{const p=d=>{var u;if(!((u=d.target)!=null&&u.parentElement))return;!!(a.current&&!a.current.contains(d.target))&&(n==null||n(d))};return document.addEventListener("click",p,!1),()=>{document.removeEventListener("click",p,!1)}},[]),t.createElement("div",b({ref:a},r))},me=w.domain({name:"CRUD",impl:e=>{let n=0;const r=ne(e,{name:"Name",key:h=>h.id}),a=e.state({name:"FilterPrefix",default:""}),l=e.command({name:"updateFilterPrefix",impl:({},h)=>a().new(h)}),p=e.state({name:"Created",default:{name:"",surname:""}}),d=e.command({name:"UpdateCreated",impl:({get:h},c)=>{const o=h(p());return p().new(b(b({},o),c))}}),g=e.state({name:"Selected",default:null}),u=e.command({name:"Select",impl:({get:h},c)=>{const o=h(g());if(c===null)return o===null?null:g().new(null);if(o&&o.id===c)return g().new(null);const i=h(r.query.ItemQuery(c));return g().new(i)}}),m=e.command({name:"UpdateSelectedName",impl:({get:h},c)=>{const o=h(g());return o===null?[]:g().new(b(b({},o),c))}}),s=e.query({name:"FilteredListQuery",impl:({get:h})=>{const c=h(a()),o=h(r.query.ItemListQuery());return c===""?o:o.filter(i=>i.surname.startsWith(c))}}),E=e.command({name:"SyncSelected",impl:({get:h})=>{const c=h(g());return c===null?[]:r.command.updateItem(c)}}),y=e.command({name:"CreateNameItem",impl:({get:h})=>{const c=h(p()),o=b({id:`${n++}`},c);return[r.command.addItem(o),d({name:"",surname:""})]}});return{query:k(b({},r.query),{FilteredListQuery:s,SelectedQuery:g.Query,FilterPrefixQuery:a.Query,CreatedQuery:p.Query}),command:k(b({},r.command),{updateFilterPrefix:l,selectItem:u,updateCreated:d,updateSelectedName:m,createNameItem:y,syncSelected:E})}}}),pe=()=>{const e=S(me()),n=f(e.query.FilteredListQuery()),r=f(e.query.FilterPrefixQuery()),a=f(e.query.CreatedQuery()),l=f(e.query.SelectedQuery()),p=y=>{e.command.updateFilterPrefix(y.target.value)},d=y=>{e.command.selectItem(y)},g=y=>{l?e.command.updateSelectedName({name:y.target.value}):e.command.updateCreated({name:y.target.value})},u=y=>{l?e.command.updateSelectedName({surname:y.target.value}):e.command.updateCreated({surname:y.target.value})},m=()=>{l===null&&e.command.createNameItem()},s=()=>{l&&e.command.syncSelected()},E=()=>{l&&(e.command.deleteItem(l.id),e.command.selectItem(null))};return t.createElement(F,{style:{width:400,border:"1px solid #eaeaea",boxSizing:"border-box",padding:10},onOuterClick:()=>{d(null)}},t.createElement("h2",null,"CRUD"),t.createElement("div",null,t.createElement("label",{htmlFor:""},"Filter prefix"),t.createElement("input",{type:"text",value:r,onChange:p})),t.createElement("div",{style:{display:"flex"}},t.createElement("div",{style:{width:"50%",height:100,border:"1px solid #eaeaea",overflow:"scroll"}},n.map(y=>{const h=y.name+", "+y.surname;return t.createElement("div",{key:y.id,style:{background:(l==null?void 0:l.id)===y.id?"blue":"",color:(l==null?void 0:l.id)===y.id?"white":""},onClick:()=>{d(y.id)}},h)})),t.createElement("div",{style:{width:"50%",padding:10}},t.createElement("div",null,t.createElement("label",null,"Name:"),t.createElement("input",{type:"text",value:l?l.name:a.name,onChange:g})),t.createElement("div",null,t.createElement("label",null,"Surname:"),t.createElement("input",{type:"text",value:l?l.surname:a.surname,onChange:u}))),t.createElement("div",null,t.createElement("button",{disabled:l!==null,style:{marginRight:10},onClick:m},"Create"),t.createElement("button",{disabled:l===null,style:{marginRight:10},onClick:s},"Update"),t.createElement("button",{disabled:l===null,style:{marginRight:10},onClick:E},"Delete"))))},ye=w.domain({name:"CircleDrawer",impl:e=>{const n=e.state({name:"HistoryState",default:{items:[],currentIndex:-1}}),r=e.command({name:"recordHistoryState",impl:({get:o},i)=>{const x=o(n()),C=x.items.slice(0,x.currentIndex+1);if(i.action==="adjust-circle"){const D=C[C.length-1];D.action==="adjust-circle"&&D.index===i.index&&C.pop()}const v=[...C,i],Q=v.length-1;return n().new({items:v,currentIndex:Q})}}),a=e.state({name:"DrawState",default:{circles:[]}}),l=e.command({name:"undo",impl:({get:o})=>{const i=o(n()),x=o(d()),C=i.currentIndex-1;return!x||C<0?[a().new({circles:[]}),n().new({items:i.items,currentIndex:-1})]:[a().new(i.items[C].state),n().new({items:i.items,currentIndex:C})]}}),p=e.command({name:"redo",impl:({get:o})=>{const i=o(n());if(!o(g()))return[];const C=i.currentIndex+1;return[a().new(i.items[C].state),n().new({items:i.items,currentIndex:C})]}}),d=e.query({name:"CanUndoQuery",impl:({get:o})=>o(n()).currentIndex>=0}),g=e.query({name:"CanRedoQuery",impl:({get:o})=>{const i=o(n());return i.currentIndex<i.items.length-1}}),u=e.state({name:"SelectedIndexState",default:-1}),m=e.command({name:"setSelectedIndex",impl:({},o)=>u().new(o)}),s=e.query({name:"SelectedCircleInfoQuery",impl:({get:o})=>{const i=o(u()),x=o(a()).circles;return i===-1?null:{index:i,circle:x[i]}}}),E=e.command({name:"draw",impl:({get:o},i)=>{const C={circles:[...o(a()).circles,{position:i.position,diameter:i.diameter}]};return[a().new(C),r({action:"add-circle",state:C})]}}),y=e.command({name:"adjust",impl:({get:o},i)=>{const v={circles:o(a()).circles.map((Q,D)=>D===i.index?{position:Q.position,diameter:i.diameter}:Q)};return[a().new(v),r({action:"adjust-circle",index:i.index,state:v})]}}),h=e.state({name:"TooltipsState",default:{type:"default"}}),c=e.command({name:"updateTooltips",impl:({},o)=>h().new(o)});return{query:{HistoryQuery:n.Query,DrawQuery:a.Query,TooltipsQuery:h.Query,SelectedIndexQuery:u.Query,SelectedCircleInfoQuery:s,CanUndoQuery:d,CanRedoQuery:g},command:{draw:E,adjust:y,updateTooltips:c,undo:l,redo:p,setSelectedIndex:m}}}}),he=(e,n)=>{const{x:r,y:a}=e,{diameter:l,position:p}=n,{x:d,y:g}=p,u=l/2,m=r-d,s=a-g;return m*m+s*s<u*u},ge=()=>{var h;const e=S(ye()),n=f(e.query.DrawQuery()),r=f(e.query.TooltipsQuery()),a=f(e.query.SelectedCircleInfoQuery()),l=f(e.query.CanUndoQuery()),p=f(e.query.CanRedoQuery()),d=c=>{const o=n.circles.find(x=>he(c,x));return o?{index:n.circles.indexOf(o),circle:o}:null},g=c=>{c.preventDefault();const o={x:c.pageX,y:c.pageY},i=d(o);i&&(e.command.setSelectedIndex(i.index),e.command.updateTooltips({type:"show-tips",index:i.index,circle:i.circle,pageX:c.pageX,pageY:c.pageY}))},u=c=>{if(r.type!=="default")return;const o={x:c.pageX,y:c.pageY};d(o)||e.command.draw({position:o,diameter:30})},m=c=>{if(r.type!=="default")return;const o={x:c.pageX,y:c.pageY},i=d(o);i?e.command.setSelectedIndex(i.index):e.command.setSelectedIndex(-1)},s=()=>{r.type==="show-tips"&&e.command.updateTooltips({type:"open-slider",index:r.index,circle:r.circle,pageX:r.pageX,pageY:r.pageY})},E=()=>{console.log("handleCloseSlider"),e.command.updateTooltips({type:"default"})},y=c=>{const o=parseInt(c.target.value,10);a&&!isNaN(o)&&e.command.adjust({index:a.index,diameter:o})};return console.log("tooltipsState",r),t.createElement("div",{style:{border:"1px solid #eaeaea",boxSizing:"border-box",padding:10}},t.createElement("h2",null,"Circle Drawer"),t.createElement("div",{style:{width:400,textAlign:"center",padding:10}},t.createElement("button",{onClick:()=>e.command.undo(),style:{margin:"0 10px"},disabled:!l},"Undo"),t.createElement("button",{onClick:()=>e.command.redo(),style:{margin:"0 10px"},disabled:!p},"Redo")),t.createElement("div",{style:{width:400,height:400,border:"1px solid #eaeaea",boxSizing:"border-box",overflow:"hidden"},onClick:u,onMouseMove:m},n.circles.map((c,o)=>t.createElement("div",{key:c.position.x+"-"+c.position.y+"-"+c.diameter,style:{position:"absolute",left:c.position.x-c.diameter/2,top:c.position.y-c.diameter/2,width:c.diameter,height:c.diameter,borderRadius:c.diameter/2,border:"1px solid #666",backgroundColor:(a==null?void 0:a.index)===o?"#eaeaea":""},onContextMenu:g}))),r.type==="show-tips"&&t.createElement(F,{key:"show-tips",style:{position:"absolute",left:r.pageX,top:r.pageY,zIndex:100,background:"#fff",border:"1px solid #666",padding:10},onOuterClick:E,onClick:s},"Adjust Diameter"),r.type==="open-slider"&&t.createElement(F,{key:"open-slider",style:{position:"absolute",left:r.pageX,top:r.pageY,background:"#fff",border:"1px solid #666",zIndex:100,padding:10},onOuterClick:E},t.createElement("p",null,"Adjust Diameter"),t.createElement("div",null,t.createElement("input",{type:"range",value:(h=a==null?void 0:a.circle.diameter)!=null?h:"",min:1,max:150,onChange:y}))))},q=w.domain({name:"Cells",inspectable:!1,impl:e=>{const n=e.state({name:"RowKeyListState",default:[0,1,2,3,4,5,6,7,8,9].map(String)}),r=e.state({name:"ColumnKeyListState",default:["A","B","C","D","E","F","G","H","I","J"]}),a=e.state({name:"CellState",impl:u=>({content:{type:"text",text:""},isEditing:!1})}),l=e.query({name:"CellQuery",impl:({get:u},m)=>{const s=u(a(m));if(s.content.type==="text")return{type:"text",isEditing:s.isEditing,content:s.content.text,displayContent:s.content.text};if(s.content.type==="formula"){const E=xe(s.content.formula),y=h=>Number(u(l(h)).displayContent);return{type:"formula",isEditing:s.isEditing,content:s.content.formula,displayContent:E(y)}}throw new Error("Unknown cell type")}}),p=e.command({name:"selectCell",impl:({get:u},m)=>{const s=u(a(m));return a(m).new({content:s.content,isEditing:!0})}}),d=e.command({name:"unselectCell",impl:({get:u},m)=>{const s=u(a(m));return a(m).new({content:s.content,isEditing:!1})}}),g=e.command({name:"setCellContent",impl:({get:u},{key:m,input:s})=>{const E=u(a(m));return s.startsWith("=")?a(m).new({content:{type:"formula",formula:s},isEditing:E.isEditing}):a(m).new({content:{type:"text",text:s},isEditing:E.isEditing})}});return{query:{CellQuery:l,ColumnKeyListQuery:r.Query,RowKeyListQuery:n.Query},command:{selectCell:p,unselectCell:d,setCellContent:g}}}}),Ee=()=>{const e=S(q()),n=f(e.query.ColumnKeyListQuery()),r=f(e.query.RowKeyListQuery());return t.createElement("div",null,t.createElement("h2",null,"Cells"),t.createElement("table",{style:{borderCollapse:"collapse",border:"1px solid #bbb",textAlign:"center"}},t.createElement("thead",null,t.createElement("tr",{style:{backgroundColor:"#f6f6f6"}},t.createElement("th",{style:{width:30,display:"block"}}),n.map(a=>t.createElement("th",{key:a,style:{maxWidth:80,border:"1px solid #bbb"}},a)))),t.createElement("tbody",null,r.map(a=>t.createElement("tr",{key:a},t.createElement(fe,{rowKey:a,columnKeyList:n}))))))},fe=({columnKeyList:e,rowKey:n})=>{const r=S(q());return t.createElement(t.Fragment,null,t.createElement("td",{style:{width:30,border:"1px solid #bbb",backgroundColor:"#f6f6f6"}},n),e.map(a=>{const l=`${a}${n}`;return t.createElement("td",{key:l,style:{maxWidth:80,minWidth:80,border:"1px solid #bbb",overflow:"hidden"},onClick:p=>{p.target instanceof HTMLInputElement||r.command.selectCell(l)}},t.createElement(Ce,{cellKey:l}))}))},Ce=({cellKey:e})=>{const n=S(q()),r=f(n.query.CellQuery(e)),a=l=>{n.command.setCellContent({key:e,input:l.target.value})};return t.createElement(t.Fragment,null,r.isEditing&&t.createElement("input",{style:{width:"100%",height:"100%",backgroundColor:"transparent",boxSizing:"border-box",textAlign:"center"},value:r.content,onChange:a,onBlur:()=>{r.isEditing&&n.command.unselectCell(e)},autoFocus:!0}),!r.isEditing&&r.displayContent)},xe=e=>n=>{try{const r=e.slice(1).replace(/\w\d+/g,l=>`get('${l}')`);return new Function("get",`return (${r}).toString()`)(n)}catch{return"-"}},be=()=>t.createElement("div",null,t.createElement("h1",null,"7GUIs in React/Remesh/TypeScript"),t.createElement("p",null,"This is a live version of an implementation (source) of 7GUIs with React, TypeScript and Remesh."),t.createElement("hr",null),t.createElement(ae,null),t.createElement("hr",null),t.createElement(oe,null),t.createElement("hr",null),t.createElement(ie,null),t.createElement("hr",null),t.createElement(de,null),t.createElement("hr",null),t.createElement(pe,null),t.createElement("hr",null),t.createElement(ge,null),t.createElement("hr",null),t.createElement(Ee,null)),M=document.getElementById("root");if(M){const e=_(M),n=w.store({inspectors:[Z(),ee()]});e.render(t.createElement(R.exports.StrictMode,null,t.createElement(te,{store:n},t.createElement(be,null))))}
//# sourceMappingURL=index.5c23c7b8.js.map
