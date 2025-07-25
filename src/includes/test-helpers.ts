// Borrowed from Shoelace

import {sendMouse} from '@web/test-runner-commands';

function determineMousePosition(
  el: Element,
  position: string,
  offsetX: number,
  offsetY: number
) {
  const {x, y, width, height} = el.getBoundingClientRect();
  const centerX = Math.floor(x + window.scrollX + width / 2);
  const centerY = Math.floor(y + window.scrollY + height / 2);
  let clickX: number;
  let clickY: number;

  switch (position) {
    case 'top':
      clickX = centerX;
      clickY = y;
      break;
    case 'right':
      clickX = x + width - 1;
      clickY = centerY;
      break;
    case 'bottom':
      clickX = centerX;
      clickY = y + height - 1;
      break;
    case 'left':
      clickX = x;
      clickY = centerY;
      break;
    default:
      clickX = centerX;
      clickY = centerY;
  }

  clickX += offsetX;
  clickY += offsetY;
  return {clickX, clickY};
}

/** A testing utility that measures an element's position and clicks on it. */
export async function clickOnElement(
  /** The element to click */
  el: Element,
  /** The location of the element to click */
  position: 'top' | 'right' | 'bottom' | 'left' | 'center' = 'center',
  /** The horizontal offset to apply to the position when clicking */
  offsetX = 0,
  /** The vertical offset to apply to the position when clicking */
  offsetY = 0
) {
  const {clickX, clickY} = determineMousePosition(
    el,
    position,
    offsetX,
    offsetY
  );

  await sendMouse({type: 'click', position: [clickX, clickY]});
}

/** A testing utility that moves the mouse onto an element. */
export async function moveMouseOnElement(
  /** The element to click */
  el: Element,
  /** The location of the element to click */
  position: 'top' | 'right' | 'bottom' | 'left' | 'center' = 'center',
  /** The horizontal offset to apply to the position when clicking */
  offsetX = 0,
  /** The vertical offset to apply to the position when clicking */
  offsetY = 0
) {
  const {clickX, clickY} = determineMousePosition(
    el,
    position,
    offsetX,
    offsetY
  );

  await sendMouse({type: 'move', position: [clickX, clickY]});
}

/** A testing utility that drags an element with the mouse. */
export async function dragElement(
  /** The element to drag */
  el: Element,
  /** The horizontal distance to drag in pixels */
  deltaX = 0,
  /** The vertical distance to drag in pixels */
  deltaY = 0,
  callbacks: {
    afterMouseDown?: () => void | Promise<void>;
    afterMouseMove?: () => void | Promise<void>;
  } = {}
): Promise<void> {
  await moveMouseOnElement(el);
  await sendMouse({type: 'down'});

  await callbacks.afterMouseDown?.();

  const {clickX, clickY} = determineMousePosition(el, 'center', deltaX, deltaY);
  await sendMouse({type: 'move', position: [clickX, clickY]});

  await callbacks.afterMouseMove?.();

  await sendMouse({type: 'up'});
}

type AllTagNames = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;

type TagNameToElement<K extends AllTagNames> =
  K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K] :
  K extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[K] :
  Element;

export function $<K extends AllTagNames>(selector: K): TagNameToElement<K>;
export function $<K extends AllTagNames>(root: Element, selector: K): TagNameToElement<K>;
export function $<T extends Element = Element>(selector: string): T;
export function $<T extends Element = Element>(root: Element, selector: string): T;
export function $<T extends Element = Element>(
  arg1: string | Element,
  arg2?: string
): T {
  let result: Element | null;

  if (typeof arg1 === 'string') {
    result = document.querySelector(arg1);
  } else if (arg1 instanceof Element && typeof arg2 === 'string') {
    result = arg1.querySelector(arg2);
  } else {
    throw new Error('Invalid arguments passed to $()');
  }

  if (!result) {
    const selector = typeof arg1 === 'string' ? arg1 : arg2!;
    const context = typeof arg1 === 'string' ? 'document' : 'root element';
    throw new Error(`No match for selector: ${selector} in ${context}`);
  }

  return result as T;
}

export function $$<K extends AllTagNames>(selector: K): NodeListOf<TagNameToElement<K>>;
export function $$<K extends AllTagNames>(root: Element, selector: K): NodeListOf<TagNameToElement<K>>;
export function $$<T extends Element = Element>(selector: string): NodeListOf<T>;
export function $$<T extends Element = Element>(root: Element, selector: string): NodeListOf<T>;
export function $$<T extends Element = Element>(
  arg1: string | Element,
  arg2?: string
): NodeListOf<T> {
  let result: NodeListOf<Element>;

  if (typeof arg1 === 'string') {
    result = document.querySelectorAll(arg1);
  } else if (arg1 instanceof Element && typeof arg2 === 'string') {
    result = arg1.querySelectorAll(arg2);
  } else {
    throw new Error('Invalid arguments passed to $$()');
  }

  if (result.length === 0) {
    const selector = typeof arg1 === 'string' ? arg1 : arg2!;
    const context = typeof arg1 === 'string' ? 'document' : 'root element';
    throw new Error(`No matches for selector: ${selector} in ${context}`);
  }

  return result as NodeListOf<T>;
}
