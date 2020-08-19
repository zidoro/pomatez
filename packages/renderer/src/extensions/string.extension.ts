declare global {
  interface String {
    capitalize(): string;
    truncate(n: number): string;
    isEmpty(): boolean;
  }
}

// eslint-disable-next-line
String.prototype.capitalize = function (): string {
  if (typeof this !== "string") return "";
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// eslint-disable-next-line
String.prototype.truncate = function (n): string {
  if (typeof this !== "string") return "";
  return this.length > n ? this.substr(0, n - 1) + "..." : this;
};

// eslint-disable-next-line
String.prototype.isEmpty = function (): boolean {
  return (
    this === undefined ||
    this === null ||
    (typeof this === "string" && this.trim().length === 0)
  );
};

export {};
