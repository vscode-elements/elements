import {noChange, PropertyPart} from 'lit';
import {Directive, directive, PartInfo, PartType} from 'lit/directive.js';

class StylePropertyMap extends Directive {
  private _prevProperties: {[key: string]: string} = {};

  constructor(partInfo: PartInfo) {
    super(partInfo);

    if (partInfo.type !== PartType.PROPERTY || partInfo.name !== 'style') {
      throw new Error(
        'The `stylePropertyMap` directive must be used in the `style` property'
      );
    }
  }

  update(
    part: PropertyPart,
    [styleProps]: [{[key: string]: string}]
  ): unknown {
    Object.entries(styleProps).forEach(([key, val]) => {
      if (this._prevProperties[key] !== val) {
        // @ts-expect-error I'm so sick of these stupid unresolvable TS errors.
        part.element.style[key] = val;
        this._prevProperties[key as string] = val;
      }
    });

    return noChange;
  }

  render(_styleProps: Partial<CSSStyleDeclaration | {[key: string]: string}>) {
    return noChange;
  }
}

/**
 * Implement a Lit directive similar to styleMap, but instead of setting styles via the style
 * attribute (which violates CSP), it should apply styles using the style property.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy#unsafe-inline)
 */
export const stylePropertyMap = directive(StylePropertyMap);
