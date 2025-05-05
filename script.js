let currentWorkout = null;
let workoutData = {
    "workouts": [
        {
            "id": "workout-a",
            "name": "Allenamento A",
            "description": "Allenamento per la parte superiore del corpo",
            "exercises": [
                {
                    "id": 1,
                    "name": "Panca Piana",
                    "sets": 4,
                    "repetitions": 12,
                    "restTime": "90 secondi",
                    "notes": "Mantenere la schiena aderente alla panca"
                },
                {
                    "id": 2,
                    "name": "Trazioni",
                    "sets": 3,
                    "repetitions": 8,
                    "restTime": "120 secondi",
                    "notes": "Mantenere il corpo dritto"
                }
            ]
        },
        {
            "id": "workout-b",
            "name": "Allenamento B",
            "description": "Allenamento per la parte inferiore del corpo",
            "exercises": [
                {
                    "id": 3,
                    "name": "Squat",
                    "sets": 4,
                    "repetitions": 10,
                    "restTime": "120 secondi",
                    "notes": "Mantenere la schiena dritta"
                },
                {
                    "id": 4,
                    "name": "Affondi",
                    "sets": 3,
                    "repetitions": 12,
                    "restTime": "90 secondi",
                    "notes": "Controllare la discesa"
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
        console.log('Workout data:', workoutData); // Debug log
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
            <h2>Foto Iniziale Allenamento</h2>
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
        exerciseElement.innerHTML = `
            <div class="exercise-header">
                <h2>${exercise.name}</h2>
                <div class="progress-bar">
                    <div class="progress" style="width: 0%"></div>
                </div>
            </div>
            <div class="exercise-photo" id="exercise-photo-${exercise.id}">
                <div class="photo-placeholder">
                    <p>+ Clicca per aggiungere foto</p>
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
        
        // Add event listener for exercise photo input
        const exercisePhotoInput = document.getElementById(`exercise-photo-input-${exercise.id}`);
        exercisePhotoInput.addEventListener('change', (event) => {
            handlePhotoInput(event, `exercise-photo-${exercise.id}`, workoutId);
        });
        
        loadExerciseHistory(exercise.id);
        loadExercisePhoto(exercise.id);
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
    const savedPhoto = localStorage.getItem(`exercise-photo-${exerciseId}`);
    if (savedPhoto) {
        const container = document.getElementById(`exercise-photo-${exerciseId}`);
        container.innerHTML = `
            <img src="${savedPhoto}" alt="Foto esercizio">
            <div class="photo-options">
                <button onclick="capturePhoto('exercise-photo-input-${exerciseId}')">Scatta</button>
                <button onclick="uploadPhoto('exercise-photo-input-${exerciseId}')">Carica</button>
            </div>
        `;
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
    progressBar.style.width = `${progress}%`;
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
        history: {},
        photos: {},
        lastUpdated: new Date().toISOString()
    };

    // Save exercise history
    workoutData.workouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
            const history = JSON.parse(localStorage.getItem(`exercise-${exercise.id}`) || '[]');
            if (history.length > 0) {
                data.history[`exercise-${exercise.id}`] = history;
            }
            
            // Save exercise photos
            const exercisePhoto = localStorage.getItem(`exercise-photo-${exercise.id}`);
            if (exercisePhoto) {
                data.photos[`exercise-photo-${exercise.id}`] = exercisePhoto;
            }
        });
    });

    // Save workout photos
    workoutData.workouts.forEach(workout => {
        const photos = JSON.parse(localStorage.getItem(`workout-photos-${workout.id}`) || '[]');
        if (photos.length > 0) {
            data.history[`workout-photos-${workout.id}`] = photos;
        }
    });

    // Create and download JSON file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workout_data_${new Date().toISOString().split('T')[0]}.json`;
    
    // Add event listener to clean up after download
    a.addEventListener('click', () => {
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    });
    
    document.body.appendChild(a);
    a.click();
}

// Function to load workout data from file
function loadWorkoutDataFromFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // Verify data structure
            if (!data.workouts || !data.history) {
                throw new Error('Formato file non valido');
            }
            
            // Load exercise history
            Object.entries(data.history).forEach(([key, value]) => {
                if (key.startsWith('exercise-')) {
                    localStorage.setItem(key, JSON.stringify(value));
                } else if (key.startsWith('workout-photos-')) {
                    localStorage.setItem(key, JSON.stringify(value));
                }
            });

            // Load photos
            if (data.photos) {
                Object.entries(data.photos).forEach(([key, value]) => {
                    localStorage.setItem(key, value);
                });
            }

            // Update UI
            workoutData.workouts.forEach(workout => {
                loadWorkoutExercises(workout.id);
                loadWorkoutPhoto(workout.id);
            });

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Dati caricati con successo!';
            successMessage.style.position = 'fixed';
            successMessage.style.bottom = '20px';
            successMessage.style.left = '50%';
            successMessage.style.transform = 'translateX(-50%)';
            successMessage.style.backgroundColor = 'var(--primary-color)';
            successMessage.style.color = 'white';
            successMessage.style.padding = '10px 20px';
            successMessage.style.borderRadius = '5px';
            successMessage.style.zIndex = '1000';
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 3000);
        } catch (error) {
            console.error('Error loading data:', error);
            alert('Errore nel caricamento dei dati: ' + error.message);
        }
    };
    reader.readAsText(file);
}

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