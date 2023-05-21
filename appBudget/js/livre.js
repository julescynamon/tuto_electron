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
});
