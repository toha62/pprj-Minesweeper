import Magician from '../Magician';
import Character from '../Character';

test('should create instance of class Magician', () => {
  const result = new Magician('Hendalf');

  expect(result).toBeInstanceOf(Magician);
});

test('should create instance of class Character', () => {
  const result = new Magician('Hendalf');

  expect(result).toBeInstanceOf(Character);
});

test('should create instance of class Magician with initial value', () => {
  const result = new Magician('Hendalf');

  expect(result).toEqual({
    name: 'Hendalf',
    type: 'Magician',
    health: 100,
    level: 1,
    attack: 10,
    defence: 40,
  });
});

test.each([
  [321321],
  [''],
  ['D'],
  ['Dark Knight'],
])('should throws on uncorrect name: %s', (name) => {
  expect(() => {
    // eslint-disable-next-line no-new
    new Magician(name);
  }).toThrow();
});
