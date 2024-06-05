using Markdig;
using Markdig.Renderers;
using Markdig.Renderers.Html;
using Markdig.Renderers.Html.Inlines;
using Markdig.Syntax.Inlines;

namespace BlazorPortfolio.Helpers {
    public class CustomLinkExtension : IMarkdownExtension
    {
        public void Setup(MarkdownPipelineBuilder pipeline)
        {
            // No need to set up anything in the pipeline
        }

        public void Setup(MarkdownPipeline pipeline, IMarkdownRenderer renderer)
        {
            if (renderer is HtmlRenderer htmlRenderer)
            {
                // Replace the default link renderer with the custom one
                var linkRenderer = htmlRenderer.ObjectRenderers.FindExact<LinkInlineRenderer>(); // Specify the type argument explicitly
                if (linkRenderer != null)
                {
                    htmlRenderer.ObjectRenderers.Remove(linkRenderer);
                    htmlRenderer.ObjectRenderers.Add(new CustomLinkRenderer());
                }
            }
        }
    }

    public class CustomLinkRenderer : HtmlObjectRenderer<LinkInline>
    {
        protected override void Write(HtmlRenderer renderer, LinkInline link)
        {
            if (!link.IsImage)
            {
                renderer.Write("<a href=\"").Write(link.GetDynamicUrl != null ? link.GetDynamicUrl() : link.Url).Write("\">");

                // Render the link text
                if (link.FirstChild != null)
                    renderer.Write(link.FirstChild);

                // Add the icon element inside the <a> tag
                renderer.Write("<i class=\"iconoir-open-new-window\"></i>");

                renderer.Write("</a>");
            }
            else
            {
                // Use default behavior for image links
                renderer.WriteChildren(link);
            }
        }
    }
}