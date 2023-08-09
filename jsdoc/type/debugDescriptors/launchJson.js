function customPropertiesGenerator () {
    return date instanceof Date
    ? { ...this, start: this.start.toISOString().substring(0, 16) }
}
