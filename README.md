## Next.js Cape Software Community Blog Project

This is a project aimed at migrating the Cape Software Community website to a static website. It is being built with [Next.js](https://nextjs.org/), a popular React framework for building web applications. The blog posts are written in Markdown and stored in the `content` directory.

The design and layout of the project are intentionally kept simple and modular to make it easy for other contributors to add features of their own. Additionally, the use of Markdown for blog posts allows anyone to easily add new posts to the blog.

## Features

- Markdown to HTML conversion: Blog posts are written in Markdown, which is converted to HTML for display on the web page.
- Static generation: The blog uses Next.js's static generation feature to generate the HTML at build time.
- Styling: The blog uses Tailwind CSS for styling.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/yourrepository.git# Next.js Blog Project
```

2. Navigate into the project directory:

```bash
cd capedevs
```

3. Install the dependencies:

```bash
npm install
# or 
npm install --legacy-peer-deps
# or
yarn install
# or
pnpm install
# or
bun install
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open http://localhost:3000 with your browser to see the result.
   You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Adding a New Post

To add a new post, create a new Markdown file in the `content` directory. The frontmatter of the file should contain a `posts` array with the `title`, `description`, `date`, and `content` of each post.

 After creating the file, add the newly created post by updating `pages/posts/blog.md` so it can be added to the list of posts/articles in `blog` page.

## Customizing Styles

To customize the styles of the blog posts, modify the CSS classes in the `pages` directory in `posts/[slug].js` `pages/blog.js`.

## Built With

- Next.js
- Tailwind CSS
- gray-matter
- unified
- remark-parse
- remark-html

## TODO

This project is still under development. Here are some features that are planned for future releases:

- **Search Feature**: Implement a search feature to allow users to easily find specific posts.
- **Authentication**: Set up user authentication to allow users to log in and interact with the blog in a personalized way.
- **Subscription Feature**: Allow users to subscribe and unsubscribe to the blog to receive updates on new posts.
- **And More**: More features and improvements are planned for future releases. Stay tuned!

Contributions to help implement these features are welcome!

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

