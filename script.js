let currentWorkout = null;
let workoutData = {
    "client": {
        "name": "Giulia Grisanti",
    },
    "style": {
        "theme": "light",
        "colors": {
            "primary": "#E91E63",
            "secondary": "#C2185B",
            "accent": "#FF80AB",
            "text": "#4A4A4A",
            "background": "#FFF5F7",
            "surface": "#FFFFFF",
            "error": "#F48FB1",
            "success": "#81C784"
        },
        "typography": {
            "fontFamily": "'Playfair Display', 'Cormorant Garamond', serif",
            "baseSize": "16px",
            "headingSize": "28px",
            "subheadingSize": "22px"
        },
        "spacing": {
            "small": "8px",
            "medium": "16px",
            "large": "24px"
        },
        "borderRadius": {
            "small": "6px",
            "medium": "12px",
            "large": "20px"
        }
    },
    "workouts": [
        {
            "id": "workout-a",
            "name": "💪 Dorso e Spalle",
            "description": "Allenamento per la parte superiore del corpo",
            "exercises": [
                {
                    "id": 1,
                    "name": "💪 Pulldown alla Lat machine",
                    "sets": 3,
                    "repetitions": 8,
                    "restTime": "⏱️ 60 secondi",
                    "notes": "📝 Mantenere la schiena dritta e controllare la fase eccentrica"
                },
                {
                    "id": 2,
                    "name": "💪 Rematore Bilanciere",
                    "sets": 3,
                    "repetitions": 8,
                    "restTime": "⏱️ 60 secondi",
                    "notes": "📝 Mantenere la schiena dritta e le spalle basse"
                },
                {
                    "id": 3,
                    "name": "💪 Pulley",
                    "sets": 3,
                    "repetitions": 8,
                    "restTime": "⏱️ 60 secondi",
                    "notes": "📝 Controllare il movimento e mantenere la postura corretta"
                },
                {
                    "id": 4,
                    "name": "💪 Rematore con manubrio",
                    "sets": 3,
                    "repetitions": 8,
                    "restTime": "⏱️ 60 secondi",
                    "notes": "📝 Mantenere il gomito vicino al corpo"
                },
                {
                    "id": 5,
                    "name": "💪 Military press",
                    "sets": 3,
                    "repetitions": 8,
                    "restTime": "⏱️ 60 secondi",
                    "notes": "📝 Mantenere il core attivo e controllare il movimento"
                },
                {
                    "id": 6,
                    "name": "💪 Alzate laterali con Cavi",
                    "sets": 3,
                    "repetitions": 8,
                    "restTime": "⏱️ 60 secondi",
                    "notes": "📝 3 serie per lato, mantenere il controllo del movimento"
                },
                {
                    "id": 7,
                    "name": "💪 Alzate con manubri con busto appoggiato su panca inclinata",
                    "sets": 3,
                    "repetitions": 8,
                    "restTime": "⏱️ 60 secondi",
                    "notes": "📝 Mantenere la postura corretta e controllare il movimento"
                },
                {
                    "id": 8,
                    "name": "💪 Tirate al mento (bilancere piccolo)",
                    "sets": 3,
                    "repetitions": 8,
                    "restTime": "⏱️ 60 secondi",
                    "notes": "📝 Mantenere i gomiti alti e controllare il movimento"
                }
            ]
        }
    ]
};

// Array di frasi motivazionali
const motivationalQuotes = [
    "💪 Ogni goccia di sudore è un passo verso il successo!",
    "🔥 La forza non viene dal corpo, ma dalla mente!",
    "🌟 Oggi hai superato i tuoi limiti, domani sarai più forte!",
    "⚡ Il progresso è fatto di piccoli passi, ma ogni passo conta!",
    "🏆 La disciplina è il ponte tra gli obiettivi e il successo!",
    "💫 Non smettere quando sei stanco, smetti quando hai finito!",
    "🔥 Il dolore che senti oggi è la forza che sentirai domani!",
    "🌟 Ogni ripetizione ti avvicina al tuo obiettivo!",
    "⚡ La tua determinazione è la tua arma più potente!",
    "💪 Non esiste limite a ciò che puoi raggiungere!",
    "🔥 Dove è Gesù? 🤔"
];

