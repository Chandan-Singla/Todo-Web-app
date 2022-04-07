const db = require('../config/mongoose');



const Task = require('../models/task');
module.exports.create = function(req, res){
    let newDate;
  
    if(req.body.date.length == 0){
  
        
        newDate = 'No Deadline'
    }
    else{
        let temp = req.body.date;
        let date = temp.substring(8, 10);
        let mon = temp.substring(5, 7);
        let year = temp.substring(0, 4);

        if(date[0] == '0'){
            date = date.substring(1);
        }
        if(mon[0] == '0'){
            mon = mon.substring(1);
        }

        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        newDate = "" + months[mon-1] + " " + date + ", " + year;
    }
    Task.create({
          description : req.body.description,
        category : req.body.category,
        date : newDate
 }, function(err){
        if(err){
            console.log('Error creating Contact');
            return;
        }
        return res.redirect('back');
    });
}
module.exports.delete = function(req, res){
    if(req.body.id == undefined){
        console.log("User haven't selected any task to delete");
        return res.redirect('back');
    }
    else if(typeof(req.body.id) == 'string'){
        Task.findByIdAndDelete(req.body.id, function(err){
                if(err){
                    console.log("error deleting task ");
                    return;
                }
                return res.redirect('back');
            });
    }
 
    else{
        for(let i of req.body.id){
            Task.findByIdAndDelete(i, function(err){
                if(err){
                    console.log("error deleting tasks ");
                    return;
                }
            });
        }
        return res.redirect('back');
    }
};
