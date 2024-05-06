
namespace BlazorPortfolio.Models {
    public class Post
    {
        //public string FileName { get; set; }
        public string Title { get; set; }
        public DateOnly Date { get; set; }
        
        Post(PostFrontMatter fm) {
            Title = fm.Title;
            
        }

        //todo: method to get everything you need from filename
        //like frontmatter, but not the content because thats memory heavy
        //and should only happen in oninitiailzed in Post page
    }
}