// Function to load workout data
function loadWorkoutData() {
    try {
        // Aggiorna il nome del cliente
        document.getElementById('client-name').textContent = workoutData.client.name;
        
        // Aggiorna la data di inizio
        const startDate = new Date(workoutData.client.startDate);
        const formattedDate = startDate.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
       
        
        // Applica gli stili
        applyStyles();
        
        console.log('Workout data:', workoutData);
        createWorkoutTabs();
    } catch (error) {
        console.error('Error loading workout data:', error);
        document.getElementById('workout-contents').innerHTML = '<div class="error">Errore nel caricamento dei workout</div>';
    }
}

// Function to create workout tabs
function createWorkoutTabs() {
    const tabsContainer = document.getElementById('workout-tabs');
    const contentsContainer = document.getElementById('workout-contents');
    
    console.log('Creating tabs for workouts:', workoutData.workouts); // Debug log
    
    // Clear existing content
    tabsContainer.innerHTML = '';
    contentsContainer.innerHTML = '';
    
    // Create tabs and content for each workout
    workoutData.workouts.forEach((workout, index) => {
        console.log('Creating tab for workout:', workout.name); // Debug log
        
        // Create tab button
        const tab = document.createElement('button');
        tab.className = 'tab';
        tab.textContent = workout.name;
        tab.onclick = () => switchWorkout(workout.id);
        
        // Create content container
        const content = document.createElement('div');
        content.id = `workout-${workout.id}`;
        content.className = 'workout-content';
        
        // Add description
        const description = document.createElement('div');
        description.className = 'workout-description';
        description.textContent = workout.description;
        content.appendChild(description);
        
        // Add photo section
        const photoSection = document.createElement('div');
        photoSection.className = 'photo-section';
        photoSection.innerHTML = `
            <h2>Tieni traccia dei tuoi progressi</h2>
            <div class="photo-container" id="photo-container-${workout.id}">
                <div class="photo-placeholder">
                    <p>+ Clicca per aggiungere foto</p>
                </div>
                <div class="photo-options">
                    <button onclick="capturePhoto('photo-input-${workout.id}')">Scatta</button>
                    <button onclick="uploadPhoto('photo-input-${workout.id}')">Carica</button>
                </div>
            </div>
            <input type="file" id="photo-input-${workout.id}" accept="image/*" capture="environment" class="hidden">
            
            <div class="photo-history">
                <h3>Cronologia Foto</h3>
                <div class="photo-gallery" id="photo-gallery-${workout.id}"></div>
            </div>
        `;
        content.appendChild(photoSection);
        
        // Add exercises container
        const exercisesContainer = document.createElement('div');
        exercisesContainer.id = `workout-container-${workout.id}`;
        content.appendChild(exercisesContainer);
        
        // Add tab and content to the page
        tabsContainer.appendChild(tab);
        contentsContainer.appendChild(content);
        
        console.log('Tab created:', tab); // Debug log
        
        // Add event listener for photo input
        const photoInput = document.getElementById(`photo-input-${workout.id}`);
        photoInput.addEventListener('change', (event) => {
            handlePhotoInput(event, `photo-container-${workout.id}`, workout.id);
        });
    });
    
    // Activate first tab by default
    if (workoutData.workouts.length > 0) {
        console.log('Activating first tab'); // Debug log
        switchWorkout(workoutData.workouts[0].id);
    }
}

