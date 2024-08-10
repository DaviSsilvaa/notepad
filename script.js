document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('saveBtn');
    const noteInput = document.getElementById('noteInput');
    const noteList = document.getElementById('noteList');

    // Função para carregar notas do localStorage
    function loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.forEach(note => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${note}
                <button class="delete">Apagar</button>
            `;
            noteList.appendChild(li);

            // Adiciona evento para apagar a nota
            li.querySelector('.delete').addEventListener('click', () => {
                removeNoteFromList(li);
            });
        });
    }

    // Função para salvar notas no localStorage
    function saveNoteToLocalStorage() {
        const notes = Array.from(noteList.children).map(li => li.firstChild.textContent.trim());
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Função para remover nota da lista e do localStorage
    function removeNoteFromList(li) {
        noteList.removeChild(li);
        saveNoteToLocalStorage();
    }

    // Carregar notas ao iniciar
    loadNotes();

    saveBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            const li = document.createElement('li');
            li.innerHTML = `
                ${noteText}
                <button class="delete">Apagar</button>
            `;
            noteList.appendChild(li);
            noteInput.value = '';

            // Adiciona evento para apagar a nota
            li.querySelector('.delete').addEventListener('click', () => {
                removeNoteFromList(li);
            });

            // Salvar nota no localStorage
            saveNoteToLocalStorage();
        }
    });
});
