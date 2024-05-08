using YamlDotNet.Serialization;

namespace BlazorPortfolio.Models {
    public class PostFrontMatter
    {
        [YamlMember(Alias = "tags")]
        public string Tags { get; set; }
        
        [YamlMember(Alias = "title")]
        public string Title { get; set; }
    
        [YamlMember(Alias = "date")]
        public string Date { get; set; }
        
        [YamlIgnore]
        public string[] GetTags => Tags?
            .Split(",", StringSplitOptions.RemoveEmptyEntries)
            .Select(x => x.Trim())
            .ToArray();
    }
}