// Function to switch between workouts
function switchWorkout(workoutId) {
    // Update tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Find the correct tab index
    const tabIndex = workoutData.workouts.findIndex(w => w.id === workoutId);
    if (tabIndex !== -1) {
        document.querySelectorAll('.tab')[tabIndex].classList.add('active');
    }
    
    // Update contents
    document.querySelectorAll('.workout-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`workout-${workoutId}`).classList.add('active');
    
    // Load workout data
    currentWorkout = workoutData.workouts.find(w => w.id === workoutId);
    loadWorkoutExercises(workoutId);
    loadWorkoutPhoto(workoutId);
}

// Function to load workout exercises
function loadWorkoutExercises(workoutId) {
    const container = document.getElementById(`workout-container-${workoutId}`);
    const workout = workoutData.workouts.find(w => w.id === workoutId);
    
    container.innerHTML = '';
    
    workout.exercises.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.className = 'exercise';
        exerciseElement.id = `exercise-${exercise.id}`;
        
        // Controlla se l'esercizio è stato completato oggi
        const history = JSON.parse(localStorage.getItem(`exercise-${exercise.id}`) || '[]');
        const today = new Date().toLocaleDateString('it-IT');
        const isCompletedToday = history.some(entry => entry.date === today);
        
        if (isCompletedToday) {
            exerciseElement.classList.add('completed-today');
        }
        
        exerciseElement.innerHTML = `
            <div class="exercise-header">
                <h2>${exercise.name}</h2>
            </div>
            <div class="exercise-photo" id="exercise-photo-${exercise.id}">
                <div class="photo-placeholder">
                    <p>+ Clicca per aggiungere foto dell'esercizio</p>
                </div>
                <div class="photo-options">
                    <button onclick="capturePhoto('exercise-photo-input-${exercise.id}')">Scatta</button>
                    <button onclick="uploadPhoto('exercise-photo-input-${exercise.id}')">Carica</button>
                </div>
            </div>
            <input type="file" id="exercise-photo-input-${exercise.id}" accept="image/*" capture="environment" class="hidden">
            <div class="exercise-info">
                <div class="info-card">
                    <strong>Serie:</strong> ${exercise.sets}
                </div>
                <div class="info-card">
                    <strong>Ripetizioni:</strong> ${exercise.repetitions}
                </div>
                <div class="info-card">
                    <strong>Tempo di recupero:</strong> ${exercise.restTime}
                </div>
                <div class="info-card">
                    <strong>Note:</strong> ${exercise.notes}
                </div>
            </div>
            <div class="tracking-form">
                <h3>Registra il tuo allenamento</h3>
                <div class="form-group">
                    <input type="number" id="weight-${exercise.id}" placeholder="Peso (kg)" min="0" step="0.5">
                    <input type="number" id="reps-${exercise.id}" placeholder="Ripetizioni" min="0">
                    <button onclick="saveExerciseData(${exercise.id})">Salva</button>
                </div>
            </div>
            <div class="history" id="history-${exercise.id}">
                <h3>Storico</h3>
                <ul class="history-list"></ul>
            </div>
            
        `;
        
        container.appendChild(exerciseElement);
        
        // Carica la foto dell'esercizio se esiste
        loadExercisePhoto(exercise.id);
        
        // Carica lo storico
        loadExerciseHistory(exercise.id);
        
        // Aggiungi event listener per il caricamento della foto dell'esercizio
        const exercisePhotoInput = document.getElementById(`exercise-photo-input-${exercise.id}`);
        exercisePhotoInput.addEventListener('change', (event) => {
            handleExercisePhotoUpload(event, exercise.id);
        });
    });
}

// Function to handle photo input
function handlePhotoInput(event, containerId, workoutId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const container = document.getElementById(containerId);
            container.innerHTML = `
                <img src="${e.target.result}" alt="Foto allenamento">
                <div class="photo-options">
                    <button onclick="capturePhoto('${event.target.id}')">Scatta</button>
                    <button onclick="uploadPhoto('${event.target.id}')">Carica</button>
                </div>
            `;
            
            // Save photo to localStorage with current date and workout ID
            const currentDate = new Date().toISOString().split('T')[0];
            const workoutPhotos = JSON.parse(localStorage.getItem(`workout-photos-${workoutId}`) || '[]');
            
            workoutPhotos.push({
                date: currentDate,
                photo: e.target.result,
                comment: ''
            });
            
            localStorage.setItem(`workout-photos-${workoutId}`, JSON.stringify(workoutPhotos));
            
            // Update photo gallery
            updatePhotoGallery(workoutId);
        };
        reader.readAsDataURL(file);
    }
}

