it('returns the comments for the given post', async () => eq(
    await fetchPosts('be01e7669cbd', '3.1519323642:7ee436aabbba'),
    [{
        data: {
            post: {
                id: 'be01e7669cbd',
                responsesCount: 43,
                threadedPostResponses: {
                    pagingInfo: { next: { to: '1.1520096666424:538368ee7758' } },
                    posts: array({
                        id: 'f6070b0288c7',
                        responsesCount: 0,
                        creator: { name: 'Kristian Mandrup' },
                        clapCount: 11,
                        createdAt: 1521128384454,
                        content: {
                            bodyModel: {
                                paragraphs: [{
                                    id: '4acf88645d08_0', name: '00fd', type: 'P', markups: [], text: string() // string(), length() ?
                                }],
                            },
                        },
                        threadedPostResponses: { pagingInfo: { next: null }, posts: [] },
                    }),
                },
            },
        },
    }]
));
it('returns the comments for the given post', async () => {
    const actual = await fetchPosts('be01e7669cbd', '3.1519323642:7ee436aabbba');
    actual.data.post.threadedPostResponses.posts[0].content.bodyModel.paragraphs[0].text = 'any';
    actual.data.post.threadedPostResponses.posts.splice(1);
    aeq(actual,
    [{
        data: {
            post: {
                id: 'be01e7669cbd',
                responsesCount: 43,
                threadedPostResponses: {
                    pagingInfo: { next: { to: '1.1520096666424:538368ee7758' } },
                    posts: [{
                        id: 'f6070b0288c7',
                        responsesCount: 0,
                        creator: { name: 'Kristian Mandrup' },
                        clapCount: 11,
                        createdAt: 1521128384454,
                        content: {
                            bodyModel: {
                                paragraphs: [{
                                    id: '4acf88645d08_0', name: '00fd', type: 'P', markups: [], text: 'any'
                                }],
                            },
                        },
                        threadedPostResponses: { pagingInfo: { next: null }, posts: [] },
                    }],
                },
            },
        },
    }]
));