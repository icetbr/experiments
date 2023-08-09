// trying out one liner

it('with parents', () => {
    const test = {
        title: 'a test name',
        parent: {
            title: 'p1',
            parent: {
                title: 'p2'
            }
        }
    }
    eqLines(1, 1, createFail(cwd, test, error), 'p2 > p1 > The title')
)

it('with parents', () => eq(
    createFail(cwd, {
        title: 'a test name',
        parent: {
            title: 'p1',
            parent: {
                title: 'p2'
            }
        }
    }, error),
    'p2 > p1 > The title'
))

it('with parents', () => {
    const
        test = {
            title: 'a test name',
            parent: {
                title: 'p1',
                parent: {
                    title: 'p2'
                }
            }
        },
        actual = uncolor(createFail(cwd, test, error)),
        expected = 'p2 > p1 > The title';

    eqLines(1, 1, actual, expected)
)
