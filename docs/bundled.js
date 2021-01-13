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
const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,o=new RegExp(`${s}|${i}`);class n{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],l=document.createTreeWalker(e.content,133,null,!1);let h=0,d=-1,u=0;const{strings:p,values:{length:v}}=t;for(;u<v;){const t=l.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)r(e[t].name,"$lit$")&&i++;for(;i-- >0;){const e=p[u],s=a.exec(e)[2],i=s.toLowerCase()+"$lit$",n=t.getAttribute(i);t.removeAttribute(i);const r=n.split(o);this.parts.push({type:"attribute",index:d,name:s,strings:r}),u+=r.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),l.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,n=e.split(o),l=n.length-1;for(let e=0;e<l;e++){let i,o=n[e];if(""===o)i=c();else{const t=a.exec(o);null!==t&&r(t[2],"$lit$")&&(o=o.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(o)}s.insertBefore(i,t),this.parts.push({type:"node",index:++d})}""===n[l]?(s.insertBefore(c(),t),i.push(t)):t.data=n[l],u+=l}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&d!==h||(d++,e.insertBefore(c(),t)),h=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(i.push(t),d--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const r=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},l=t=>-1!==t.index,c=()=>document.createComment(""),a=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(t,e){const{element:{content:s},parts:i}=t,o=document.createTreeWalker(s,133,null,!1);let n=u(i),r=i[n],l=-1,c=0;const a=[];let h=null;for(;o.nextNode();){l++;const t=o.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(a.push(t),null===h&&(h=t)),null!==h&&c++;void 0!==r&&r.index===l;)r.index=null!==h?-1:r.index-c,n=u(i,n),r=i[n]}a.forEach((t=>t.parentNode.removeChild(t)))}const d=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},u=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(l(e))return s}return-1};
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
class m{constructor(t,e,s){this.t=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.t)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.t)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,o=document.createTreeWalker(e,133,null,!1);let n,r=0,c=0,a=o.nextNode();for(;r<i.length;)if(n=i[r],l(n)){for(;c<n.index;)c++,"TEMPLATE"===a.nodeName&&(s.push(a),o.currentNode=a.content),null===(a=o.nextNode())&&(o.currentNode=s.pop(),a=o.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(a.previousSibling),this.t.push(t)}else this.t.push(...this.processor.handleAttributeExpressions(a,n.name,n.strings,this.options));r++}else this.t.push(void 0),r++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */const w=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),x=` ${s} `;class y{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",o=!1;for(let n=0;n<t;n++){const t=this.strings[n],r=t.lastIndexOf("\x3c!--");o=(r>-1||o)&&-1===t.indexOf("--\x3e",r+1);const l=a.exec(t);e+=null===l?t+(o?x:i):t.substr(0,l.index)+l[1]+l[2]+"$lit$"+l[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==w&&(e=w.createHTML(e)),t.innerHTML=e,t}}
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
 */const k=t=>null===t||!("object"==typeof t||"function"==typeof t),$=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class S{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new B(this)}_getValue(){const t=this.strings,e=t.length-1,s=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=s[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!$(t))return t}let i="";for(let o=0;o<e;o++){i+=t[o];const e=s[o];if(void 0!==e){const t=e.value;if(k(t)||!$(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class B{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===f||k(t)&&t===this.value||(this.value=t,b(t)||(this.committer.dirty=!0))}commit(){for(;b(this.value);){const t=this.value;this.value=f,t(this)}this.value!==f&&this.committer.commit()}}class C{constructor(t){this.value=void 0,this.i=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(c()),this.endNode=t.appendChild(c())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.o(this.startNode=c()),t.o(this.endNode=c())}insertAfterPart(t){t.o(this.startNode=c()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.i=t}commit(){if(null===this.startNode.parentNode)return;for(;b(this.i);){const t=this.i;this.i=f,t(this)}const t=this.i;t!==f&&(k(t)?t!==this.value&&this.l(t):t instanceof y?this.h(t):t instanceof Node?this.u(t):$(t)?this.p(t):t===g?(this.value=g,this.clear()):this.l(t))}o(t){this.endNode.parentNode.insertBefore(t,this.endNode)}u(t){this.value!==t&&(this.clear(),this.o(t),this.value=t)}l(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.u(document.createTextNode(s)),this.value=t}h(t){const e=this.options.templateFactory(t);if(this.value instanceof m&&this.value.template===e)this.value.update(t.values);else{const s=new m(e,t.processor,this.options),i=s._clone();s.update(t.values),this.u(i),this.value=s}}p(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const o of t)s=e[i],void 0===s&&(s=new C(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(o),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class _{constructor(t,e,s){if(this.value=void 0,this.i=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.i=t}commit(){for(;b(this.i);){const t=this.i;this.i=f,t(this)}if(this.i===f)return;const t=!!this.i;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.i=f}}class O extends S{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new z(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class z extends B{}let j=!1;(()=>{try{const t={get capture(){return j=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class I{constructor(t,e,s){this.value=void 0,this.i=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.v=t=>this.handleEvent(t)}setValue(t){this.i=t}commit(){for(;b(this.i);){const t=this.i;this.i=f,t(this)}if(this.i===f)return;const t=this.i,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.v,this.g),i&&(this.g=A(t),this.element.addEventListener(this.eventName,this.v,this.g)),this.value=t,this.i=f}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const A=t=>t&&(j?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function M(t){let e=E.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},E.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const o=t.strings.join(s);return i=e.keyString.get(o),void 0===i&&(i=new n(t,t.getTemplateElement()),e.keyString.set(o,i)),e.stringsArray.set(t.strings,i),i}const E=new Map,T=new WeakMap;
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
 */const N=new
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
class{handleAttributeExpressions(t,e,s,i){const o=e[0];if("."===o){return new O(t,e.slice(1),s).parts}if("@"===o)return[new I(t,e.slice(1),i.eventContext)];if("?"===o)return[new _(t,e.slice(1),s)];return new S(t,e,s).parts}handleTextExpression(t){return new C(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const P=(t,...e)=>new y(t,e,"html",N)
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
 */,L=(t,e)=>`${t}--${e}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const V=t=>e=>{const i=L(e.type,t);let o=E.get(i);void 0===o&&(o={stringsArray:new WeakMap,keyString:new Map},E.set(i,o));let r=o.stringsArray.get(e.strings);if(void 0!==r)return r;const l=e.strings.join(s);if(r=o.keyString.get(l),void 0===r){const s=e.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(s,t),r=new n(e,s),o.keyString.set(l,r)}return o.stringsArray.set(e.strings,r),r},F=["html","svg"],D=new Set,H=(t,e,s)=>{D.add(t);const i=s?s.element:document.createElement("template"),o=e.querySelectorAll("style"),{length:n}=o;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,t);const r=document.createElement("style");for(let t=0;t<n;t++){const e=o[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{F.forEach((e=>{const s=E.get(L(e,t));void 0!==s&&s.keyString.forEach((t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach((t=>{s.add(t)})),h(t,s)}))}))})(t);const l=i.content;s?function(t,e,s=null){const{element:{content:i},parts:o}=t;if(null==s)return void i.appendChild(e);const n=document.createTreeWalker(i,133,null,!1);let r=u(o),l=0,c=-1;for(;n.nextNode();)for(c++,n.currentNode===s&&(l=d(e),s.parentNode.insertBefore(e,s));-1!==r&&o[r].index===c;){if(l>0){for(;-1!==r;)o[r].index+=l,r=u(o,r);return}r=u(o,r)}}(s,r,l.firstChild):l.insertBefore(r,l.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const c=l.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(s){l.insertBefore(r,l.firstChild);const t=new Set;t.add(r),h(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const R={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},W=(t,e)=>e!==t&&(e==e||t==t),q={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:W};class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=q){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdateInternal(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||q}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=W){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||R,o="function"==typeof i?i:i.fromAttribute;return o?o(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||R.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((t=>this._enableUpdatingResolver=t)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=q){const i=this.constructor,o=i._attributeNameForProperty(t,s);if(void 0!==o){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(o):this.setAttribute(o,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,s){let i=!0;if(void 0!==t){const o=this.constructor;s=s||o.getPropertyOptions(t),o._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}J.finalized=!0;
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
const K=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){window.customElements.define(t,e)}}})(t,e),G=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(s){s.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function Q(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):G(t,e)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const X=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol();class Z{constructor(t,e){if(e!==Y)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(X?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const tt=(t,...e)=>{const s=e.reduce(((e,s,i)=>e+(t=>{if(t instanceof Z)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1]),t[0]);return new Z(s,Y)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const et={};class st extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,s)=>t.reduceRight(((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t)),s),s=e(t,new Set),i=[];s.forEach((t=>i.unshift(t))),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map((t=>{if(t instanceof CSSStyleSheet&&!X){const e=Array.prototype.slice.call(t.cssRules).reduce(((t,e)=>t+e.cssText),"");return new Z(String(e),Y)}return t}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?X?this.renderRoot.adoptedStyleSheets=t.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==et&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){return et}}st.finalized=!0,st.render=(t,s,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const o=i.scopeName,n=T.has(s),r=U&&11===s.nodeType&&!!s.host,l=r&&!D.has(o),c=l?document.createDocumentFragment():s;if(((t,s,i)=>{let o=T.get(s);void 0===o&&(e(s,s.firstChild),T.set(s,o=new C(Object.assign({templateFactory:M},i))),o.appendInto(s)),o.setValue(t),o.commit()})(t,c,Object.assign({templateFactory:V(o)},i)),l){const t=T.get(c);T.delete(c);const i=t.value instanceof m?t.value.template:void 0;H(o,c,i),e(s,s.firstChild),s.appendChild(c),T.set(s,t)}!n&&r&&window.ShadyCSS.styleElement(s.host)};var it=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let ot=class extends st{constructor(){super(...arguments),this.tabindex=0,this.secondary=!1}static get styles(){return tt`
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
    `}render(){return P`
      <button class="${this.secondary?"secondary":"primary"}">
        <slot></slot>
      </button>
    `}};it([Q({type:Number,reflect:!0})],ot.prototype,"tabindex",void 0),it([Q({type:Boolean})],ot.prototype,"secondary",void 0),ot=it([K("vscode-button")],ot);var nt=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let rt=class extends st{constructor(){super(...arguments),this.label="",this.checked=!1,this.value="",this._uid=`id_${(new Date).valueOf()}_${Math.floor(9999*Math.random())}`}onElementClick(){this.checked=!this.checked,this.dispatchEvent(new CustomEvent("vsc-change",{detail:{checked:this.checked,label:this.label,value:this.value},bubbles:!0,composed:!0}))}static get styles(){return tt`
      :host {
        display: inline-block;
      }

      .wrapper {
        cursor: pointer;
        display: block;
        font-size: var(--vscode-font-size);
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
    `}render(){const t=P`<svg
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
    </svg>`,e=this.checked?t:g;return P`
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
    `}};nt([Q({type:String})],rt.prototype,"label",void 0),nt([Q({type:Boolean})],rt.prototype,"checked",void 0),nt([Q({type:String})],rt.prototype,"value",void 0),rt=nt([K("vscode-checkbox")],rt);
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
class lt{constructor(t){this.classes=new Set,this.changed=!1,this.element=t;const e=(t.getAttribute("class")||"").split(/\s+/);for(const t of e)this.classes.add(t)}add(t){this.classes.add(t),this.changed=!0}remove(t){this.classes.delete(t),this.changed=!0}commit(){if(this.changed){let t="";this.classes.forEach((e=>t+=e+" ")),this.element.setAttribute("class",t)}}}const ct=new WeakMap,at=v((t=>e=>{if(!(e instanceof B)||e instanceof z||"class"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:s}=e,{element:i}=s;let o=ct.get(e);void 0===o&&(i.setAttribute("class",s.strings.join(" ")),ct.set(e,o=new Set));const n=i.classList||new lt(i);o.forEach((e=>{e in t||(n.remove(e),o.delete(e))}));for(const e in t){const s=t[e];s!=o.has(e)&&(s?(n.add(e),o.add(e)):(n.remove(e),o.delete(e)))}"function"==typeof n.commit&&n.commit()}));var ht=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let dt=class extends st{constructor(){super(...arguments),this.tabIndex=0,this.title="",this.open=!1}onHeaderClick(){this.open=!this.open}static get styles(){return tt`
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
    `}render(){const t=at({collapsible:!0,open:this.open}),e=P`<svg
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
    </svg>`;return P`
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
    `}};ht([Q({type:Number})],dt.prototype,"tabIndex",void 0),ht([Q({type:String})],dt.prototype,"title",void 0),ht([Q({type:Boolean})],dt.prototype,"open",void 0),dt=ht([K("vscode-collapsible")],dt);var ut=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let pt=class extends st{constructor(){super(...arguments),this.label="",this.keybinding="",this.value="",this.separator=!1,this.tabindex=0}onItemClick(){this.dispatchEvent(new CustomEvent("vsc-click",{detail:{label:this.label,keybinding:this.keybinding,value:this.value||this.label,separator:this.separator,tabindex:this.tabindex},bubbles:!0,composed:!0}))}static get styles(){return tt`
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
    `}render(){return P`
      ${this.separator?P`
          <div class="context-menu-item separator">
            <span class="rule"></span>
          </div>
        `:P`
          <div class="context-menu-item">
            <a @click="${this.onItemClick}">
              ${this.label?P`<span class="label">${this.label}</span>`:g}
              ${this.keybinding?P`<span class="keybinding">${this.keybinding}</span>`:g}
            </a>
          </div>
        `}
    `}};ut([Q({type:String})],pt.prototype,"label",void 0),ut([Q({type:String})],pt.prototype,"keybinding",void 0),ut([Q({type:String})],pt.prototype,"value",void 0),ut([Q({type:Boolean})],pt.prototype,"separator",void 0),ut([Q({type:Number})],pt.prototype,"tabindex",void 0),pt=ut([K("vscode-context-menu-item")],pt);var vt=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let bt=class extends st{constructor(){super(...arguments),this.data=[],this.show=!1}onItemClick(t){const{detail:e}=t;this.dispatchEvent(new CustomEvent("vsc-select",{detail:e,bubbles:!0,composed:!0}))}static get styles(){return tt`
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
        padding: 0.5em 0;
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
        margin: 0 0.8em 0.2em;
        opacity: 0.4;
        padding-top: 0.2em;
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
    `}render(){const t=P`
      <div class="context-menu">
        ${this.data?this.data.map((({label:t="",keybinding:e="",value:s="",separator:i=!1,tabindex:o=0})=>P`
                <vscode-context-menu-item
                  label="${t}"
                  keybinding="${e}"
                  value="${s}"
                  ?separator="${i}"
                  tabindex="${o}"
                  @vsc-click="${this.onItemClick}"
                ></vscode-context-menu-item>
              `)):P`<slot></slot>`}
      </div>
    `;return P` ${this.show?t:g} `}};vt([Q({type:Array})],bt.prototype,"data",void 0),vt([Q({type:Boolean,reflect:!0})],bt.prototype,"show",void 0),bt=vt([K("vscode-context-menu")],bt);var ft=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let gt=class extends st{static get styles(){return tt`
      :host {
        display: block;
        margin-top: 9px;
      }
    `}render(){return P` <slot></slot> `}};gt=ft([K("vscode-form-control")],gt);var mt=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let wt=class extends st{static get styles(){return tt`
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
    `}render(){return P` <slot></slot> `}};wt=mt([K("vscode-form-description")],wt);var xt=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let yt=class extends st{static get styles(){return tt`
      :host {
        display: block;
        padding: 12px 0 18px;
      }
    `}render(){return P` <slot></slot> `}};yt=xt([K("vscode-form-item")],yt);var kt=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let $t=class extends st{static get styles(){return tt`
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
    `}render(){return P` <slot></slot> `}};$t=kt([K("vscode-form-label")],$t);
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
const St=new WeakMap,Bt=v((t=>e=>{if(!(e instanceof B)||e instanceof z||"style"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:s}=e,{style:i}=s.element;let o=St.get(e);void 0===o&&(i.cssText=s.strings.join(" "),St.set(e,o=new Set)),o.forEach((e=>{e in t||(o.delete(e),-1===e.indexOf("-")?i[e]=null:i.removeProperty(e))}));for(const e in t)o.add(e),-1===e.indexOf("-")?i[e]=t[e]:i.setProperty(e,t[e])})),Ct=new WeakMap,_t=v((t=>e=>{const s=Ct.get(e);if(void 0===t&&e instanceof B){if(void 0!==s||!Ct.has(e)){const t=e.committer.name;e.committer.element.removeAttribute(t)}}else t!==s&&e.setValue(t);Ct.set(e,t)}));var Ot=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let zt=class extends st{constructor(){super(...arguments),this.name="",this.size=16,this.spin=!1,this.spinDuration=1.5}_getStylesheetConfig(){const t=document.getElementById("vscode-codicon-stylesheet"),e=(null==t?void 0:t.getAttribute("href"))||void 0;return{nonce:(null==t?void 0:t.getAttribute("nonce"))||void 0,href:e}}static get styles(){return tt`
      :host {
        display: inline-block;
      }

      .codicon[class*='codicon-'] {
        display: block;
      }

      @keyframes icon-spin {
        100% {
          transform: rotate(360deg);
        }
      }

      .spin {
        animation-name: icon-spin;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
    `}render(){const{href:t,nonce:e}=this._getStylesheetConfig();return P`
      <link
        rel="stylesheet"
        href="${_t(t)}"
        nonce="${_t(e)}"
      />
      <span
        class="${at({codicon:!0,["codicon-"+this.name]:!0,spin:this.spin})}"
        style="${Bt({animationDuration:String(this.spinDuration)+"s",fontSize:this.size+"px",height:this.size+"px",width:this.size+"px"})}"
      ></span>
    `}};Ot([Q({type:String})],zt.prototype,"name",void 0),Ot([Q({type:Number})],zt.prototype,"size",void 0),Ot([Q({type:Boolean})],zt.prototype,"spin",void 0),Ot([Q({type:Number,attribute:"spin-duration"})],zt.prototype,"spinDuration",void 0),zt=Ot([K("vscode-icon")],zt);var jt,It,At=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};!function(t){t.DEFAULT="default",t.INFO="info",t.WARNING="warning",t.ERROR="error"}(jt||(jt={})),function(t){t.COLOR="color",t.DATE="date",t.DATETIME_LOCAL="datetime-local",t.EMAIL="email",t.FILE="file",t.MONTH="month",t.NUMBER="number",t.PASSWORD="password",t.TEL="tel",t.TEXT="text",t.TIME="time",t.URL="url",t.WEEK="week"}(It||(It={}));let Mt=class extends st{constructor(){super(),this.multiline=!1,this.message="",this.panelInput=!1,this.focused=!1,this.value="",this.placeholder="",this.lines=2,this.maxLines=5,this._textareaDefaultCursor=!1,this.onInputFocus=()=>{this.focused=!0},this.onInputBlur=()=>{this.focused=!1},this.onInputInput=t=>{const e=t.target;this.value=e.value,this.dispatchEvent(new CustomEvent("vsc-input",{detail:e.value,bubbles:!0,composed:!0})),this.resizeTextareaIfRequired()},this.onInputChange=t=>{const e=t.target;this.dispatchEvent(new CustomEvent("vsc-change",{detail:e.value,bubbles:!0,composed:!0}))},this.onTextareaMouseMove=t=>{const e=this.getBoundingClientRect(),s=t.clientX;this._textareaDefaultCursor=s<=e.left+e.width&&s>=e.left+e.width-10-2,this.requestUpdate()},this.resizeTextareaIfRequired=()=>{if(this.multiline){const t=this.value.match(/\n/g),e=t?t.length+1:1;this._currentLines=Math.min(Math.max(e,this.lines),this.maxLines),this.requestUpdate()}},this._severity=jt.DEFAULT,this._type=It.TEXT,this._currentLines=this.lines}set severity(t){const e=this._severity;switch(t){case jt.INFO:case jt.WARNING:case jt.ERROR:this._severity=t;break;default:this._severity=jt.DEFAULT}this.requestUpdate("messageSeverity",e)}get severity(){return this._severity}set type(t){const e=this._type;switch(t){case It.COLOR:case It.DATE:case It.DATETIME_LOCAL:case It.EMAIL:case It.FILE:case It.MONTH:case It.NUMBER:case It.PASSWORD:case It.TEL:case It.TEXT:case It.TIME:case It.URL:case It.WEEK:this._type=t;break;default:this._type=It.TEXT}this.requestUpdate("type",e)}get type(){return this._type}connectedCallback(){super.connectedCallback(),this.resizeTextareaIfRequired()}updated(t){t.has("value")&&this.resizeTextareaIfRequired()}static get styles(){return tt`
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
    `}render(){const t=P`
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
    `,e=P`
      <input
        type="${this.type}"
        @focus="${this.onInputFocus}"
        @blur="${this.onInputBlur}"
        @input="${this.onInputInput}"
        @change="${this.onInputChange}"
        placeholder="${this.placeholder}"
        .value="${this.value}"
      >
    `,s=10+17*this._currentLines+"px",i=P`
      <div class="message ${this.severity}">
        ${this.message}
      </div>
    `;let o="container";return this.severity!==jt.DEFAULT&&(o+=` ${this.severity}`),this.focused&&(o+=" focused"),P`
      <style>
        textarea {
          height: ${s};
        }
      </style>
      <div class="${o}">
        ${this.multiline?t:e}
        ${this.message?i:""}
      </div>
    `}};At([Q({type:Boolean})],Mt.prototype,"multiline",void 0),At([Q({type:String})],Mt.prototype,"message",void 0),At([Q({type:String})],Mt.prototype,"severity",null),At([Q({type:Boolean})],Mt.prototype,"panelInput",void 0),At([Q({type:String})],Mt.prototype,"type",null),At([Q({type:Boolean})],Mt.prototype,"focused",void 0),At([Q({type:String})],Mt.prototype,"value",void 0),At([Q({type:String})],Mt.prototype,"placeholder",void 0),At([Q({type:Number})],Mt.prototype,"lines",void 0),At([Q({type:Number})],Mt.prototype,"maxLines",void 0),Mt=At([K("vscode-inputbox")],Mt);var Et=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Tt=class extends st{constructor(){super(),this.description="",this.selected=!1,this.active=!1,this.multiple=!1,this._mainSlot=null}set value(t){const e=this._value;this._value="string"!=typeof t?"":t,this.requestUpdate("value",e)}get value(){return"string"==typeof this._value?this._value:void 0===this._value&&this._label||""}set label(t){const e=this._label;this._label=t,this.requestUpdate("label",e)}get label(){return this.innerText}firstUpdated(){var t;this._mainSlot=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("slot"),this._mainSlot&&this._mainSlot.addEventListener("slotchange",this._onSlotChange.bind(this))}_onSlotChange(){this.dispatchEvent(new CustomEvent("vsc-slotchange",{detail:{innerText:this.innerText},composed:!0,bubbles:!1})),this.label=this.innerText}static get styles(){return tt`
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

      :host([active]) .wrapper {
        background-color: var(--vscode-list-focusBackground);
      }

      .wrapper:hover {
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
    `}render(){return P`
      <div class="wrapper">
        ${this.multiple?P`
              <span
                class="${at({icon:!0,checked:this.selected})}"
              ></span>
            `:g}
        <slot><span class="empty-placeholder"></span></slot>
      </div>
    `}};Et([Q({type:String})],Tt.prototype,"value",null),Et([Q({type:String})],Tt.prototype,"label",null),Et([Q({type:String})],Tt.prototype,"description",void 0),Et([Q({type:Boolean,reflect:!0})],Tt.prototype,"selected",void 0),Et([Q({type:Boolean,reflect:!0})],Tt.prototype,"active",void 0),Et([Q({type:Boolean,attribute:!1})],Tt.prototype,"multiple",void 0),Tt=Et([K("vscode-option")],Tt);var Nt=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Pt=class extends st{constructor(){super(...arguments),this.shadow=!0,this.scrolled=!1,this.scrollableContainer=null}connectedCallback(){super.connectedCallback(),this.requestUpdate().then((()=>{var t;this.scrollableContainer=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".scrollable-container"),this.scrollableContainer.addEventListener("scroll",this.onScrollableContainerScroll.bind(this))}))}onScrollableContainerScroll(){this.scrolled=this.scrollableContainer.scrollTop>0}static get styles(){return tt`
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
    `}render(){const t=at({shadow:!0,visible:this.scrolled});return P`
      <div class="scrollable-container">
        <div class="${t}"></div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `}};Nt([Q({type:Boolean})],Pt.prototype,"shadow",void 0),Nt([Q({type:Boolean,reflect:!1})],Pt.prototype,"scrolled",void 0),Pt=Nt([K("vscode-scrollable")],Pt);
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
const Lt=new WeakMap,Ut=v((t=>e=>{if(!(e instanceof C))throw new Error("unsafeHTML can only be used in text bindings");const s=Lt.get(e);if(void 0!==s&&k(t)&&t===s.value&&e.value===s.fragment)return;const i=document.createElement("template");i.innerHTML=t;const o=document.importNode(i.content,!0);e.setValue(o),Lt.set(e,{value:t,fragment:o})}));var Vt=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};const Ft=t=>t.nodeType===Node.ELEMENT_NODE&&t.matches("vscode-option"),Dt=t=>t.composedPath().find((t=>Ft(t)));let Ht=0,Rt=class extends st{constructor(){super(),this.multiple=!1,this.role="listbox",this.tabindex=0,this.ariaExpanded="false",this.ariaActivedescendant="",this.ariaLabel="",this.ariaMultiselectable="false",this._componentId=0,this._ownedOptionIds=[],this._value="",this._currentDescription="",this._optionElements=[],this._options=[],this._selectedOptions=[],this._currentLabel="",this._selectedIndex=-1,this._selectedIndexes=[],this._dropdownVisible=!1,this._activeOptionElement=null,Ht++,this._componentId=Ht,this._onClickOutsideBound=this._onClickOutside.bind(this)}set value(t){this._selectedIndex=this.options.findIndex((e=>e.value===t)),this._selectedIndexes=[this._selectedIndex],this._value=t||"",this._updateCurrentLabel()}get value(){return this._value}set options(t){let e="";t.forEach((t=>{const{value:s,selected:i,description:o,label:n}=t;e+=`<vscode-option${s?` value="${s}"`:""}${o?` description="${o}"`:""}${i?" selected":""}>`,e+=n,e+="</vscode-option>"})),this._options=t,this.innerHTML=e}get options(){return this._options}set selectedIndex(t){var e;this._selectedIndex=t,this._selectedIndexes=[this._selectedIndex],this._value=(null===(e=this._options[this._selectedIndex])||void 0===e?void 0:e.value)||"",this._updateCurrentLabel()}get selectedIndex(){return this._selectedIndex}set selectedIndexes(t){this._selectedIndexes=t;let e=-1;this._options.forEach(((t,s)=>{const i=this._selectedIndexes.includes(s);-1===e&&i&&(e=s),this._optionElements[s].selected=i,this._optionElements[s].setAttribute("aria-selected",i?"true":"false"),this._options[s].selected=i})),this._value=-1!==e?this._options[e].value:"",this._selectedIndex=e,this._updateCurrentLabel()}get selectedIndexes(){return this._selectedIndexes}set _showDropdown(t){this._dropdownVisible=t,this.ariaExpanded=String(t),t&&this._optionElements.forEach(((t,e)=>{this._optionElements[e].active=this._optionElements[e].selected,this._optionElements[e].active&&(this._activeOptionElement=this._optionElements[e])}))}get _showDropdown(){return this._dropdownVisible}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),"multiple"===t&&(this.ariaMultiselectable=this.multiple?"true":"false")}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._onOptionClick),this.addEventListener("mouseover",this._onOptionMouseOver),this.addEventListener("mouseout",this._onOptionMouseOut),this.addEventListener("keydown",this._onComponentKeyDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._onOptionClick),this.removeEventListener("mouseover",this._onOptionMouseOver),this.removeEventListener("mouseout",this._onOptionMouseOut)}_toggleOption(t,e){this._options[t].selected=e,this._optionElements[t].selected=e,this._optionElements[t].setAttribute("aria-selected",String(e)),this.ariaActivedescendant=e&&this._optionElements[t].getAttribute("id")||"",this._updateCurrentLabel()}_multipleLabelText(){const t=this._selectedIndexes.length;return 0===t?"<No item selected>":1===t?this._options[this._selectedIndexes[0]].label:`${t} items selected`}_singleLabelText(){return-1===this._selectedIndex?"":this._options&&this._options[this._selectedIndex]?this._options[this._selectedIndex].label:""}_updateCurrentLabel(){this.multiple?this._currentLabel=this._multipleLabelText():(this._currentLabel=this._singleLabelText(),this.ariaLabel=this._singleLabelText()),this.requestUpdate()}_setActiveOptionElement(t){this._activeOptionElement&&(this._activeOptionElement.active=!1),t.active=!0,this._activeOptionElement=t}_onSlotChange(){var t;const e=(null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("slot")).assignedNodes();this._optionElements=e.filter((t=>Ft(t))),this._ownedOptionIds=[];let s=!1;this._optionElements.forEach(((t,e)=>{const i=t.innerText,o=t.value||i,n=t.getAttribute("description")||"",r=t.selected,l=`s${this._componentId}_${e}`;t.dataset.index=String(e),t.multiple=this.multiple,t.setAttribute("id",l),t.setAttribute("role","option"),t.setAttribute("aria-selected",r?"true":"false"),r&&!this.multiple&&(this.ariaActivedescendant=l),this._ownedOptionIds.push(l),!s&&r&&(this._selectedIndex=e,this._value=o,s=!0),this.multiple&&r&&this._selectedIndexes.push(e),o===this._value&&(this._selectedIndex=e),this._options[e]={label:i,value:o,description:n,selected:r}})),this._updateCurrentLabel()}_onClickOutside(t){-1===t.composedPath().findIndex((t=>t===this))&&(this._showDropdown=!1,window.removeEventListener("click",this._onClickOutsideBound))}_onFaceClick(){this._showDropdown=!this._showDropdown,window.addEventListener("click",this._onClickOutsideBound)}_onOptionMouseOver(t){const e=Dt(t);e&&(this._setActiveOptionElement(e),this._currentDescription=e.description||"",this.requestUpdate())}_onOptionMouseOut(t){Dt(t)&&(this._currentDescription="",this.requestUpdate())}_onOptionClick(t){const e=Dt(t);if(!e)return;const s=Number(e.dataset.index),i=e.selected,o=this.selectedIndex;if(this._selectedIndex=Number(s),this._selectedIndexes=[this._selectedIndex],this._value=e.value,this.multiple){const t=!i;e.selected=t,e.setAttribute("aria-selected",t?"true":"false"),this._options[s].selected=t;let o=!1;this._selectedIndexes=[],this._selectedOptions=[],this._options.forEach(((t,e)=>{var s;t.selected&&(this._selectedIndexes.push(e),this._selectedOptions.push(t),o||(this._selectedIndex=e,this._value=(null===(s=this._options[this._selectedIndex])||void 0===s?void 0:s.value)||"",o=!0))})),this.dispatchEvent(new CustomEvent("vsc-change",{detail:{multiple:!0,selectedIndex:this._selectedIndex,selectedIndexes:this._selectedIndexes,selectedOptions:this._selectedOptions,value:this._value}}))}else o!==this.selectedIndex&&(this.dispatchEvent(new CustomEvent("vsc-change",{detail:{multiple:!1,selectedIndex:this._selectedIndex,selectedIndexes:this._selectedIndexes,selectedOptions:this._options[this._selectedIndex],value:this._value}})),e.selected=!0,this.ariaActivedescendant=e.id,-1!==o&&(this._optionElements[o].selected=!1)),this._showDropdown=!1;this._updateCurrentLabel()}_onAcceptClick(){this._showDropdown=!1}_onResetClick(){this._options.forEach(((t,e)=>{this._optionElements[e].selected=!1,this._optionElements[e].setAttribute("aria-selected","false"),t.selected=!1})),this._selectedIndexes=[],this._selectedIndex=-1,this._value="",this._updateCurrentLabel()}_onComponentKeyDown(t){" "!==t.key&&"ArrowUp"!==t.key&&"ArrowDown"!==t.key||(t.stopPropagation(),t.preventDefault()),"Enter"===t.key&&(this._showDropdown=!this._showDropdown)," "===t.key&&(this._showDropdown=!0),"Escape"!==t.key&&"Tab"!=t.key||(this._showDropdown=!1),"ArrowUp"===t.key&&this._selectedIndex>0&&(this._toggleOption(this._selectedIndex,!1),this._selectedIndex--,this._toggleOption(this._selectedIndex,!0)),"ArrowDown"===t.key&&this._selectedIndex<this._options.length-1&&(-1!==this._selectedIndex&&this._toggleOption(this._selectedIndex,!1),this._selectedIndex++,this._toggleOption(this._selectedIndex,!0))}static get styles(){return tt`
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

      :host(:focus) .select-face {
        border-color: var(--vscode-focusBorder);
        outline: none;
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
    `}render(){let t;t=this._currentDescription?P`<div class="description">
        ${this._currentDescription}
      </div>`:g;const e=!0===this._showDropdown?"block":"none",s=""===this._currentLabel?Ut("&nbsp;"):P`${this._currentLabel}`;return P`
      <style>
        .dropdown {
          display: ${e};
        }
      </style>
      <div class="select-face" @click="${this._onFaceClick}">
        <span class="text">${s}</span
        >
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
        <div class="options">
          <slot @slotchange=${this._onSlotChange}></slot>
        </div>
        ${this.multiple?P`<div class="buttons">
              <vscode-button @click="${this._onAcceptClick}">OK</vscode-button>
              <vscode-button secondary @click="${this._onResetClick}"
                >Reset</vscode-button
              >
            </div>`:null}
        ${t}
      </div>
    `}};var Wt;Vt([Q({type:String,reflect:!0,attribute:"value"})],Rt.prototype,"value",null),Vt([Q({type:Array,reflect:!1})],Rt.prototype,"options",null),Vt([Q({type:Number})],Rt.prototype,"selectedIndex",null),Vt([Q({type:Array})],Rt.prototype,"selectedIndexes",null),Vt([Q({type:Boolean,reflect:!0})],Rt.prototype,"multiple",void 0),Vt([Q({type:String,attribute:!0,reflect:!0})],Rt.prototype,"role",void 0),Vt([Q({type:Number,attribute:!0,reflect:!0})],Rt.prototype,"tabindex",void 0),Vt([Q({type:String,reflect:!0,attribute:"aria-expanded"})],Rt.prototype,"ariaExpanded",void 0),Vt([Q({type:String,reflect:!0,attribute:"aria-activedescendant"})],Rt.prototype,"ariaActivedescendant",void 0),Vt([Q({type:String,reflect:!0,attribute:"aria-label"})],Rt.prototype,"ariaLabel",void 0),Vt([Q({type:String,reflect:!0,attribute:"aria-multiselectable"})],Rt.prototype,"ariaMultiselectable",void 0),Vt([Q({attribute:!1,hasChanged:null==Wt?void 0:Wt.hasChanged})],Rt.prototype,"_showDropdown",null),Rt=Vt([K("vscode-select")],Rt);var qt=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Jt=class extends st{constructor(){super(),this._headerSlot=null,this._mainSlot=null,this._selectedIndex=0}set selectedIndex(t){this._selectedIndex=t,this._setActiveTab()}get selectedIndex(){return this._selectedIndex}_setActiveTab(){this._mainSlot&&this._headerSlot&&(Array.from(this._mainSlot.assignedElements()).forEach(((t,e)=>{t.style.display=e===this._selectedIndex?"block":"none"})),Array.from(this._headerSlot.assignedElements()).forEach(((t,e)=>{t.dataset.index=String(e),t.classList.toggle("is-active",e===this._selectedIndex)})),this.dispatchEvent(new CustomEvent("vsc-select",{detail:{selectedIndex:this._selectedIndex},composed:!0})))}_onSlotChanged(){this._setActiveTab()}_onHeaderClick(t){const e=t.target.dataset.index;e&&(this._selectedIndex=Number(e),this._setActiveTab())}firstUpdated(){this._headerSlot=this.shadowRoot.querySelector("slot[name=header]"),this._mainSlot=this.shadowRoot.querySelector("slot:not([name=header])"),this._mainSlot.addEventListener("slotchange",this._onSlotChanged.bind(this))}static get styles(){return tt`
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
    `}render(){return P`
      <div class="header" @click="${this._onHeaderClick}">
        <slot name="header"></slot>
      </div>
      <slot></slot>
    `}};qt([Q({type:Number})],Jt.prototype,"selectedIndex",null),Jt=qt([K("vscode-tabs")],Jt);var Kt,Gt=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};!function(t){t.BRANCH="branch",t.LEAF="leaf"}(Kt||(Kt={}));let Qt=class extends st{constructor(){super(...arguments),this.data=[],this.indent=8,this.arrows=!1,this.multiline=!1,this._selectedItem=null}getItemByPath(t){const e=t.split("/").map((t=>Number(t)));let s,i=this.data;return e.forEach(((t,o)=>{o===e.length-1?s=i[t]:i=i[t].subItems})),s}getItemType(t){return t.subItems&&Array.isArray(t.subItems)&&t.subItems.length>0?Kt.BRANCH:Kt.LEAF}getIconName(t){if(!t.icons)return;const{icons:e}=t,s=this.getItemType(t),i=t.open||!1;return s===Kt.BRANCH&&i?e.open||void 0:s!==Kt.BRANCH||i?s===Kt.LEAF&&e.leaf||void 0:e.branch||void 0}renderTreeItem({indentLevel:t,label:e,path:s,iconName:i,open:o=!1,itemType:n,selected:r=!1,subItems:l}){const c=o?"chevron-down":"chevron-right",a=["contents"],h=o?["open"]:[],d=t*this.indent,u=this.arrows&&n===Kt.LEAF?18+d:d,p=this.arrows&&n===Kt.BRANCH?P`<vscode-icon name="${c}" class="icon-arrow"></vscode-icon>`:g,v=i?P`<vscode-icon name="${i}" class="label-icon"></vscode-icon>`:g,b=o&&n===Kt.BRANCH?P`<ul>
            ${this.renderTree(l,s)}
          </ul>`:g,f=P`<span class="label">${e}</span>`;return h.push(n===Kt.LEAF?"leaf":"branch"),r&&a.push("selected"),P`
      <li data-path="${s.join("/")}" class="${h.join(" ")}">
        <span class="${a.join(" ")}" style="padding-left: ${u}px;">
          ${p}
          ${v}
          ${f}
        </span>
        ${b}
      </li>
    `}renderTree(t,e=[]){const s=[];return t?(t.forEach(((t,i)=>{const o=[...e,i],n=o.length-1,r=this.getItemType(t),l=this.getIconName(t),{label:c,open:a=!1,selected:h=!1,subItems:d=[]}=t;h&&(this._selectedItem=t),s.push(this.renderTreeItem({indentLevel:n,label:c,path:o,open:a,iconName:l,itemType:r,selected:h,subItems:d}))})),s):g}toggleSubTreeOpen(t){t.subItems&&(t.open=!t.open)}selectTreeItem(t){this._selectedItem&&(this._selectedItem.selected=!1),this._selectedItem=t,t.selected=!0}closeSubTreeRecursively(t){t.forEach((t=>{t.open=!1,t.subItems&&t.subItems.length>0&&this.closeSubTreeRecursively(t.subItems)}))}emitSelectEvent(t,e){const{icons:s,label:i,open:o,value:n}=t,r={icons:s,itemType:this.getItemType(t),label:i,open:o||!1,value:n||i,path:e};this.dispatchEvent(new CustomEvent("vsc-select",{bubbles:!0,composed:!0,detail:r}))}onComponentClick(t){const e=t.composedPath().find((t=>t.tagName&&"LI"===t.tagName.toUpperCase()));if(e){const t=e.dataset.path||"",s=this.getItemByPath(t);this.toggleSubTreeOpen(s),this.selectTreeItem(s),this.emitSelectEvent(s,t),this.requestUpdate()}}closeAll(){this.closeSubTreeRecursively(this.data),this.requestUpdate()}static get styles(){return tt`
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
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
        font-weight: var(--vscode-font-weight);
      }

      .multi .contents {
        align-items: flex-start;
      }

      .contents:hover {
        background-color: var(--vscode-list-hoverBackground);
        cursor: pointer;
      }

      .contents.selected {
        background-color: var(--vscode-list-focusBackground);
      }

      :host(:focus) .contents.selected {
        background-color: var(--vscode-list-activeSelectionBackground);
        color: var(--vscode-list-activeSelectionForeground);
      }

      .icon-arrow {
        display: block;
        margin: 3px 2px 3px 0;
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
        line-height: 22px;
      }

      .single .label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `}render(){return P`
      <div
        @click="${this.onComponentClick}"
        class="${this.multiline?"multi":"single"}"
      >
        <ul>
          ${this.renderTree(this.data)}
        </ul>
      </div>
    `}};Gt([Q({type:Array,reflect:!1})],Qt.prototype,"data",void 0),Gt([Q({type:Number})],Qt.prototype,"indent",void 0),Gt([Q({type:Boolean})],Qt.prototype,"arrows",void 0),Gt([Q({type:Boolean})],Qt.prototype,"multiline",void 0),Qt=Gt([K("vscode-tree")],Qt);export{ot as VscodeButton,rt as VscodeCheckbox,dt as VscodeCollapsible,bt as VscodeContextMenu,pt as VscodeContextMenuItem,gt as VscodeFormControl,wt as VscodeFormDescription,yt as VscodeFormItem,$t as VscodeFormLabel,zt as VscodeIcon,Mt as VscodeInputbox,Tt as VscodeOption,Pt as VscodeScrollable,Rt as VscodeSelect,Jt as VscodeTabs,Qt as VscodeTree};
