# proposals.es

> A website for keeping up to date with ECMAScript proposals.

![](https://i.postimg.cc/NMTGgMBK/proposals-es.png)

Created with React, TypeScript, and Next.js.

## Developing

### Setup

1. Clone this repo
1. Create a `.env` file in the root folder
1. Inside the `.env` file, add your GitHub personal access to an entry like:

```
GITHUB_TOKEN=ghp_someRandomText123
```

You can look at the [GitHub docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) on how to create a personal access token if you don't have one.

### Running

You can start the dev server by running:

```
npm run dev
```

### Debugging

You can debug the server code by starting your server with a different command:

```
npm run debug
```

Once you have the server started, you can open your browser and open the inspect tab. As an example, you can open Chrome by going to [chrome://inspect](chrome://inspect) in your browser and then click the **inspect** link near the bottom.

## License

MIT

## Disclaimer

This site is not affiliated with TC39 or Ecma International.
