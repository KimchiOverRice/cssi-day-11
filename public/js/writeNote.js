let googleUser = null
window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if(user){

            // code runs if user is logged in
            console.log("logged in as", user.displayName)
            googleUser = user
        }else{

            //code runs if user is not logged in
            console.log("not logged in")

        }
    })

    const createNoteButton = document.querySelector("#createNoteBtn")
   createNoteButton.addEventListener("click", () =>{

        // get values from the form
       const noteTitle = document.querySelector("#noteTitle").value
       const noteText = document.querySelector("#noteText").value
       console.log(noteTitle, noteText)

       // write values to the database
       firebase.database().ref(`/users/${googleUser.uid}`).push({
            title: noteTitle,
            text: noteText
       }).then(() => {
        console.log("database write successful")
        document.querySelector("#noteTitle").value=""
        document.querySelector("#noteText").value = ""
        })
       .catch(error => {
           console.log("error with writing new note:", error)
       })
   })
}