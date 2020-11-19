const countryLookupButton = document.querySelector("#country_lookup");
const cityLookupButton = document.querySelector("#city_lookup");
const lookupResult = document.querySelector("#country");
const resDiv = document.querySelector("#result");

const countryHeading = {
	tableHeading : ["Name", "Continent", "Independence", "Head of State"],
	databaseName : ["name", "continent", "independence_year", "head_of_state"]
};

const cityHeading  = {
	tableHeading : ["Name", "District", "Population"],
	databaseName : ["name", "district", "population"]
}


 window.addEventListener("load", () => {
	
	ajaxCall("", "countries");
	
	countryLookupButton.addEventListener("click", () => ajaxCall(lookupResult.value, "countries"));
	cityLookupButton.addEventListener("click", () => ajaxCall(lookupResult.value, "cities"));
	
 });

function ajaxCall(getRequest, context){
	fetch(`world.php?countryName=${getRequest}&context=${context}`)	
		.then(response => response.json())
		.then(data => {
			if(data.length > 0){
				switch(context){
					case "countries":
						showResults(data,countryHeading);
						break;
					case "cities": 
						showResults(data,cityHeading);
						break;
					default: 
						resNotFound();
				}
			}else{
				resNotFound();	
			}
		})
		.catch(err => console.log(err));
}


function showResults(data, tableHeading){

	const resTable = createEmptyTable(tableHeading.tableHeading); 	
	const resTableBody = document.createElement("tbody");

	for(let j = 0; j < data.length; j++){
		currentRow = newRow(tableHeading.databaseName.map(x => data[j][x]));
		resTableBody.appendChild(currentRow);		
	}

	resTable.appendChild(resTableBody);
	resDiv.innerHTML = "";
	resDiv.appendChild(resTable);
}

function newRow(rowValues){
	const row = document.createElement("tr");
	
	for(let j = 0; j < rowValues.length; j++){
		const columnVal = document.createElement("td");
		columnVal.appendChild(document.createTextNode(rowValues[j]));
		row.appendChild(columnVal);
	}

	
	return row
}


function createEmptyTable(headerValues){
	const newTable = document.createElement("table");
	const header = document.createElement("thead");

	for(let j = 0; j < headerValues.length; j++){
		headerField = document.createElement("th");
		headerField.appendChild(document.createTextNode(headerValues[j]));
		header.appendChild(headerField);
	}

	newTable.appendChild(header);

	
	return newTable;
}

function resNotFound(){
	resDiv.innerHTML = "No Results";
}
