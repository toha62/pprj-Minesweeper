import Daemon from '../Daemon';
import Character from '../Character';

test('should create instance of class Daemon', () => {
  const result = new Daemon('Baltazar');

  expect(result).toBeInstanceOf(Daemon);
});

test('should create instance of class Character', () => {
  const result = new Daemon('Baltazar');

  expect(result).toBeInstanceOf(Character);
});

test('should create instance of class Daemon with initial value', () => {
  const result = new Daemon('Baltazar');

  expect(result).toEqual({
    name: 'Baltazar',
    type: 'Daemon',
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
    new Daemon(name);
  }).toThrow();
});
