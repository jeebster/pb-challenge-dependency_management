// Logical approach:

// 1. Initialize empty array to contain ordered tasks
// 2. Loop through chosen tasks
//   a. Find task object via 'depends' identifiers (array of strings)
//   b. If task has dependencies, recursively...
//     * Loop through each dependency in the 'depends' array
//       * Add dependency to ordered array (if no subsequent dependencies), or
//       * Continue the recursive loop

const determineOrder = (tasksList, chosenTasks) => {
  let orderedTasks = []

  chosenTasks.forEach((chosenTaskObj) => {
    console.log(chosenTaskObj)
    const targetTaskObj = tasksList.find(obj => obj.task === chosenTaskObj.task)
    console.log(targetTaskObj)
    if (targetTaskObj) {
      // match found
      // check dependencies
      console.log(`Checking dependencies for Task: ${targetTaskObj.task}...`)
      recursivelyCheckDependencies(orderedTasks, tasksList, targetTaskObj)
    }
  })

  // if there are no dependencies for any tasks, return the original set
  if (orderedTasks.length > 0) {
    return orderedTasks
  } else {
    return chosenTasks
  }
}

const recursivelyCheckDependencies = (orderedTasks, tasksList, taskObject) => {
  const targetTaskObj = tasksList.find(obj => obj.task === taskObject.task)
  if (targetTaskObj.depends.len > 0) {
    // subsequent dependencies detected
    // iterate through subsequent collection
    // re-run the dependency-ordering conditional
    console.log(`Dependencies: ${targetTaskObj.depends} found for Task: ${targetTaskObj.task}`)
    recursivelyCheckDependencies(orderedTasks, tasksList, targetTaskObj)
  } else {
    // there are no dependencies so this is the higest ranked task for ordering
    // to prevent duplicates, only add to the array if item does not exist (identified by task string)
    const exists = orderedTasks.find(obj => obj.task === childTargetTaskObj.task)

    if (!exists) {
      console.log(`Apppending Task ${targetTaskObj.task} to Ordered Tasks List: ${orderedTasks}`)
      orderedTasks.concat(targetTaskObj.task)
    }
  }
}

const exampleTasks = [
  {
    task: "make a sandwich",
    depends: ["buy groceries"]
  },
  {
    task: "buy groceries",
    depends: ["go to the store"]
  },
  {
    task: "go to the store",
    depends: []
  }
]

console.log(determineOrder(exampleTasks, ["make a sandwich"]))