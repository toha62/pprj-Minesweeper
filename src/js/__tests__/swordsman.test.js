import Swordsman from '../Swordsman';
import Character from '../Character';

test('should create instance of class Swordsman', () => {
  const result = new Swordsman('Arthur');

  expect(result).toBeInstanceOf(Swordsman);
});

test('should create instance of class Character', () => {
  const result = new Swordsman('Arthur');

  expect(result).toBeInstanceOf(Character);
});

test('should create instance of class Swordsman with initial value', () => {
  const result = new Swordsman('Arthur');

  expect(result).toEqual({
    name: 'Arthur',
    type: 'Swordsman',
    health: 100,
    level: 1,
    attack: 40,
    defence: 10,
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
    new Swordsman(name);
  }).toThrow();
});