// Function to update photo gallery
function updatePhotoGallery(workoutId) {
    const workoutPhotos = JSON.parse(localStorage.getItem(`workout-photos-${workoutId}`) || '[]');
    const gallery = document.getElementById(`photo-gallery-${workoutId}`);
    
    workoutPhotos.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    gallery.innerHTML = '';
    
    workoutPhotos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <img src="${photo.photo}" alt="Foto allenamento ${photo.date}">
            <div class="photo-date">${formatDate(photo.date)}</div>
            <div class="photo-comment">${photo.comment || ''}</div>
            <div class="photo-actions">
                <button onclick="deletePhoto(${index}, '${workoutId}')" class="delete-btn">Elimina</button>
                <button onclick="editComment(${index}, '${workoutId}')" class="comment-btn">Commenta</button>
            </div>
        `;
        
        photoItem.querySelector('img').addEventListener('click', () => {
            showPhotoInModal(photo.photo, photo.comment);
        });
        
        gallery.appendChild(photoItem);
    });
}

// Function to load workout photo
function loadWorkoutPhoto(workoutId) {
    const workoutPhotos = JSON.parse(localStorage.getItem(`workout-photos-${workoutId}`) || '[]');
    const currentDate = new Date().toISOString().split('T')[0];
    
    const todayPhoto = workoutPhotos.find(photo => photo.date === currentDate);
    const photoContainer = document.getElementById(`photo-container-${workoutId}`);
    
    if (todayPhoto) {
        photoContainer.innerHTML = `
            <img src="${todayPhoto.photo}" alt="Foto allenamento">
            <div class="photo-options">
                <button onclick="capturePhoto('photo-input-${workoutId}')">Scatta</button>
                <button onclick="uploadPhoto('photo-input-${workoutId}')">Carica</button>
            </div>
        `;
    } else {
        photoContainer.innerHTML = `
            <div class="photo-placeholder">
                <p>+ Clicca per aggiungere foto</p>
            </div>
            <div class="photo-options">
                <button onclick="capturePhoto('photo-input-${workoutId}')">Scatta</button>
                <button onclick="uploadPhoto('photo-input-${workoutId}')">Carica</button>
            </div>
        `;
    }
    
    updatePhotoGallery(workoutId);
}

// Function to delete photo
function deletePhoto(index, workoutId) {
    if (confirm('Sei sicuro di voler eliminare questa foto?')) {
        const workoutPhotos = JSON.parse(localStorage.getItem(`workout-photos-${workoutId}`) || '[]');
        workoutPhotos.splice(index, 1);
        localStorage.setItem(`workout-photos-${workoutId}`, JSON.stringify(workoutPhotos));
        updatePhotoGallery(workoutId);
        loadWorkoutPhoto(workoutId);
    }
}

// Function to edit comment
function editComment(index, workoutId) {
    const workoutPhotos = JSON.parse(localStorage.getItem(`workout-photos-${workoutId}`) || '[]');
    const photo = workoutPhotos[index];
    const comment = prompt('Inserisci un commento per questa foto:', photo.comment || '');
    
    if (comment !== null) {
        photo.comment = comment;
        localStorage.setItem(`workout-photos-${workoutId}`, JSON.stringify(workoutPhotos));
        updatePhotoGallery(workoutId);
    }
}

// Function to show photo in modal
function showPhotoInModal(photoSrc, comment) {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-photo');
    const modalComment = document.getElementById('modal-comment');
    
    modalImg.src = photoSrc;
    modalComment.textContent = comment || '';
    modal.classList.add('show-modal');
}

// Function to close photo modal
function closePhotoModal() {
    const modal = document.getElementById('photo-modal');
    modal.classList.remove('show-modal');
}

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Function to capture photo
function capturePhoto(inputId) {
    const input = document.getElementById(inputId);
    input.setAttribute('capture', 'environment');
    input.click();
}

// Function to upload photo
function uploadPhoto(inputId) {
    const input = document.getElementById(inputId);
    input.removeAttribute('capture');
    input.click();
}

// Function to load exercise photo
function loadExercisePhoto(exerciseId) {
    const exercisePhotos = JSON.parse(localStorage.getItem('exercisePhotos') || '{}');
    const photoData = exercisePhotos[exerciseId];
    if (photoData) {
        const exercisePhoto = document.querySelector(`#exercise-photo-${exerciseId}`);
        if (exercisePhoto) {
            exercisePhoto.innerHTML = `
                <img src="${photoData}" alt="Foto esercizio">
                <div class="photo-options">
                    <button onclick="capturePhoto('exercise-photo-input-${exerciseId}')">Scatta</button>
                    <button onclick="uploadPhoto('exercise-photo-input-${exerciseId}')">Carica</button>
                </div>
            `;
        }
    }
}

