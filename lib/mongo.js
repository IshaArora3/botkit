var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var mongouri='mongodb://localhost:27017/local';
var dbConnection;
var res;
exports.func1 = function(callback) {
	var ret = "init";
	mongo.connect(mongouri, function (err, db)
	{
	  if (err)
	  {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  }
	  else
	  {
		  
		  console.log('Connected to mongooooo');
		var jobs = db.collection('alljobs').find({"search_word":"software+developer"}).limit(10);
		console.log("+++ connected to db ++++++++++");
		jobs.toArray(function(err, itemArray){
			if(err){
				console.log("ERror in searching!!!!!");
			}
			else{
				console.log("++++++++++printing array length+++++");
				console.log(itemArray.length);
				console.log("++++printing item index for url+++++");
				console.log(itemArray[3].url);
				var resultOfSearch = "";
				
				for(var i=0;i<itemArray.length;i++)
				{
					resultOfSearch = resultOfSearch + itemArray[i].url + "\n";
				}
				callback(resultOfSearch);
				db.close();
			}
		});
		/*
		jobs.each(function(err,doc){
			if (err)
			{
				console.log('Jobs.each Error:', err);
			}
			else if(doc != null){
	//		console.dir(doc);
			console.log("++++++++++++++++++++++++++++++++ exportfunc1 ++++++++++++++++++++++" + doc);
			console.log("--------------------exportfunc1-------------");
			console.log(doc.url);
			ret = doc.url;
			console.log("exportfunc1 response !!!!!!!!!!!!!!!!!" + ret);
			//return doc.url;
			} else {
				callback(ret);
				db.close();
			}
		});
		*/
		//db.close();
	  }
	});
	console.log("++++++++++++ connecting ++++++++++++");
	
	return ret;
}
var findJobs = function(db, callback) {
	
	//var jobs = db.collection('alljobs').find({title:'Software Developer'},{url:1});
	var jobs = db.collection('alljobs').find({"search_word":"software+developer"}).limit(1);
	//var temp = jobs.hasNext()?jobs.next():null;
	
	jobs.each(function(err,doc){
		console.log("++++++++++++++++++++++++++++++++ printing fdbf doc ++++++++++++++++++++++" + doc);
		if(doc != null){
	//		console.dir(doc);
			console.log("---------------------------------");
			console.log(doc.url);
			res = doc.url;
			console.log("printing res from Findjobs !!!!!!!!!!!!!!!!!" + res);
			return doc.url;
		} else {
			callback();
		}
	});
	
	/*,function(err, result){
			if(err){
				console.log(err);
			}
			else{
				var abc = result.toArray();
				
				console.log("printing the result");
				console.log(result);
				
			}
		}
		*/
	//var parsed = JSON.parse(jobs);
	//var abc = JSON.stringify(jobs);
	/*
	*/
	
   var cursor =db.collection('alljobs').find( );
    cursor.each(function(err, doc) {
	 if (doc != null) {
		 //console.dir(doc);
		 //console.log(doc);
	  } else {
		 callback();
	  }
	  
   });
};

exports.result = res;

/*mongo.connect(mongouri, function (err, db)
{
	  if (err)
	  {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  }
	  else
	  {
		  dbConnection = db;
		  console.log('Connected to mongooooo');
		  findJobs(db, function() {
          db.close();});
	  }
});*/

function getTask(){
                	//var taskID= 'Task_102_1';

                	//Querry: db.multitenant.find({'waterfall.tasks.task_id':'Task_102_1'},{'waterfall.tasks.$.task_id':1});

    dbo.collection('multitenant', function(err,collection){
        collection.findOne({'waterfall.tasks.task_id':'Task_102_1'},{'waterfall.tasks.$.task_id':1},function(err, result)
                {
            if (err)
            {
                console.log('Error updating scrum ' + err);
                //res.send({'error':'An error has occurred'});
            }
            else
            {
                console.log('' + result + ' Doc Fetched!');

                return result;

            }
            });
        });

};



exports.getTask=getTask;
