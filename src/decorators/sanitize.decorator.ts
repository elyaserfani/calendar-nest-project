import { Transform, TransformOptions } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export function Sanitize(
  transformOptions?: TransformOptions,
): (target: object, key: string) => void {
  return Transform(({ value }) => {
    if ('string' !== typeof value) {
      return value;
    }
    const text = sanitizeHtml(value);
    return text;
  }, transformOptions);
}
