// Promises
const orderPizza = (pizzaName) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (pizzaName === 'DIAVOLA') {
                // Resolve est la méthode pour envoyer les informations qui seront utiliser dans un then ou await
                resolve('Here is your pizza'); 
            } else {
                // Resolve est la méthode pour envoyer les informations qui seront utiliser dans un catch
                reject('Its not my pizza');
            }
        }, 5000);
    });
}

console.log('Watching TV');
orderPizza('DIAVOLA')
    .then((res) => {
        console.log("Someone is at the door");
        console.log("Go to the door");
        console.log(res);
        // Si je souhaite chainer les then je peux envoyer, l'information du prochain then
        return 5.60;
    })
    .then((price) => {
        // price correspond à la valeur envoyé dans le return
        console.log("The pizza cost "+ price);
        // si je n'ai pas assez d'argent j'envoie une erreur qui sera récupérer dans le catch
        if (price > 0) {
            return Promise.reject("I have no money");
        }
        console.log("Ok");
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        // Finally est la méthode qui va se lancer dans tout les cas, que la promesse soit résolue ou rejetée
       console.log("closing the door");
    })
console.log("Talking to myself");

// Requête permettant d'aller récupérer les commentaires 
fetch('https://jsonplaceholder.typicode.com/coments')
    .then((res) => {
        // Si il y a eu un soucis lors de la requête je renvoie un message d'erreur que je récupère dans le catch
        if (!res.ok) {
            return Promise.reject({status: res.status, error: res.statusText});
        }
        // Je convertis les données reçu en JSON
        return res.json();
    })
    .then((comments) => {
        // Le return res.json() me fourni les données que je parcours
        $('#loading').hide();
            // Je boucle sur les commentaires 
            $.each(comments, (i, comment) => {
                $('#comments').append(`
                    <div>
                        <h3>Comment n° ${comment.id}</h3>
                        <p>${comment.body}</p>
                    </div>
                `)
            })
    })
    .catch(err => {
        // Rattrape l'erreur rejeter plus haut si la réponse n'est pas valide
        console.log(err);
    })

// ASYNC/AWAIT
async function getComments() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/comments');
        // Si la requête n'aboutis pas
        if (!res.ok) {
            // Envoie d'un message d'erreur, sous format string
            // throw new Error(JSON.stringify({ status: res.status, error: res.statusText}))
            // Plus simple
            throw { status: res.status, error: res.statusText}
        }
        const data = await res.json();
    } catch (error) {
        // Gestion de l'erreur faites plus haut
        // Conversion du string en object javascript
        // const jsonError = JSON.parse(error.message);
        if (error.status === 404) {
            console.log("Comments not found");
        }
    }
}

getComments();