// Funzione per gestire il caricamento delle foto degli esercizi
function handleExercisePhotoUpload(event, exerciseId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const exercisePhoto = document.querySelector(`#exercise-photo-${exerciseId}`);
            if (exercisePhoto) {
                exercisePhoto.innerHTML = `
                    <img src="${e.target.result}" alt="Foto esercizio">
                    <div class="photo-options">
                        <button onclick="capturePhoto('exercise-photo-input-${exerciseId}')">Scatta</button>
                        <button onclick="uploadPhoto('exercise-photo-input-${exerciseId}')">Carica</button>
                    </div>
                `;
            }
            // Salva la foto dell'esercizio separatamente
            saveExercisePhoto(exerciseId, e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Funzione per salvare la foto dell'esercizio
function saveExercisePhoto(exerciseId, photoData) {
    const exercisePhotos = JSON.parse(localStorage.getItem('exercisePhotos') || '{}');
    exercisePhotos[exerciseId] = photoData;
    localStorage.setItem('exercisePhotos', JSON.stringify(exercisePhotos));
}

// Funzione per gestire il caricamento delle foto di progresso
function handleProgressPhotoUpload(event, exerciseId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const comment = prompt("Inserisci un commento per questa foto di progresso:");
            if (comment !== null) {
                const photoData = {
                    url: e.target.result,
                    date: new Date().toISOString(),
                    comment: comment
                };
                saveProgressPhoto(exerciseId, photoData);
                updateProgressPhotoGallery(exerciseId);
            }
        };
        reader.readAsDataURL(file);
    }
}

// Funzione per salvare la foto di progresso
function saveProgressPhoto(exerciseId, photoData) {
    const progressPhotos = JSON.parse(localStorage.getItem('progressPhotos') || '{}');
    if (!progressPhotos[exerciseId]) {
        progressPhotos[exerciseId] = [];
    }
    progressPhotos[exerciseId].push(photoData);
    localStorage.setItem('progressPhotos', JSON.stringify(progressPhotos));
}

// Funzione per aggiornare la galleria delle foto di progresso
function updateProgressPhotoGallery(exerciseId) {
    const progressPhotos = JSON.parse(localStorage.getItem('progressPhotos') || '{}');
    const photos = progressPhotos[exerciseId] || [];
    const gallery = document.querySelector(`#progress-gallery-${exerciseId}`);
    
    if (gallery) {
        gallery.innerHTML = photos.map((photo, index) => `
            <div class="photo-item">
                <img src="${photo.url}" alt="Foto progresso" onclick="showPhotoModal('${photo.url}', '${photo.comment}')">
                <div class="photo-date">${new Date(photo.date).toLocaleDateString()}</div>
                <div class="photo-comment">${photo.comment}</div>
                <div class="photo-actions">
                    <button onclick="deleteProgressPhoto('${exerciseId}', ${index})">Elimina</button>
                </div>
            </div>
        `).join('');
    }
}

// Funzione per eliminare una foto di progresso
function deleteProgressPhoto(exerciseId, index) {
    const progressPhotos = JSON.parse(localStorage.getItem('progressPhotos') || '{}');
    if (progressPhotos[exerciseId]) {
        progressPhotos[exerciseId].splice(index, 1);
        localStorage.setItem('progressPhotos', JSON.stringify(progressPhotos));
        updateProgressPhotoGallery(exerciseId);
    }
}

// Funzione per mostrare una notifica motivazionale
function showMotivationalNotification() {
    const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    
    // Rimuovi eventuali notifiche precedenti
    const existingNotification = document.querySelector('.motivational-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'motivational-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <p>${quote}</p>
        </div>
    `;
    
    // Aggiungi la notifica direttamente al body
    document.body.appendChild(notification);
    
    // Forza il reflow per assicurare che l'animazione funzioni
    notification.offsetHeight;
    
    // Animazione di entrata
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Rimuovi la notifica dopo 3 secondi
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Funzione per salvare i dati dell'esercizio
function saveExerciseData(exerciseId) {
    const weight = document.getElementById(`weight-${exerciseId}`).value;
    const reps = document.getElementById(`reps-${exerciseId}`).value;
    
    if (!weight || !reps) {
        alert('Per favore, inserisci sia il peso che le ripetizioni');
        return;
    }
    
    const exerciseData = {
        date: new Date().toLocaleDateString('it-IT'),
        time: new Date().toLocaleTimeString('it-IT'),
        weight: parseFloat(weight),
        reps: parseInt(reps)
    };
    
    let history = JSON.parse(localStorage.getItem(`exercise-${exerciseId}`)) || [];
    history.push(exerciseData);
    localStorage.setItem(`exercise-${exerciseId}`, JSON.stringify(history));
    
    // Aggiorna lo stato dell'esercizio
    const exerciseElement = document.querySelector(`#workout-container-${currentWorkout.id} .exercise:nth-child(${exerciseId})`);
    if (exerciseElement) {
        exerciseElement.classList.add('completed-today');
    }
    
    loadExerciseHistory(exerciseId);
    
    document.getElementById(`weight-${exerciseId}`).value = '';
    document.getElementById(`reps-${exerciseId}`).value = '';
    
    // Mostra la notifica motivazionale
    showMotivationalNotification();
}

// Function to load exercise history
function loadExerciseHistory(exerciseId) {
    const historyContainer = document.getElementById(`history-${exerciseId}`);
    const historyList = historyContainer.querySelector('.history-list');
    const history = JSON.parse(localStorage.getItem(`exercise-${exerciseId}`)) || [];
    
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<li>Nessun dato registrato</li>';
    } else {
        history.forEach(entry => {
            const listItem = document.createElement('li');
            listItem.className = 'history-item';
            listItem.innerHTML = `
                <span>${entry.date} ${entry.time}</span>
                <span>Peso: ${entry.weight}kg - Ripetizioni: ${entry.reps}</span>
            `;
            historyList.appendChild(listItem);
        });
    }
    
    const progressBar = historyContainer.closest('.exercise').querySelector('.progress');
    const totalSets = parseInt(historyContainer.closest('.exercise').querySelector('.info-card').textContent.match(/\d+/)[0]);
    const completedSets = history.length;
    const progress = (completedSets / totalSets) * 100;

}

