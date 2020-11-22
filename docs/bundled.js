/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,o=`\x3c!--${s}--\x3e`,i=new RegExp(`${s}|${o}`);class n{constructor(t,e){this.parts=[],this.element=e;const o=[],n=[],c=document.createTreeWalker(e.content,133,null,!1);let d=0,h=-1,u=0;const{strings:p,values:{length:v}}=t;for(;u<v;){const t=c.nextNode();if(null!==t){if(h++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let o=0;for(let t=0;t<s;t++)r(e[t].name,"$lit$")&&o++;for(;o-- >0;){const e=p[u],s=a.exec(e)[2],o=s.toLowerCase()+"$lit$",n=t.getAttribute(o);t.removeAttribute(o);const r=n.split(i);this.parts.push({type:"attribute",index:h,name:s,strings:r}),u+=r.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),c.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,n=e.split(i),c=n.length-1;for(let e=0;e<c;e++){let o,i=n[e];if(""===i)o=l();else{const t=a.exec(i);null!==t&&r(t[2],"$lit$")&&(i=i.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),o=document.createTextNode(i)}s.insertBefore(o,t),this.parts.push({type:"node",index:++h})}""===n[c]?(s.insertBefore(l(),t),o.push(t)):t.data=n[c],u+=c}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&h!==d||(h++,e.insertBefore(l(),t)),d=h,this.parts.push({type:"node",index:h}),null===t.nextSibling?t.data="":(o.push(t),h--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),u++}}else c.currentNode=n.pop()}for(const t of o)t.parentNode.removeChild(t)}}const r=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},c=t=>-1!==t.index,l=()=>document.createComment(""),a=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function d(t,e){const{element:{content:s},parts:o}=t,i=document.createTreeWalker(s,133,null,!1);let n=u(o),r=o[n],c=-1,l=0;const a=[];let d=null;for(;i.nextNode();){c++;const t=i.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(a.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==r&&r.index===c;)r.index=null!==d?-1:r.index-l,n=u(o,n),r=o[n]}a.forEach(t=>t.parentNode.removeChild(t))}const h=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},u=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(c(e))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const p=new WeakMap,v=t=>(...e)=>{const s=t(...e);return p.set(s,!0),s},b=t=>"function"==typeof t&&p.has(t),f={},g={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class m{constructor(t,e,s){this.t=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.t)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.t)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],o=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let n,r=0,l=0,a=i.nextNode();for(;r<o.length;)if(n=o[r],c(n)){for(;l<n.index;)l++,"TEMPLATE"===a.nodeName&&(s.push(a),i.currentNode=a.content),null===(a=i.nextNode())&&(i.currentNode=s.pop(),a=i.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(a.previousSibling),this.t.push(t)}else this.t.push(...this.processor.handleAttributeExpressions(a,n.name,n.strings,this.options));r++}else this.t.push(void 0),r++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const x=` ${s} `;class w{constructor(t,e,s,o){this.strings=t,this.values=e,this.type=s,this.processor=o}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let n=0;n<t;n++){const t=this.strings[n],r=t.lastIndexOf("\x3c!--");i=(r>-1||i)&&-1===t.indexOf("--\x3e",r+1);const c=a.exec(t);e+=null===c?t+(i?x:o):t.substr(0,c.index)+c[1]+c[2]+"$lit$"+c[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const y=t=>null===t||!("object"==typeof t||"function"==typeof t),k=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class ${constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new S(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let o=0;o<e;o++){s+=t[o];const e=this.parts[o];if(void 0!==e){const t=e.value;if(y(t)||!k(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===f||y(t)&&t===this.value||(this.value=t,b(t)||(this.committer.dirty=!0))}commit(){for(;b(this.value);){const t=this.value;this.value=f,t(this)}this.value!==f&&this.committer.commit()}}class B{constructor(t){this.value=void 0,this.s=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(l()),this.endNode=t.appendChild(l())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.o(this.startNode=l()),t.o(this.endNode=l())}insertAfterPart(t){t.o(this.startNode=l()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.s=t}commit(){if(null===this.startNode.parentNode)return;for(;b(this.s);){const t=this.s;this.s=f,t(this)}const t=this.s;t!==f&&(y(t)?t!==this.value&&this.i(t):t instanceof w?this.l(t):t instanceof Node?this.h(t):k(t)?this.u(t):t===g?(this.value=g,this.clear()):this.i(t))}o(t){this.endNode.parentNode.insertBefore(t,this.endNode)}h(t){this.value!==t&&(this.clear(),this.o(t),this.value=t)}i(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.h(document.createTextNode(s)),this.value=t}l(t){const e=this.options.templateFactory(t);if(this.value instanceof m&&this.value.template===e)this.value.update(t.values);else{const s=new m(e,t.processor,this.options),o=s._clone();s.update(t.values),this.h(o),this.value=s}}u(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,o=0;for(const i of t)s=e[o],void 0===s&&(s=new B(this.options),e.push(s),0===o?s.appendIntoPart(this):s.insertAfterPart(e[o-1])),s.setValue(i),s.commit(),o++;o<e.length&&(e.length=o,this.clear(s&&s.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class O{constructor(t,e,s){if(this.value=void 0,this.s=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.s=t}commit(){for(;b(this.s);){const t=this.s;this.s=f,t(this)}if(this.s===f)return;const t=!!this.s;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.s=f}}class C extends ${constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new _(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class _ extends S{}let j=!1;(()=>{try{const t={get capture(){return j=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class z{constructor(t,e,s){this.value=void 0,this.s=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.p=t=>this.handleEvent(t)}setValue(t){this.s=t}commit(){for(;b(this.s);){const t=this.s;this.s=f,t(this)}if(this.s===f)return;const t=this.s,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),o=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.p,this.v),o&&(this.v=I(t),this.element.addEventListener(this.eventName,this.p,this.v)),this.value=t,this.s=f}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const I=t=>t&&(j?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function M(t){let e=T.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},T.set(t.type,e));let o=e.stringsArray.get(t.strings);if(void 0!==o)return o;const i=t.strings.join(s);return o=e.keyString.get(i),void 0===o&&(o=new n(t,t.getTemplateElement()),e.keyString.set(i,o)),e.stringsArray.set(t.strings,o),o}const T=new Map,A=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const E=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(t,e,s,o){const i=e[0];if("."===i){return new C(t,e.slice(1),s).parts}return"@"===i?[new z(t,e.slice(1),o.eventContext)]:"?"===i?[new O(t,e.slice(1),s)]:new $(t,e,s).parts}handleTextExpression(t){return new B(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const N=(t,...e)=>new w(t,e,"html",E)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,P=(t,e)=>`${t}--${e}`;let L=!0;void 0===window.ShadyCSS?L=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),L=!1);const V=t=>e=>{const o=P(e.type,t);let i=T.get(o);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},T.set(o,i));let r=i.stringsArray.get(e.strings);if(void 0!==r)return r;const c=e.strings.join(s);if(r=i.keyString.get(c),void 0===r){const s=e.getTemplateElement();L&&window.ShadyCSS.prepareTemplateDom(s,t),r=new n(e,s),i.keyString.set(c,r)}return i.stringsArray.set(e.strings,r),r},U=["html","svg"],F=new Set,R=(t,e,s)=>{F.add(t);const o=s?s.element:document.createElement("template"),i=e.querySelectorAll("style"),{length:n}=i;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(o,t);const r=document.createElement("style");for(let t=0;t<n;t++){const e=i[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{U.forEach(e=>{const s=T.get(P(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),d(t,s)})})})(t);const c=o.content;s?function(t,e,s=null){const{element:{content:o},parts:i}=t;if(null==s)return void o.appendChild(e);const n=document.createTreeWalker(o,133,null,!1);let r=u(i),c=0,l=-1;for(;n.nextNode();){for(l++,n.currentNode===s&&(c=h(e),s.parentNode.insertBefore(e,s));-1!==r&&i[r].index===l;){if(c>0){for(;-1!==r;)i[r].index+=c,r=u(i,r);return}r=u(i,r)}}}(s,r,c.firstChild):c.insertBefore(r,c.firstChild),window.ShadyCSS.prepareTemplateStyles(o,t);const l=c.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){c.insertBefore(r,c.firstChild);const t=new Set;t.add(r),d(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const H={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},W=(t,e)=>e!==t&&(e==e||t==t),q={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:W};class D extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const o=this._attributeNameForProperty(s,e);void 0!==o&&(this._attributeToPropertyMap.set(o,s),t.push(o))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=q){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`,o=this.getPropertyDescriptor(t,s,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this._requestUpdate(t,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||q}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=W){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,o=e.converter||H,i="function"==typeof o?o:o.fromAttribute;return i?i(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,o=e.converter;return(o&&o.toAttribute||H.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=q){const o=this.constructor,i=o._attributeNameForProperty(t,s);if(void 0!==i){const t=o._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(i):this.setAttribute(i,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,o=s._attributeToPropertyMap.get(t);if(void 0!==o){const t=s.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}_requestUpdate(t,e){let s=!0;if(void 0!==t){const o=this.constructor,i=o.getPropertyOptions(t);o._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}D.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const J=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:o}=e;return{kind:s,elements:o,finisher(e){window.customElements.define(t,e)}}})(t,e),K=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(s){s.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function G(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):K(t,e)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const Q="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class Y{constructor(t,e){if(e!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Z=t=>new Y(String(t),X),tt=(t,...e)=>{const s=e.reduce((e,s,o)=>e+(t=>{if(t instanceof Y)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[o+1],t[0]);return new Y(s,X)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const et={};class st extends D{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(void 0===t)this._styles=[];else if(Array.isArray(t)){const e=(t,s)=>t.reduceRight((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t),s),s=e(t,new Set),o=[];s.forEach(t=>o.unshift(t)),this._styles=o}else this._styles=[t]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==et&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return et}}st.finalized=!0,st.render=(t,s,o)=>{if(!o||"object"!=typeof o||!o.scopeName)throw new Error("The `scopeName` option is required.");const i=o.scopeName,n=A.has(s),r=L&&11===s.nodeType&&!!s.host,c=r&&!F.has(i),l=c?document.createDocumentFragment():s;if(((t,s,o)=>{let i=A.get(s);void 0===i&&(e(s,s.firstChild),A.set(s,i=new B(Object.assign({templateFactory:M},o))),i.appendInto(s)),i.setValue(t),i.commit()})(t,l,Object.assign({templateFactory:V(i)},o)),c){const t=A.get(l);A.delete(l);const o=t.value instanceof m?t.value.template:void 0;R(i,l,o),e(s,s.firstChild),s.appendChild(l),A.set(s,t)}!n&&r&&window.ShadyCSS.styleElement(s.host)};var ot=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let it=class extends st{constructor(){super(...arguments),this.tabindex=0,this.secondary=!1}static get styles(){return tt`
      :host {
        display: inline-block;
      }

      button {
        background-color: var(--vscode-button-background);
        border: 0;
        border-radius: 0;
        box-sizing: border-box;
        color: var(--vscode-button-foreground);
        cursor: pointer;
        display: block;
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.4;
        padding: 2px 14px;
        user-select: none;
      }

      button.secondary {
        color: var(--vscode-button-secondaryForeground);
        background-color: var(--vscode-button-secondaryBackground);
      }

      button:hover {
        background-color: var(--vscode-button-hoverBackground);
      }

      button:focus,
      button:active {
        outline: none;
      }

      button.secondary:hover {
        background-color: var(--vscode-button-secondaryHoverBackground);
      }

      :host(:focus) {
        outline: none;
      }

      :host(:focus) button {
        outline: 1px solid var(--vscode-focusBorder);
        outline-offset: 2px;
      }
    `}render(){return N`
      <button class="${this.secondary?"secondary":"primary"}">
        <slot></slot>
      </button>
    `}};ot([G({type:Number,reflect:!0})],it.prototype,"tabindex",void 0),ot([G({type:Boolean})],it.prototype,"secondary",void 0),it=ot([J("vscode-button")],it);var nt=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let rt=class extends st{constructor(){super(...arguments),this.label="",this.checked=!1,this.value="",this._uid=`id_${(new Date).valueOf()}_${Math.floor(9999*Math.random())}`}onElementClick(){this.checked=!this.checked,this.dispatchEvent(new CustomEvent("vsc-change",{detail:{checked:this.checked,label:this.label,value:this.value},bubbles:!0,composed:!0}))}static get styles(){return tt`
      :host {
        display: inline-block;
      }

      .wrapper {
        cursor: pointer;
        display: block;
        position: relative;
        user-select: none;
      }

      .checkbox {
        position: absolute;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
      }

      .icon {
        background-color: var(--vscode-settings-checkboxBackground);
        background-size: 16px;
        border: 1px solid var(--vscode-settings-checkboxBorder);
        border-radius: 3px;
        box-sizing: border-box;
        height: 18px;
        left: 0;
        margin-left: 0;
        margin-right: 9px;
        padding: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        width: 18px;
      }

      .label {
        padding-left: 27px;
      }

      .label-text {
        color: var(--vscode-breadcrumb-foreground);
        cursor: pointer;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.4;
      }
    `}render(){const t=N`<svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
      />
    </svg>`,e=this.checked?t:g;return N`
      <div class="wrapper">
        <input
          id="${this._uid}"
          class="checkbox"
          type="checkbox"
          ?checked="${this.checked}"
          value="${this.value}"
        />
        <div class="icon">${e}</div>
        <label for="${this._uid}" class="label" @click="${this.onElementClick}">
          <slot><span class="label-text">${this.label}</span></slot>
        </label>
      </div>
    `}};nt([G({type:String})],rt.prototype,"label",void 0),nt([G({type:Boolean})],rt.prototype,"checked",void 0),nt([G({type:String})],rt.prototype,"value",void 0),rt=nt([J("vscode-checkbox")],rt);
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class ct{constructor(t){this.classes=new Set,this.changed=!1,this.element=t;const e=(t.getAttribute("class")||"").split(/\s+/);for(const t of e)this.classes.add(t)}add(t){this.classes.add(t),this.changed=!0}remove(t){this.classes.delete(t),this.changed=!0}commit(){if(this.changed){let t="";this.classes.forEach(e=>t+=e+" "),this.element.setAttribute("class",t)}}}const lt=new WeakMap,at=v(t=>e=>{if(!(e instanceof S)||e instanceof _||"class"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:s}=e,{element:o}=s;let i=lt.get(e);void 0===i&&(o.setAttribute("class",s.strings.join(" ")),lt.set(e,i=new Set));const n=o.classList||new ct(o);i.forEach(e=>{e in t||(n.remove(e),i.delete(e))});for(const e in t){const s=t[e];s!=i.has(e)&&(s?(n.add(e),i.add(e)):(n.remove(e),i.delete(e)))}"function"==typeof n.commit&&n.commit()});var dt=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let ht=class extends st{constructor(){super(...arguments),this.tabIndex=0,this.title="",this.open=!1}onHeaderClick(){this.open=!this.open}static get styles(){return tt`
      .collapsible {
        background-color: var(--vscode-sideBar-background);
      }

      .collapsible-header {
        align-items: center;
        background-color: var(--vscode-sideBarSectionHeader-background);
        cursor: pointer;
        display: flex;
        height: 22px;
        line-height: 22px;
        user-select: none;
      }

      .collapsible-header:focus {
        opacity: 1;
        outline-offset: -1px;
        outline-style: solid;
        outline-width: 1px;
        outline-color: var(--vscode-focusBorder);
      }

      .collapsible-header h3 {
        color: var(--vscode-sideBarTitle-foreground);
        font-size: 11px;
        font-weight: 700;
        margin: 0;
        text-transform: uppercase;
      }

      .header-icon {
        display: block;
        margin: 0 3px;
      }

      .collapsible.open .header-icon {
        transform: rotate(90deg);
      }

      .actions {
        margin-left: auto;
        margin-right: 4px;
        opacity: 0;
      }

      .collapsible:hover .actions {
        opacity: 1;
      }

      slot[name='actions']::slotted(div) {
        align-items: center;
        display: flex;
      }

      .collapsible-body {
        display: none;
        overflow: hidden;
      }

      .collapsible.open .collapsible-body {
        display: block;
      }
    `}render(){const t=at({collapsible:!0,open:this.open}),e=N`<svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class="header-icon"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z"
      />
    </svg>`;return N`
      <div class="${t}">
        <div
          class="collapsible-header"
          tabindex="${this.tabIndex}"
          title="${this.title}"
          @click="${this.onHeaderClick}"
        >
          ${e}
          <h3 class="title">${this.title}</h3>
          <div class="actions"><slot name="actions"></slot></div>
        </div>
        <div class="collapsible-body">
          <div>
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    `}};dt([G({type:Number})],ht.prototype,"tabIndex",void 0),dt([G({type:String})],ht.prototype,"title",void 0),dt([G({type:Boolean})],ht.prototype,"open",void 0),ht=dt([J("vscode-collapsible")],ht);var ut=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let pt=class extends st{constructor(){super(...arguments),this.label="",this.keybinding="",this.value="",this.separator=!1,this.tabindex=0}onItemClick(){this.dispatchEvent(new CustomEvent("vsc-click",{detail:{label:this.label,keybinding:this.keybinding,value:this.value||this.label,separator:this.separator,tabindex:this.tabindex},bubbles:!0,composed:!0}))}static get styles(){return tt`
      :host {
        display: block;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.4em;
        outline: none;
        position: relative;
      }

      .context-menu-item {
        background-color: var(--vscode-menu-background);
        color: var(--vscode-menu-foreground);
        border: 1px solid transparent;
        display: flex;
        user-select: none;
        white-space: nowrap;
      }

      .rule {
        border-bottom: 1px solid var(--vscode-menu-separatorBackground);
        display: block;
        margin: 0 .8em .2em;
        opacity: .4;
        padding-top: .2em;
        width: 100%;
      }

      .context-menu-item a {
        align-items: center;
        color: var(--vscode-menu-foreground);
        cursor: default;
        display: flex;
        flex: 1 1 auto;
        height: 2em;
        outline: none;
        position: relative;
        text-decoration: inherit;
      }

      .context-menu-item a:hover,
      :host-context(:focus) .context-menu-item a {
        background-color: var(--vscode-menu-selectionBackground);
        color: var(--vscode-menu-selectionForeground);
      }

      .label {
        background: none;
        display: flex;
        flex: 1 1 auto;
        font-size: 12px;
        line-height: 1;
        padding: 0 2em;
        text-decoration: none;
      }

      .keybinding {
        display: block;
        flex: 2 1 auto;
        line-height: 1;
        padding: 0 2em;
        text-align: right;
      }
    `}render(){return N`
      ${this.separator?N`
          <div class="context-menu-item separator">
            <span class="rule"></span>
          </div>
        `:N`
          <div class="context-menu-item">
            <a @click="${this.onItemClick}">
              ${this.label?N`<span class="label">${this.label}</span>`:g}
              ${this.keybinding?N`<span class="keybinding">${this.keybinding}</span>`:g}
            </a>
          </div>
        `}
    `}};ut([G({type:String})],pt.prototype,"label",void 0),ut([G({type:String})],pt.prototype,"keybinding",void 0),ut([G({type:String})],pt.prototype,"value",void 0),ut([G({type:Boolean})],pt.prototype,"separator",void 0),ut([G({type:Number})],pt.prototype,"tabindex",void 0),pt=ut([J("vscode-context-menu-item")],pt);var vt=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let bt=class extends st{constructor(){super(...arguments),this.data=[],this.show=!0}onItemClick(t){const{detail:e}=t;this.dispatchEvent(new CustomEvent("vsc-select",{detail:e,bubbles:!0,composed:!0}))}static get styles(){return tt`
      :host {
        display: block;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.4em;
        position: relative;
      }

      .context-menu {
        background-color: var(--vscode-menu-background);
        box-shadow: 0 2px 8px var(--vscode-widget-shadow);
        color: var(--vscode-menu-foreground);
        padding: .5em 0;
        white-space: nowrap;
      }

      .context-menu-item {
        border: 1px solid transparent;
        display: flex;
        user-select: none;
      }

      .rule {
        border-bottom: 1px solid var(--vscode-menu-separatorBackground);
        display: block;
        margin: 0 .8em .2em;
        opacity: .4;
        padding-top: .2em;
        width: 100%;
      }

      .context-menu-item a {
        align-items: center;
        color: var(--vscode-menu-foreground);
        cursor: default;
        display: flex;
        flex: 1 1 auto;
        height: 2em;
        outline: none;
        position: relative;
        text-decoration: inherit;
      }

      .context-menu-item a:hover,
      .context-menu-item a:focus {
        background-color: var(--vscode-menu-selectionBackground);
        color: var(--vscode-menu-selectionForeground);
      }

      .label {
        background: none;
        display: flex;
        flex: 1 1 auto;
        font-size: 12px;
        line-height: 1;
        padding: 0 2em;
        text-decoration: none;
      }

      .keybinding {
        display: block;
        flex: 2 1 auto;
        line-height: 1;
        padding: 0 2em;
        text-align: right;
      }
    `}render(){const t=N`
      <div class="context-menu">
        ${this.data?this.data.map(({label:t="",keybinding:e="",value:s="",separator:o=!1,tabindex:i=0})=>N`
            <vscode-context-menu-item
              label="${t}"
              keybinding="${e}"
              value="${s}"
              ?separator="${o}"
              tabindex="${i}"
              @vsc-click="${this.onItemClick}"
            ></vscode-context-menu-item>
          `):N`<slot></slot>`}
      </div>
    `;return N`
      ${this.show?t:g}
    `}};vt([G({type:Array})],bt.prototype,"data",void 0),vt([G({type:Boolean})],bt.prototype,"show",void 0),bt=vt([J("vscode-context-menu")],bt);var ft=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let gt=class extends st{static get styles(){return tt`
      :host {
        display: block;
        margin-top: 9px;
      }
    `}render(){return N`
      <slot></slot>
    `}};gt=ft([J("vscode-form-control")],gt);var mt=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let xt=class extends st{static get styles(){return tt`
      :host {
        color: var(--vscode-foreground);
        cursor: default;
        display: block;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        line-height: 1.4;
        margin: 3px 0;
        opacity: 0.9;
        overflow: hidden;
        user-select: text;
      }

      ::slotted(a),
      ::slotted(a:visited) {
        color: var(--vscode-textLink-foreground);
        text-decoration: none;
      }

      ::slotted(a:hover),
      ::slotted(a:active) {
        color: var(--vscode-textLink-activeForeground);
        text-decoration: underline;
      }

      ::slotted(code) {
        color: var(--vscode-textPreformat-foreground);
      }

      ::slotted(p) {
        line-height: 1.4;
        margin-bottom: 9px;
        margin-top: 9px;
      }

      ::slotted(p:first-child) {
        margin-top: 0;
      }

      ::slotted(p:last-child) {
        margin-bottom: 0;
      }
    `}render(){return N`
      <slot></slot>
    `}};xt=mt([J("vscode-form-description")],xt);var wt=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let yt=class extends st{static get styles(){return tt`
      :host {
        display: block;
        padding: 12px 0 18px;
      }
    `}render(){return N`
      <slot></slot>
    `}};yt=wt([J("vscode-form-item")],yt);var kt=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let $t=class extends st{static get styles(){return tt`
      :host {
        color: var(--vscode-foreground);
        cursor: default;
        display: block;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: 600;
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: text;
        white-space: nowrap;
      }

      ::slotted(b) {
        font-weight: 600;
        opacity: 0.9;
      }
    `}render(){return N`
      <slot></slot>
    `}};$t=kt([J("vscode-form-label")],$t);
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const St=new WeakMap,Bt=v(t=>e=>{if(!(e instanceof S)||e instanceof _||"style"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:s}=e,{style:o}=s.element;let i=St.get(e);void 0===i&&(o.cssText=s.strings.join(" "),St.set(e,i=new Set)),i.forEach(e=>{e in t||(i.delete(e),-1===e.indexOf("-")?o[e]=null:o.removeProperty(e))});for(const e in t)i.add(e),-1===e.indexOf("-")?o[e]=t[e]:o.setProperty(e,t[e])});var Ot=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Ct=class extends st{constructor(){var t;super(),this.name="",this.size=16,this.spin=!1,this.spinDuration=1.5;const e=(null===(t=window.__VSCODE_WEBVIEW_ELEMENTS_CONFIG__)||void 0===t?void 0:t.codiconCssPath)||"../node_modules/vscode-codicons/dist/codicon.css",s=document.createElement("link");s.setAttribute("rel","stylesheet"),s.setAttribute("href",e),s.setAttribute("id","vscode-icon-injected-stylesheet"),document.head.appendChild(s)}static get styles(){return tt`
      :host {
        display: inline-block;
      }

      .codicon {
        display: block;
      }

      @keyframes icon-spin {
        100% {
          transform: rotate(360deg);
        }
      }

      .spin {
        animation-name: icon-spin;
        animation-timing-function: steps(30);
        animation-iteration-count: infinite;
      }
    `}render(){return N`
      <link
        rel="stylesheet"
        href="../node_modules/vscode-codicons/dist/codicon.css"
      />
      <span
        class="${at({codicon:!0,["codicon-"+this.name]:!0,spin:this.spin})}"
        style="${Bt({animationDuration:String(this.spinDuration)+"s"})}"
      ></span>
    `}};Ot([G({type:String})],Ct.prototype,"name",void 0),Ot([G({type:Number})],Ct.prototype,"size",void 0),Ot([G({type:Boolean})],Ct.prototype,"spin",void 0),Ot([G({type:Number,attribute:"spin-duration"})],Ct.prototype,"spinDuration",void 0),Ct=Ot([J("vscode-icon")],Ct);var _t,jt,zt=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};!function(t){t.DEFAULT="default",t.INFO="info",t.WARNING="warning",t.ERROR="error"}(_t||(_t={})),function(t){t.COLOR="color",t.DATE="date",t.DATETIME_LOCAL="datetime-local",t.EMAIL="email",t.FILE="file",t.MONTH="month",t.NUMBER="number",t.PASSWORD="password",t.TEL="tel",t.TEXT="text",t.TIME="time",t.URL="url",t.WEEK="week"}(jt||(jt={}));let It=class extends st{constructor(){super(),this.multiline=!1,this.message="",this.panelInput=!1,this.focused=!1,this.value="",this.placeholder="",this.lines=2,this.maxLines=5,this._textareaDefaultCursor=!1,this.onInputFocus=()=>{this.focused=!0},this.onInputBlur=()=>{this.focused=!1},this.onInputInput=t=>{const e=t.target;this.value=e.value,this.dispatchEvent(new CustomEvent("vsc-input",{detail:e.value,bubbles:!0,composed:!0})),this.resizeTextareaIfRequired()},this.onInputChange=t=>{const e=t.target;this.dispatchEvent(new CustomEvent("vsc-change",{detail:e.value,bubbles:!0,composed:!0}))},this.onTextareaMouseMove=t=>{const e=this.getBoundingClientRect(),s=t.clientX;this._textareaDefaultCursor=s<=e.left+e.width&&s>=e.left+e.width-10-2,this.requestUpdate()},this.resizeTextareaIfRequired=()=>{if(this.multiline){const t=this.value.match(/\n/g),e=t?t.length+1:1;this._currentLines=Math.min(Math.max(e,this.lines),this.maxLines),this.requestUpdate()}},this._severity=_t.DEFAULT,this._type=jt.TEXT,this._currentLines=this.lines}set severity(t){const e=this._severity;switch(t){case _t.INFO:case _t.WARNING:case _t.ERROR:this._severity=t;break;default:this._severity=_t.DEFAULT}this.requestUpdate("messageSeverity",e)}get severity(){return this._severity}set type(t){const e=this._type;switch(t){case jt.COLOR:case jt.DATE:case jt.DATETIME_LOCAL:case jt.EMAIL:case jt.FILE:case jt.MONTH:case jt.NUMBER:case jt.PASSWORD:case jt.TEL:case jt.TEXT:case jt.TIME:case jt.URL:case jt.WEEK:this._type=t;break;default:this._type=jt.TEXT}this.requestUpdate("type",e)}get type(){return this._type}connectedCallback(){super.connectedCallback(),this.resizeTextareaIfRequired()}updated(t){t.has("value")&&this.resizeTextareaIfRequired()}static get styles(){return tt`
      .container {
        position: relative;
      }

      .cursor-default {
        cursor: default;
      }

      textarea {
        overflow: visible;
        resize: none;
      }

      textarea::-webkit-scrollbar {
        cursor: default;
        width: 10px;
      }

      textarea::-webkit-scrollbar-button {
        display: none;
      }

      textarea::-webkit-scrollbar-track {
        background-color: transparent;
        width: 10px;
      }

      textarea::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

      textarea:hover::-webkit-scrollbar-thumb {
        background-color: var(--vscode-scrollbarSlider-background);
      }

      textarea:hover::-webkit-scrollbar-thumb:hover {
        background-color: var(--vscode-scrollbarSlider-hoverBackground);
      }

      textarea:hover::-webkit-scrollbar-thumb:active {
        background-color: var(--vscode-scrollbarSlider-activeBackground);
      }

      input,
      textarea {
        background-color: var(--vscode-input-background);
        border-color: var(--vscode-settings-textInputBorder, rgba(0, 0, 0, 0));
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        color: var(--vscode-input-foreground);
        display: block;
        font-family: inherit;
        line-height: 17px;
        outline: none;
        padding: 4px;
        width: 100%;
      }

      input::placeholder,
      textarea::placeholder {
        color: var(--vscode-input-placeholderForeground);
      }

      input:focus,
      textarea:focus {
        border-color: var(--vscode-focusBorder);
      }

      .container.panel-input input,
      .container.panel-input textarea {
        border-color: var(--vscode-panelInput-border);
      }

      .container.default input,
      .container.default textarea,
      .container.panel-input.default input,
      .container.panel-input.default textarea {
        border-color: var(--vscode-focusBorder);
      }

      .container.info input,
      .container.info textarea,
      .container.panel-input.info input,
      .container.panel-input.info textarea {
        border-color: var(--vscode-inputValidation-infoBorder);
      }

      .container.warning input,
      .container.warning textarea,
      .container.panel-input.warning input,
      .container.panel-input.warning textarea {
        border-color: var(--vscode-inputValidation-warningBorder);
      }

      .container.error input,
      .container.error textarea,
      .container.panel-input.error input,
      .container.panel-input.error textarea {
        border-color: var(--vscode-inputValidation-errorBorder);
      }

      .message {
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        display: none;
        font-size: 12px;
        line-height: 17px;
        margin-top: -1px;
        overflow: hidden;
        padding: .4em;
        position: absolute;
        user-select: none;
        top: 100%;
        text-align: left;
        width: 100%;
        word-wrap: break-word;
      }

      .focused:not(.default) .message {
        display: block;
      }

      .message.default {
        background-color: var(--vscode-editor-background);
        border-color: var(--vscode-focusBorder);
      }

      .message.info {
        background-color: var(--vscode-inputValidation-infoBackground);
        border-color: var(--vscode-inputValidation-infoBorder);
      }

      .message.warning {
        background-color: var(--vscode-inputValidation-warningBackground);
        border-color: var(--vscode-inputValidation-warningBorder);
      }

      .message.error {
        background-color: var(--vscode-inputValidation-errorBackground);
        border-color: var(--vscode-inputValidation-errorBorder);
      }
    `}render(){const t=N`
      <textarea
        @focus="${this.onInputFocus}"
        @blur="${this.onInputBlur}"
        @input="${this.onInputInput}"
        @change="${this.onInputChange}"
        @mousemove="${this.onTextareaMouseMove}"
        class="${at({"cursor-default":this._textareaDefaultCursor})}"
        placeholder="${this.placeholder}"
        .value="${this.value}"
      ></textarea>
    `,e=N`
      <input
        type="${this.type}"
        @focus="${this.onInputFocus}"
        @blur="${this.onInputBlur}"
        @input="${this.onInputInput}"
        @change="${this.onInputChange}"
        placeholder="${this.placeholder}"
        .value="${this.value}"
      >
    `,s=`${10+17*this._currentLines}px`,o=N`
      <div class="message ${this.severity}">
        ${this.message}
      </div>
    `;let i="container";return this.severity!==_t.DEFAULT&&(i+=` ${this.severity}`),this.focused&&(i+=" focused"),N`
      <style>
        textarea {
          height: ${s};
        }
      </style>
      <div class="${i}">
        ${this.multiline?t:e}
        ${this.message?o:""}
      </div>
    `}};zt([G({type:Boolean})],It.prototype,"multiline",void 0),zt([G({type:String})],It.prototype,"message",void 0),zt([G({type:String})],It.prototype,"severity",null),zt([G({type:Boolean})],It.prototype,"panelInput",void 0),zt([G({type:String})],It.prototype,"type",null),zt([G({type:Boolean})],It.prototype,"focused",void 0),zt([G({type:String})],It.prototype,"value",void 0),zt([G({type:String})],It.prototype,"placeholder",void 0),zt([G({type:Number})],It.prototype,"lines",void 0),zt([G({type:Number})],It.prototype,"maxLines",void 0),It=zt([J("vscode-inputbox")],It);var Mt=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Tt=class extends st{constructor(){super(),this.description="",this.selected=!1,this.multiple=!1,this._mainSlot=null}set value(t){const e=this._value;this._value="string"!=typeof t?"":t,this.requestUpdate("value",e)}get value(){return"string"==typeof this._value?this._value:void 0===this._value&&this._label||""}set label(t){const e=this._label;this._label=t,this.requestUpdate("label",e)}get label(){return this.innerText}firstUpdated(){var t;this._mainSlot=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("slot"),this._mainSlot&&this._mainSlot.addEventListener("slotchange",this._onSlotChange.bind(this))}_onSlotChange(){this.dispatchEvent(new CustomEvent("vsc-slotchange",{detail:{innerText:this.innerText},composed:!0,bubbles:!1})),this.label=this.innerText}static get styles(){return tt`
      .wrapper {
        align-items: center;
        color: var(--vscode-foreground);
        cursor: pointer;
        display: flex;
        font-size: var(--vscode-font-size);
        line-height: 1.3;
        min-height: calc(var(--vscode-font-size) * 1.3);
        padding: 1px 3px;
        user-select: none;
      }

      .wrapper:hover,
      .wrapper.selected {
        background-color: var(--vscode-list-focusBackground);
      }

      input {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      .icon {
        background-color: var(--vscode-settings-checkboxBackground);
        border: 1px solid currentColor;
        border-radius: 2px;
        box-sizing: border-box;
        height: 14px;
        margin-right: 5px;
        overflow: hidden;
        position: relative;
        width: 14px;
      }

      .icon.checked:before,
      .icon.checked:after {
        content: '';
        display: block;
        height: 5px;
        position: absolute;
        transform: rotate(-45deg);
        width: 10px;
      }

      .icon.checked:before {
        background-color: currentColor;
        left: 1px;
        top: 2.5px;
      }

      .icon.checked:after {
        background-color: var(--vscode-settings-checkboxBackground);
        left: 1px;
        top: -0.5px;
      }

      .empty-placeholder:before {
        content: '-';
        visibility: hidden;
      }
    `}render(){return N`
      <div class="${at({wrapper:!0,selected:this.selected})}">
        ${this.multiple?N`
              <span
                class="${at({icon:!0,checked:this.selected})}"
              ></span>
            `:g}
        <slot><span class="empty-placeholder"></span></slot>
      </div>
    `}};Mt([G({type:String})],Tt.prototype,"value",null),Mt([G({type:String})],Tt.prototype,"label",null),Mt([G({type:String})],Tt.prototype,"description",void 0),Mt([G({type:Boolean,reflect:!0})],Tt.prototype,"selected",void 0),Mt([G({type:Boolean,attribute:!1})],Tt.prototype,"multiple",void 0),Tt=Mt([J("vscode-option")],Tt);var At=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Et=class extends st{constructor(){super(...arguments),this.shadow=!0,this.scrolled=!1,this.scrollableContainer=null}connectedCallback(){super.connectedCallback(),this.requestUpdate().then(()=>{var t;this.scrollableContainer=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".scrollable-container"),this.scrollableContainer.addEventListener("scroll",this.onScrollableContainerScroll.bind(this))})}onScrollableContainerScroll(){this.scrolled=this.scrollableContainer.scrollTop>0}static get styles(){return tt`
      :host {
        display: block;
        position: relative;
      }

      .scrollable-container {
        height: 100%;
        overflow: auto;
      }

      .scrollable-container::-webkit-scrollbar {
        cursor: default;
        width: 10px;
      }

      .scrollable-container::-webkit-scrollbar-button {
        display: none;
      }

      .scrollable-container:hover::-webkit-scrollbar-button {
        display: none;
      }

      .scrollable-container::-webkit-scrollbar-track {
        background-color: transparent;
        width: 10px;
      }

      .scrollable-container::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

      .scrollable-container:hover::-webkit-scrollbar-thumb {
        background-color: var(--vscode-scrollbarSlider-background);
      }

      .scrollable-container:hover::-webkit-scrollbar-thumb:hover {
        background-color: var(--vscode-scrollbarSlider-hoverBackground);
      }

      .scrollable-container:hover::-webkit-scrollbar-thumb:active {
        background-color: var(--vscode-scrollbarSlider-activeBackground);
      }

      .shadow {
        box-shadow: var(--vscode-scrollbar-shadow) 0 6px 6px -6px inset;
        display: none;
        height: 3px;
        left: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        z-index: 1;
        width: 100%;
      }

      .shadow.visible {
        display: block;
      }

      .content {
        overflow: hidden;
      }
    `}render(){const t=at({shadow:!0,visible:this.scrolled});return N`
      <div class="scrollable-container">
        <div class="${t}"></div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `}};At([G({type:Boolean})],Et.prototype,"shadow",void 0),At([G({type:Boolean,reflect:!1})],Et.prototype,"scrolled",void 0),Et=At([J("vscode-scrollable")],Et);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const Nt=new WeakMap,Pt=v(t=>e=>{if(!(e instanceof B))throw new Error("unsafeHTML can only be used in text bindings");const s=Nt.get(e);if(void 0!==s&&y(t)&&t===s.value&&e.value===s.fragment)return;const o=document.createElement("template");o.innerHTML=t;const i=document.importNode(o.content,!0);e.setValue(i),Nt.set(e,{value:t,fragment:i})});var Lt=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};const Vt=t=>t.composedPath().find(t=>{var e,s;return"vscode-option"===(null===(s=null===(e=t)||void 0===e?void 0:e.tagName)||void 0===s?void 0:s.toLowerCase())});let Ut=class extends st{constructor(){super(),this.tabIndex=-1,this.multiple=!1,this._value="",this._showDropdown=!1,this._currentDescription="",this._mainSlot=null,this._options=[],this._selectedOptions=[],this._currentLabel="",this._selectedIndex=-1,this._selectedIndexes=[],this._onClickOutsideBound=this._onClickOutside.bind(this)}set value(t){this._selectedIndex=this.options.findIndex(e=>e.value===t),this._selectedIndexes=[this._selectedIndex],this._value=t||"",this._updateCurrentLabel()}get value(){return this._value}get options(){return this._options}set selectedIndex(t){var e;this._selectedIndex=t,this._selectedIndexes=[this._selectedIndex],this._value=(null===(e=this._options[this._selectedIndex])||void 0===e?void 0:e.value)||"",this._updateCurrentLabel()}get selectedIndex(){return this._selectedIndex}set selectedIndexes(t){var e;this._selectedIndexes=t;const s=null===(e=this._mainSlot)||void 0===e?void 0:e.assignedNodes().filter(t=>"vscode-option"===t.nodeName.toLowerCase());let o=-1;this._options.forEach((t,e)=>{const i=this._selectedIndexes.includes(e);-1===o&&i&&(o=e),s[e].selected=i,this._options[e].selected=i}),this._value=-1!==o?this._options[o].value:"",this._selectedIndex=o,this._updateCurrentLabel()}get selectedIndexes(){return this._selectedIndexes}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._onOptionClick),this.addEventListener("mouseover",this._onOptionMouseOver),this.addEventListener("mouseout",this._onOptionMouseOut)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._onOptionClick),this.removeEventListener("mouseover",this._onOptionMouseOver),this.removeEventListener("mouseout",this._onOptionMouseOut)}firstUpdated(){this._mainSlot=this.shadowRoot.querySelector("slot"),this._mainSlot&&this._mainSlot.addEventListener("slotchange",this._onSlotChange.bind(this))}_multipleLabelText(){const t=this._selectedIndexes.length;return 0===t?"<No item selected>":1===t?this._options[this._selectedIndexes[0]].label:`${t} items selected`}_singleLabelText(){return-1===this._selectedIndex?"":this._options&&this._options[this._selectedIndex]?this._options[this._selectedIndex].label:""}_updateCurrentLabel(){this.multiple?this._currentLabel=this._multipleLabelText():this._currentLabel=this._singleLabelText(),this.requestUpdate()}_onSlotChange(){const t=this._mainSlot.assignedNodes().filter(t=>t.nodeType===Node.ELEMENT_NODE&&"vscode-option"===t.tagName.toLowerCase());let e=!1;t.forEach((t,s)=>{const o=t.innerText,i=t.value||o,n=t.getAttribute("description")||"",r=t.selected;t.dataset.index=String(s),t.multiple=this.multiple,!e&&r&&(this._selectedIndex=s,this._value=i,e=!0),this.multiple&&r&&this._selectedIndexes.push(s),this._options[s]={label:o,value:i,description:n,selected:r}}),this._updateCurrentLabel()}_onClickOutside(t){-1===t.composedPath().findIndex(t=>t===this)&&(this._showDropdown=!1,window.removeEventListener("click",this._onClickOutsideBound),this.requestUpdate())}_onFaceClick(){this._showDropdown=!this._showDropdown,this.requestUpdate(),window.addEventListener("click",this._onClickOutsideBound)}_onOptionMouseOver(t){const e=Vt(t);e&&(this._currentDescription=e.description||"",this.requestUpdate())}_onOptionMouseOut(t){Vt(t)&&(this._currentDescription="",this.requestUpdate())}_onOptionClick(t){const e=Vt(t);if(!e)return;const s=Number(e.dataset.index),o=e.selected,i=this.selectedIndex;if(this._selectedIndex=Number(s),this._selectedIndexes=[this._selectedIndex],this._value=e.value,this.multiple){const t=!o;e.selected=t,this._options[s].selected=t;let i=!1;this._selectedIndexes=[],this._selectedOptions=[],this._options.forEach((t,e)=>{var s;t.selected&&(this._selectedIndexes.push(e),this._selectedOptions.push(t),i||(this._selectedIndex=e,this._value=(null===(s=this._options[this._selectedIndex])||void 0===s?void 0:s.value)||"",i=!0))}),this.dispatchEvent(new CustomEvent("vsc-change",{detail:{multiple:!0,selectedIndex:this._selectedIndex,selectedIndexes:this._selectedIndexes,selectedOptions:this._selectedOptions,value:this._value}}))}else i!==this.selectedIndex&&this.dispatchEvent(new CustomEvent("vsc-change",{detail:{multiple:!1,selectedIndex:this._selectedIndex,selectedIndexes:this._selectedIndexes,selectedOptions:this._options[this._selectedIndex],value:this._value}})),this._showDropdown=!1;this._updateCurrentLabel()}_onAcceptClick(){this._showDropdown=!1,this.requestUpdate()}_onResetClick(){var t;const e=null===(t=this._mainSlot)||void 0===t?void 0:t.assignedElements().filter(t=>"vscode-option"===t.tagName.toLocaleLowerCase());this._options.forEach((t,s)=>{e[s].selected=!1,t.selected=!1}),this._selectedIndexes=[],this._selectedIndex=-1,this._value="",this._updateCurrentLabel()}static get styles(){return tt`
      :host {
        display: inline-block;
        outline: none;
        position: relative;
        width: 320px;
      }

      .select-face {
        background-color: var(--vscode-settings-textInputBackground);
        border-color: var(--vscode-settings-dropdownBorder, rgba(0, 0, 0, 0));
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        color: var(--vscode-foreground);
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.3;
        padding: 4px;
        position: relative;
        user-select: none;
        width: 100%;
      }

      .icon {
        display: block;
        height: 14px;
        pointer-events: none;
        position: absolute;
        right: 8px;
        top: 5px;
        width: 14px;
      }

      .icon svg {
        height: 100%;
        width: 100%;
      }

      .select-face:empty:before {
        content: '\\00a0';
      }

      :host(:focus) .select-face {
        border-color: var(--vscode-focusBorder);
      }

      .dropdown {
        background-color: var(--vscode-settings-textInputBackground);
        border-color: var(--vscode-settings-dropdownBorder);
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        left: 0;
        position: absolute;
        top: 100%;
        width: 100%;
        z-index: 2;
      }

      :host(:focus) .dropdown {
        border-color: var(--vscode-focusBorder);
      }

      .options {
        box-sizing: border-box;
        cursor: pointer;
        padding: 1px;
      }

      .option:hover {
        background-color: var(--vscode-list-hoverBackground);
      }

      .buttons {
        display: flex;
        justify-content: flex-end;
        padding: 4px;
      }

      .buttons :not(:last-child) {
        margin-right: 4px;
      }

      .description {
        border-color: var(--vscode-settings-dropdownBorder);
        border-style: solid;
        border-width: 1px 0 0;
        color: var(--vscode-foreground);
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        line-height: 1.3;
        padding: 6px 4px;
      }
    `}render(){let t;t=this._currentDescription?N`<div class="description">
        ${this._currentDescription}
      </div>`:g;const e=!0===this._showDropdown?"block":"none",s=""===this._currentLabel?Pt("&nbsp;"):N`${this._currentLabel}`;return N`
      <style>
        .dropdown {
          display: ${e};
        }
      </style>
      <div class="select-face" @click="${this._onFaceClick}">
        <span class="text">${s}</span>
        <span class="icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.976 10.072l4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z"
            />
          </svg>
        </span>
      </div>
      <div class="dropdown">
        <div class="options"><slot></slot></div>
        ${this.multiple?N`<div class="buttons">
              <vscode-button @click="${this._onAcceptClick}">OK</vscode-button>
              <vscode-button secondary @click="${this._onResetClick}"
                >Reset</vscode-button
              >
            </div>`:null}
        ${t}
      </div>
    `}};Lt([G({type:String})],Ut.prototype,"value",null),Lt([G({type:Array,reflect:!1})],Ut.prototype,"options",null),Lt([G({type:Number})],Ut.prototype,"selectedIndex",null),Lt([G({type:Array})],Ut.prototype,"selectedIndexes",null),Lt([G({type:Number,reflect:!0})],Ut.prototype,"tabIndex",void 0),Lt([G({type:Boolean,reflect:!0})],Ut.prototype,"multiple",void 0),Ut=Lt([J("vscode-select")],Ut);var Ft=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Rt,Ht=class extends st{constructor(){super(),this._headerSlot=null,this._mainSlot=null,this._selectedIndex=0}set selectedIndex(t){this._selectedIndex=t,this._setActiveTab()}get selectedIndex(){return this._selectedIndex}_setActiveTab(){this._mainSlot&&this._headerSlot&&(Array.from(this._mainSlot.assignedElements()).forEach((t,e)=>{t.style.display=e===this._selectedIndex?"block":"none"}),Array.from(this._headerSlot.assignedElements()).forEach((t,e)=>{t.dataset.index=String(e),t.classList.toggle("is-active",e===this._selectedIndex)}),this.dispatchEvent(new CustomEvent("vsc-select",{detail:{selectedIndex:this._selectedIndex},composed:!0})))}_onSlotChanged(){this._setActiveTab()}_onHeaderClick(t){const e=t.target.dataset.index;e&&(this._selectedIndex=Number(e),this._setActiveTab())}firstUpdated(){this._headerSlot=this.shadowRoot.querySelector("slot[name=header]"),this._mainSlot=this.shadowRoot.querySelector("slot:not([name=header])"),this._mainSlot.addEventListener("slotchange",this._onSlotChanged.bind(this))}static get styles(){return tt`
      :host {
        display: block;
      }

      .header {
        display: flex;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
        width: 100%;
      }

      :host-context(.vscode-light) .header {
        border-bottom: 1px solid #ccc;
      }

      ::slotted(header) {
        border-bottom: 1px solid transparent;
        color: var(--vscode-foreground);
        cursor: pointer;
        display: block;
        margin-bottom: -1px;
        overflow: hidden;
        padding: 7px 8px;
        text-overflow: ellipsis;
        user-select: none;
        white-space: nowrap;
      }

      ::slotted(.is-active) {
        border-bottom-color: var(--vscode-settings-headerForeground);
        color: var(--vscode-settings-headerForeground);
      }
    `}render(){return N`
      <div class="header" @click="${this._onHeaderClick}">
        <slot name="header"></slot>
      </div>
      <slot></slot>
    `}};Ft([G({type:Number})],Ht.prototype,"selectedIndex",null),Ht=Ft([J("vscode-tabs")],Ht);var Wt,qt=function(t,e,s,o){for(var i,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,c=t.length-1;c>=0;c--)(i=t[c])&&(r=(n<3?i(r):n>3?i(e,s,r):i(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};!function(t){t.BRANCH="branch",t.LEAF="leaf"}(Wt||(Wt={}));const Dt=(()=>{if(Rt)return Rt;const t=document.querySelector('script[src*="vscwe"]');if(t){const e=/(.+\/)vscwe/g.exec(t.src);return e?(Rt=e[1],Rt):(Rt="",Rt)}return Rt="",Rt})();let Jt=class extends st{constructor(){super(...arguments),this.data=[],this.indent=8,this.arrows=!1,this.multiline=!1,this._selectedItem=null}getItemByPath(t){const e=t.split("/").map(t=>Number(t));let s=this.data,o=void 0;return e.forEach((t,i)=>{i===e.length-1?o=s[t]:s=s[t].subItems}),o}getItemType(t){return t.subItems&&Array.isArray(t.subItems)&&t.subItems.length>0?Wt.BRANCH:Wt.LEAF}getIconName(t){if(!t.icons)return;const{icons:e}=t,s=this.getItemType(t),o=t.open||!1;return s===Wt.BRANCH&&o?e.open||void 0:s!==Wt.BRANCH||o?s===Wt.LEAF&&e.leaf||void 0:e.branch||void 0}renderTreeItem({indentLevel:t,label:e,path:s,iconName:o,open:i=!1,itemType:n,selected:r=!1,subItems:c}){const l=i?"icon-arrow open":"icon-arrow",a=["contents"],d=i?["open"]:[],h=t*this.indent,u=this.arrows&&n===Wt.LEAF?24+h:h,p=this.arrows&&n===Wt.BRANCH?`<i class="${l}"></i>`:"",v=o?`<vscode-icon name="${o}" class="label-icon"></vscode-icon>`:"",b=i&&n===Wt.BRANCH?`<ul>${this.renderTree(c,s)}</ul>`:"",f=`<span class="label">${e}</span>`;return d.push(n===Wt.LEAF?"leaf":"branch"),r&&a.push("selected"),`\n      <li data-path="${s.join("/")}" class="${d.join(" ")}">\n        <span class="${a.join(" ")}" style="padding-left: ${u}px;">\n          ${p}\n          ${v}\n          ${f}\n        </span>\n        ${b}\n      </li>\n    `}renderTree(t,e=[]){let s="";return t?(t.forEach((t,o)=>{const i=[...e,o],n=i.length-1,r=this.getItemType(t),c=this.getIconName(t),{label:l,open:a=!1,selected:d=!1,subItems:h=[]}=t;d&&(this._selectedItem=t),s+=this.renderTreeItem({indentLevel:n,label:l,path:i,open:a,iconName:c,itemType:r,selected:d,subItems:h})}),s):s}toggleSubTreeOpen(t){t.subItems&&(t.open=!t.open)}selectTreeItem(t){this._selectedItem&&(this._selectedItem.selected=!1),this._selectedItem=t,t.selected=!0}closeSubTreeRecursively(t){t.forEach(t=>{t.open=!1,t.subItems&&t.subItems.length>0&&this.closeSubTreeRecursively(t.subItems)})}emitSelectEvent(t,e){const{icons:s,label:o,open:i,value:n}=t,r={icons:s,itemType:this.getItemType(t),label:o,open:i||!1,value:n||o,path:e};this.dispatchEvent(new CustomEvent("vsc-select",{bubbles:!0,composed:!0,detail:r}))}onComponentClick(t){const e=t.composedPath().find(t=>t.tagName&&"LI"===t.tagName.toUpperCase());if(e){const t=e.dataset.path||"",s=this.getItemByPath(t);this.toggleSubTreeOpen(s),this.selectTreeItem(s),this.emitSelectEvent(s,t),this.requestUpdate()}}closeAll(){this.closeSubTreeRecursively(this.data),this.requestUpdate()}static get styles(){return tt`
      :host {
        display: block;
        outline: none;
      }

      li {
        list-style: none;
      }

      ul,
      li {
        margin: 0;
        padding: 0;
      }

      .contents {
        align-items: center;
        display: flex;
      }

      .multi .contents {
        align-items: flex-start;
      }

      .contents:hover {
        background-color: var(--vscode-list-hoverBackground);
        cursor: pointer;
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
      }

      .contents.selected {
        background-color: var(--vscode-list-focusBackground);
      }

      :host(:focus) .contents.selected {
        background-color: var(--vscode-list-activeSelectionBackground);
        color: var(--vscode-list-activeSelectionForeground);
      }

      .icon-arrow {
        background-position: 3px center;
        background-repeat: no-repeat;
        display: block;
        height: 22px;
        margin: 0 8px 0 0;
        width: 16px;
      }

      :host-context(.vscode-light) .icon-arrow {
        background-image: url(${Z(Dt)}icons/light/chevron-right.svg);
      }

      :host-context(.vscode-dark) .icon-arrow,
      :host-context(.vscode-high-contrast) .icon-arrow {
        background-image: url(${Z(Dt)}icons/dark/chevron-right.svg);
      }

      :host-context(.vscode-light) .icon-arrow.open {
        background-image: url(${Z(Dt)}icons/light/chevron-down.svg);
      }

      :host-context(.vscode-dark) .icon-arrow.open,
      :host-context(.vscode-high-contrast) .icon-arrow.open {
        background-image: url(${Z(Dt)}icons/dark/chevron-down.svg);
      }

      .label-icon {
        display: block;
        margin-right: 6px;
      }

      .multi .contents .label-icon {
        margin-top: 3px;
      }

      .label {
        display: block;
        line-height: 16px;
        padding-bottom: 3px;
        padding-top: 3px;
      }

      .single .label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `}render(){return N`
      <div @click="${this.onComponentClick}" class="${this.multiline?"multi":"single"}">
        <ul>
          ${Pt(this.renderTree(this.data))}
        </ul>
      </div>
    `}};qt([G({type:Array,reflect:!1})],Jt.prototype,"data",void 0),qt([G({type:Number})],Jt.prototype,"indent",void 0),qt([G({type:Boolean})],Jt.prototype,"arrows",void 0),qt([G({type:Boolean})],Jt.prototype,"multiline",void 0),Jt=qt([J("vscode-tree")],Jt);export{it as VscodeButton,rt as VscodeCheckbox,ht as VscodeCollapsible,bt as VscodeContextMenu,pt as VscodeContextMenuItem,gt as VscodeFormControl,xt as VscodeFormDescription,yt as VscodeFormItem,$t as VscodeFormLabel,Ct as VscodeIcon,It as VscodeInputbox,Tt as VscodeOption,Et as VscodeScrollable,Ut as VscodeSelect,Ht as VscodeTabs,Jt as VscodeTree};
