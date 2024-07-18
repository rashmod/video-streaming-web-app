import { faker } from "@faker-js/faker";

const videos = new Array(20).fill(0).map(() => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(),
  duration: faker.number.int({ min: 1, max: 10000 }),
  thumbnailName: faker.image.url({ width: 640, height: 360 }),
  videoName: faker.image.url({ width: 640, height: 360 }),
  createdAt: faker.date.anytime(),
  userId: faker.string.uuid(),
  username: faker.person.fullName(),
  avatarUrl: Math.random() > 0.8 ? null : faker.image.avatar(),
}));

export default videos;
