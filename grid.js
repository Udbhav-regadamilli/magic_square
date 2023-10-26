let possibleGrids = stringPermutations(9, "", "123456789".split(""), [])

/** This is a helper function to print the grid in human readable form.
 * @param {Array} some2dGrid a 2-d array which represents the magic square
 */
function printTheGrid(some2dGrid) {

	console.log("-------------")

	for (let i = 0; i < some2dGrid.length; i++) {
		let row = some2dGrid[i]
		let rowString = ""
		for (let j = 0; j < row.length; j++) {
			rowString += ("| " + row[j]	+ " ")
		}
		console.log(rowString + "|")
		if (i == (some2dGrid.length-1)) {
			console.log("-------------")
		} else {
			console.log("----+---+---")
		}
	}
}

/** This is a helper function stolen from 
 * "https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-136.php"
 * to generate permutations
 * @param {String} str 
 * @returns an array containing all permutations of the string
 */
function stringPermutations(length, choosenString, remainingString, result) {
	if (choosenString.length == length) {

        /*
         * if choosen string is same the desired length then we push the 
         * choosen string into the result array.
         */

        let current_solution = choosenString.join("")

        result.push(current_solution)

    }  else {

        /**
         * This loop iterates every possible outcome from the 
         * remainingString array elements.
         */

        for (let i=0; i < remainingString.length; i++) {
            
            /**
             * The new_chosen_string_array stores choosenString along with the new character.
             * 
             * The new_remaining_string_array stores remainingString after removing the 
             * character that is appended into new_chosen_string_array.
             */

            let new_chosen_string_array = [...choosenString, remainingString[i]]
            let new_remaining_string_array = [...remainingString]
            new_remaining_string_array.splice(i, 1)

            stringPermutations(length, new_chosen_string_array, new_remaining_string_array, result)
        }
    }
    return result
}

function generateRandomGrid() {

	if(possibleGrids.length == 0){
		possibleGrids = stringPermutations(9, "", "123456789".split(""), [])
	}
	let randomNumber = Math.floor(Math.random() * (9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1));

	let splitPermutation = possibleGrids[randomNumber].split("")

	let returnArray = []
	let count = 0
	for (let i = 0; i < 3; i++) {
		let newArray = []
		for (let j = 0; j < 3; j++) {
			newArray.push(Number(splitPermutation[count]))
			count++
		}
		returnArray.push(newArray)
	}

	return returnArray
}

function isMagicSquare(grid){

	let sum = 0, prev = -1;

	for(let i=0; i<grid.length; i++){
		sum += grid[i][i]
	}

	prev = sum;
	sum = 0;

	for(let i=grid.length-1; i>=0; i--){
		sum += grid[grid.length-1-i][i]
	}

	if(prev != sum){
		return false
	}

	prev = sum;
	sum = 0;

	for(let i=0; i<grid.length; i++){
		prev = sum;
		sum = 0;
		for(let j=0; j<grid[i].length; j++){
			sum += grid[j][i]
		}
		if(i != 0 && prev != sum){
			return false
		}
	}

	for(let i=0; i<grid.length; i++){
		prev = sum;
		sum = 0;
		for(let j=0; j<grid[i].length; j++){
			sum += grid[i][j]
		}
		if(i != 0 && prev != sum){
			return false
		}
	}

	return true
}

function testing(){

	while(true){
		let grid = generateRandomGrid()
		if(isMagicSquare(grid) == true){
			printTheGrid(grid)
			break
		}
	}
}

testing()