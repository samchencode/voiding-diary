interface Volume {
  toString(): string;
  valueOf(): number;
  is(value: Volume): boolean;
}

export type { Volume };
