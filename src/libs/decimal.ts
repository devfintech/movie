export class Decimal {
  public bigValue?: bigint
  private decimals: number

  constructor(initValue?: number | string, decimals: number = 10) {
    if (this.checkInvalidNumber(initValue)) {
      this.logError(initValue, "Init Value")
      this.bigValue = undefined
    } else {
      this.bigValue =
        !Number.isNaN(initValue) && initValue !== undefined
          ? this.parseUnits(initValue.toString(), decimals)
          : undefined
    }

    this.decimals = decimals
  }

  public plus(value: number | string) {
    if (this.bigValue === undefined) {
      return this
    }
    if (this.checkInvalidNumber(value)) {
      this.logError(value, "Plus")
      return this
    }

    this.bigValue = this.bigValue + this.parseUnits(value, this.decimals)
    return this
  }
  public minus(value: number | string) {
    if (this.bigValue === undefined) {
      return this
    }

    if (this.checkInvalidNumber(value)) {
      this.logError(value, "Minus")
      return this
    }

    this.bigValue = this.bigValue - this.parseUnits(value, this.decimals)
    return this
  }
  public times(value: number | string) {
    if (this.bigValue === undefined) {
      return this
    }

    if (this.checkInvalidNumber(value)) {
      this.logError(value, "Times")
      return this
    }

    this.bigValue = this.bigValue * this.parseUnits(value, this.decimals)

    return this
  }

  public divide(value: number | string) {
    if (this.bigValue === undefined) {
      return this
    }

    if (this.checkInvalidNumber(value)) {
      this.logError(value, "Divide")
      return this
    }

    this.bigValue = this.bigValue / this.parseUnits(value, this.decimals)

    return this
  }

  public toString() {
    if (this.bigValue === undefined) return
    return this.formatUnits(this.bigValue, this.decimals)
  }
  public toNumber() {
    if (this.bigValue === undefined) return

    return Number(this.toString())
  }

  get value() {
    return this.toString()
  }

  private checkInvalidNumber(value: any) {
    return Number.isNaN(value)
  }

  private logError(value: any, prefix?: string) {
    console.error(`Decimal${prefix ? `[${prefix}]:` : ""} ${value} is Invalid`)
  }

  private parseUnits(value: number | string, decimals: number) {
    let [integer, fraction = "0"] = value.toString().split(".")

    const negative = integer.startsWith("-")
    if (negative) integer = integer.slice(1)

    // trim leading zeros.
    fraction = fraction.replace(/(0+)$/, "")

    // round off if the fraction is larger than the number of decimals.
    if (decimals === 0) {
      if (Math.round(Number(`.${fraction}`)) === 1) integer = `${BigInt(integer) + BigInt(1)}`
      fraction = ""
    } else if (fraction.length > decimals) {
      const [left, unit, right] = [
        fraction.slice(0, decimals - 1),
        fraction.slice(decimals - 1, decimals),
        fraction.slice(decimals),
      ]

      const rounded = Math.round(Number(`${unit}.${right}`))
      if (rounded > 9) fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, "0")
      else fraction = `${left}${rounded}`

      if (fraction.length > decimals) {
        fraction = fraction.slice(1)
        integer = `${BigInt(integer) + BigInt(1)}`
      }

      fraction = fraction.slice(0, decimals)
    } else {
      fraction = fraction.padEnd(decimals, "0")
    }

    return BigInt(`${negative ? "-" : ""}${integer}${fraction}`)
  }
  private formatUnits(value: bigint, decimals: number) {
    let display = value.toString()

    const negative = display.startsWith("-")
    if (negative) display = display.slice(1)

    display = display.padStart(decimals, "0")

    let [integer, fraction] = [display.slice(0, display.length - decimals), display.slice(display.length - decimals)]
    fraction = fraction.replace(/(0+)$/, "")
    return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`
  }
}
// 0.1 + 0.2 = 0.30000004
// Ex: new Decimal(0.1).plus(0.2).toNumber() = 0.3
