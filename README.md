## Cape Software Community Blog

This repository contains the official website and blog for the **Cape Software Community**.

The site is built as a **static Next.js application**, with all content written in **Markdown**. The goal is to keep the platform lightweight, easy to maintain, and simple for community members to contribute to.

The structure and design are intentionally kept minimal and modular so contributors can focus on content and improvements without needing complex setup or backend infrastructure.

---

## Features

- **Markdown-based content**  
  Blog posts are written in Markdown and converted to HTML at build time.

- **Static generation**  
  Pages are statically generated using Next.js for fast load times and low hosting overhead.

- **Contributor-friendly setup**  
  No databases or authentication. Contributions happen via forks, Markdown files, and pull requests.

- **Simple styling**  
  Styled with Tailwind CSS for consistency and easy customization.

---

## Tech Stack

- Next.js  
- Tailwind CSS  
- react-markdown
- remark-gfm
- date-fns
- gray-matter  
- unified  
- remark-parse  
- remark-html  

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/capedevs/capedevs.github.io.git
```

2. Navigate into the project directory
```bash
cd capedevs.github.io
```

3. Install dependencies
```bash
npm install --legacy-peer-deps
# or
yarn install
# or
pnpm install
# or
bun install
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. View the site

Open http://localhost:3000 in your browser.

⸻

## Adding a New Blog Post

To add a new post:

1.	Create a new Markdown file in the content directory.
	
2.	Include frontmatter with the following fields:
   
	- title
	- description
	- date
	- author
	
3.	Write the post content in Markdown.
	
4.	Open a pull request with your changes.

Once merged, the post will be included in the next build.

> [!NOTE]
> The filename of the Markdown file (e.g., `HelloWorld.md`) determines the post's URL (e.g., `/posts/HelloWorld`).

⸻

## Customizing Styles

Post layout and styling can be adjusted in:

`pages/posts/[slug].js`

Global styles are handled via Tailwind CSS.

⸻

## Contributing

Contributions are welcome.

If you’d like to add content, improve styling, or suggest enhancements, feel free to open a pull request. The project intentionally avoids complex infrastructure to keep contribution friction low.

⸻

License

This project is licensed under the MIT License.
See LICENSE.md for details.
