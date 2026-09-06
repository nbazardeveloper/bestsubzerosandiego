import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { absUrl, DEFAULT_OG_IMAGE, twitterMeta } from "@/lib/seo";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { FinalCta } from "@/components/site/FinalCta";
import { listBlogPosts } from "@/lib/site.functions";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Appliance Repair Blog | Sub-Zero, Viking & Wolf Tips" },
      {
        name: "description",
        content:
          "Guides and tips on Sub-Zero, Viking and Wolf appliance repair — diagnostics, common problems, costs and what to expect, for San Diego homeowners.",
      },
      { property: "og:title", content: "Appliance Repair Blog" },
      { property: "og:description", content: "Sub-Zero, Viking and Wolf repair guides and tips." },
      { property: "og:url", content: absUrl("/blog") },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      ...twitterMeta("Appliance Repair Blog", "Sub-Zero, Viking and Wolf repair guides and tips."),
    ],
    links: [{ rel: "canonical", href: absUrl("/blog") }],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["blog-posts"],
      queryFn: () => listBlogPosts(),
    }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data: posts = [] } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => listBlogPosts(),
  });

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Blog</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Guides, diagnostics and tips for owners of Sub-Zero, Viking and Wolf appliances across
            San Diego.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/post/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card"
            >
              <ImagePlaceholder
                aspect="video"
                label={post.title}
                src={post.hero_image}
                alt={post.title}
              />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-muted-foreground">
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="mt-2 text-lg font-semibold tracking-tight group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.meta_description}</p>
              </div>
            </Link>
          ))}
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No articles published yet.</p>
          ) : null}
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
