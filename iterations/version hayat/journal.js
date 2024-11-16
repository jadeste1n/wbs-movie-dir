



window.addEventListener('load', () => {
    const favoriteList = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites-list');
    favoritesContainer.innerHTML = '';

    favoriteList.forEach(favorite => {
        const favoriteCard = createFavoriteCard(favorite);
        favoritesContainer.appendChild(favoriteCard);
    });
});




function createFavoriteCard(favorite) {
    const card = document.createElement('div');
    card.className = 'bg-white shadow-md rounded-lg overflow-hidden mb-4';

    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/original/${favorite.poster_path}`;
    image.alt = favorite.original_title;
    image.className = 'w-full h-48 object-cover';

    const cardBody = document.createElement('div');
    cardBody.className = 'p-6';
    cardBody.innerHTML = `
        <h2 class="text-lg font-semibold truncate">${favorite.original_title}</h2>
        <div class="flex items-center text-sm text-gray-600">
            <i class="fa-solid fa-star text-yellow-500 pr-2"></i> ${favorite.vote_average || 'N/A'}
            <span class="pl-2 text-gray-600">(${favorite.vote_count || 0} votes)</span>
        </div>
        <div class="mt-2">
            <p><strong>Note:</strong> ${favorite.note || 'No notes added yet.'}</p>
            <textarea id="note-input-${favorite.id}" 
                      class="mt-2 w-full border-gray-300 rounded-md p-2" 
                      placeholder="Add a note...">${favorite.note || ''}</textarea>
            <button onclick='saveNoteForFavorite(${JSON.stringify(favorite).replace(/'/g, "&apos;")})' 
                    class="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600">
                Save Note
            </button>
        </div>
    `;

    card.append(image, cardBody);
    return card;
}


window.saveNoteForFavorite = function(favorite) {
    const noteInput = document.getElementById(`note-input-${favorite.id}`);
    const note = noteInput.value.trim();

    if (note) {
        let favoriteList = JSON.parse(localStorage.getItem('favorites')) || [];
        favoriteList = favoriteList.map(fav => {
            if (fav.id === favorite.id) {
                return { ...fav, note };
            }
            return fav;
        });

        localStorage.setItem('favorites', JSON.stringify(favoriteList));
        alert('Note saved!');
        location.reload();
    } else {
        alert('Please enter a note!');
    }
};