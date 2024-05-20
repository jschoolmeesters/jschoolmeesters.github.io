using Markdig;
using Markdig.Extensions.Yaml;
using Markdig.Syntax;
using YamlDotNet.Serialization;

namespace BlazorPortfolio.Helpers {
    public static class MarkdownHelper
    {
        private static readonly IDeserializer YamlDeserializer = 
            new DeserializerBuilder()
            .IgnoreUnmatchedProperties()
            .Build();
        
        private static readonly MarkdownPipeline Pipeline 
            = new MarkdownPipelineBuilder()
            .UseYamlFrontMatter()
            .Build();

        public static T GetFrontMatter<T>(this string markdown)
        {
            var document = Markdown.Parse(markdown, Pipeline);
            var block = document
                .Descendants<YamlFrontMatterBlock>()
                .FirstOrDefault();

            if (block == null) 
                return default;

            var yaml =
                block
                .Lines // StringLineGroup[]
                .Lines // StringLine[]
                .OrderByDescending(x => x.Line)
                .Select(x => $"{x}\n")
                .ToList()
                .Select(x => x.Replace("---", string.Empty))
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .Aggregate((s, agg) => agg + s);

            return YamlDeserializer.Deserialize<T>(yaml);
        }

        // TODO: combine this with GetFrontMatter to prevent double parsing
        public static string GetContent(this string markdown)
        {
            var document = Markdown.Parse(markdown, Pipeline);
            var frontMatterBlock = document.FirstOrDefault() as YamlFrontMatterBlock;
            int frontMatterEnd = frontMatterBlock != null ? frontMatterBlock.Span.End : 0;
            return markdown.Substring(frontMatterEnd + 1).TrimStart();
        }
    }
}