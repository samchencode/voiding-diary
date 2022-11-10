interface Volume {
  toString(): string;
  getValueString(): string;
  getUnitString(): string;
  valueOf(): number;
  is(value: Volume): boolean;
}

export type { Volume };
