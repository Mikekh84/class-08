/*global Handlebars */

function Article (opts) {
  Object.keys(opts).forEach(function(e, index, keys) {
    this[e] = opts[e];
  },this);

  this.body = opts.body || marked(this.markdown);
}

Article.prototype.template = '';

Article.prototype.toHtml = function() {
  if (!blog.isAdmin() && !this.publishedOn) {
    return '';
  }
  this.daysAgo =
    parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  this.authorSlug = util.slug(this.author);
  this.categorySlug = util.slug(this.category);

  return this.template(this);
};


Article.prototype.insertRecord = function(callback) {
  // insert article record into database
  webDB.execute(
    [
      {
        'sql' : 'INSERT INTO articles (author, title ) VALUES(?, ?)',
        'data' : [this.author , this.title]
      },

    ]
    ,
    callback
  );
};

Article.prototype.updateRecord = function(callback) {
  //update article record in databse
  webDB.execute(
    [
      {
        'sql': 'UPDATE articles SET title = ?, author = ?, authorUrl = ?, category = ?, publishedOn = ?, markdown = ? WHERE id = ?;',
       'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.markdown, this.id]
      }
    ],
    callback
  );
};

Article.prototype.deleteRecord = function(callback) {
  // Delete article record in database
  webDB.execute(
    [
      {
        'sql': 'DELETE FROM articles WHERE id = ?;',
        'data': [this.id]
      }
    ],
    callback
  );
};

Article.prototype.truncateTable = function(callback) {
  // Delete all records from given table.
  webDB.execute(
    [
      {
        'sql': 'DELETE FROM articles'
      }
    ],
    callback
  );
};
