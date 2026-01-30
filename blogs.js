import thumb from "@/../public/blog-thum.jpg";

export const blogs = [
  {
    title: "Funded Trading with Tradexprop: Your Path to Success",
    thumb: thumb,
    slug: "funded-trading-success",
    category: {
      slug: "about-pipzen",
      name: "About Pipzen",
    },
    content: `Trading’s fast—every move counts. Whether you’re a newbie or a pro, the right prop firm can make or break your journey. Funded trading with Tradexprop offers a shortcut: one-step evaluations, 80% profit splits, and payouts on demand. Over 40% of funded traders hit goals faster with streamlined firms (timeless stat). Here’s how Tradexprop redefines success—let’s unpack it.


### What Is Funded Trading with Tradexprop?
Tradexprop flips the prop trading script. Pass the X-1 Step Evaluation, trade real capital, and keep most of your profits—80%, not the usual 50%. No multi-phase grind—just one clear shot. It’s built for traders who value speed and fairness, cutting the clutter of traditional firms.

Funded trading with Tradexprop lets you pass one X-1 Step Evaluation, trade real capital, and keep 80% of profits with instant payouts.

#### X-1 Step Evaluation: Fast-Track Funding
Forget endless hurdles—Tradexprop’s X-1 Step Evaluation gets you funded fast:
- ** One Stage**: Pass a single test—hit profit targets, manage risk.
- **Real Capita**l: Trade live funds right after—no delays. 
- **Transparent Rules**: Clear criteria, no surprises—60% of traders prefer this simplicity It’s efficiency at its core—start earning sooner.

[![](https://tradexprop.com/wp-content/uploads/2025/03/Funded-TXP-Community-Power.webp)](https://tradexprop.com/wp-content/uploads/2025/03/Funded-TXP-Community-Power.webp)

### Community Power: Grow Together
Trading solo’s tough—Tradexprop’s global network changes that:
- **Connect**: Swap strategies with traders worldwide.
- **Learn**: Tap updates and tips—no gatekeeping.
- **Support**: Real-time help when you need it—30% of traders thrive with peers (evergreen stat).
It’s more than funding—it’s a hub.

## Conclusion
**Funded trading with Tradexprop** cuts the noise—one-step funding, 80% splits, instant payouts. It’s a trader-first model—over 40% of prop traders seek this edge (timeless stat). Ready to take control? Tradexprop’s your launchpad—trade, earn, succeed on your terms.`,
  },
];

export const findBlogBySlug = (slug) => {
  const blog = blogs.find((blog) => blog.slug == slug);
  return blog;
};

export const getAllCategoriesWithBlogs = () => {
  const categoryMap = {};

  blogs.forEach((blog) => {
    const { category, title, thumb, slug } = blog;
    const catSlug = category.slug;

    if (!categoryMap[catSlug]) {
      categoryMap[catSlug] = {
        name: category.name,
        slug: catSlug,
        blogs: [],
      };
    }

    categoryMap[catSlug].blogs.push({
      title,
      thumb,
      slug,
    });
  });

  return Object.values(categoryMap);
};
