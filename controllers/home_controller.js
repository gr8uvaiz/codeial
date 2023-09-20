module.exports.home = function(req,res){
    // res.send(`<h1>Hello this is loaded from the controller</h1>`)
    return res.render('home',{
        title: 'Home'
    })


}