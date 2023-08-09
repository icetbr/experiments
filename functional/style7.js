Error.prepareStackTrace = (err, arr) => {

    /**************************************************************************/

    const usefullLines = line => {
        !line.startsWith('    at') ||
            (line.includes(projectPath) &&
                !line.includes('node_modules'));
    };

    err.stack = err.stack
        .split('\n')
        .filter(usefullLines)
        .join('\n');

    /**************************************************************************/

    err.stack = err.stack
        .split('\n')
        .filter(line => {
            !line.startsWith('    at') ||
                (line.includes(projectPath) &&
                    !line.includes('node_modules'));
        })
        .join('\n');

    /**************************************************************************/

    let lines = err.stack.split('\n');
    lines = lines.filter(line => {
        !line.startsWith('    at') ||
            (line.includes(projectPath) &&
                !line.includes('node_modules'));
    });
    err.stack = lines.join('\n');

    /**************************************************************************/

    const lines = [];
    for (const line of err.stack.split('\n')) {
        if (!line.startsWith('    at') ||
            (line.includes(projectPath) &&
                !line.includes('node_modules'))
        ) {
            lines.push(line);
        }
    }
    err.stack = lines.join('\n');

    /**************************************************************************/

    /** TEMPLATE METHOD */
        const chooseFile = async ({ directory, message, matching }) => {
            return matching ?
                (await filesystem.find(directory, { matching })) :
                (await filesystem.list(directory));
        }

        /**************************************************************************/

        const withList = async ({ directory }) => await filesystem.list(directory)

        const withFilter = async ({ directory, matching }) =>
            await filesystem.find(directory, { matching })

        const useChooseFile = finder => async ({ directory, message, matching }) => {
            return await finder({ directory, matching })
        }

        const listDirectory = useChooseFile(withList)
        const filterInDirectory = useChooseFile(withFilter)

        /**************************************************************************/

        const chooseFile = async ({ directory, message, matching }) => {
            return findFiles(directory, matching);
        }

        const findFiles = async ({ directory }) => await filesystem.list(directory);

        const findFiles = async ({ directory, matching }) =>
            await filesystem.find(directory, { matching });

    /** TEMPLATE METHOD */
    /**************************************************************************/
};
