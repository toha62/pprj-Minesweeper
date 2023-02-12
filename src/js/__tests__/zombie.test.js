import Zombie from '../Zombie';
import Character from '../Character';

test('should create instance of class Zombie', () => {
  const result = new Zombie('Dark king');

  expect(result).toBeInstanceOf(Zombie);
});

test('should create instance of class Character', () => {
  const result = new Zombie('Dark king');

  expect(result).toBeInstanceOf(Character);
});

test('should create instance of class Zombie with initial value', () => {
  const result = new Zombie('Dark king');

  expect(result).toEqual({
    name: 'Dark king',
    type: 'Zombie',
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
    new Zombie(name);
  }).toThrow();
});
