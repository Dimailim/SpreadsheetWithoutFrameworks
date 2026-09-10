/**
 * Parses cell's value.
 * If value is formula, tries to calculate it.
 * @param {string} value - cell's value
 */
export default function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1));
    } catch (e) {
      alert('Inputted formula is invalid.');
      console.warn(e);
    }
  }

  return value;
}
