const verses = [
  '"The Lord is my shepherd; I shall not want." — Psalm 23:1',
  '"Trust in the Lord with all your heart and lean not on your own understanding." — Proverbs 3:5',
  '"Let all that you do be done in love." — 1 Corinthians 16:14',
  '"I can do all things through Christ who strengthens me." — Philippians 4:13',
  '"Be joyful in hope, patient in affliction, faithful in prayer." — Romans 12:12',
];

const reflections = [
  'Where did you see God’s faithfulness in your day?',
  'Who can you encourage with Christ-like love today?',
  'What burden can you hand over to God in prayer right now?',
  'What Scripture truth do you need to remember today?',
  'How can you practice gratitude in a specific way today?',
];

const verseText = document.getElementById('verse-text');
const reflectionText = document.getElementById('reflection-text');
const prayerForm = document.getElementById('prayer-form');
const prayerInput = document.getElementById('prayer-input');
const prayerList = document.getElementById('prayer-list');
const gratitudeInput = document.getElementById('gratitude-input');
const saveGratitudeButton = document.getElementById('save-gratitude');
const saveStatus = document.getElementById('save-status');

const PRAYER_KEY = 'faith-journal-prayers';
const GRATITUDE_KEY = 'faith-journal-gratitude';

function getDayIndex(length) {
  const dayMs = 24 * 60 * 60 * 1000;
  return Math.floor(Date.now() / dayMs) % length;
}

function loadDailyContent() {
  verseText.textContent = verses[getDayIndex(verses.length)];
  reflectionText.textContent = reflections[getDayIndex(reflections.length)];
}

function loadPrayers() {
  const prayers = JSON.parse(localStorage.getItem(PRAYER_KEY) || '[]');
  prayerList.innerHTML = '';

  prayers.forEach((prayer, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = prayer;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove';
    removeButton.type = 'button';
    removeButton.addEventListener('click', () => {
      prayers.splice(index, 1);
      localStorage.setItem(PRAYER_KEY, JSON.stringify(prayers));
      loadPrayers();
    });

    li.append(span, removeButton);
    prayerList.appendChild(li);
  });
}

prayerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = prayerInput.value.trim();
  if (!value) return;

  const prayers = JSON.parse(localStorage.getItem(PRAYER_KEY) || '[]');
  prayers.push(value);
  localStorage.setItem(PRAYER_KEY, JSON.stringify(prayers));

  prayerInput.value = '';
  loadPrayers();
});

function loadGratitude() {
  gratitudeInput.value = localStorage.getItem(GRATITUDE_KEY) || '';
}

saveGratitudeButton.addEventListener('click', () => {
  localStorage.setItem(GRATITUDE_KEY, gratitudeInput.value.trim());
  saveStatus.textContent = 'Saved.';
  setTimeout(() => {
    saveStatus.textContent = '';
  }, 1400);
});

loadDailyContent();
loadPrayers();
loadGratitude();
