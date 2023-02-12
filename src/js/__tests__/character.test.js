import Character from '../Character';

test('should throws on uncorrect type', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new Character('Robin Hood', 'Pikeman');
  }).toThrow();
});
