var countries = new Array();

$(document).ready(function(){
	var countries = new Array();
	
	$.ajax({
		url: "get_current_date.php",
		success: function(result){
			$("#date").html(result);
    }
	});
	
	showAlphabet();
	loadData();
	
	
  });


function showAlphabet(){
	for(var i = 65 ; i<=90; i++){
	var temp = document.createElement("BUTTON");
	var res = String.fromCharCode(i);
	temp.setAttribute("id", i);
	temp.innerHTML = res;
	temp.setAttribute("onclick","showCountries("+i+")" );
	document.getElementById("text").appendChild(temp);
	}		
}

function showCountries(i){
	
	var old_table = document.getElementById("table");
	var old_class = 0;
	if(old_table != 'undefined' && old_table != null){
		old_class = old_table.className;
		document.getElementById("table").remove();
	}
   
        if(old_class == i )
	   return;
	

	var table = document.createElement("TABLE")
	table.setAttribute("id" , "table");
	table.setAttribute("class" , i);
	document.getElementById("text").appendChild(table);
	
	
	var first = true;
	for( var j = 0 ; j< countries.length ; j++ ){
		if( countries[j].name[0] == String.fromCharCode(i)){
			if(first){
				var Country = document.createElement("th");
				var details = document.createElement("th");
	                        Country.innerHTML = "Country";
				details.innerHTML = "details"
	                        table.appendChild(Country);
				table.appendChild(details);
				first = false;
			}
				
			var tr = document.createElement("TR");
		        table.appendChild(tr);
		        var name = document.createElement("TD");
			var more = document.createElement("TD");
			var click = document.createElement("BOTTUN");
			click.setAttribute("id" , 'c'+j);
			click.setAttribute("onclick" , "more_details("+j+")" );
			click.innerHTML = "<b><u>click here</u></b>";
	                name.innerHTML= countries[j].name;
			
			
	                tr.appendChild(name);
			tr.appendChild(more);
			more.appendChild(click);
		}
	}
	
	document.getElementById("text").appendChild(table); 
	var temp = document.getElementById(i);
	temp.setAttribute("onclick","showCountries("+i+")" );	
	
	}
	
	
	
function loadData() {
	$.ajax('https://travelbriefing.org/countries.json',
	{
	dataType: 'json',
	timeout: 500000,
        success: function(response){
		response.forEach( function( country , index ) {
		countries[index] = {};
		countries[index].name = country.name;
		countries[index].url = country.url;
	} );
	    
	},
		
	error: function (jqXhr , textStatus, errorMessage){
	$('p').append('Error: ' +errorMessage);
		
	}
		
	});

	}
	
function more_details(index){
    
	$.ajax(countries[index].url,
	{
	 dataType: 'json',
	 timeout: 500000,
	 success: function(response){
   
		 	  
	 //Languages
	document.getElementById('c'+index).innerHTML = "<u>Languages:</u> ";
	response.language.forEach( function (item,i){
		document.getElementById('c'+index).innerHTML +=  item.language;
		if(i < response.language.length-1 )
		document.getElementById('c'+index).innerHTML += ",";
		else{ document.getElementById('c'+index).innerHTML += ' .'; }
	});
	
	
	//Currency
	document.getElementById('c'+index).innerHTML += "<br> <u>Currency:</u> ";
	document.getElementById('c'+index).innerHTML += "<br>Name: ";
	if(response.currency.name !== null){
	 document.getElementById('c'+index).innerHTML += response.currency.name; }
	document.getElementById('c'+index).innerHTML += "<br>Symbol: ";
	if(response.currency.symbol !== null){
		document.getElementById('c'+index).innerHTML +=response.currency.symbol; }
	document.getElementById('c'+index).innerHTML += "<br>Rate: ";
	if(response.currency.rate !== null){
	    document.getElementById('c'+index).innerHTML +=response.currency.rate;}
	
	//Neighbors
	document.getElementById('c'+index).innerHTML += " .<br><u> Neighbors: </u>";
	
	response.neighbors.forEach(function(item , i){
		
	document.getElementById('c'+index).innerHTML +=  item.name;
	if(index < response.neighbors.length-1 )
		document.getElementById('c'+index).innerHTML += ", ";
	else{ document.getElementById('c'+index).innerHTML += ' .'; }
	
	} );
	
	
	//Average temperature
	document.getElementById('c'+index).innerHTML += "<br><u>Average temperature in the current month:</u> " ;
	var date = document.getElementById("date").textContent;
	var month = date[3]+date[4];
	document.getElementById('c'+index).innerHTML += response.weather[getMonth(month)].tAvg;
   
   
  
  },
  
error: function (jqXhr , textStatus, errorMessage){
	$('p').append('Error: ' +errorMessage);
	}
	});
	
}

function getMonth(month){
if(month === '01'){return January };
if(month === '02'){return "February" };
if(month === '03'){return 'March' };
if(month === '04'){return "April" };
if(month === '05'){return "May" };
if(month === '06'){return "June" };
if(month === '07'){return "July" };
if(month === '08'){return "August" };
if(month === '09'){return "September" };
if(month === '10'){return "October" };
if(month === '11'){return "November" };
if(month === '12'){return "December" };
   
}
