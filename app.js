const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const bodyParser = require('body-parser');
const model = require('./models');

app.engine('mustache', mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

var todo = [];
var done = [];

//Rendering DB
app.get('/', function(request, response){
  model.task.findAll({order: [['id', 'ASC']]}).then(data=>{  //Finding Objects with filter
    for(i=0; i<data.length; i++){ //looping through becuase we cannot grab DB values directly (while using mustache)
      if(data[i].complete === false){
        todo.push(data[i])
      }
      else{
        done.push(data[i])
      }
    }
  }).then(function(){
    return response.render('index', {
      todo: todo,          //linking array to mustache render syntax
      done: done
    })
  })
});

//pushing the List values to the Todo array and keeping user on the same page
app.post('/', function(request, response){

  todo.push(request.body.list)
  response.redirect('/')
});


app.post('/completed', function(request, response){
  const remove = request.body.completed //creating var for complete tasks
  todo.splice(todo.indexOf(remove), 1) //removing completed task from Todo array
  done.push(remove) //pushing task to Done array
  response.redirect('/') //keeping user on the same page(no refresh)
});




app.listen(3000, function(){ //node is looking for port 3000 and function proves it's
  console.log('Live From the Gutter');
});
