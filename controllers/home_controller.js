const Task = require('../models/task');
let colors = {
     personal : 'darkgreen',
    work : 'darkmagenta',
    school : 'darkorange',
    cleaning : 'darkblue',
      other : 'darkcyan',
    'n/a' : 'grey',
}

module.exports.home = function(req, res){
    Task.find({}, function(err, tasks){
        if(err){
            
            console.log('Error in fetching tasks');
            return;
        }
        
        return res.render('home', {
            task_list : tasks,
            color_list : colors
        });
    });
}
