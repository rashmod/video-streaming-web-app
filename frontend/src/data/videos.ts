import { Video, VideoWithStatus, VideoWithUser } from "@/types/types";
import { faker } from "@faker-js/faker";

export function generateVideos(count: number, user?: true): VideoWithUser[];
export function generateVideos(count: number, user: false): VideoWithStatus[];
export function generateVideos(
  count: number,
  user?: boolean,
): VideoWithStatus[] | VideoWithUser[];

export function generateVideos(
  count: number,
  user = true,
): VideoWithStatus[] | VideoWithUser[] {
  const videos = new Array(count).fill(0).map(() => {
    const baseVideo: Video = {
      id: faker.string.uuid(),
      title: faker.lorem.words(),
      duration: faker.number.int({ min: 1, max: 10000 }),
      thumbnailName: faker.image.url({ width: 640, height: 360 }),
      videoName: faker.image.url({ width: 640, height: 360 }),
      createdAt: faker.date.anytime(),
      userId: faker.string.uuid(),
    };

    if (user) {
      const videoWithUser: VideoWithUser = {
        ...baseVideo,
        user: {
          id: faker.string.uuid(),
          username: faker.person.fullName(),
          avatarUrl: Math.random() > 0.8 ? null : faker.image.avatar(),
          createdAt: faker.date.anytime(),
        },
      };

      return videoWithUser;
    } else {
      const videoWithStatus: VideoWithStatus = {
        ...baseVideo,
        status: faker.helpers.arrayElement([
          "UPLOADING",
          "TRANSCODING",
          "COMPLETED",
        ]),
      };

      return videoWithStatus;
    }
  });

  return videos as VideoWithStatus[] | VideoWithUser[];
}
