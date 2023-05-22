// Ajout d'une ligne dans registre + prépa de la BDD
const btnAddLine = document.getElementById('btnSaveLigne');

btnAddLine.addEventListener('click', function () {
    // On récupère les valeurs des inputs de ma modale ajout ligne dans le registre
    const dateValue = document.getElementById('dateLigne');
    const montantValue = document.getElementById('montantLigne');
    const infoValue = document.getElementById('infoLigne');

    //préparer l'objet pour l'insertion dans la BDD
    const _myrec = {
        date: dateValue.value,
        montant: montantValue.value,
        info: infoValue.value,
    };
    ipc.send('addLigneToDb', _myrec);
});

// signifie en jquery que lorsque le document est prêt, on lance la fonction
$(() => {
    loadTableLines();
});

// Chargement de la table des lignes du registre
const loadTableLines = () => {
    // charger la BDD
    const dataStore = require('nedb');
    const db = new dataStore({ filename: 'data.db', autoload: true });

    // récupérer les données de la BDD
    db.find({}, (err, docs) => {
        console.log('docs =', docs);

        const tableRegistre = document.getElementById('tableRegistre');
        const tableRows = tableRegistre.querySelectorAll('thead > tr');

        // boucle sur les lignes de la table pour les supprimer
        tableRows.forEach((el, i) => {
            if (i > 0) {
                el.parentNode.removeChild(el);
            }
        });

        // boucle sur les données de la BDD pour les afficher dans la table
        docs.forEach((el) => {
            // création d'une ligne
            const row = tableRegistre.insertRow(1);

            // création des cellules
            const cellDate = row.insertCell(0);
            const cellMontant = row.insertCell(1);
            const cellInfo = row.insertCell(2);
            const cellActions = row.insertCell(3);

            //Injecter les données dans les cellules
            cellDate.innerHTML = el.date;
            cellMontant.innerHTML = el.montant;
            cellInfo.innerHTML = el.info;
            cellActions.innerHTML = `<button id="${el._id}" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>`;
            // Gestion des btns d'actions
            const btnDelete = document.getElementById(el._id);
            btnDelete.addEventListener('click', () => {
                db.remove({ _id: el._id }, {}, (err, numRemoved) => {
                    if (err) {
                        console.log('erreur =', err);
                        return;
                    }
                    console.log('numRemoved =', numRemoved);
                });
            });
        });
    });
};
