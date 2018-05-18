module.exports = options => (
    `class ${options.name} extends component
    {
        constructor()
        {
            super(props)
        }
    }
    `
);