// Function to add data management buttons
function addDataManagementButtons() {
    const header = document.querySelector('.header');
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'data-management';
    buttonsContainer.style.marginTop = '10px';
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.flexDirection = 'column';
    buttonsContainer.style.gap = '10px';
    
    // Export button
    const exportButton = document.createElement('button');
    exportButton.textContent = '📥 Esporta Dati';
    exportButton.onclick = saveWorkoutData;
    exportButton.style.padding = '12px 20px';
    exportButton.style.fontSize = '16px';
    
    // Import button and input
    const importButton = document.createElement('button');
    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = '.json';
    importInput.style.display = 'none';
    importInput.onchange = (e) => {
        if (e.target.files.length > 0) {
            loadWorkoutDataFromFile(e.target.files[0]);
        }
    };
    
    importButton.textContent = '📤 Importa Dati';
    importButton.style.padding = '12px 20px';
    importButton.style.fontSize = '16px';
    importButton.onclick = () => importInput.click();
    
    // Add buttons to container
    buttonsContainer.appendChild(exportButton);
    buttonsContainer.appendChild(importInput);
    buttonsContainer.appendChild(importButton);
    
    // Add container to header
    header.appendChild(buttonsContainer);
}

// Function to save workout data to JSON file
function saveWorkoutData() {
    const data = {
        workouts: workoutData.workouts,
        exercisePhotos: JSON.parse(localStorage.getItem('exercisePhotos') || '{}'),
        exerciseHistory: {},
        workoutPhotos: {}
    };

    // Salva le foto dei workout
    workoutData.workouts.forEach(workout => {
        const photos = localStorage.getItem(`workout-photos-${workout.id}`);
        if (photos) {
            data.workoutPhotos[workout.id] = JSON.parse(photos);
        }
    });

    // Salva anche la cronologia degli esercizi
    workoutData.workouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
            const history = JSON.parse(localStorage.getItem(`exercise-${exercise.id}`) || '[]');
            if (history.length > 0) {
                data.exerciseHistory[`exercise-${exercise.id}`] = history;
            }
        });
    });
    
    console.log('Saving workout data:', data);
    
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workout_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to load workout data from file
function loadWorkoutDataFromFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            console.log('Loading workout data:', data);
            
            // Aggiorna i workout
            workoutData.workouts = data.workouts;
            
            // Salva le foto degli esercizi
            if (data.exercisePhotos) {
                localStorage.setItem('exercisePhotos', JSON.stringify(data.exercisePhotos));
            }

            // Salva le foto dei workout
            if (data.workoutPhotos) {
                Object.entries(data.workoutPhotos).forEach(([workoutId, photos]) => {
                    localStorage.setItem(`workout-photos-${workoutId}`, JSON.stringify(photos));
                });
            }

            // Salva la cronologia degli esercizi
            if (data.exerciseHistory) {
                Object.entries(data.exerciseHistory).forEach(([key, value]) => {
                    localStorage.setItem(key, JSON.stringify(value));
                });
            }
            
            // Ricarica l'interfaccia
            loadWorkoutData();
            
            // Mostra un messaggio di successo
            const notification = document.createElement('div');
            notification.className = 'motivational-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <p>✅ Dati caricati con successo!</p>
                </div>
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 3000);
        } catch (error) {
            console.error('Errore nel caricamento dei dati:', error);
            alert('Errore nel caricamento dei dati. Il file potrebbe essere corrotto.');
        }
    };
    reader.readAsText(file);
}

