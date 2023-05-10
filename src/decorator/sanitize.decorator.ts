import { Transform, TransformOptions } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export interface EscapeOptions {
  ignoreFormattingTags?: boolean;
}

export function Sanitize(
  options?: EscapeOptions,
  transformOptions?: TransformOptions,
): (target: object, key: string) => void {
  return Transform(({ value }) => {
    if ('string' !== typeof value) {
      return value;
    }
    value = value.replaceAll(/<\s|<|&lt;\s|&lt;/g, '< ');
    let text = null;
    if (options?.ignoreFormattingTags) {
      text = sanitizeHtml(value);
    } else {
      text = sanitizeHtml(value, {
        allowedTags: [],
      });
    }
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }, transformOptions);
}
