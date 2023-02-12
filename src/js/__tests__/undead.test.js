import Undead from '../Undead';
import Character from '../Character';

test('should create instance of class Undead', () => {
  const result = new Undead('McClaude');

  expect(result).toBeInstanceOf(Undead);
});

test('should create instance of class Character', () => {
  const result = new Undead('McClaude');

  expect(result).toBeInstanceOf(Character);
});

test('should create instance of class Undead with initial value', () => {
  const result = new Undead('McClaude');

  expect(result).toEqual({
    name: 'McClaude',
    type: 'Undead',
    health: 100,
    level: 1,
    attack: 25,
    defence: 25,
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
    new Undead(name);
  }).toThrow();
});
