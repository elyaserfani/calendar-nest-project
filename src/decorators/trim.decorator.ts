import { Transform, TransformOptions } from 'class-transformer';

export interface TrimOptions {
  strategy?: 'left' | 'right' | 'both';
  characterMask?: string;
}

export function Trim(
  options?: TrimOptions,
  transformOptions?: TransformOptions,
): (target: object, key: string) => void {
  return Transform(({ value }) => {
    if ('string' !== typeof value) {
      return value;
    }
    if (options?.characterMask) {
      value = value.replace(options.characterMask, '');
    }
    switch (options?.strategy) {
      case 'left':
        return value.trimLeft();
      case 'right':
        return value.trimRight();
      default:
        return value.trim();
    }
  }, transformOptions);
}
