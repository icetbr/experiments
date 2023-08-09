import query from './query.js';
import fetchedResponseWithManyPosts from './fetchedResponse/aFetchedResponse.js'; // se uso import objeto, nao tenho infinite expand como teria com TS
                                                                                  // tb fica ruim de ver hoover pqw objeto é grande
/** @example
    import { a, it, eq } from '../test/setup.js'

    it('returns the comments for the given post', async () => eq(
        await fetchPosts('be01e7669cbd', '3.1519323642:7ee436aabbba'),
        [{
            data: {
                post: {
                    id: 'be01e7669cbd',
                    responsesCount: 43,
                    threadedPostResponses: {
                        pagingInfo: { next: { to: '1.1520096666424:538368ee7758' } },
                        posts: [{
                            id: 'd07f7d2e079f',
                            responsesCount: 1,
                            creator: { name: 'Yiou Chen' },
                            clapCount: 4,
                            createdAt: 1520531380418,
                            content: {
                                bodyModel: {
                                    paragraphs: [{
                                        id: '17f6444f3cfe_0', name: 'b1f2', type: 'P', markups: [], text: 'It looks nice, but when working in a large code base, it\'s hard to make people spell out the parameters. More likely, I think',
                                    }]}},
                            threadedPostResponses: {},
                        }]}}}}]
    ));
 */
export const fetchPosts = async (postId, pagingCode) =>
    fetch('https://medium.com/_/graphql', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify([{
            operationName: 'PagedThreadedPostResponsesQuery',
            query,
            variables: {
                postId,
                postResponsesPaging: {
                    limit: 10,
                    to: pagingCode,
                },
                sortType: 'TOP',
            },
        }]),
    }).then(r => r.json());


