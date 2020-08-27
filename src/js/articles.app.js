var articlesApp = (function() {

    function viewArticles(){

        let uri = `${window.location.origin}/api/articles`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', uri);
      
        xhr.setRequestHeader(
          'Content-Type',
          'application/json; charset=UTF-8'
        );
      
        xhr.send();
      
    xhr.onload = function(){
    let app = document.getElementById('app');
    let data = JSON.parse(xhr.response);
    let articles = data.articles;
    let table = '';
    let rows = '';
  
    //Loop each article record into it's own HTML table row, each article should
    //have a link a article view
    for (let i=0; i<articles.length; i++) {
      rows = rows + `<tr>
        <td>
          <a href="#view-${articles[i]['_id']}">${articles[i]['title']}, ${articles[i]['slug']}</a>
        </td>
        <td>${articles[i]['body']}</td>
        <td>${articles[i]['keywords']}</td>
        <td>${articles[i]['description']}</td>
        <td>${articles[i]['published']}</td>
        <td>${articles[i]['created']}</td>
        <td>${articles[i]['modified']}</td>
      </tr>`;
    }
  
    //Create a articles panel, add a table to the panel, inject the rows into the
    //table
    table = `<div class="card">
      <div class="card-header clearfix">
        <h2 class="h3 float-left">Articles</h2>
        <div class="float-right">
          <a href="#create" class="btn btn-primary">New Article</a>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <td>Title</td>
              <td>Body</td>
              <td>Keywords</td>
              <td>Description</td>
              <td>Published</td>
              <td>Created</td>
              <td>Modified</td>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
  
    //Append the HTML to the #app
    app.innerHTML = table;
  }
}     

function createArticle(){
  var app = document.getElementById('app');

  var form =  `
      <div class="card">
        <div class="card-header clearfix">
          <h2 class="h3 float-left">Create a New Article</h2>
          <div class="float-right">
            <a href="#" class="btn btn-primary">Cancel</a>
          </div>
        </div>
        <div class="card-body">  
          <form id="createArticle" class="card-body">
            <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>
            <div class="row">
              <div class="form-group col-md-6">
                <label for="Title">Title</label>
                <input type="text" id="title" name="title" class="form-control" required>
              </div>

              <div class="form-group col-md-6">
                <label for="Body">Body</label>
                <input type="text" id="body" name="body" class="form-control" required>
              </div>
            </div>

            <div class="row">
              <div class="form-group col-md-6">
                <label for="Keywords">Keywords</label>
                <input type="text" id="keywords" name="keywords" class="form-control" required>
              </div>

              <div class="form-group col-md-6">
                <label for="description">Description</label>
                <input type="description" id="description" name="description" class="form-control" required>
              </div>
              <div class="form-group col-md-6">
              <label for="Published">Published</label>
              <input type="published" id="published" name="published" class="form-control" required>
            </div>

            <div class="form-group col-md-6">
            <label for="Created">Created</label>
            <input type="created" id="created" name="created" class="form-control" required>
          </div>

          <div class="form-group col-md-6">
          <label for="Modified">Modified</label>
          <input type="modified" id="modified" name="modified" class="form-control" required>
        </div>
            </div>

            <div class="text-right">
              <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
            </div>
          </form>
        </div>
      </div>
  `;

  app.innerHTML=form;
}


function viewArticles(id){

  let uri = `${window.location.origin}/api/articles/${id}`;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', uri);

  xhr.setRequestHeader(
    'Content-Type',
    'application/json; charset=UTF-8'
  );

  xhr.send();

  xhr.onload = function(){
    let app = document.getElementById('app');
    let data = JSON.parse(xhr.response);
    let card = '';

    card = `<div class="card">
      <div class="card-header clearfix">
        <h2 class="h3 float-left">${data.articles.title} ${data.articles.title}</h2>
        <div class="float-right">
          <a href="#edit-${data.articles._id}" class="btn btn-primary">Edit</a>
        </div>
      </div>
      <div class="card-body">
        <div>${data.articles.title}</div>
        <div>${data.articles.body}</div>
        <div>${data.articles.keywords}</div>
        <div>${data.articles.description}</div>
        <div>${data.articles.published}</div>
        <div>${data.articles.created}</div>
        <div>${data.articles.modified}</div>
        </div>
    </div>`;

    app.innerHTML = card;
  }
}

function editArticle(id){

  let uri = `${window.location.origin}/api/articles/${id}`;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', uri);

  xhr.setRequestHeader(
    'Content-Type',
    'application/json; charset=UTF-8'
  );

  xhr.send();

  xhr.onload = function(){
    let app = document.getElementById('app');
    let data = JSON.parse(xhr.response);
    
      var form =  `
        <div class="card">
          <div class="card-header clearfix">
            <h2 class="h3 float-left">Edit</h2>
            <div class="float-right">
              <a href="#" class="btn btn-primary">Cancel</a>
            </div>
          </div>
          <div class="card-body">
            <form id="editArticle" class="card-body">
              <input type="hidden" id="_id" name="_id" value="${data.articles._id}">
              <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>
    
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="Title">Title</label>
                  <input type="text" id="title" name="title" class="form-control" value="${data.articles.title}" required>
                </div>
    
                <div class="form-group col-md-6">
                  <label for="body">Body</label>
                  <input type="text" id="body" name="body" class="form-control" value="${data.articles.body}" required>
                </div>
              </div>
    
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="description">Description</label>
                  <input type="text" id="description" name="description" class="form-control" value="${data.articles.description}" required>
                </div>
    
                <div class="form-group col-md-6">
                  <label for="published">Published</label>
                  <input type="published" id="published" name="published" class="form-control" value="${data.articles.published}" required>
                </div>

                <div class="form-group col-md-6">
                <label for="created">Created</label>
                <input type="created" id="created" name="created" class="form-control" value="${data.articles.created}" required>
              </div>


              <div class="form-group col-md-6">
              <label for="modified">Modified</label>
              <input type="modified" id="modified" name="modified" class="form-control" value="${data.articles.modified}" required>
            </div>
              </div>
    
              <div class="text-right">
                <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
              </div>
            </form>
          </div>
        </div>
        <div>
          <a href="#delete-${data.articles._id}" class="text-danger">Delete</a>
        </div>
      `;
    
      app.innerHTML=form;
      processRequest('editArticle', '/api/articles', 'PUT');
    }
  } 
    
// function postRequest(formId, url){
function processRequest(formId, url, method){
  let form = document.getElementById(formId);
  form.addEventListener('submit', function(e){
    e.preventDefault();

    let formData = new FormData(form);
    let uri = `${window.location.origin}${url}`;
    let xhr = new XMLHttpRequest();
    // xhr.open('POST', uri);
    xhr.open(method, uri);


    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    let object = {};
    formData.forEach(function(value, key){
      object[key]=value;
    });

    xhr.send(JSON.stringify(object));
    xhr.onload = function(){
      let data = JSON.parse(xhr.response);
      if(data.success===true){
        window.location.href = '/';
      }else{
        document.getElementById('formMsg').style.display='block';
      }
    }
  });
}

function deleteView(id){

  let uri = `${window.location.origin}/api/articles/${id}`;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', uri);

  xhr.setRequestHeader(
    'Content-Type',
    'application/json; charset=UTF-8'
  );

  xhr.send();

  xhr.onload = function(){
    let app = document.getElementById('app');
    let data = JSON.parse(xhr.response);
    let card = '';

    card = `<div class="card bg-transparent border-danger text-danger bg-danger">
      <div class="card-header bg-transparent border-danger">
        <h2 class="h3 text-center">Your About to Delete an Article</h2>
      </div>
      <div class="card-body text-center">
        <div>
          Are you sure you want to delete
          <strong>${data.articles.title}</strong>
        </div>

        <div>Title: <strong>${data.articles.body}</strong></div>
        <div>Keywords: <strong>${data.articles.keywords}</strong></div>
        <div>Description: <strong>${data.articles.description}</strong></div>
        <div>Published: <strong>${data.articles.published}</strong></div>
        <div>Created: <strong>${data.articles.created}</strong></div>
        <div>Modified: <strong>${data.articles.modified}</strong></div>

        <div class="text-center">
          <br>
          <a onclick="articlessApp.deleteArticle('${data.articles._id}');" class="btn btn-lg btn-danger text-white">
          Yes delete ${data.articles.title}</a>
          </div>

      </div>
    </div>`;

    app.innerHTML = card;
  }
}

function deleteApp(id){

  let uri = `${window.location.origin}/api/articles/${id}`;
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', uri);

  xhr.setRequestHeader(
    'Content-Type',
    'application/json; charset=UTF-8'
  );

  xhr.send();

  xhr.onload = function(){
    let data = JSON.parse(xhr.response);
    if(data.success === true){
      window.location.hash = '#';
    }else{
      alert('Unknown error, the user could not be deleted');
    }

  }

}

return {
    load: function(){
      let hash = window.location.hash;
      let hashArray = hash.split('-');
    
      switch(hashArray[0]){
        case '#create':
          createArticles();
          processRequest('createArticle', '/api/articles', 'POST');
          break;
    
        case '#view':
          // console.log('VIEW');
          viewArticles(hashArray[1]);
          break;
    
        case '#edit':
          editArticles(hashArray[1]);
          // console.log('EDIT');
          break;
    
        case '#delete':
          // console.log('DELETE');
          deleteView(hashArray[1]);
          break;
    
        default:
          viewArticles();
          break;
            }
          },

          deleteArticle: function(id){
            deleteArticle(id);
          }

        }
          
  })();
  
  articlesApp.load();

  window.addEventListener("hashchange", function(){
    articlesApp.load();
  });