var fs=require('fs');
var page404=fs.readFileSync('./template/404.html');

function render(html, vars){
	var tmp=String(html);
	for(i in vars){
		var reg=new RegExp("\\$"+i,"g");
		tmp=tmp.replace(reg,vars[i]);
	}
	return tmp;
}

var handlers={
	plain: function (plain, req, res){
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write(plain);
		res.end();
	},
	html: function (html, vars, req, res){
		res.writeHead(200, {"Content-Type": "text/html"});
		var data=render(html, vars);
		res.write(data);
		res.end();
	},
	404: function (req,res){
		res.writeHead(404, {"Content-Type": "text/html"});
		var data=render(page404,{});
		res.write(data);
		res.end();
	}
};

module.exports=handlers;