$(function() {
  //init web DB
  webDB.init();

  //Set up the blog with the raw data
  blog.fetchFromDB();

  blog.initArticleEditorPage();
  blog.watchNewForm();

  blog.handleAddButton();
  blog.handleUpdateButton();
  blog.handleDeleteButton();
});
