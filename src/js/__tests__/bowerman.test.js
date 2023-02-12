import Bowerman from '../Bowerman';
import Character from '../Character';

test('should create instance of class Bowerman', () => {
  const result = new Bowerman('Robin Hood');

  expect(result).toBeInstanceOf(Bowerman);
});

test('should create instance of class Character', () => {
  const result = new Bowerman('Robin Hood');

  expect(result).toBeInstanceOf(Character);
});

test('should create instance of class Bowerman with initial value', () => {
  const result = new Bowerman('Robin Hood');

  expect(result).toEqual({
    name: 'Robin Hood',
    type: 'Bowerman',
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
    new Bowerman(name);
  }).toThrow();
});

test('should throw on levelUp() when health = 0', () => {
  expect(() => {
    const bowerman = new Bowerman('Robin Hood');
    bowerman.health = 0;
    bowerman.levelUp();
  }).toThrow();
});

test('should throw on damage() when health = 0', () => {
  expect(() => {
    const bowerman = new Bowerman('Robin Hood');
    bowerman.health = 0;
    bowerman.damage(10);
  }).toThrow();
});

test('should level up, increase attack, defence by 20% and icrease health to 100', () => {
  const bowerman = new Bowerman('Robin Hood');
  bowerman.health = 10;
  bowerman.level = 2;
  bowerman.attack = 20;
  bowerman.defence = 30;
  bowerman.levelUp();

  expect(bowerman.health).toBe(100);
  expect(bowerman.level).toBe(3);
  expect(bowerman.attack).toBe(24);
  expect(bowerman.defence).toBe(36);
});

test.each([
  [80, 20, 65],
  [10, 20, 0],
])('should decrease health=%n by %n points depending on the defence level and got health=%n',
  (health, points, result) => {
    const bowerman = new Bowerman('Robin Hood');
    bowerman.health = health;
    bowerman.defence = 25;
    bowerman.damage(points);

    expect(bowerman.health).toBe(result);
  });