// Funzione per resettare la configurazione del workout
function resetWorkout() {
    if (confirm('Sei sicuro di voler resettare la configurazione? Tutti i dati verranno eliminati.')) {


        // Pulisci il localStorage
        localStorage.clear();

        // Ricarica l'interfaccia
        loadWorkoutData();

        // Mostra un messaggio di conferma
        const notification = document.createElement('div');
        notification.className = 'motivational-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <p>✅ Configurazione resettata con successo!</p>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
}

// Funzione per applicare gli stili
function applyStyles() {
    const style = workoutData.style;
    const root = document.documentElement;

    // Applica i colori
    root.style.setProperty('--primary-color', style.colors.primary);
    root.style.setProperty('--secondary-color', style.colors.secondary);
    root.style.setProperty('--accent-color', style.colors.accent);
    root.style.setProperty('--text-color', style.colors.text);
    root.style.setProperty('--light-gray', style.colors.background);
    root.style.setProperty('--white', style.colors.surface);

    // Applica la tipografia
    root.style.setProperty('--font-family', style.typography.fontFamily);
    root.style.setProperty('--base-size', style.typography.baseSize);
    root.style.setProperty('--heading-size', style.typography.headingSize);
    root.style.setProperty('--subheading-size', style.typography.subheadingSize);

    // Applica lo spacing
    root.style.setProperty('--spacing-small', style.spacing.small);
    root.style.setProperty('--spacing-medium', style.spacing.medium);
    root.style.setProperty('--spacing-large', style.spacing.large);

    // Applica i border radius
    root.style.setProperty('--border-radius-small', style.borderRadius.small);
    root.style.setProperty('--border-radius-medium', style.borderRadius.medium);
    root.style.setProperty('--border-radius-large', style.borderRadius.large);

    // Applica il tema
    document.body.className = style.theme;
}

// Funzione per cambiare tema
function toggleTheme() {
    workoutData.style.theme = workoutData.style.theme === 'light' ? 'dark' : 'light';
    
    if (workoutData.style.theme === 'dark') {
        workoutData.style.colors = {
            "primary": "#90CAF9",
            "secondary": "#64B5F6",
            "accent": "#FFD54F",
            "text": "#FFFFFF",
            "background": "#121212",
            "surface": "#1E1E1E",
            "error": "#EF5350",
            "success": "#66BB6A"
        };
    } else {
        workoutData.style.colors = {
            "primary": "#2196F3",
            "secondary": "#1976D2",
            "accent": "#FFC107",
            "text": "#333333",
            "background": "#f5f5f5",
            "surface": "#ffffff",
            "error": "#f44336",
            "success": "#4CAF50"
        };
    }
    
    applyStyles();
    saveWorkoutData();
}

// Funzione per mostrare/nascondere il menu di gestione dati
function toggleDataManagement(event) {
    if (event) {
        event.stopPropagation();
    }
    
    const menu = document.getElementById('data-management');
    const isVisible = menu.classList.contains('show');
    
    // Chiudi tutti i menu aperti
    document.querySelectorAll('.data-management.show').forEach(m => {
        m.classList.remove('show');
    });
    
    // Se il menu non era visibile, mostralo
    if (!isVisible) {
        menu.classList.add('show');
        
        // Chiudi il menu quando si clicca fuori
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target) && !e.target.classList.contains('gear-button')) {
                    menu.classList.remove('show');
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 0);
    }
}

// Chiudi il menu quando si clicca su un pulsante del menu
document.addEventListener('DOMContentLoaded', () => {
    const menuButtons = document.querySelectorAll('.data-management button');
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            setTimeout(() => {
                document.getElementById('data-management').classList.remove('show');
            }, 100);
        });
    });
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadWorkoutData();
    addDataManagementButtons();
    
    // Close modal when clicking outside the image
    document.getElementById('photo-modal').addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
            closePhotoModal();
        }
    });
}); 