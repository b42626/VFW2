//web app part 2
//Matt Nowakowski
//Visual frameworks
//1303


window.addEventListener("DOMContentLoaded", function()
{

	
	function $(x)
	{
		var theElement = document.getElementById(x);
		return theElement;
	}

	
	function makeLoadoutTypes() 
	{
		
		var formTag = document.getElementsByTagName("form"),
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "mtype");
		for(var i=0, j=loadoutGroups.length; i<j; i++) 
		{
			
			var makeOption = document.createElement("option");
			var optText = loadoutGroups[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}

	
	function getSelectedRadio()
	{
		
		var radios = document.forms[0].mtopics;
		for(var i=0; i<radios.length; i++)
		{
			if(radios[i].checked)
			{
				mtopicsValue = radios[i].value;
			}
		}
	}

	function toggleControls(n)
	{
		switch(n)
		{
			case "on":
				$("weaponForm").style.display = "none";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("weaponForm").style.display = "block";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}

	function saveLoadout()
	{
		
		var id 				= Math.floor(Math.random()*10000001);

		
		getSelectedRadio();

		
		var item 			= {};
			item.mtype 		= ["Weapon Type:",$("mtype").value];
			item.mname 		= ["Load out Name:", $("mname").value];
			item.mdate  	= ["Date:", $("mdate").value];
			item.mrating 	= ["Rating:", $("mrating").value];
			
			item.mtopics 	= ["Class Selection:", mtopicsValue];
			item.mtags		= ["Tags:", $("mtags").value];
			item.mcomments	= ["Comments:", $("mcomments").value];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Load out Saved");
	}

	function getData()
	{
		toggleControls("on");
		if(localStorage.length === 0)
		{
			alert("No Data in local Storage");
		}
		
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id","items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "display";

		for(var i=0, len=localStorage.length; i<len; i++)
		{
			var makeli = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key[i];
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			for(var n in obj)
			{
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
			}
		}
	}

	function clearLocal()
	{
		if(localStorage.length === 0)
		{
			alert("No Data to Clear");
		}
		else
		{
			localStorage.clear();
			alert("All Load outs Deleted");
			window.location.reload();
			return false;
		}
	}

	
	var loadoutGroups = ["-- Choose Weapon Type--", 
	"Assault rifles","Ak47", "M4a1", "Aug A3","Scar H",
	"Sniper rifles","Dragonov","Ballista","Barrett M90", 
	"LMGs","LSAT","HMAR","RPK"],
		mtopicValue;
	makeLoadoutTypes();

	
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", saveLoadout);

});
