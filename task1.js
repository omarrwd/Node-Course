// data mocking
const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "omar Doe" },
  { id: 3, name: "ahmed Doe" },
];
const tasks = [
  { userId: 1, task: "Write code" },
  { userId: 1, task: "Review PRs" },
  { userId: 2, task: "read code" },
  { userId: 2, task: "make PRs" },
  { userId: 3, task: "delete code" },
  { userId: 3, task: "delete PRs" },

];


// Implementation with Callbacks
function fetchUser(userId, callback) {
    setTimeout(() => {
        const user = users.find(user => user.id === userId);
        if (user) {
            callback(null, user);
        } else {
            callback("User not found", null);
        }
    }, 1000);
}

function fetchTasks(userId, callback) {
    setTimeout(() => {
        const userTasks = tasks.filter(task => task.userId === userId);
        if (userTasks.length > 0) {
            callback(null, userTasks);
        } else {
            callback("No tasks found for user", null);
        }
    }, 2000);
}

fetchUser(1, (err, user) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log(" callback User:", user);
        fetchTasks(user.id, (err, userTasks) => {
            if (err) {
                console.error("Error:", err);
            } else {
                console.log("Tasks:", userTasks);
            }
        });
    }
});

////////////////////////////////////////////////////////////////////////////////////////

// Implementation with Promises
function fetchUserPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(user => user.id === userId);
            if (user) {
                resolve(user);
            } else {
                reject("User not found");
            }
        }, 1000);
    });
}

function fetchTasksPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userTasks = tasks.filter(task => task.userId === userId);
            if (userTasks.length > 0) {
                resolve(userTasks);
            } else {
                reject("No tasks found for user");
            }
        }, 1000);
    });
}

fetchUserPromise(2)
    .then(user => {
        console.log("promise User:", user);
        return  fetchTasksPromise(user.id);
    })
    .then(userTasks => {
        console.log("Tasks:", userTasks);
    })
    .catch(err => {
        console.error("Error:", err);
    });
///////////////////////////////////////////////////////////////////////////
// Implementation with Async/Await
async function getUserAndTasks(userId) {
    try {
        const user = await fetchUserPromise(userId);
        console.log("await async  User:", user);
        const userTasks = await fetchTasksPromise(user.id);
        console.log("Tasks:", userTasks);
    } catch (err) {
        console.error("Error:", err);
    }
}

getUserAndTasks(3);
