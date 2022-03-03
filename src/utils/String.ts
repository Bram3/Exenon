export function isStringBoolean(text: string): boolean {
  switch (text.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
    case 'false':
    case 'no':
    case '0':
      return true
    default:
      return false
  }
}

export function stringToBoolean(text: string): boolean {
  switch (text.toLowerCase().trim()) {
    case 'true':
    case "yes":
    case "1":
      return true
    case "false":
    case "no":
    case "0":
      return false;
    default:
      return Boolean(text)
  }
}
