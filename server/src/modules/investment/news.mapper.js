const mapNews = (articles) => {

    return articles.map(article => ({

        title: article.title,

        description: article.description,

        source: article.source.name,

        publishedAt: article.publishedAt,

        url: article.url,

        image: article.image

    }));

};

export default mapNews;