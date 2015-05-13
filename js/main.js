$(document).ready(function () {
    new Workspace();

    Backbone.history.start();

     new AppView();

    $.get('/news?tn=bdapibaiyue&t=newchosenlist', function(data){
    	console.log(data);
    });
});