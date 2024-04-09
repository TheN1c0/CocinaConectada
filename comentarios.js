// Array 
var comments = [
    { text: "¡Me encanta este sitio!", likes: 0, dislikes: 0 },
    { text: "La comida es deliciosa.", likes: 0, dislikes: 0 },
    { text: "No me gustó la atención al cliente.", likes: 0, dislikes: 0 }
];

// Función 
function displayComments() {
    var commentsHTML = "";
    comments.forEach(function(comment, index) {
        commentsHTML += "<div class='comment'>" + comment.text +
                        "<div class='comment-actions'>" +
                        "<span class='like-btn' onclick='likeComment(" + index + ")'>👍 (" + comment.likes + ")</span>" +
                        "<span class='dislike-btn' onclick='dislikeComment(" + index + ")'>👎 (" + comment.dislikes + ")</span>" +
                        "</div></div>";
    });
    document.getElementById("comments").innerHTML = commentsHTML;
}

//  nuevo comentario
function addComment() {
    var newCommentText = document.getElementById("new-comment").value;
    if (newCommentText.trim() !== "") {
        comments.push({ text: newCommentText, likes: 0, dislikes: 0 });
        displayComments();
        document.getElementById("new-comment").value = ""; // Limpiar el campo de texto
    } else {
        alert("Por favor escribe un comentario antes de agregarlo.");
    }
}


function likeComment(index) {
    comments[index].likes++;
    displayComments();
}


function dislikeComment(index) {
    comments[index].dislikes++;
    displayComments();
}


displayComments();