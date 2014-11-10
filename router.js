var handlers=require('./requestHandlers.js');
var fs=require('fs');

function route(pathname, req, res){
	var data;
	if(pathname=="/") pathname+="index.html";
	pathname="./template"+pathname;
	console.log("Route to "+pathname);
	try{
		data=fs.readFileSync(pathname);
	}catch(e){
		console.log("404 ERROR");
		handlers["404"](req, res);
		return;
	}
	if(pathname.substr(-4)=="html")
		handlers["html"](data, {}, req, res);
	else 
		handlers["plain"](data, req, res);
}

exports.route = route;