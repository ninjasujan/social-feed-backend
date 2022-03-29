export const feedDirectory = 'feed';

export const feedBaseUrl = 'https://socialfeeds.s3.amazonaws.com';

export const postType = {
    HASHTAG: 'HASHTAG',
    POST: 'POST',
};

export type PostType = 'HASHTAG' | 'POST';

export const postTypeError = 'Feed type must be of type POST or HASHTAG';
