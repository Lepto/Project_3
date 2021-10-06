// render dropdown
const dropdownElement = document.getElementById("state-dropdown");

// states
let states = [ 
    { name: 'OREGON', abbreviation: 'OR'},
    { name: 'FLORIDA', abbreviation: 'FL'},
    { name: 'OHIO', abbreviation: 'OH'},
    { name: 'MASSACHUSETTS', abbreviation: 'MA'},
    { name: 'TEXAS', abbreviation: 'TX'},
    { name: 'COLORADO', abbreviation: 'CO'},
    { name: 'GEORGIA', abbreviation: 'GA'},
    { name: 'WASHINGTON', abbreviation: 'WA'},
    { name: 'MINNESOTA', abbreviation: 'MN'},
    ]

// create dropdown item
// <option value="CA">Open this select menu</option>
states.forEach(function(state) {

    //create the dropdown items
    const optionElement = document.createElement("option");
    //add dropdown value (we will use for code)
    optionElement.value = state.abbreviation
    //create the text that user can read
    const node = document.createTextNode(state.name);
    optionElement.appendChild(node);

    // append to the dropdown select
    dropdownElement.appendChild(optionElement)  
})
